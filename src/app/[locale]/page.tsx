import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getHskContent, getNewsContent, getSiteSettingsContent, getStudentWorkContent } from "@/lib/cms-content";
import { assetPath, isLocale, resolveSitePath, schoolOverview, t, type Locale, ui } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh" ? "首页 | 斯德哥尔摩瑞青中文学校" : "Hem | Ruiqing kinesiska skola",
    description:
      locale === "zh"
        ? "瑞青中文学校官方网站，提供学校简介、最新新闻、学生作品、汉考信息和联系方式。"
        : "Ruiqings officiella webbplats med skolprofil, nyheter, elevarbeten, HSK-information och kontakt.",
  };
}

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [settings, newsContent, studentWorks, hskContent] = await Promise.all([
    getSiteSettingsContent(),
    getNewsContent(),
    getStudentWorkContent(),
    getHskContent(),
  ]);
  const latestNews = newsContent.slice(0, 3);
  const studentShowcase = studentWorks.slice(0, 3);

  return (
    <div className="flex w-full flex-col">
      <section className="relative min-h-[560px] overflow-hidden bg-brand-ink text-white">
        <Image
          src={assetPath("/original/sodralatin.jpg")}
          alt="Södra Latins Gymnasium"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,39,57,0.82),rgba(23,39,57,0.5),rgba(23,39,57,0.28))]" />
        <div className="relative mx-auto flex min-h-[560px] w-full max-w-7xl items-end px-5 py-12 sm:px-6 lg:px-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-semibold text-white/78">Kinaskolan Ruiqing i Stockholm</p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {t(locale, settings.hero.title)}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/88 sm:text-lg">{t(locale, settings.hero.subtitle)}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={`mailto:${settings.contact.email}`}
                className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-brand-ink shadow-sm"
              >
                {t(locale, ui.common.contactAdmissions)}
              </a>
              <Link
                href={resolveSitePath(locale, "about")}
                className="rounded-md border border-white/36 px-5 py-3 text-sm font-semibold text-white"
              >
                {t(locale, ui.common.learnMore)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "学校简介" : "Om skolan"}</p>
            <h2 className="text-3xl font-semibold text-brand-ink sm:text-4xl">
              {locale === "zh" ? "稳定办学，重视中文与文化" : "Stabil skola med språk och kultur i centrum"}
            </h2>
            <Link href={resolveSitePath(locale, "about")} className="inline-flex text-sm font-semibold text-brand-brick">
              {t(locale, ui.common.learnMore)}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {schoolOverview.pillars.map((item) => (
              <article key={item.title.zh} className="rounded-lg border border-black/8 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-ink">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-brand-brick">{t(locale, ui.common.latestNews)}</p>
              <h2 className="text-3xl font-semibold text-brand-ink sm:text-4xl">
                {locale === "zh" ? "学校新闻与通知" : "Nyheter och meddelanden"}
              </h2>
            </div>
            <Link href={resolveSitePath(locale, "news")} className="text-sm font-semibold text-brand-brick">
              {t(locale, ui.common.viewAllNews)}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {latestNews.map((item) => (
              <article key={item.slug} className="overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
                <Image
                  src={assetPath(item.image)}
                  alt={t(locale, item.title)}
                  width={900}
                  height={600}
                  className="h-48 w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <p className="text-sm text-slate-500">{formatDate(item.date, locale)}</p>
                  <h3 className="text-xl font-semibold leading-7 text-brand-ink">{t(locale, item.title)}</h3>
                  <Link
                    href={`${resolveSitePath(locale, "news")}/${item.slug}`}
                    className="inline-flex text-sm font-semibold text-brand-brick"
                  >
                    {t(locale, ui.common.readMore)}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "汉考信息" : "HSK"}</p>
            <h2 className="text-3xl font-semibold text-brand-ink sm:text-4xl">
              {locale === "zh" ? "考试、奖学金与游学通知" : "Prov, stipendier och studieresor"}
            </h2>
            <p className="text-base leading-8 text-slate-600">{t(locale, hskContent.overview)}</p>
            <Link href={resolveSitePath(locale, "hsk")} className="inline-flex text-sm font-semibold text-brand-brick">
              {locale === "zh" ? "查看汉考信息" : "Läs mer om HSK"}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {hskContent.notices.map((notice) => (
              <article key={notice.title.zh} className="rounded-lg border border-black/8 bg-brand-paper p-5">
                <h3 className="text-lg font-semibold text-brand-ink">{t(locale, notice.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{t(locale, notice.summary)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "学生风采" : "Elevernas arbete"}</p>
            <h2 className="text-3xl font-semibold text-brand-ink sm:text-4xl">
              {locale === "zh" ? "学生作品、比赛照片与校园活动" : "Elevarbeten, tävlingar och skolaktiviteter"}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {studentShowcase.map((item) => (
              <article key={item.key} className="overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
                <Image
                  src={assetPath(item.image)}
                  alt={t(locale, item.title)}
                  width={900}
                  height={600}
                  className="h-48 w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <h3 className="text-xl font-semibold text-brand-ink">{t(locale, item.title)}</h3>
                  <p className="text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
