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
import { ScrollReveal } from "@/components/shared/ScrollReveal";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            {event.imageUrl && (
              <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-surface-dim md:h-[420px]">
                <Image
                  src={event.imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Title and badge */}
            <div className="mt-6 mb-6">
              <Badge label={categoryName} color={categoryMeta.color} />
              <h1 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
                {title}
              </h1>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 rounded-xl bg-surface-dim p-6 h-fit">
            {/* When */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.events.when}</h3>
              <p className="mt-1 text-text-primary">
                {formatDateRange(event.date, event.endDate, typedLocale)}
                {event.time && `, ${event.time}`}
              </p>
            </div>

            {/* Where */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.events.where}</h3>
              <p className="mt-1 text-text-primary">{location}</p>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.events.price}</h3>
              <p className="mt-1 text-text-primary">
                {event.isFree
                  ? dict.events.free
                  : formatPrice(event.price, event.priceCurrency, typedLocale)}
              </p>
            </div>

            {/* Organizer */}
            {event.organizer && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted">{dict.events.moreInfo}</h3>
                <p className="mt-1 text-text-primary">{event.organizer}</p>
              </div>
            )}

            {/* Ticket CTA */}
            {event.ticketUrl && (
              <div className="pt-2">
                <Link
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-primary px-4 py-3 text-center font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  {dict.events.buyTickets}
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <ScrollReveal>
            <section className="mt-16 pt-8 border-t border-border">
              <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
                {dict.home.featuredEvents}
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
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
            </section>
          </ScrollReveal>
        )}
      </div>
    </article>
  );
}
