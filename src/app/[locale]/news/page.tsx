import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
import { getNewsContent } from "@/lib/cms-content";
import { assetPath, isLocale, t, type Locale, ui } from "@/lib/site-content";

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const newsContent = await getNewsContent();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10 lg:py-14">
      <SectionShell
        locale={locale}
        eyebrow={{ zh: "新闻", sv: "Nyheter" }}
        title={{ zh: "新闻、通知与活动更新", sv: "Nyheter, meddelanden och uppdateringar" }}
        description={{
          zh: "这里按时间整理学校公开发布的新闻、活动报道和阶段性通知，方便家长、学生和考生查看近期更新。",
          sv: "Här samlas skolans offentliga nyheter, aktivitetsrapporter och praktiska notiser i tidsordning för familjer, elever och provdeltagare.",
        }}
      >
        <div className="grid gap-6">
          {newsContent.map((item) => (
            <article
              key={item.slug}
              className="grid gap-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 lg:grid-cols-[320px_1fr]"
            >
              <Image
                src={assetPath(item.image)}
                alt={t(locale, item.title)}
                width={1200}
                height={800}
                className="h-full min-h-64 w-full object-cover"
              />
              <div className="space-y-4 px-7 py-7">
                <p className="text-xs font-semibold text-slate-500">
                  {formatDate(item.date, locale)}
                </p>
                <h2 className="text-2xl font-semibold text-slate-950">{t(locale, item.title)}</h2>
                <p className="text-base leading-8 text-slate-600">{t(locale, item.excerpt)}</p>
                <Link href={`/${locale}/news/${item.slug}`} className="text-sm font-semibold text-brand-blue">
                  {t(locale, ui.common.readMore)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh" ? "新闻 | 斯德哥尔摩瑞青中文学校" : "Nyheter | Ruiqing kinesiska skola",
    description:
      locale === "zh"
        ? "瑞青中文学校新闻列表，发布学校动态、活动报道和重要通知。"
        : "Nyheter från Ruiqing kinesiska skola med skoluppdateringar, aktiviteter och meddelanden.",
  };
}
