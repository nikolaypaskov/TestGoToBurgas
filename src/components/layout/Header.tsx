"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

const navKeys = ["events", "explore", "plan", "deals", "about", "contact", "weather"] as const;

export function Header({ locale, dict }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-[400ms] ${
        scrolled
          ? "bg-surface/97 backdrop-blur-xl shadow-[var(--shadow-nav)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/logo-gotoburgas.png"
            alt="Go to Burgas"
            width={140}
            height={40}
            className={`transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${locale}/${key}`}
              className={`relative rounded-[var(--radius-button)] px-3.5 py-2 text-[13px] font-medium tracking-[0.02em] transition-all duration-200 ${
                scrolled
                  ? "text-text-secondary hover:text-primary hover:bg-primary/5"
                  : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden lg:block">
            <LanguageSwitcher locale={locale} scrolled={scrolled} />
          </div>

          {/* Mobile hamburger */}
          <button
            className={`rounded-[var(--radius-button)] p-2.5 transition-colors lg:hidden ${
              scrolled ? "text-text-primary hover:bg-surface-dim" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="7" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        locale={locale}
        dict={dict}
      />
    </header>
  );
}
