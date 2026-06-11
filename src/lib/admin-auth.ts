import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const ADMIN_PREVIEW_COOKIE = "kinaskolan_admin_preview";

export function getPreviewAdminCredentials() {
  return {
    email: process.env.ADMIN_PREVIEW_EMAIL || "admin@kinaskolan.local",
    password: process.env.ADMIN_PREVIEW_PASSWORD || "kinaskolan-admin",
  };
}

export async function setPreviewAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_PREVIEW_COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function clearPreviewAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_PREVIEW_COOKIE);
}

export async function hasPreviewAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_PREVIEW_COOKIE)?.value === "ok";
}

export async function requirePreviewAdminSession() {
  const ok = await hasPreviewAdminSession();
  if (!ok) {
    redirect("/admin/sign-in");
  }
}

export async function requireAdminSession() {
  if (!hasSupabaseEnv()) {
    await requirePreviewAdminSession();
    return;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/sign-in");
  }
}

export async function hasAdminSession() {
  if (!hasSupabaseEnv()) {
    return hasPreviewAdminSession();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Boolean(user);
}
