"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearPreviewAdminSession,
  getPreviewAdminCredentials,
  setPreviewAdminSession,
} from "@/lib/admin-auth";
import { deletePreviewRecord, upsertPreviewRecord } from "@/lib/admin-preview-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { AdminSectionKey, EditableAdminSectionKey } from "@/lib/admin-data";

export type SignInState = {
  status: "idle" | "success" | "error";
  message?: string;
};

type AdminValues = Record<string, string | string[]>;

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

function parseSection(value: string): EditableAdminSectionKey {
  if (
    value === "news" ||
    value === "teachers" ||
    value === "courses" ||
    value === "student-works" ||
    value === "hsk" ||
    value === "media" ||
    value === "settings"
  ) {
    return value;
  }

  throw new Error(`Unsupported admin section: ${value}`);
}

function collectValues(formData: FormData) {
  const values: AdminValues = {};
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

    if (typeof value === "string") {
      values[key] = value;
    }
  }

  return values;
}

function textValue(values: AdminValues, key: string, fallback = "") {
  const value = values[key];
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  const text = String(value ?? "").trim();
  return text || fallback;
}

function listValue(values: AdminValues, key: string) {
  const value = values[key];
  if (Array.isArray(value)) {
    return value;
  }

  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

  return slug || `item-${Date.now()}`;
}

function slugValue(recordId: string, values: AdminValues, titleKey = "title_zh") {
  const requested = textValue(values, "slug");
  if (requested) {
    return slugify(requested);
  }

  if (recordId && recordId !== "new") {
    return slugify(recordId);
  }

  return slugify(textValue(values, titleKey, "content"));
}

function dateOrNull(value: string) {
  return value ? value : null;
}

