"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const localeLabels: Record<Locale, string> = {
  bg: "BG",
  en: "EN",
  ru: "RU",
};

const localeFlags: Record<Locale, string> = {
  bg: "\u{1F1E7}\u{1F1EC}",
  en: "\u{1F1EC}\u{1F1E7}",
  ru: "\u{1F1F7}\u{1F1FA}",
};

interface LanguageSwitcherProps {
  locale: Locale;
  scrolled?: boolean;
}

export function LanguageSwitcher({ locale, scrolled = true }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          scrolled
            ? "text-text-primary hover:bg-surface-dim"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
        aria-label="Switch language"
      >
        <span>{localeFlags[locale]}</span>
        <span>{localeLabels[locale]}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[130px] overflow-hidden rounded-xl bg-surface py-1 shadow-[var(--shadow-card-hover)] border border-border-light">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-surface-dim ${
                l === locale ? "font-semibold text-primary bg-surface-dim" : "text-text-primary"
              }`}
            >
              <span>{localeFlags[l]}</span>
              <span>{localeLabels[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
