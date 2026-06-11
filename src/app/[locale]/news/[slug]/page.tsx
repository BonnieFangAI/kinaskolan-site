import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { assetPath, isLocale, locales, newsItems, t, type Locale, ui } from "@/lib/site-content";

export function generateStaticParams() {
  return locales.flatMap((locale) => newsItems.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) {
    return {};
  }

  return {
    title: `${t(locale, item.title)} | ${locale === "zh" ? "瑞青中文学校" : "Ruiqing"}`,
    description: t(locale, item.excerpt),
  };
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const item = newsItems.find((entry) => entry.slug === slug);
  if (!item) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 lg:px-10 lg:py-14">
      <Link href={`/${locale}/news`} className="text-sm font-semibold text-brand-blue">
        {t(locale, ui.common.backToNews)}
      </Link>
      <article className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <Image
          src={assetPath(item.image)}
          alt={t(locale, item.title)}
          width={1600}
          height={900}
          className="h-80 w-full object-cover"
        />
        <div className="space-y-6 px-8 py-8 lg:px-10 lg:py-10">
          <p className="text-xs font-semibold text-slate-500">
            {formatDate(item.date, locale)}
          </p>
          <h1 className="text-4xl font-semibold text-slate-950">{t(locale, item.title)}</h1>
          <p className="text-base leading-8 text-slate-600">{t(locale, item.excerpt)}</p>
          <div className="space-y-5 text-base leading-8 text-slate-700">
            {item.body[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
