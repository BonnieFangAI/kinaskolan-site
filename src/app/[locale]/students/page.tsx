import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
import { getStudentWorkContent } from "@/lib/cms-content";
import { assetPath, isLocale, t } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: locale === "zh" ? "学生作品 | 斯德哥尔摩瑞青中文学校" : "Elevarbeten | Ruiqing kinesiska skola",
    description:
      locale === "zh"
        ? "展示瑞青中文学校学生作品、朗诵比赛、书法比赛和课外活动照片。"
        : "Elevarbeten, recitation, kalligrafi och aktiviteter vid Ruiqing kinesiska skola.",
  };
}

export default async function StudentsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const studentWorks = await getStudentWorkContent();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
      <SectionShell
        locale={locale}
        eyebrow={{ zh: "学生作品", sv: "Elevarbeten" }}
        title={{
          zh: "朗诵比赛、书法比赛与课外活动",
          sv: "Recitation, kalligrafi och aktiviteter",
        }}
        description={{
          zh: "这里展示学生作品、比赛照片和校园活动照片。图片相册可以后续继续补充，视频内容也可按活动需要加入。",
          sv: "Här visas elevarbeten, tävlingsbilder och skolaktiviteter. Bildgallerier och video kan byggas ut efter behov.",
        }}
      >
        <div className="grid gap-6">
          {studentWorks.map((item) => (
            <article key={item.key} className="overflow-hidden rounded-lg border border-black/8 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <Image
                  src={assetPath(item.image)}
                  alt={t(locale, item.title)}
                  width={1200}
                  height={800}
                  className="h-72 w-full object-cover lg:h-full"
                />
                <div className="space-y-5 p-6">
                  <h2 className="text-3xl font-semibold text-brand-ink">{t(locale, item.title)}</h2>
                  <p className="text-base leading-8 text-slate-600">{t(locale, item.summary)}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {item.highlights.map((entry) => (
                      <div key={entry.zh} className="rounded-lg bg-brand-paper p-4 text-sm font-semibold text-brand-ink">
                        {t(locale, entry)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
