"use client";

import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";

interface HighlightsStripProps {
  locale: Locale;
}

interface Highlight {
  title: string;
  desc: string;
  href: string;
  image: string;
}

const highlights: Record<string, Highlight[]> = {
  en: [
    { title: "300+ Sunny Days", desc: "Year-round warmth on the Bulgarian Riviera", href: "/weather", image: "/images/hero-burgas.jpg" },
    { title: "35km Coastline", desc: "Where the promenade never ends", href: "/explore/beaches", image: "/images/hero/beach-hero.jpg" },
    { title: "10+ Beaches", desc: "From lively boardwalks to hidden coves", href: "/explore/beaches", image: "/images/places/st-anastasia.jpg" },
    { title: "2500+ Years", desc: "Thracian gold, Roman baths, festival nights", href: "/explore/landmarks", image: "/images/places/sea-casino.jpg" },
  ],
  bg: [
    { title: "300+ Слънчеви дни", desc: "Целогодишна топлина на Българската Ривиера", href: "/weather", image: "/images/hero-burgas.jpg" },
    { title: "35км Крайбрежие", desc: "Където алеята никога не свършва", href: "/explore/beaches", image: "/images/hero/beach-hero.jpg" },
    { title: "10+ Плажа", desc: "От оживени кейове до скрити заливчета", href: "/explore/beaches", image: "/images/places/st-anastasia.jpg" },
    { title: "2500+ Години", desc: "Тракийско злато, римски бани, фестивални нощи", href: "/explore/landmarks", image: "/images/places/sea-casino.jpg" },
  ],
  ru: [
    { title: "300+ Солнечных дней", desc: "Круглогодичное тепло Болгарской Ривьеры", href: "/weather", image: "/images/hero-burgas.jpg" },
    { title: "35км Побережья", desc: "Где набережная никогда не заканчивается", href: "/explore/beaches", image: "/images/hero/beach-hero.jpg" },
    { title: "10+ Пляжей", desc: "От оживлённых набережных до скрытых бухт", href: "/explore/beaches", image: "/images/places/st-anastasia.jpg" },
    { title: "2500+ Лет", desc: "Фракийское золото, римские бани, ночи фестивалей", href: "/explore/landmarks", image: "/images/places/sea-casino.jpg" },
  ],
};

const editorLabel: Record<string, string> = {
  en: "In This Issue",
  bg: "В този брой",
  ru: "В этом выпуске",
};

export function HighlightsStrip({ locale }: HighlightsStripProps) {
  const items = highlights[locale] || highlights.en;
  const label = editorLabel[locale] || editorLabel.en;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted mb-3">
        {label}
      </p>
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
        {items.map((item) => (
          <Link
            key={item.title}
            href={`/${locale}${item.href}`}
            className="group flex items-center gap-2.5 sm:gap-3 shrink-0 rounded-xl bg-surface/90 backdrop-blur-md px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-200 hover:bg-surface cursor-pointer"
          >
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="56px"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-text-primary leading-tight group-hover:text-primary transition-colors whitespace-nowrap">
                {item.title}
              </h3>
              <p className="text-[11px] text-text-muted leading-snug mt-0.5 hidden sm:block whitespace-nowrap">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
