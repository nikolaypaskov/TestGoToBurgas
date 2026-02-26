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
    { value: "300+", label: "Sunny Days", accent: "text-secondary" },
    { value: "35km", label: "Coastline", accent: "text-teal-light" },
    { value: "10+", label: "Beaches", accent: "text-primary-light" },
    { value: "2500+", label: "Years of History", accent: "text-accent-light" },
  ],
  bg: [
    { value: "300+", label: "Слънчеви дни", accent: "text-secondary" },
    { value: "35км", label: "Крайбрежие", accent: "text-teal-light" },
    { value: "10+", label: "Плажа", accent: "text-primary-light" },
    { value: "2500+", label: "Години история", accent: "text-accent-light" },
  ],
  ru: [
    { value: "300+", label: "Солнечных дней", accent: "text-secondary" },
    { value: "35км", label: "Побережье", accent: "text-teal-light" },
    { value: "10+", label: "Пляжей", accent: "text-primary-light" },
    { value: "2500+", label: "Лет истории", accent: "text-accent-light" },
  ],
};

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const cityStats = stats[locale] || stats.en;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/75" />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
          {dict.home.aboutTitle}
        </h2>
        <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          {dict.home.aboutDesc}
        </p>

        {/* Stats grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {cityStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:bg-white/12 hover:border-white/18">
              <div className={`font-display text-4xl font-bold sm:text-5xl lg:text-6xl ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-semibold text-white/50 uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/about`}
          className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/8"
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
