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
      ? "Благодарим ви! Очаквайте новини."
      : locale === "ru"
        ? "Спасибо! Ожидайте новостей."
        : "Thank you! Stay tuned.";

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

      {/* Decorative blurs */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[200px] rounded-full bg-secondary/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-75">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
          {dict.home.newsletterTitle}
        </h2>

        {submitted ? (
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/12 backdrop-blur-sm border border-white/18 px-8 py-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-light">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-white font-medium">{thankYou}</span>
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
              className="flex-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/18 px-5 py-3.5 text-white placeholder-white/35 text-sm outline-none focus:border-white/45 focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-secondary px-8 py-3.5 text-sm font-bold text-surface-dark transition-all hover:bg-secondary-light hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              {dict.home.subscribe}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
