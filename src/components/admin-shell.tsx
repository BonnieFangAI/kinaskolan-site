import type { ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";

import { signOutPreviewAction } from "@/app/admin/actions";
import { adminSections, type AdminSectionKey } from "@/lib/admin-data";

function sectionHref(key: AdminSectionKey) {
  return key === "dashboard" ? "/admin" : `/admin/${key}`;
}

export function AdminShell({
  title,
  description,
  children,
  activeSection = "dashboard",
}: {
  title: string;
  description: string;
  children?: ReactNode;
  activeSection?: AdminSectionKey;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <div className="rounded-[28px] bg-slate-950 px-8 py-10 text-white shadow-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Admin</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <form action={signOutPreviewAction}>
                <button
                  type="submit"
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Sign Out
                </button>
              </form>
              <Link
                href="/admin/sign-in"
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Account
              </Link>
              <Link
                href="/zh"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:-translate-y-0.5"
              >
                View public site
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <nav className="grid gap-2">
              {adminSections.map((section) => (
                <Link
                  key={section.key}
                  href={sectionHref(section.key)}
                  className={clsx(
                    "rounded-2xl px-4 py-3 text-sm transition",
                    activeSection === section.key
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <span className="block font-semibold">{section.label}</span>
                  <span className={clsx("mt-1 block text-xs leading-5", activeSection === section.key ? "text-slate-300" : "text-slate-500")}>
                    {section.description}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
