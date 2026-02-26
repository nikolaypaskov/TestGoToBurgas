"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const searchPlaceholder = locale === "bg"
    ? "Търси места, събития, ресторанти..."
    : locale === "ru"
    ? "Поиск мест, событий, ресторанов..."
    : "Search places, events, restaurants...";

  const quickCategories = [
    { icon: "🏖️", label: dict.categories.beaches, href: `/${locale}/explore/beaches` },
    { icon: "🎭", label: dict.nav.events, href: `/${locale}/events` },
    { icon: "🍽️", label: dict.categories.restaurants, href: `/${locale}/plan/restaurants` },
    { icon: "🏛️", label: dict.categories.landmarks, href: `/${locale}/explore/landmarks` },
    { icon: "🌙", label: dict.categories.nightlife, href: `/${locale}/plan/nightlife` },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/explore?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Photo Background with Ken Burns */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-burgas.jpg"
          alt="Burgas city aerial view"
          fill
          priority
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 pt-20">
        {/* Tagline chip */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-float" />
          <span className="text-sm font-medium text-white/90 tracking-wide uppercase">
            {dict.site.tagline}
          </span>
        </div>

        {/* Main headline — large uppercase */}
        <h1 className="animate-fade-in-up stagger-1 font-display text-7xl font-bold leading-[0.95] text-white uppercase tracking-tight md:text-8xl lg:text-9xl">
          {dict.home.heroTitle}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-lg text-white/75 sm:text-xl md:text-2xl font-light leading-relaxed">
          {dict.home.heroSubtitle}
        </p>

        {/* Search bar with stronger frosted-glass */}
        <form
          onSubmit={handleSearch}
          className="animate-fade-in-up stagger-3 mx-auto mt-10 max-w-2xl"
        >
          <div className="flex items-center gap-2 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/25 p-2 shadow-hero transition-all focus-within:bg-white/25 focus-within:border-white/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-3 shrink-0 opacity-70">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-white placeholder-white/50 text-base py-3 px-2 outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-surface-dark transition-all hover:bg-secondary-light"
            >
              {dict.nav.search}
            </button>
          </div>
        </form>

        {/* Quick category pills */}
        <div className="animate-fade-in-up stagger-4 mt-6 flex flex-wrap items-center justify-center gap-2">
          {quickCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:bg-white/15 hover:text-white hover:border-white/25"
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[80px] md:h-[100px]">
          <path
            d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill="var(--color-surface-warm)"
          />
          <path
            d="M0,60 C300,20 600,90 900,40 C1100,10 1300,70 1440,50 L1440,120 L0,120 Z"
            fill="var(--color-surface-warm)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in stagger-6 hidden sm:block">
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent to-white/40" />
      </div>
    </section>
  );
}
