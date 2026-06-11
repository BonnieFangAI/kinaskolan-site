import { type ReactNode } from "react";

import { type Locale, type LocalizedText, t } from "@/lib/site-content";

export function SectionShell({
  locale,
  eyebrow,
  title,
  description,
  children,
}: {
  locale: Locale;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description?: LocalizedText;
  children: ReactNode;
}) {
  return (
    <section className="space-y-7">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-brand-brick/80">
          {t(locale, eyebrow)}
        </p>
        <h2 className="max-w-4xl text-3xl font-semibold text-brand-ink md:text-5xl">
          {t(locale, title)}
        </h2>
        {description ? (
          <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">{t(locale, description)}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
