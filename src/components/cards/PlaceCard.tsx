import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebPlace } from "@/lib/types";
import { exploreCategories, planCategories } from "@/lib/categories";
import { localize } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";

interface PlaceCardProps {
  place: WebPlace;
  locale: Locale;
  dict: Dictionary;
  section: "explore" | "plan";
}

export function PlaceCard({ place, locale, dict, section }: PlaceCardProps) {
  const title = localize(place, "title", locale);
  const address = localize(place, "address", locale);
  const categorySlug = place.category;
  const categoryMeta =
    section === "explore"
      ? exploreCategories[categorySlug as keyof typeof exploreCategories]
      : planCategories[categorySlug as keyof typeof planCategories];
  const categoryLabel = dict.categories[categorySlug as keyof typeof dict.categories] ?? categorySlug;

  return (
    <Link
      href={`/${locale}/${section}/${categorySlug}/${place.slug}`}
      className="group block overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-card)] transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-card-hover)] hover:scale-[1.02]"
    >
      <div className="relative h-[200px] w-full overflow-hidden bg-surface-dim">
        {place.imageUrl ? (
          <Image
            src={place.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-[var(--transition-normal)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            {categoryMeta?.icon}
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge label={categoryLabel} color={categoryMeta?.color} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">
          {title}
        </h3>
        {place.rating !== undefined && place.rating > 0 && (
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < Math.round(place.rating!) ? "text-secondary" : "text-border"}
              >
                &#9733;
              </span>
            ))}
            <span className="ml-1 text-sm text-text-muted">
              {place.rating.toFixed(1)}
            </span>
          </div>
        )}
        {address && (
          <p className="mt-2 text-sm text-text-muted line-clamp-1">{address}</p>
        )}
      </div>
    </Link>
  );
}
