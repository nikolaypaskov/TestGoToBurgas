"use client";

import { useState } from "react";
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

  return (
    <div className="text-center max-w-2xl mx-auto px-4 sm:px-6">
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
        {dict.home.newsletterTitle}
      </h2>

      {submitted ? (
        <p className="mt-6 text-white/80 text-lg">
          {locale === "bg" ? "Благодарим ви!" : locale === "ru" ? "Спасибо!" : "Thank you!"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.home.emailPlaceholder}
            required
            className="flex-1 rounded-xl bg-white/20 backdrop-blur-sm border border-white/25 px-5 py-3 text-white placeholder-white/50 text-sm outline-none focus:border-white/50 transition-colors"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-surface-dark transition-all hover:bg-white/90"
          >
            {dict.home.subscribe}
          </button>
        </form>
      )}
    </div>
  );
}
