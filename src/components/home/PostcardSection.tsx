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
    <section className="relative h-[55vh] sm:h-[60vh] lg:h-[65vh] overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/places/st-anastasia.jpg"
        alt="St. Anastasia Island, Burgas"
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Left-to-right gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

      {/* Content — left-aligned */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-2xl px-6 sm:px-12 lg:px-20">
          {/* Decorative line */}
          <div className="h-px w-16 bg-secondary mb-6" />

          <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight italic">
            &ldquo;{dict.home.postcardQuote}&rdquo;
          </p>

          <Link
            href={`/${locale}/explore`}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/25 hover:border-white/40"
          >
            {dict.home.explorePlaces}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
