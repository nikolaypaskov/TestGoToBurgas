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

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader
            title={dict.home.mustSeePlaces}
            subtitle={dict.home.mustSeePlacesDesc}
            viewAllHref={`/${locale}/explore`}
            viewAllLabel={dict.home.viewAll}
            variant="editorial"
          />
        </div>
      </div>

      {/* Horizontal scroll cards — natural scroll, no arrows */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
      >
        {places.map((place, i) => {
          const title = localize(place, "title", locale);
          const address = localize(place, "address", locale);

          return (
            <Link
              key={place.id}
              href={`/${locale}/explore/${place.category}/${place.slug}`}
              className="group relative shrink-0 w-[220px] sm:w-[260px] md:w-[290px] aspect-[3/4] overflow-hidden rounded-xl snap-start cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Large decorative number */}
              <div className="absolute top-3 left-4">
                <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white/15 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
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
  );
}
