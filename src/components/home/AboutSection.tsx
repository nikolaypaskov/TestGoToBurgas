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
    { value: "300+", label: "Sunny Days", icon: "sun" as const },
    { value: "35km", label: "Coastline", icon: "wave" as const },
    { value: "10+", label: "Beaches", icon: "beach" as const },
    { value: "2500+", label: "Years of History", icon: "history" as const },
  ],
  bg: [
    { value: "300+", label: "Слънчеви дни", icon: "sun" as const },
    { value: "35км", label: "Крайбрежие", icon: "wave" as const },
    { value: "10+", label: "Плажа", icon: "beach" as const },
    { value: "2500+", label: "Години история", icon: "history" as const },
  ],
  ru: [
    { value: "300+", label: "Солнечных дней", icon: "sun" as const },
    { value: "35км", label: "Побережье", icon: "wave" as const },
    { value: "10+", label: "Пляжей", icon: "beach" as const },
    { value: "2500+", label: "Лет истории", icon: "history" as const },
  ],
};

const accentColors = [
  "text-secondary",
  "text-teal-light",
  "text-primary-light",
  "text-accent-light",
];

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const cityStats = stats[locale] || stats.en;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden grain-overlay">
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

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
          {dict.home.aboutTitle}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-white/55 leading-relaxed max-w-2xl mx-auto">
          {dict.home.aboutDesc}
        </p>

        {/* Stats grid — glass cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {cityStats.map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/18"
            >
              <StatIcon type={stat.icon} className={`${accentColors[i]} mx-auto mb-3 opacity-70`} />
              <div className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold ${accentColors[i]}`}>
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-semibold text-white/45 uppercase tracking-[0.12em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/about`}
          className="group mt-10 inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/45 hover:bg-white/6 cursor-pointer"
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

function StatIcon({ type, className }: { type: "sun" | "wave" | "beach" | "history"; className: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };

  switch (type) {
    case "sun":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "wave":
      return (
        <svg {...p}>
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
    case "beach":
      return (
        <svg {...p}>
          <path d="M17.5 21H2M21 21l-3-10.5M14 21l-2-7" />
          <path d="M14 3v4.5" />
          <path d="M14 7.5C14 4 9 3 9 6.5c0 3 5 2 5 5.5" />
          <path d="M14 7.5c0-3.5 5-4.5 5-1s-5 2.5-5 5.5" />
        </svg>
      );
    case "history":
      return (
        <svg {...p}>
          <path d="M2 20h20" />
          <path d="M5 20V8l7-5 7 5v12" />
          <path d="M9 20v-5h6v5" />
          <path d="M3 8h18" />
        </svg>
      );
  }
}
