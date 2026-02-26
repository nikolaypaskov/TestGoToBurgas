import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebEvent } from "@/lib/types";
import { eventCategories } from "@/lib/categories";
import { localize, formatDate } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";

interface EventCardProps {
  event: WebEvent;
  locale: Locale;
  dict: Dictionary;
}

export function EventCard({ event, locale, dict }: EventCardProps) {
  const title = localize(event, "title", locale);
  const location = localize(event, "location", locale);
  const category = eventCategories[event.category];
  const categoryLabel = dict.categories[event.category] ?? event.category;

  return (
    <Link
      href={`/${locale}/events/${event.category}/${event.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] bg-surface border border-border-light/60 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-dim to-surface text-5xl">
            {category.icon}
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <Badge label={categoryLabel} color={category.color} />
        </div>
        {/* Date at bottom */}
        <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
          <span className="text-[13px] font-medium text-white/90">
            {formatDate(event.date, locale)}
          </span>
          {event.isFree ? (
            <span className="rounded-full bg-teal/90 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wide">
              {dict.events.free}
            </span>
          ) : event.price ? (
            <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-text-primary">
              {new Intl.NumberFormat(locale === "bg" ? "bg-BG" : locale === "ru" ? "ru-RU" : "en-US", {
                style: "currency",
                currency: event.priceCurrency || "BGN",
                minimumFractionDigits: 0,
              }).format(event.price)}
            </span>
          ) : null}
        </div>
      </div>

      {/* Text content */}
      <div className="p-5">
        <h3 className="line-clamp-2 text-[17px] font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        {location && (
          <p className="mt-2.5 flex items-center gap-1.5 text-[13px] text-text-muted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{location}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
