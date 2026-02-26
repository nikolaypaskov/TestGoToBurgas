"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

interface TripPlannerCTAProps {
  locale: Locale;
}

const content = {
  en: {
    badge: "Plan Your Journey",
    title: "Your Burgas Adventure Starts Here",
    subtitle:
      "Whether it's a weekend escape or a full summer holiday, we'll help you discover the best of the Black Sea coast.",
    steps: [
      {
        num: "01",
        label: "Choose Your Dates",
        desc: "Find the perfect season — golden beaches in summer, vibrant festivals in autumn.",
        icon: "calendar",
      },
      {
        num: "02",
        label: "Explore & Discover",
        desc: "Browse beaches, landmarks, restaurants, and nightlife — all curated by locals.",
        icon: "compass",
      },
      {
        num: "03",
        label: "Book & Enjoy",
        desc: "Grab the best deals on stays and experiences, then let the adventure begin.",
        icon: "sparkle",
      },
    ],
    cta: "Start Exploring",
    ctaSecondary: "View Deals",
    stats: [
      { value: "50+", label: "Beaches" },
      { value: "200+", label: "Restaurants" },
      { value: "100+", label: "Events / year" },
    ],
  },
  bg: {
    badge: "Планирайте пътуването",
    title: "Вашето бургаско приключение започва тук",
    subtitle:
      "Независимо дали е уикенд бягство или цяла лятна ваканция, ще ви помогнем да откриете най-доброто от Черноморието.",
    steps: [
      {
        num: "01",
        label: "Изберете дати",
        desc: "Намерете перфектния сезон — златни плажове лятото, фестивали есента.",
        icon: "calendar",
      },
      {
        num: "02",
        label: "Разгледайте",
        desc: "Плажове, забележителности, ресторанти и нощен живот — подбрани от местни.",
        icon: "compass",
      },
      {
        num: "03",
        label: "Резервирайте",
        desc: "Хванете най-добрите оферти и нека приключението започне.",
        icon: "sparkle",
      },
    ],
    cta: "Разгледайте",
    ctaSecondary: "Вижте оферти",
    stats: [
      { value: "50+", label: "Плажа" },
      { value: "200+", label: "Ресторанта" },
      { value: "100+", label: "Събития / год." },
    ],
  },
  ru: {
    badge: "Спланируйте поездку",
    title: "Ваше бургасское приключение начинается здесь",
    subtitle:
      "Будь то выходные или полноценный летний отпуск — мы поможем открыть лучшее на черноморском побережье.",
    steps: [
      {
        num: "01",
        label: "Выберите даты",
        desc: "Найдите идеальный сезон — золотые пляжи летом, яркие фестивали осенью.",
        icon: "calendar",
      },
      {
        num: "02",
        label: "Исследуйте",
        desc: "Пляжи, достопримечательности, рестораны и ночная жизнь — подобрано местными.",
        icon: "compass",
      },
      {
        num: "03",
        label: "Бронируйте",
        desc: "Лучшие предложения на проживание и развлечения — и в путь!",
        icon: "sparkle",
      },
    ],
    cta: "Начать исследовать",
    ctaSecondary: "Смотреть предложения",
    stats: [
      { value: "50+", label: "Пляжей" },
      { value: "200+", label: "Ресторанов" },
      { value: "100+", label: "Событий / год" },
    ],
  },
};

export function TripPlannerCTA({ locale }: TripPlannerCTAProps) {
  const t = content[locale] || content.en;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/15 px-4 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span className="text-xs font-semibold text-primary tracking-wide uppercase">{t.badge}</span>
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight italic">
          {t.title}
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-text-secondary leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Steps + Stats grid */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left: 3 step cards */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {t.steps.map((step, i) => (
            <div
              key={step.num}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
              className={`relative flex gap-5 rounded-[var(--radius-card)] p-6 sm:p-7 transition-all duration-300 cursor-default ${
                hoveredStep === i
                  ? "bg-surface border border-primary/20 shadow-[var(--shadow-card-hover)] -translate-y-0.5"
                  : "bg-surface border border-border/50 shadow-[var(--shadow-card)]"
              }`}
            >
              {/* Step number circle */}
              <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-bold transition-colors duration-300 ${
                hoveredStep === i
                  ? "bg-primary text-white"
                  : "bg-primary/8 text-primary"
              }`}>
                {step.num}
              </div>

              {/* Content */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <StepIcon type={step.icon} active={hoveredStep === i} />
                  <h3 className="font-semibold text-text-primary text-[17px]">{step.label}</h3>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </div>

              {/* Hover accent line */}
              <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-300 ${
                hoveredStep === i ? "bg-primary opacity-100" : "bg-transparent opacity-0"
              }`} />
            </div>
          ))}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href={`/${locale}/explore`}
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-light hover:scale-[1.02] hover:shadow-xl cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              {t.cta}
            </Link>
            <Link
              href={`/${locale}/deals`}
              className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-7 py-4 text-base font-semibold text-text-primary transition-all hover:bg-surface-dim hover:border-primary/20 cursor-pointer"
            >
              {t.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: Aurora stats card + quick highlights */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Big aurora gradient stats card */}
          <div className="relative overflow-hidden rounded-[var(--radius-card)] aurora-bg p-8 sm:p-10 text-white">
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 blur-sm" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/3 blur-md" />

            <div className="relative">
              <h3 className="font-display text-xl font-bold mb-6 italic">Burgas by the Numbers</h3>
              <div className="grid grid-cols-3 gap-4">
                {t.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl sm:text-4xl font-bold">{stat.value}</div>
                    <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick booking preview cards */}
          <QuickPreviewCard
            icon="sun"
            title={locale === "bg" ? "Перфектно време" : locale === "ru" ? "Идеальная погода" : "Perfect Weather"}
            desc={locale === "bg" ? "28°C средна температура юни–септември" : locale === "ru" ? "28°C средняя температура июнь–сентябрь" : "28°C average temperature June–September"}
          />
          <QuickPreviewCard
            icon="plane"
            title={locale === "bg" ? "Лесен достъп" : locale === "ru" ? "Легкий доступ" : "Easy to Reach"}
            desc={locale === "bg" ? "Международно летище + влак от София за 4ч" : locale === "ru" ? "Международный аэропорт + поезд из Софии за 4ч" : "International airport + 4hr train from Sofia"}
          />
          <QuickPreviewCard
            icon="tag"
            title={locale === "bg" ? "Достъпен лукс" : locale === "ru" ? "Доступная роскошь" : "Affordable Luxury"}
            desc={locale === "bg" ? "Страхотно съотношение цена–качество" : locale === "ru" ? "Отличное соотношение цена–качество" : "Amazing value for luxury experiences"}
          />
        </div>
      </div>
    </div>
  );
}

function QuickPreviewCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-surface border border-border/50 p-4 transition-all duration-200 hover:bg-surface-dim hover:border-primary/15">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
        <PreviewIcon type={icon} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-text-primary">{title}</div>
        <div className="text-xs text-text-muted truncate">{desc}</div>
      </div>
    </div>
  );
}

function StepIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? "var(--color-primary)" : "var(--color-text-muted)";
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "calendar":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "compass":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...p}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

function PreviewIcon({ type }: { type: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "var(--color-primary)", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "sun":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
    case "plane":
      return (
        <svg {...p}>
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      );
    case "tag":
      return (
        <svg {...p}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    default:
      return null;
  }
}
