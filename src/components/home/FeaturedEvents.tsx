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
  const sideEvents = restEvents.slice(0, 3);

  return (
    <div>
      <SectionHeader
        title={dict.home.featuredEvents}
        subtitle={dict.home.featuredEventsDesc}
        viewAllHref={`/${locale}/events`}
        viewAllLabel={dict.home.viewAll}
        variant="accent-underline"
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {/* Hero event card — large, cinematic, 7/12 width */}
        <div className="lg:col-span-7">
          <HeroEventCard event={heroEvent} locale={locale} dict={dict} />
        </div>

        {/* Side event stack — 5/12 width, 3 horizontal cards */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {sideEvents.map((event) => (
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
      className="group relative block overflow-hidden rounded-[var(--radius-card)] h-full min-h-[400px] lg:min-h-[480px] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="absolute inset-0">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-dim to-surface text-6xl">
            {category.icon}
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Category badge — top left */}
      <div className="absolute left-5 top-5">
        <Badge label={categoryLabel} color={category.color} />
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <p className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formatDate(event.date, locale)}
        </p>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white leading-tight">
          {title}
        </h3>
        {location && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
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
      <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden bg-surface-dim">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="180px"
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
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
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
