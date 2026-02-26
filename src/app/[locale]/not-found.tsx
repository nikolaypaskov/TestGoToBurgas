import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale } from "@/i18n/config";

const messages = {
  en: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go Home",
  },
  bg: {
    title: "Страницата не е намерена",
    description: "Страницата, която търсите, не съществува или е преместена.",
    goHome: "Към начало",
  },
  ru: {
    title: "Страница не найдена",
    description: "Страница, которую вы ищете, не существует или была перемещена.",
    goHome: "На главную",
  },
} as const;

function detectLocale(pathname: string): "en" | "bg" | "ru" {
  const match = pathname.match(/^\/(en|bg|ru)(\/|$)/);
  return (match?.[1] as "en" | "bg" | "ru") ?? defaultLocale;
}

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-next-url") ?? headersList.get("x-invoke-path") ?? `/${defaultLocale}`;
  const locale = detectLocale(pathname);
  const t = messages[locale];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal) 100%)",
            opacity: 0.06,
          }}
        />
      </div>

      {/* 404 number */}
      <h1
        className="font-display text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none animate-fade-in text-gradient-primary"
      >
        404
      </h1>

      {/* Message */}
      <h2 className="animate-fade-in-up stagger-1 mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
        {t.title}
      </h2>
      <p className="animate-fade-in-up stagger-2 mt-3 max-w-md text-lg text-text-secondary">
        {t.description}
      </p>

      {/* CTA */}
      <Link
        href={`/${locale}`}
        className="animate-fade-in-up stagger-3 mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        {t.goHome}
      </Link>
    </div>
  );
}