function timestampValue(value: string) {
  return value ? `${value}T00:00:00.000Z` : new Date().toISOString();
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function mediaNameFromPath(filePath: string) {
  const fileName = filePath.split("/").filter(Boolean).pop();
  return fileName || "media-file";
}

function uploadedFile(formData: FormData) {
  const value = formData.get("upload");
  if (value instanceof File && value.size > 0) {
    return value;
  }

  return null;
}

function revalidateCmsPaths(section: EditableAdminSectionKey, recordId?: string) {
  [
    "/admin",
    `/admin/${section}`,
    "/zh",
    "/sv",
    "/zh/news",
    "/sv/news",
    "/zh/about",
    "/sv/about",
    "/zh/students",
    "/sv/students",
    "/zh/hsk",
    "/sv/hsk",
  ].forEach((path) => revalidatePath(path));

  if (section === "news" && recordId) {
    revalidatePath(`/zh/news/${recordId}`);
    revalidatePath(`/sv/news/${recordId}`);
  }
}

async function saveSupabaseRecord(
  section: EditableAdminSectionKey,
  recordId: string,
  values: AdminValues,
  formData: FormData
) {
  const supabase = await createSupabaseServerClient();
  const now = new Date().toISOString();

  if (section === "news") {
    const slug = slugValue(recordId, values);
    const excerptZh = textValue(values, "excerpt_zh");
    const excerptSv = textValue(values, "excerpt_sv");
    const payload = {
      slug,
      title_zh: textValue(values, "title_zh", "Untitled"),
      title_sv: textValue(values, "title_sv", "Untitled"),
      excerpt_zh: excerptZh,
      excerpt_sv: excerptSv,
      body_zh: textValue(values, "body_zh", excerptZh || " "),
      body_sv: textValue(values, "body_sv", excerptSv || " "),
      cover_image_path: textValue(values, "image"),
      published_at: timestampValue(textValue(values, "date")),
      updated_at: now,
    };

    const result =
      recordId && recordId !== "new"
        ? await supabase.from("news_posts").update(payload).eq("slug", recordId).select("slug").single()
        : await supabase.from("news_posts").insert(payload).select("slug").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.slug);
  }

  if (section === "teachers") {
    const payload = {
      name: textValue(values, "name", "Teacher"),
      position_zh: textValue(values, "position_zh", "教师"),
      position_sv: textValue(values, "position_sv", "Lärare"),
      biography_zh: textValue(values, "bio_zh", " "),
      biography_sv: textValue(values, "bio_sv", " "),
      focus_zh: textValue(values, "focus_zh"),
      focus_sv: textValue(values, "focus_sv"),
      image_path: textValue(values, "photo"),
      updated_at: now,
    };

    const result =
      isUuid(recordId)
        ? await supabase.from("teachers").update(payload).eq("id", recordId).select("id").single()
        : await supabase.from("teachers").insert(payload).select("id").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.id);
  }

  if (section === "courses") {
    const descriptionZh = textValue(values, "description_zh");
    const descriptionSv = textValue(values, "description_sv");
    const payload = {
      name_zh: textValue(values, "name_zh", "课程"),
      name_sv: textValue(values, "name_sv", "Kurs"),
      description_zh: descriptionZh || textValue(values, "objective_zh", " "),
      description_sv: descriptionSv || textValue(values, "objective_sv", " "),
      age_group_zh: textValue(values, "age_group_zh", " "),
      age_group_sv: textValue(values, "age_group_sv", " "),
      learning_objective_zh: textValue(values, "objective_zh", descriptionZh || " "),
      learning_objective_sv: textValue(values, "objective_sv", descriptionSv || " "),
      textbook_zh: textValue(values, "textbook_zh", " "),
      textbook_sv: textValue(values, "textbook_sv", " "),
      updated_at: now,
    };

    const result =
      isUuid(recordId)
        ? await supabase.from("courses").update(payload).eq("id", recordId).select("id").single()
        : await supabase.from("courses").insert(payload).select("id").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.id);
  }

  if (section === "student-works") {
    const slug = slugValue(recordId, values);
    const summaryZh = textValue(values, "summary_zh");
    const summarySv = textValue(values, "summary_sv");
    const payload = {
      slug,
      category: textValue(values, "category", "student-work"),
      title_zh: textValue(values, "title_zh", "学生作品"),
      title_sv: textValue(values, "title_sv", "Elevarbete"),
      summary_zh: summaryZh,
      summary_sv: summarySv,
      body_zh: textValue(values, "body_zh", summaryZh || " "),
      body_sv: textValue(values, "body_sv", summarySv || " "),
      cover_image_path: textValue(values, "image"),
      event_date: dateOrNull(textValue(values, "event_date")),
      highlights_zh: listValue(values, "highlights"),
      updated_at: now,
    };

    const result =
      recordId && recordId !== "new"
        ? await supabase.from("student_works").update(payload).eq("slug", recordId).select("slug").single()
        : await supabase.from("student_works").insert(payload).select("slug").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.slug);
  }

  if (section === "hsk") {
    const payload = {
      title_zh: textValue(values, "title_zh", "HSK 通知"),
      title_sv: textValue(values, "title_sv", "HSK-meddelande"),
      summary_zh: textValue(values, "summary_zh", " "),
      summary_sv: textValue(values, "summary_sv", " "),
      exam_date: dateOrNull(textValue(values, "date")),
      registration_url: textValue(values, "registration_url"),
      updated_at: now,
    };

    const result =
      isUuid(recordId)
        ? await supabase.from("hsk_updates").update(payload).eq("id", recordId).select("id").single()
        : await supabase.from("hsk_updates").insert(payload).select("id").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.id);
  }

  if (section === "media") {
    let filePath = textValue(values, "file_path");
    let fileName = textValue(values, "file_name", mediaNameFromPath(filePath));
    const file = uploadedFile(formData);

    if (file) {
      fileName = file.name || fileName;
      const safeName = fileName
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const storagePath = `media/${Date.now()}-${safeName || "upload"}`;
      const { error: uploadError } = await supabase.storage
        .from("site-media")
        .upload(storagePath, file, {
          contentType: file.type || undefined,
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage.from("site-media").getPublicUrl(storagePath);
      filePath = data.publicUrl;
    }

    const payload = {
      file_name: fileName,
      file_path: filePath || "/media-file",
      alt_zh: textValue(values, "alt_zh"),
      alt_sv: textValue(values, "alt_sv"),
    };

    const result =
      isUuid(recordId)
        ? await supabase.from("media_assets").update(payload).eq("id", recordId).select("id").single()
        : await supabase.from("media_assets").insert(payload).select("id").single();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return String(result.data.id);
  }

  const commonContact = {
    contact_address: textValue(values, "contact_address"),
    contact_email: textValue(values, "contact_email"),
    contact_phone: textValue(values, "contact_phone"),
    updated_at: now,
  };
  const { error } = await supabase.from("site_settings").upsert(
    [
      {
        locale: "zh",
        hero_title: textValue(values, "hero_title_zh"),
        hero_subtitle: textValue(values, "hero_subtitle_zh"),
        about_summary: textValue(values, "about_summary_zh"),
        ...commonContact,
      },
      {
        locale: "sv",
        hero_title: textValue(values, "hero_title_sv"),
        hero_subtitle: textValue(values, "hero_subtitle_sv"),
        about_summary: textValue(values, "about_summary_sv"),
        ...commonContact,
      },
    ],
    { onConflict: "locale" }
  );

  if (error) {
    throw new Error(error.message);
  }

  return "site-settings";
}

async function deleteSupabaseRecord(section: EditableAdminSectionKey, recordId: string) {
  if (section === "settings") {
    return;
  }

  const supabase = await createSupabaseServerClient();
  const tableBySection: Partial<Record<AdminSectionKey, string>> = {
    news: "news_posts",
    teachers: "teachers",
    courses: "courses",
    "student-works": "student_works",
    hsk: "hsk_updates",
    media: "media_assets",
  };
  const table = tableBySection[section];

  if (!table) {
    throw new Error(`Unsupported delete section: ${section}`);
  }

  const key = section === "news" || section === "student-works" ? "slug" : "id";
  const { error } = await supabase.from(table).delete().eq(key, recordId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function saveAdminRecordAction(formData: FormData) {
  const section = parseSection(String(formData.get("section") ?? ""));
  const recordId = String(formData.get("recordId") ?? "");
  const values = collectValues(formData);

  if (!hasSupabaseEnv()) {
    const nextId = await upsertPreviewRecord(section, recordId || null, values);
    revalidateCmsPaths(section, nextId);
    redirect(`/admin/${section}/${encodeURIComponent(nextId)}?saved=1`);
  }

  const nextId = await saveSupabaseRecord(section, recordId, values, formData);
  revalidateCmsPaths(section, nextId);
  redirect(`/admin/${section}/${encodeURIComponent(nextId)}?saved=1`);
}

export async function deleteAdminRecordAction(formData: FormData) {
  const section = parseSection(String(formData.get("section") ?? ""));
  const recordId = String(formData.get("recordId") ?? "");

  if (!recordId || recordId === "new" || section === "settings") {
    redirect(`/admin/${section}`);
  }

  if (!hasSupabaseEnv()) {
    await deletePreviewRecord(section, recordId);
  } else {
    await deleteSupabaseRecord(section, recordId);
  }

  revalidateCmsPaths(section);
  redirect(`/admin/${section}?deleted=1`);
}

export async function signOutPreviewAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } else {
    await clearPreviewAdminSession();
  }

  redirect("/admin/sign-in");
}
