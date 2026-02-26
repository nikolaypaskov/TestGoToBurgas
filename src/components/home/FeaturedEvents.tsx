import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebEvent } from "@/lib/types";
import { eventCategories } from "@/lib/categories";
import { localize, formatDate } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/shared/Badge";

interface FeaturedEventsProps {
  events: WebEvent[];
  locale: Locale;
  dict: Dictionary;
}

export function FeaturedEvents({ events, locale, dict }: FeaturedEventsProps) {
  if (events.length === 0) return null;

  const [heroEvent, ...restEvents] = events;
  const compactEvents = restEvents.slice(0, 2);

  return (
    <div>
      <SectionHeader
        title={dict.home.featuredEvents}
        subtitle={dict.home.featuredEventsDesc}
        viewAllHref={`/${locale}/events`}
        viewAllLabel={dict.home.viewAll}
        variant="accent-underline"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hero event card — large, full-image background */}
        <HeroEventCard event={heroEvent} locale={locale} dict={dict} />

        {/* Compact event cards */}
        <div className="flex flex-col gap-6">
          {compactEvents.map((event) => (
            <CompactEventCard key={event.id} event={event} locale={locale} dict={dict} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroEventCard({ event, locale, dict }: { event: WebEvent; locale: Locale; dict: Dictionary }) {
  const title = localize(event, "title", locale);
  const location = localize(event, "location", locale);
  const category = eventCategories[event.category];
  const categoryLabel = dict.categories[event.category] ?? event.category;

  return (
    <Link
      href={`/${locale}/events/${event.category}/${event.slug}`}
      className="group relative block overflow-hidden rounded-[var(--radius-card)] min-h-[360px] lg:row-span-2 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="absolute inset-0">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-dim to-surface text-6xl">
            {category.icon}
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Category badge */}
      <div className="absolute left-5 top-5">
        <Badge label={categoryLabel} color={category.color} />
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-sm font-medium text-white/80 mb-2">
          {formatDate(event.date, locale)}
        </p>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
          {title}
        </h3>
        {location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
        )}
        {event.isFree && (
          <span className="mt-3 inline-block rounded-full bg-teal/90 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wide">
            {dict.events.free}
          </span>
        )}
      </div>
    </Link>
  );
}

function CompactEventCard({ event, locale, dict }: { event: WebEvent; locale: Locale; dict: Dictionary }) {
  const title = localize(event, "title", locale);
  const location = localize(event, "location", locale);
  const category = eventCategories[event.category];
  const categoryLabel = dict.categories[event.category] ?? event.category;

  return (
    <Link
      href={`/${locale}/events/${event.category}/${event.slug}`}
      className="group flex overflow-hidden rounded-[var(--radius-card)] bg-surface border border-border-light/60 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5"
    >
      {/* Image — left side */}
      <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden bg-surface-dim">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="200px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            {category.icon}
          </div>
        )}
      </div>

      {/* Text — right side */}
      <div className="flex flex-col justify-center p-4 sm:p-5 min-w-0">
        <div className="mb-2">
          <Badge label={categoryLabel} color={category.color} />
        </div>
        <h3 className="line-clamp-2 text-[15px] font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-xs text-text-muted">
          {formatDate(event.date, locale)}
        </p>
        {location && (
          <p className="mt-1 flex items-center gap-1 text-xs text-text-muted truncate">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
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
