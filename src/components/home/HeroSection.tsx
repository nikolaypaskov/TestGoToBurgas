"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

const heroImages = [
  { src: "/images/hero-burgas.jpg", alt: "Burgas city aerial view" },
  { src: "/images/hero/beach-hero.jpg", alt: "Burgas beach panorama" },
  { src: "/images/places/sea-casino.jpg", alt: "Burgas Sea Casino" },
  { src: "/images/places/sea-garden.jpg", alt: "Burgas Sea Garden" },
];

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const searchPlaceholder =
    locale === "bg"
      ? "Търси места, събития, ресторанти..."
      : locale === "ru"
        ? "Поиск мест, событий, ресторанов..."
        : "Search places, events, restaurants...";

  const quickCategories = [
    { label: dict.categories.beaches, href: `/${locale}/explore/beaches`, icon: "beach" as const },
    { label: dict.nav.events, href: `/${locale}/events`, icon: "events" as const },
    { label: dict.categories.restaurants, href: `/${locale}/plan/restaurants`, icon: "food" as const },
    { label: dict.categories.landmarks, href: `/${locale}/explore/landmarks`, icon: "landmark" as const },
    { label: dict.categories.nightlife, href: `/${locale}/plan/nightlife`, icon: "nightlife" as const },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/explore?q=${encodeURIComponent(query.trim())}`);
    }
  }

  const words = dict.home.heroTitle.split(" ");
  const firstWord = words[0];
  const accentWords = words.slice(1).join(" ");

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Slideshow backgrounds with crossfade + Ken Burns */}
      {heroImages.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: currentImage === i ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className={`object-cover ${currentImage === i ? "animate-ken-burns" : ""}`}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Aurora gradient overlay — the signature effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60" />
      <div className="absolute inset-0 mix-blend-multiply opacity-40 aurora-bg" />

      {/* Aurora orbs — floating color blobs */}
      <div className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-teal/25 to-primary/10 blur-[100px] aurora-orb pointer-events-none" />
      <div className="absolute bottom-[15%] -left-[8%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/20 to-accent/15 blur-[120px] aurora-orb-drift pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-accent/10 to-teal/10 blur-[80px] aurora-orb pointer-events-none" style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 pt-20">
        {/* Tagline chip */}
        <div className="animate-fade-in-up inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/8 backdrop-blur-xl px-6 py-2.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-float" />
          <span className="text-[11px] sm:text-sm font-semibold text-white/90 tracking-[0.18em] uppercase">
            {dict.site.tagline}
          </span>
        </div>

        {/* Headline — first word white, city name in warm aurora gradient */}
        <h1 className="animate-fade-in-up stagger-1 font-display leading-[0.92] tracking-tight">
          <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            {firstWord}
          </span>
          <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gradient-warm italic">
            {accentWords}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed tracking-wide">
          {dict.home.heroSubtitle}
        </p>

        {/* Search bar — frosted aurora glass */}
        <form onSubmit={handleSearch} className="animate-fade-in-up stagger-3 mx-auto mt-10 max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 p-2 shadow-hero transition-all focus-within:bg-white/15 focus-within:border-white/30 focus-within:shadow-[0_0_40px_rgba(95,180,156,0.15)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-3 shrink-0 opacity-50">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-white placeholder-white/35 text-[15px] py-3 px-2 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-surface-dark transition-all hover:bg-secondary-light cursor-pointer"
            >
              {dict.nav.search}
            </button>
          </div>
        </form>

        {/* Quick category pills — SVG icons, no emojis */}
        <div className="animate-fade-in-up stagger-4 mt-6 flex flex-wrap items-center justify-center gap-2">
          {quickCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="inline-flex items-center gap-2 rounded-full bg-white/6 border border-white/10 px-4 py-2 text-xs font-medium text-white/65 transition-all hover:bg-white/14 hover:text-white hover:border-white/25 cursor-pointer"
            >
              <QuickIcon type={cat.icon} />
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              currentImage === i
                ? "w-8 bg-white"
                : "w-1.5 bg-white/35 hover:bg-white/60"
            }`}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>

      {/* Wave transition */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[80px] md:h-[100px]">
          <path
            d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="var(--color-surface-warm)"
          />
          <path
            d="M0,65 C300,25 600,85 900,40 C1100,10 1300,65 1440,50 L1440,120 L0,120 Z"
            fill="var(--color-surface-warm)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 animate-fade-in stagger-6 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[9px] text-white/35 uppercase tracking-[0.25em] font-medium">
          {locale === "bg" ? "Разгледай" : locale === "ru" ? "Листайте" : "Scroll"}
        </span>
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  );
}

function QuickIcon({ type }: { type: "beach" | "events" | "food" | "landmark" | "nightlife" }) {
  const p = {
    width: 13,
    height: 13,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "beach":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "events":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "food":
      return (
        <svg {...p}>
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case "landmark":
      return (
        <svg {...p}>
          <path d="M2 20h20" />
          <path d="M5 20V8l7-5 7 5v12" />
          <path d="M9 20v-5h6v5" />
          <path d="M3 8h18" />
        </svg>
      );
    case "nightlife":
      return (
        <svg {...p}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      );
  }
}
