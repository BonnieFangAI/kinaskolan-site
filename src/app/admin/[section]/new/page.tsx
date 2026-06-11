import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin-shell";
import { AdminRecordEditor } from "@/components/admin/section-overview";
import { requireAdminSession } from "@/lib/admin-auth";
import { adminSections, getAdminDatasetLive, type AdminSectionKey } from "@/lib/admin-data";

function isAdminSectionKey(value: string): value is AdminSectionKey {
  return adminSections.some((section) => section.key === value);
}

export default async function AdminSectionCreatePage({
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
    <AdminShell
      title={`New ${dataset.section.label}`}
      description={`Create a new ${dataset.section.label.toLowerCase()} record with the fields school staff will manage.`}
      activeSection={section}
    >
      <AdminRecordEditor dataset={dataset} createMode />
    </AdminShell>
  );
}
