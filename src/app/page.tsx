import Link from "next/link";

export default function IndexPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-semibold text-brand-ink">斯德哥尔摩瑞青中文学校</h1>
        <p className="text-base leading-8 text-slate-600">请选择网站语言。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/zh" className="rounded-md bg-brand-ink px-5 py-3 text-sm font-semibold text-white">
            中文
          </Link>
          <Link href="/sv" className="rounded-md border border-black/10 px-5 py-3 text-sm font-semibold text-brand-ink">
            Svenska
          </Link>
        </div>
      </div>
    </main>
  );
}
