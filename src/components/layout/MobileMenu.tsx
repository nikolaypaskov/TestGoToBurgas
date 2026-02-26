"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  dict: Dictionary;
}

const navKeys = ["events", "explore", "plan", "deals", "about", "contact", "weather"] as const;

const navIcons: Record<string, string> = {
  events: "🎭",
  explore: "🏖️",
  plan: "🗺️",
  deals: "🏷️",
  about: "🌊",
  contact: "📍",
  weather: "☀️",
};

export function MobileMenu({ isOpen, onClose, locale, dict }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-surface-dark/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[300px] bg-surface shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-5">
          <Image
            src="/images/logo-gotoburgas.png"
            alt="Go to Burgas"
            width={130}
            height={36}
          />
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-text-primary hover:bg-surface-dim"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}/${key}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium text-text-primary transition-colors hover:bg-surface-dim hover:text-primary"
            >
              <span className="text-lg">{navIcons[key]}</span>
              {dict.nav[key]}
            </Link>
          ))}
          <div className="mt-4 border-t border-border pt-4">
            <LanguageSwitcher locale={locale} />
          </div>
        </nav>
      </div>
    </>
  );
}
