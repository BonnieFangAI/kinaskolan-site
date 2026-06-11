import { AdminShell } from "@/components/admin-shell";
import { AdminSignInForm } from "@/components/admin/sign-in-form";
import { getPreviewAdminCredentials, hasAdminSession } from "@/lib/admin-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { redirect } from "next/navigation";

export default async function AdminSignInPage() {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  const previewCredentials = getPreviewAdminCredentials();

  return (
    <AdminShell
      title="Admin Sign In"
      description="Secure login for school staff. In production, this route should authenticate against Supabase Auth using staff accounts."
      activeSection="dashboard"
    >
      <div className="rounded-[28px] bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4">
          <AdminSignInForm />
          <p className="text-sm leading-7 text-slate-500">
            {hasSupabaseEnv()
              ? "Supabase credentials are available. This form now posts to a real server action using Supabase Auth."
              : `Preview mode credentials: ${previewCredentials.email} / ${previewCredentials.password}`}
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
