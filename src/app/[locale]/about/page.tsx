import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
import {
  admissionsCards,
  assetPath,
  courses,
  historyMilestones,
  isLocale,
  schoolOverview,
  t,
  teachers,
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh" ? "瑞青简介 | 斯德哥尔摩瑞青中文学校" : "Om Ruiqing | Ruiqing kinesiska skola",
    description:
      locale === "zh"
        ? "了解瑞青中文学校的学校历史、办学理念、教师介绍、课程介绍和教材体系。"
        : "Läs om Ruiqings historia, pedagogiska idé, lärare, kurser och läromedel.",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
      <SectionShell
        locale={locale}
        eyebrow={{ zh: "瑞青简介", sv: "Om Ruiqing" }}
        title={{
          zh: "学校历史、办学理念与教学体系",
          sv: "Historia, pedagogisk idé och undervisning",
        }}
        description={{
          zh: "这里集中介绍学校简介、教师介绍、课程介绍和教材介绍，方便家长和学生完整了解瑞青中文学校。",
          sv: "Här samlas skolprofil, lärare, kurser och läromedel så att familjer och elever får en tydlig bild av skolan.",
        }}
      >
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <article id="school" className="space-y-5 rounded-lg border border-black/8 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-brand-ink">{locale === "zh" ? "学校简介" : "Skolprofil"}</h3>
            <p className="text-base leading-8 text-slate-600">{t(locale, schoolOverview.intro)}</p>
            <p className="text-base leading-8 text-slate-600">{t(locale, schoolOverview.purpose)}</p>
          </article>

          <div className="overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
            <Image
              src={assetPath("/original/about-ruiqing.png")}
              alt={locale === "zh" ? "瑞青中文学校介绍" : "Ruiqing school introduction"}
              width={842}
              height={496}
              className="h-72 w-full object-cover"
            />
            <div className="grid gap-4 p-5 sm:grid-cols-3">
              {schoolOverview.pillars.map((item) => (
                <article key={item.title.zh} className="rounded-lg bg-brand-paper p-4">
                  <h4 className="text-base font-semibold text-brand-ink">{t(locale, item.title)}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <section className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "发展历程" : "Utveckling"}</p>
          <h2 className="text-3xl font-semibold text-brand-ink">{locale === "zh" ? "学校历史" : "Skolans historia"}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {historyMilestones.map((item) => (
            <article key={item.year} className="rounded-lg border border-black/8 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-brand-brick">{item.year}</p>
              <h3 className="mt-3 text-xl font-semibold text-brand-ink">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="teachers" className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "教师介绍" : "Lärare"}</p>
          <h2 className="text-3xl font-semibold text-brand-ink">
            {locale === "zh" ? "教师团队" : "Lärarteam"}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {teachers.map((teacher) => (
            <article key={teacher.name} className="rounded-lg border border-black/8 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src={assetPath(teacher.image)}
                  alt={teacher.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border border-black/8 bg-white object-contain p-1"
                />
                <div>
                  <h3 className="text-lg font-semibold text-brand-ink">{teacher.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-brick">{t(locale, teacher.role)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{t(locale, teacher.bio)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="courses" className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "课程介绍" : "Kurser"}</p>
          <h2 className="text-3xl font-semibold text-brand-ink">
            {locale === "zh" ? "幼儿、少儿、青少年与成人课程" : "Kurser för yngre barn, barn, ungdomar och vuxna"}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course.name.zh} className="rounded-lg border border-black/8 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-brand-brick">{t(locale, course.ageGroup)}</p>
              <h3 className="mt-2 text-xl font-semibold text-brand-ink">{t(locale, course.name)}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(locale, course.objective)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="textbooks" className="space-y-5">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "教材介绍" : "Läromedel"}</p>
          <h2 className="text-3xl font-semibold text-brand-ink">
            {locale === "zh" ? "教材与汉语水平衔接" : "Läromedel och nivåprogression"}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {admissionsCards.map((item) => (
            <article key={item.title.zh} className="rounded-lg border border-black/8 bg-brand-paper p-5">
              <h3 className="text-lg font-semibold text-brand-ink">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(locale, item.summary)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
