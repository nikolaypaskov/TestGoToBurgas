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

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={dict.home.mustSeePlaces}
          subtitle={dict.home.mustSeePlacesDesc}
          viewAllHref={`/${locale}/explore`}
          viewAllLabel={dict.home.viewAll}
        />
      </div>

      {/* Horizontal scroll of tall portrait cards */}
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4">
        {places.map((place) => {
          const title = localize(place, "title", locale);
          const address = localize(place, "address", locale);

          return (
            <Link
              key={place.id}
              href={`/${locale}/explore/${place.category}/${place.slug}`}
              className="group relative shrink-0 w-[240px] sm:w-[280px] aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] snap-start shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
            >
              {place.imageUrl ? (
                <Image
                  src={place.imageUrl}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="280px"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary/20 to-teal/20" />
              )}

              {/* Bottom gradient + text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-display font-bold text-white leading-snug">
                  {title}
                </h3>
                {address && (
                  <p className="mt-1 text-xs text-white/60 truncate">
                    {address}
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
