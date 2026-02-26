import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface PostcardSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PostcardSection({ locale, dict }: PostcardSectionProps) {
  return (
    <section className="relative h-[50vh] sm:h-[58vh] lg:h-[65vh] overflow-hidden grain-overlay">
      {/* Background photo */}
      <Image
        src="/images/places/st-anastasia.jpg"
        alt="St. Anastasia Island, Burgas"
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

      {/* Decorative elements */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 w-20 h-20 border border-white/10 rounded-full hidden lg:block" />
      <div className="absolute top-12 right-12 sm:top-16 sm:right-16 w-12 h-12 border border-secondary/20 rounded-full hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-6 sm:px-12 lg:px-20">
          {/* Decorative accent line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <div className="h-px w-6 bg-secondary/50" />
          </div>

          {/* Pull quote */}
          <blockquote>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] italic tracking-tight">
              &ldquo;{dict.home.postcardQuote}&rdquo;
            </p>
          </blockquote>

          {/* CTA */}
          <Link
            href={`/${locale}/explore`}
            className="group mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/22 hover:border-white/35 cursor-pointer"
          >
            {dict.home.explorePlaces}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-dim to-transparent" />
    </section>
  );
}
