"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebPlace } from "@/lib/types";
import { localize } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface MustSeePlacesProps {
  places: WebPlace[];
  locale: Locale;
  dict: Dictionary;
}

export function MustSeePlaces({ places, locale, dict }: MustSeePlacesProps) {
  if (places.length === 0) return null;

  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            title={dict.home.mustSeePlaces}
            subtitle={dict.home.mustSeePlacesDesc}
            viewAllHref={`/${locale}/explore`}
            viewAllLabel={dict.home.viewAll}
          />
        </div>
      </div>

      {/* Scroll controls + cards */}
      <div className="relative group/scroll">
        {/* Navigation arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-surface/90 backdrop-blur-sm border border-border shadow-[var(--shadow-card)] opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer hover:bg-surface"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-surface/90 backdrop-blur-sm border border-border shadow-[var(--shadow-card)] opacity-0 group-hover/scroll:opacity-100 transition-opacity cursor-pointer hover:bg-surface"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Horizontal scroll cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
        >
          {places.map((place, i) => {
            const title = localize(place, "title", locale);
            const address = localize(place, "address", locale);

            return (
              <Link
                key={place.id}
                href={`/${locale}/explore/${place.category}/${place.slug}`}
                className="group relative shrink-0 w-[260px] sm:w-[290px] aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] snap-start shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 cursor-pointer"
              >
                {place.imageUrl ? (
                  <Image
                    src={place.imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="290px"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-teal/20" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Number badge */}
                <div className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-full bg-white/12 backdrop-blur-md border border-white/20">
                  <span className="text-xs font-bold text-white">{i + 1}</span>
                </div>

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-display font-bold text-white leading-snug">
                    {title}
                  </h3>
                  {address && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/55 truncate">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="truncate">{address}</span>
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
