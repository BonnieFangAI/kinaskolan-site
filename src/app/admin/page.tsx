import { AdminShell } from "@/components/admin-shell";
import { AdminDashboardOverview } from "@/components/admin/section-overview";
import { requireAdminSession } from "@/lib/admin-auth";
import { ui } from "@/lib/site-content";

export default async function AdminPage() {
  await requireAdminSession();

  return (
    <AdminShell title={ui.admin.title} description={ui.admin.description} activeSection="dashboard">
      <AdminDashboardOverview />
    </AdminShell>
  );
}
