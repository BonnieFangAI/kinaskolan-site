"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";

import { assetPath, resolveSitePath, siteNavigation, type Locale, t, ui } from "@/lib/site-content";

function isActive(pathname: string, locale: Locale, href: string) {
  const fullHref = `/${locale}${href}`;
  if (href === "") {
    return pathname === `/${locale}`;
  }

  return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
}

function LanguageSwitcher({
  locale,
  alternatePath,
}: {
  locale: Locale;
  alternatePath: string;
}) {
  return (
    <div className="flex rounded-full border border-black/8 bg-white/88 p-1 shadow-sm">
      {(["zh", "sv"] as const).map((entry) => (
        <Link
          key={entry}
          href={`/${entry}${alternatePath}`}
          className={clsx(
            "rounded-full px-3 py-1.5 text-sm font-semibold transition",
            locale === entry ? "bg-brand-ink text-white" : "text-slate-600 hover:bg-brand-paper hover:text-brand-ink"
          )}
        >
          {entry.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

function MobileNav({
  locale,
  pathname,
  alternatePath,
}: {
  locale: Locale;
  pathname: string;
  alternatePath: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <LanguageSwitcher locale={locale} alternatePath={alternatePath} />
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-ink shadow-sm"
        >
          {locale === "zh" ? (open ? "收起" : "菜单") : open ? "Stäng" : "Meny"}
        </button>
      </div>

      {open ? (
        <div className="mt-3 rounded-[28px] border border-black/8 bg-white/94 p-4 shadow-[0_22px_60px_-36px_rgba(23,39,57,0.45)]">
          <nav className="grid gap-2">
            {siteNavigation.map((item) => (
              <Link
                key={item.key}
                href={resolveSitePath(locale, item.key)}
                className={clsx(
                  "rounded-[20px] border px-4 py-3 text-sm font-semibold transition",
                  isActive(pathname, locale, item.href)
                    ? "border-brand-ink bg-brand-ink text-white"
                    : "border-black/8 bg-brand-paper text-brand-ink hover:bg-white"
                )}
              >
                {t(locale, item.label)}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const alternatePath = pathname.startsWith(`/${locale}`) ? pathname.slice(3) : "";

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white/92 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-6 lg:px-10">
        <div className="flex items-start justify-between gap-4">
          <Link href={resolveSitePath(locale, "home")} className="flex min-w-0 items-center gap-4">
            <Image
              src={assetPath("/original/logo-ruiqing.png")}
              alt={t(locale, ui.brand)}
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 rounded-full border border-black/8 bg-white object-contain p-1.5 shadow-sm"
            />
            <span className="min-w-0">
              <span className="block truncate text-xl font-semibold text-brand-ink sm:text-2xl">
                {t(locale, ui.shortBrand)}
              </span>
              <span className="mt-1 block text-sm text-slate-600">{t(locale, ui.brand)}</span>
              <span className="mt-1 block text-xs text-brand-brick/80">
                {t(locale, ui.tagline)}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher locale={locale} alternatePath={alternatePath} />
          </div>
        </div>

        <div className="mt-5 hidden items-center justify-between gap-6 border-t border-black/8 pt-4 lg:flex">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {siteNavigation.map((item) => (
              <Link
                key={item.key}
                href={resolveSitePath(locale, item.key)}
                className={clsx(
                  "text-sm font-semibold transition",
                  isActive(pathname, locale, item.href) ? "text-brand-ink" : "text-slate-600 hover:text-brand-ink"
                )}
              >
                {t(locale, item.label)}
              </Link>
            ))}
          </nav>

          <div className="text-right text-sm leading-6 text-slate-500">
            <p>{locale === "zh" ? "Södra Latins Gymnasium, Stockholm" : "Södra Latins Gymnasium, Stockholm"}</p>
            <p>{locale === "zh" ? "Since 2008" : "Sedan 2008"}</p>
          </div>
        </div>

        <MobileNav key={pathname} locale={locale} pathname={pathname} alternatePath={alternatePath} />
      </div>
    </header>
  );
}
