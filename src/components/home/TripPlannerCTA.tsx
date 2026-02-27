import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

interface TripPlannerCTAProps {
  locale: Locale;
}

const content = {
  en: {
    title: "Your Adventure Starts Here",
    subtitle: "Whether it's a weekend escape or a full summer holiday, we'll help you discover the best of the Black Sea coast.",
    cta: "Start Exploring",
    ctaSecondary: "View Deals",
  },
  bg: {
    title: "Вашето приключение започва тук",
    subtitle: "Независимо дали е уикенд бягство или цяла лятна ваканция, ще ви помогнем да откриете най-доброто от Черноморието.",
    cta: "Разгледайте",
    ctaSecondary: "Вижте оферти",
  },
  ru: {
    title: "Ваше приключение начинается здесь",
    subtitle: "Будь то выходные или полноценный летний отпуск — мы поможем открыть лучшее на черноморском побережье.",
    cta: "Начать исследовать",
    ctaSecondary: "Смотреть предложения",
  },
};

export function TripPlannerCTA({ locale }: TripPlannerCTAProps) {
  const t = content[locale] || content.en;

  return (
    <section className="relative min-h-[45vh] sm:min-h-0 sm:h-[55vh] lg:h-[60vh] py-12 sm:py-0 overflow-hidden grain-overlay">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/beach-hero.jpg"
          alt="Burgas coastline"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-4 sm:px-10 lg:px-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <div className="h-px w-6 bg-secondary/50" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] italic tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            <Link
              href={`/${locale}/explore`}
              className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/22 hover:border-white/35 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {t.cta}
            </Link>
            <Link
              href={`/${locale}/deals`}
              className="inline-flex items-center gap-2 rounded-full bg-white/6 border border-white/12 px-5 py-3 sm:px-7 sm:py-4 text-sm sm:text-base font-semibold text-white/80 transition-all hover:bg-white/12 hover:text-white cursor-pointer"
            >
              {t.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
