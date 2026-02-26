import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-dark text-text-inverse overflow-hidden">
      {/* Wave separator */}
      <div className="section-wave-top">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px] md:h-[80px]">
          <path
            d="M0,50 C360,10 720,70 1080,30 C1260,10 1380,40 1440,35 L1440,80 L0,80 Z"
            fill="var(--color-surface-dark)"
          />
        </svg>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[300px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Image
              src="/images/logo-gotoburgas.png"
              alt="Go to Burgas"
              width={150}
              height={42}
              className="brightness-0 invert opacity-90"
            />
            <p className="mt-5 text-sm text-text-inverse/60 leading-relaxed max-w-xs">
              {dict.footer.aboutText}
            </p>
            {/* Social */}
            <div className="mt-6">
              <a
                href="https://www.facebook.com/gotoburgas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-text-inverse/70 transition-all hover:bg-white/10 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Quick links column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-text-inverse/40 mb-5">
              {dict.footer.quickLinks}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href={`/${locale}/events`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.events}
              </Link>
              <Link href={`/${locale}/explore`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.explore}
              </Link>
              <Link href={`/${locale}/plan`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.plan}
              </Link>
              <Link href={`/${locale}/deals`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.deals}
              </Link>
              <Link href={`/${locale}/weather`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.weather}
              </Link>
            </nav>
          </div>

          {/* Info column */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-text-inverse/40 mb-5">
              Info
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href={`/${locale}/about`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.about}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Legal column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-text-inverse/40 mb-5">
              {dict.footer.legal}
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href={`/${locale}/legal/terms`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.legal.terms}
              </Link>
              <Link href={`/${locale}/legal/privacy`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.legal.privacy}
              </Link>
              <Link href={`/${locale}/legal/cookies`} className="text-sm text-text-inverse/60 hover:text-white transition-colors">
                {dict.legal.cookies}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-inverse/40">
            {dict.footer.copyright.replace("{year}", String(year))}
          </p>
          <p className="text-xs text-text-inverse/30">
            Burgas, Bulgaria 🇧🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
