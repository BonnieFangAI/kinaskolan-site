"use server";

import { redirect } from "next/navigation";

import { clearPreviewAdminSession, getPreviewAdminCredentials, setPreviewAdminSession } from "@/lib/admin-auth";
import { upsertPreviewRecord } from "@/lib/admin-preview-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { AdminSectionKey } from "@/lib/admin-data";

export type SignInState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function signInAction(
  _prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "Email and password are required.",
    };
  }

  if (!hasSupabaseEnv()) {
    const preview = getPreviewAdminCredentials();
    if (email === preview.email && password === preview.password) {
      await setPreviewAdminSession();
      redirect("/admin");
    }

    return {
      status: "error",
      message: "Invalid preview credentials.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  redirect("/admin");
}

function parseSection(value: string): Exclude<AdminSectionKey, "dashboard"> {
  if (
    value === "news" ||
    value === "teachers" ||
    value === "courses" ||
    value === "activities" ||
    value === "hsk" ||
    value === "scholarships" ||
    value === "media" ||
    value === "settings"
  ) {
    return value;
  }

  throw new Error(`Unsupported admin section: ${value}`);
}

export async function saveAdminRecordAction(formData: FormData) {
  const section = parseSection(String(formData.get("section") ?? ""));
  const recordId = String(formData.get("recordId") ?? "");

  const values: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "section" || key === "recordId") {
      continue;
    }

    if (key === "highlights") {
      values[key] = String(value)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    values[key] = String(value);
  }

  if (!hasSupabaseEnv()) {
    const nextId = await upsertPreviewRecord(section, recordId || null, values);
    redirect(`/admin/${section}/${encodeURIComponent(nextId)}?saved=1`);
  }

  redirect(`/admin/${section}/${encodeURIComponent(recordId || "new")}?saved=0`);
}

export async function signOutPreviewAction() {
  await clearPreviewAdminSession();
  redirect("/admin/sign-in");
}
