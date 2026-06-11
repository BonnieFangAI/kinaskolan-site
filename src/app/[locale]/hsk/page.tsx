import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
import { contactInfo, hskInfo, isLocale, scholarshipItems, t } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh" ? "汉考信息 | 斯德哥尔摩瑞青中文学校" : "HSK | Ruiqing kinesiska skola",
    description:
      locale === "zh"
        ? "瑞青中文学校汉考信息，包括考试日期、报名时间、考试地点、奖学金信息和游学活动。"
        : "HSK-information från Ruiqing med provdatum, registrering, provplats, stipendier och studieresor.",
  };
}

export default async function HskPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
      <SectionShell
        locale={locale}
        eyebrow={{ zh: "汉考信息", sv: "HSK" }}
        title={{ zh: "考试日期、奖学金信息与游学活动", sv: "Provdatum, stipendier och studieresor" }}
        description={{
          zh: "HSK 页面用于发布考试安排、报名时间、考试地点、奖学金项目和游学活动通知。",
          sv: "HSK-sidan samlar provplanering, registrering, provplats, stipendieprogram och studieresor.",
        }}
      >
        <article className="rounded-lg border border-black/8 bg-white p-6 shadow-sm">
          <p className="max-w-4xl text-base leading-8 text-slate-600">{t(locale, hskInfo.overview)}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-brand-paper p-4">
              <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "HSK 邮箱" : "HSK e-post"}</p>
              <p className="mt-2 text-base text-brand-ink">{contactInfo.hskEmail}</p>
            </div>
            <div className="rounded-lg bg-brand-paper p-4">
              <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "考试地点" : "Provplats"}</p>
              <p className="mt-2 text-base text-brand-ink">{contactInfo.address}</p>
            </div>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-3">
          {hskInfo.notices.map((notice) => (
            <article key={notice.title.zh} className="rounded-lg border border-black/8 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-brand-ink">{t(locale, notice.title)}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t(locale, notice.summary)}</p>
            </article>
          ))}
        </div>

        <section className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-brand-brick">
              {locale === "zh" ? "奖学金与推荐项目" : "Stipendier och rekommenderade program"}
            </p>
            <h2 className="text-3xl font-semibold text-brand-ink">
              {locale === "zh" ? "后续学习机会" : "Fortsatta studiemöjligheter"}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {scholarshipItems.map((item) => (
              <article key={item.title.zh} className="rounded-lg border border-black/8 bg-brand-paper p-6">
                <h3 className="text-xl font-semibold text-brand-ink">{t(locale, item.title)}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
              </article>
            ))}
          </div>
        </section>
      </SectionShell>
    </div>
  );
}
