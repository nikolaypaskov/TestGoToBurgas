"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

      {/* Aurora gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60" />
      <div className="absolute inset-0 mix-blend-multiply opacity-40 aurora-bg" />

      {/* Aurora orbs */}
      <div className="absolute top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-teal/25 to-primary/10 blur-[100px] aurora-orb pointer-events-none" />
      <div className="absolute bottom-[15%] -left-[8%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary/20 to-accent/15 blur-[120px] aurora-orb-drift pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-accent/10 to-teal/10 blur-[80px] aurora-orb pointer-events-none" style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 pt-20">
        {/* Tagline — simple tracked text */}
        <p className="animate-fade-in-up text-[11px] sm:text-xs font-semibold text-white/60 tracking-[0.25em] uppercase mb-8">
          {dict.site.tagline}
        </p>

        {/* Headline */}
        <h1 className="animate-fade-in-up stagger-1 font-display leading-[0.92] tracking-tight">
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
            {firstWord}
          </span>
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gradient-warm italic">
            {accentWords}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-2 mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed tracking-wide">
          {dict.home.heroSubtitle}
        </p>

        {/* Single CTA */}
        <div className="animate-fade-in-up stagger-3 mt-10">
          <Link
            href={`/${locale}/explore`}
            className="inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/20 hover:border-white/30 cursor-pointer"
          >
            {dict.home.explorePlaces}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
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
