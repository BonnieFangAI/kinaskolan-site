import Link from "next/link";

import {
  type AdminDataset,
  type AdminField,
  type AdminSectionKey,
  getAdminOperationalNotes,
  getDashboardStats,
  getSettingsSeedValues,
} from "@/lib/admin-data";
import { saveAdminRecordAction } from "@/app/admin/actions";

function sectionPath(section: AdminSectionKey) {
  return section === "dashboard" ? "/admin" : `/admin/${section}`;
}

function renderFieldPreview(field: AdminField) {
  if (field.type === "list") {
    return `${field.label}: ${field.items.length} items`;
  }

  const samples: Record<Exclude<AdminField["type"], "list">, string> = {
    text: "Single-line value",
    textarea: "Long-form content",
    date: "Date field",
    email: "Email address",
    image: "Image or cover asset",
  };

  return `${field.label}: ${samples[field.type]}`;
}

export function AdminDashboardOverview() {
  const stats = getDashboardStats();
  const notes = getAdminOperationalNotes();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{stat.value}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-950">Operational notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-950">Current site settings seed</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            {Object.entries(getSettingsSeedValues()).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-slate-50 px-4 py-3">
                <strong className="block text-slate-950">{key}</strong>
                <span className="mt-1 block leading-6">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function AdminSectionOverview({ dataset }: { dataset: AdminDataset }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{dataset.section.label}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {dataset.records.length} record{dataset.records.length === 1 ? "" : "s"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{dataset.section.description}</p>
        </div>
        <Link
          href={`${sectionPath(dataset.section.key)}/new`}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5"
        >
          {dataset.section.cta}
        </Link>
      </div>

      <div className="grid gap-4">
        {dataset.records.map((record) => (
          <article key={record.id} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-950">{record.title}</h3>
                {record.subtitle ? <p className="mt-2 text-sm text-slate-500">{record.subtitle}</p> : null}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {record.status ? (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {record.status}
                  </span>
                ) : null}
                {record.updatedAt ? <span className="text-xs text-slate-500">{record.updatedAt}</span> : null}
                <Link
                  href={`${sectionPath(dataset.section.key)}/${record.id}`}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {record.fields.slice(0, 6).map((field) => (
                <div key={field.key} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {renderFieldPreview(field)}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AdminRecordEditor({
  dataset,
  recordId,
  createMode = false,
}: {
  dataset: AdminDataset;
  recordId?: string;
  createMode?: boolean;
}) {
  const record = createMode
    ? {
        id: "new",
        title: `New ${dataset.section.label}`,
        subtitle: "Create a new record",
        status: "Draft",
        fields: dataset.records[0]?.fields ?? [],
      }
    : dataset.records.find((entry) => entry.id === recordId);

  if (!record) {
    return (
      <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-semibold text-slate-950">Record not found</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The requested record is not present in the current preview data set.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{dataset.section.label}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{record.title}</h2>
          {record.subtitle ? <p className="mt-3 text-sm leading-7 text-slate-600">{record.subtitle}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={sectionPath(dataset.section.key)}
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            Back to list
          </Link>
        </div>
      </div>

      <form className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
        <input type="hidden" name="section" value={dataset.section.key} />
        <input type="hidden" name="recordId" value={createMode ? "" : record.id} />
        <div className="grid gap-5">
          {record.fields.map((field) => (
            <label key={field.key} className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  name={field.key}
                  defaultValue={String(record.values?.[field.key] ?? "")}
                  rows={5}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              ) : field.type === "list" ? (
                <textarea
                  name={field.key}
                  defaultValue={
                    Array.isArray(record.values?.[field.key])
                      ? (record.values?.[field.key] as string[]).join("\n")
                      : field.items.join("\n")
                  }
                  rows={5}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              ) : (
                <input
                  name={field.key}
                  type={field.type === "date" ? "date" : field.type === "email" ? "email" : "text"}
                  defaultValue={String(record.values?.[field.key] ?? "")}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
                />
              )}
            </label>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            formAction={saveAdminRecordAction}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5"
          >
            Save changes
          </button>
          <p className="text-sm leading-7 text-slate-500">
            In preview mode this saves to a local JSON store. When Supabase is configured, this action can switch to database writes.
          </p>
        </div>
      </form>
    </div>
  );
}
