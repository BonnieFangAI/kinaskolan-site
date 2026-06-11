import { AdminShell } from "@/components/admin-shell";
import { AdminDashboardOverview } from "@/components/admin/section-overview";
import { requirePreviewAdminSession } from "@/lib/admin-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { ui } from "@/lib/site-content";

export default async function AdminPage() {
  if (!hasSupabaseEnv()) {
    await requirePreviewAdminSession();
  }

  return (
    <AdminShell title={ui.admin.title} description={ui.admin.description} activeSection="dashboard">
      <AdminDashboardOverview />
    </AdminShell>
  );
}
