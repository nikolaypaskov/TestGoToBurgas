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
      className="group block overflow-hidden rounded-[var(--radius-card)] bg-surface border border-border-light/60 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 cursor-pointer"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
        {place.imageUrl ? (
          <Image
            src={place.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-dim to-surface">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted/30">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge label={categoryLabel} color={categoryMeta?.color} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-[17px] font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors duration-200">
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
