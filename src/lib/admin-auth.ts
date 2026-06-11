import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
