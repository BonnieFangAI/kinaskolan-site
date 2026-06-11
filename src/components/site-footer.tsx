import Link from "next/link";

import { contactInfo, resolveSitePath, siteNavigation, type Locale, t, ui } from "@/lib/site-content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const footerNav = siteNavigation.filter((item) => item.key !== "home");

  return (
    <footer className="border-t border-black/8 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-brand-ink">{t(locale, ui.brand)}</p>
            <p className="text-sm text-brand-brick/80">{t(locale, ui.tagline)}</p>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">{t(locale, ui.footer.line1)}</p>
          <p className="max-w-2xl text-sm leading-7 text-slate-500">{t(locale, ui.footer.line2)}</p>

          <div className="flex flex-wrap gap-2">
            {footerNav.map((item) => (
              <Link
                key={item.key}
                href={resolveSitePath(locale, item.key)}
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-ink"
              >
                {t(locale, item.label)}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-[28px] border border-black/8 bg-white/88 p-5 shadow-sm">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "学校地址" : "Adress"}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{contactInfo.address}</p>
            <p className="mt-4 text-sm font-semibold text-brand-brick">{locale === "zh" ? "电话" : "Telefon"}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{contactInfo.phone}</p>
          </article>

          <article className="rounded-[28px] border border-black/8 bg-white/88 p-5 shadow-sm">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "联系邮箱" : "E-post"}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{contactInfo.email}</p>
            <p className="text-sm leading-7 text-slate-600">{contactInfo.hskEmail}</p>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              {locale === "zh"
                ? "课程与报名请联系学校邮箱，HSK 相关问题请使用专门邮箱。"
                : "Kurser och anmälan hanteras via skolans e-post, medan HSK-frågor skickas till den separata adressen."}
            </p>
          </article>

          <article className="rounded-[28px] border border-black/8 bg-brand-paper p-5 shadow-sm sm:col-span-2">
            <p className="text-sm font-semibold text-brand-brick">{locale === "zh" ? "微信二维码" : "WeChat QR"}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-[120px_1fr] sm:items-center">
              <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center text-xs leading-5 text-slate-500">
                {locale === "zh" ? "二维码预留" : "QR placeholder"}
              </div>
              <p className="text-sm leading-7 text-slate-600">
                {locale === "zh"
                  ? "此处预留学校官方微信二维码位置。"
                  : "This space is reserved for the school's official WeChat QR code."}
              </p>
            </div>
          </article>
        </div>
      </div>
    </footer>
  );
}
