"use client";

import { useState } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface NewsletterCTAProps {
  locale: Locale;
  dict: Dictionary;
}

export function NewsletterCTA({ locale, dict }: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  const thankYou =
    locale === "bg"
      ? "Добре дошли на борда! Скоро ще чуете от нас."
      : locale === "ru"
        ? "Добро пожаловать на борт! Скоро свяжемся с вами."
        : "Welcome aboard! We'll be in touch soon.";

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/places/sea-garden.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/92 via-primary/88 to-teal-dark/82" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-10 bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <div className="h-px w-10 bg-white/20" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight italic">
          {dict.home.newsletterTitle}
        </h2>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-3 text-white font-medium">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-light">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{thankYou}</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.home.emailPlaceholder}
              required
              className="flex-1 bg-transparent border-b-2 border-white/25 px-1 py-3 sm:px-2 sm:py-3.5 text-white placeholder-white/35 text-sm outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-secondary px-6 py-3 sm:px-8 sm:py-3.5 text-sm font-bold text-surface-dark transition-all hover:bg-secondary-light hover:scale-[1.02] cursor-pointer"
            >
              {dict.home.subscribe}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
