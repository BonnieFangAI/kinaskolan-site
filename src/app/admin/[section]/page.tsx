import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin-shell";
import { AdminSectionOverview } from "@/components/admin/section-overview";
import { requireAdminSession } from "@/lib/admin-auth";
import { adminSections, getAdminDatasetLive, type AdminSectionKey } from "@/lib/admin-data";

function isAdminSectionKey(value: string): value is AdminSectionKey {
  return adminSections.some((section) => section.key === value);
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  await requireAdminSession();

  if (!isAdminSectionKey(section) || section === "dashboard") {
    notFound();
  }

  const dataset = await getAdminDatasetLive(section);

  return (
    <AdminShell title={dataset.section.label} description={dataset.section.description} activeSection={section}>
      <AdminSectionOverview dataset={dataset} />
    </AdminShell>
  );
}
