import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

interface PostcardSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function PostcardSection({ locale, dict }: PostcardSectionProps) {
  return (
    <section className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] overflow-hidden grain-overlay">
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

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-4 sm:px-10 lg:px-20">
          {/* Decorative accent line */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-secondary" />
            <div className="h-px w-6 bg-secondary/50" />
          </div>

          {/* Pull quote with drop cap feel */}
          <blockquote>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] text-white leading-[1.15] sm:leading-[1.1] italic tracking-tight drop-cap">
              {dict.home.postcardQuote}
            </p>
          </blockquote>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-dim to-transparent" />
    </section>
  );
}
