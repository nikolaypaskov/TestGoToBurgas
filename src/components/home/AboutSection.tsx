import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface AboutSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const stats = {
  en: [
    { value: "300+", label: "Sunny Days" },
    { value: "35km", label: "Coastline" },
    { value: "10+", label: "Beaches" },
    { value: "2500+", label: "Years of History" },
  ],
  bg: [
    { value: "300+", label: "Слънчеви дни" },
    { value: "35км", label: "Крайбрежие" },
    { value: "10+", label: "Плажа" },
    { value: "2500+", label: "Години история" },
  ],
  ru: [
    { value: "300+", label: "Солнечных дней" },
    { value: "35км", label: "Побережье" },
    { value: "10+", label: "Пляжей" },
    { value: "2500+", label: "Лет истории" },
  ],
};

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const cityStats = stats[locale] || stats.en;

  return (
    <section className="relative py-14 sm:py-20 md:py-28 overflow-hidden grain-overlay">
      {/* Full-bleed photo background */}
      <div className="absolute inset-0">
        <Image
          src="/images/places/sea-casino.jpg"
          alt="Burgas Sea Casino"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Multi-layer dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/75" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <div className="h-px w-10 bg-white/20" />
        </div>

        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
          {dict.home.aboutTitle}
        </h2>
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
          {dict.home.aboutDesc}
        </p>

        {/* Stats — simple text, no glass cards */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 md:gap-x-16 sm:gap-y-6">
          {cityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-secondary">
                {stat.value}
              </div>
              <div className="mt-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/about`}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
        >
          {dict.home.learnMore}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
