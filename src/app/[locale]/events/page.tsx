import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllEvents, getFeaturedEvents } from "@/data/loaders";
import { eventCategories } from "@/lib/categories";
import type { EventCategory } from "@/lib/types";
import { localize, formatDate, formatDateRange } from "@/lib/utils";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { EventCard } from "@/components/cards/EventCard";
import { PageHero } from "@/components/shared/PageHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.events.title,
    description: dict.events.description,
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  const dict = await getDictionary(typedLocale);
  const allEvents = getAllEvents();
  const featured = getFeaturedEvents(4);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.events.title },
  ];

  const categories = Object.entries(eventCategories) as [EventCategory, (typeof eventCategories)[EventCategory]][];

  const ev = dict.events as Record<string, string>;

  return (
    <>
      {/* ─── HERO ─── Photo-backed with Spirit of Burgas */}
      <PageHero
        title={dict.events.title}
        subtitle={dict.events.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/events/spirit-of-burgas.jpg"
      />

      {/* ─── FEATURED EVENTS ─── Editorial spotlight */}
      {featured.length > 0 && (
        <section className="bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Section header */}
            <div className="mb-12 lg:mb-16">
              <div className="h-px w-16 bg-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1]">
                {ev.featuredTitle}
              </h2>
              <p className="mt-3 text-lg text-text-secondary max-w-2xl leading-relaxed">
                {ev.featuredSubtitle}
              </p>
            </div>

            {/* Featured grid: 1 large + 3 stacked */}
            <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
              {/* Lead event — large card */}
              {featured[0] && (
                <Link
                  href={`/${typedLocale}/events/${featured[0].category}/${featured[0].slug}`}
                  className="group lg:col-span-7 relative h-[360px] sm:h-[420px] lg:h-full lg:min-h-[480px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                >
                  <Image
                    src={featured[0].imageUrl}
                    alt={localize(featured[0], "title", typedLocale)}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  {/* Accent bar */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-accent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                    {/* Date pill */}
                    <span className="inline-flex self-start items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-3.5 py-1.5 text-[12px] font-semibold text-white/90 mb-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {formatDateRange(featured[0].date, featured[0].endDate, typedLocale)}
                    </span>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                      {localize(featured[0], "title", typedLocale)}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60 max-w-lg leading-relaxed line-clamp-2 mb-4">
                      {localize(featured[0], "description", typedLocale)}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-white/70">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {localize(featured[0], "location", typedLocale)}
                      </span>
                      {featured[0].isFree ? (
                        <span className="rounded-full bg-teal/90 px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wide">
                          {dict.events.free}
                        </span>
                      ) : featured[0].price ? (
                        <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-[12px] font-semibold text-white">
                          {new Intl.NumberFormat(typedLocale === "bg" ? "bg-BG" : typedLocale === "ru" ? "ru-RU" : "en-US", { style: "currency", currency: featured[0].priceCurrency || "BGN", minimumFractionDigits: 0 }).format(featured[0].price)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              )}

              {/* Side stack — 3 smaller cards */}
              <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
                {featured.slice(1, 4).map((event) => {
                  const title = localize(event, "title", typedLocale);
                  const location = localize(event, "location", typedLocale);
                  const catMeta = eventCategories[event.category];

                  return (
                    <Link
                      key={event.id}
                      href={`/${typedLocale}/events/${event.category}/${event.slug}`}
                      className="group relative flex h-[140px] lg:h-auto lg:flex-1 rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow bg-surface"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-[140px] sm:w-[160px] lg:w-[180px] shrink-0 overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                          sizes="180px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                        {/* Color accent */}
                        <div className="absolute top-0 left-0 bottom-0 w-1" style={{ backgroundColor: catMeta.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center p-4 lg:p-5 min-w-0">
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase mb-1.5" style={{ color: catMeta.color }}>
                          {dict.categories[event.category]}
                        </span>
                        <h4 className="font-display text-base lg:text-lg font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-text-muted">
                            {formatDate(event.date, typedLocale)}
                          </span>
                          {event.isFree && (
                            <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-bold text-teal uppercase tracking-wide">
                              {dict.events.free}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORIES ─── Photo-backed browse grid */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
              {ev.browseCategoriesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
            {categories.map(([key, meta]) => {
              const count = allEvents.filter(e => e.category === key).length;
              return (
                <CategoryCard
                  key={key}
                  slug={key}
                  icon={meta.icon}
                  color={meta.color}
                  image={meta.image}
                  label={dict.categories[key as keyof typeof dict.categories]}
                  href={`/${typedLocale}/events/${key}`}
                  count={count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ALL EVENTS ─── Full calendar grid */}
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <div className="h-px w-16 bg-primary mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1]">
              {ev.allEventsTitle}
            </h2>
            <p className="mt-3 text-lg text-text-secondary max-w-2xl leading-relaxed">
              {ev.allEventsSubtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allEvents.map((event) => (
              <EventCard key={event.id} event={event} locale={typedLocale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Photo-backed teasers */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Explore teaser */}
            <Link
              href={`/${typedLocale}/explore`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/sea-garden.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary-light mb-1.5">
                  {dict.nav.explore}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {ev.ctaExplore}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {ev.ctaExploreDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Plan teaser */}
            <Link
              href={`/${typedLocale}/plan`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/alexandrovska.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-1.5">
                  {dict.nav.plan}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {ev.ctaPlan}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {ev.ctaPlanDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Deals teaser */}
            <Link
              href={`/${typedLocale}/deals`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/sea-casino.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-teal" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-teal-light mb-1.5">
                  {dict.nav.deals}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {ev.ctaDeals}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {ev.ctaDealsDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
