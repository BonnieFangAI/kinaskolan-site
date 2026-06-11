import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin-shell";
import { AdminRecordEditor } from "@/components/admin/section-overview";
import { requireAdminSession } from "@/lib/admin-auth";
import { adminSections, getAdminDatasetLive, type AdminSectionKey } from "@/lib/admin-data";

function isAdminSectionKey(value: string): value is AdminSectionKey {
  return adminSections.some((section) => section.key === value);
}

export default async function AdminRecordPage({
  params,
}: {
  params: Promise<{ section: string; recordId: string }>;
}) {
  const { section, recordId } = await params;

  await requireAdminSession();

  if (!isAdminSectionKey(section) || section === "dashboard") {
    notFound();
  }

  const dataset = await getAdminDatasetLive(section);

  return (
    <AdminShell
      title={`${dataset.section.label} editor`}
      description={`Edit the selected ${dataset.section.label.toLowerCase()} record and prepare it for school staff updates.`}
      activeSection={section}
    >
      <AdminRecordEditor dataset={dataset} recordId={recordId} />
    </AdminShell>
  );
}
