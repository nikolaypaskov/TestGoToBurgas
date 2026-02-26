import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllEvents, getEventBySlug, getRelatedEvents } from "@/data/loaders";
import { eventCategories } from "@/lib/categories";
import type { EventCategory } from "@/lib/types";
import { localize, formatDateRange, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";
import { EventCard } from "@/components/cards/EventCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

function isValidEventCategory(cat: string): cat is EventCategory {
  return cat in eventCategories;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const event = getEventBySlug(slug);
  if (!event) return {};
  const title = localize(event, "title", locale);
  const description = localize(event, "description", locale);
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      images: event.imageUrl ? [{ url: event.imageUrl }] : [],
    },
  };
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return locales.flatMap((locale) =>
    events.map((event) => ({
      locale,
      category: event.category,
      slug: event.slug,
    }))
  );
}

export default async function EventDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  if (!isValidEventCategory(category)) notFound();
  const typedLocale = locale as Locale;

  const event = getEventBySlug(slug);
  if (!event) notFound();
  if (event.category !== category) notFound();

  const dict = await getDictionary(typedLocale);
  const relatedEvents = getRelatedEvents(event);

  const title = localize(event, "title", typedLocale);
  const description = localize(event, "description", typedLocale);
  const location = localize(event, "location", typedLocale);
  const categoryName = dict.categories[event.category];
  const categoryMeta = eventCategories[event.category];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.events.title, href: `/${typedLocale}/events` },
    { label: categoryName, href: `/${typedLocale}/events/${event.category}` },
    { label: title },
  ];

  return (
    <article>
      {/* ─── HERO IMAGE ─── Full-width cinematic banner */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden bg-surface-dim">
        {event.imageUrl && (
          <>
            <Image
              src={event.imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </>
        )}

        {/* Breadcrumbs on image */}
        <div className="absolute top-0 inset-x-0 z-10 pt-24 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 z-10 pb-8 pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Badge label={categoryName} color={categoryMeta.color} />
            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* ─── CONTENT + SIDEBAR ─── */}
      <div className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 rounded-2xl bg-surface-dim border border-border/50 p-6 lg:p-7 h-fit lg:sticky lg:top-24">
              {/* When */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {dict.events.when}
                </h3>
                <p className="mt-1.5 text-text-primary font-medium">
                  {formatDateRange(event.date, event.endDate, typedLocale)}
                  {event.time && <span className="text-text-secondary"> &middot; {event.time}</span>}
                </p>
              </div>

              <div className="h-px bg-border/50" />

              {/* Where */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {dict.events.where}
                </h3>
                <p className="mt-1.5 text-text-primary font-medium">{location}</p>
              </div>

              <div className="h-px bg-border/50" />

              {/* Price */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  {dict.events.price}
                </h3>
                <p className="mt-1.5 text-text-primary font-medium">
                  {event.isFree ? (
                    <span className="inline-flex items-center gap-1.5 text-teal font-bold">
                      {dict.events.free}
                    </span>
                  ) : (
                    formatPrice(event.price, event.priceCurrency, typedLocale)
                  )}
                </p>
              </div>

              {/* Organizer */}
              {event.organizer && (
                <>
                  <div className="h-px bg-border/50" />
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      {dict.events.moreInfo}
                    </h3>
                    <p className="mt-1.5 text-text-primary font-medium">{event.organizer}</p>
                  </div>
                </>
              )}

              {/* Ticket CTA */}
              {event.ticketUrl && (
                <div className="pt-3">
                  <Link
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-3.5 font-bold text-white hover:bg-primary-dark transition-colors shadow-md"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9a3 3 0 013-3h14a3 3 0 013 3" /><path d="M2 9v6a3 3 0 003 3h14a3 3 0 003-3V9" /><path d="M12 6v12" /><path d="M2 12h4" /><path d="M18 12h4" />
                    </svg>
                    {dict.events.buyTickets}
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* ─── RELATED EVENTS ─── Horizontal scroll strip */}
      {relatedEvents.length > 0 && (
        <section className="bg-surface-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                {dict.home.featuredEvents}
              </h2>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {relatedEvents.map((related) => (
                <div key={related.id} className="min-w-[300px] max-w-[340px] flex-shrink-0">
                  <EventCard
                    event={related}
                    locale={typedLocale}
                    dict={dict}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
