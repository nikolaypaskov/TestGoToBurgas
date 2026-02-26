import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllDeals, getFeaturedDeals } from "@/data/loaders";
import { localize, formatPrice, formatDate, discountPercent } from "@/lib/utils";
import { DealCard } from "@/components/cards/DealCard";
import { PageHero } from "@/components/shared/PageHero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.deals.title,
    description: dict.deals.description,
  };
}

export default async function DealsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const allDeals = getAllDeals();
  const featured = getFeaturedDeals(3);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.deals.title },
  ];

  const d = dict.deals as Record<string, string>;

  const whyReasons = [
    { num: "01", title: d.why1Title, desc: d.why1Desc, icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
    )},
    { num: "02", title: d.why2Title, desc: d.why2Desc, icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    )},
    { num: "03", title: d.why3Title, desc: d.why3Desc, icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    )},
  ];

  return (
    <>
      {/* ─── HERO ─── Photo-backed with beach scene */}
      <PageHero
        title={dict.deals.title}
        subtitle={dict.deals.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/deals/summer-beach.jpg"
      />

      {/* ─── FEATURED DEALS ─── Premium spotlight */}
      {featured.length > 0 && (
        <section className="bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-teal/[0.04] blur-[120px] -translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Section header */}
            <div className="mb-12 lg:mb-16">
              <div className="h-px w-16 bg-teal mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1]">
                {d.featuredTitle}
              </h2>
              <p className="mt-3 text-lg text-text-secondary max-w-2xl leading-relaxed">
                {d.featuredSubtitle}
              </p>
            </div>

            {/* Featured grid: large lead + side cards */}
            <div className="grid lg:grid-cols-12 gap-5 lg:gap-6">
              {/* Lead deal — large card */}
              {featured[0] && (() => {
                const title = localize(featured[0], "title", typedLocale);
                const desc = localize(featured[0], "description", typedLocale);
                const savings = discountPercent(featured[0].originalPrice, featured[0].discountPrice);

                return (
                  <Link
                    href={`/${typedLocale}/deals/${featured[0].slug}`}
                    className="group lg:col-span-7 relative h-[360px] sm:h-[420px] lg:h-full lg:min-h-[460px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                  >
                    <Image
                      src={featured[0].imageUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    {/* Teal accent bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-teal" />

                    {/* Discount badge */}
                    {savings > 0 && (
                      <div className="absolute top-5 right-5 flex items-center justify-center w-16 h-16 rounded-full bg-accent shadow-lg">
                        <span className="text-white font-bold text-lg">-{savings}%</span>
                      </div>
                    )}

                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2">
                        {title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/60 max-w-lg leading-relaxed line-clamp-2 mb-5">
                        {desc}
                      </p>

                      <div className="flex items-center gap-4">
                        <span className="text-white/50 line-through text-sm">
                          {formatPrice(featured[0].originalPrice, featured[0].currency, typedLocale)}
                        </span>
                        <span className="font-display text-2xl font-bold text-teal-light">
                          {formatPrice(featured[0].discountPrice, featured[0].currency, typedLocale)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })()}

              {/* Side stack */}
              <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-6">
                {featured.slice(1, 3).map((deal) => {
                  const title = localize(deal, "title", typedLocale);
                  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

                  return (
                    <Link
                      key={deal.id}
                      href={`/${typedLocale}/deals/${deal.slug}`}
                      className="group relative flex h-[160px] lg:h-auto lg:flex-1 rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow bg-surface"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-[140px] sm:w-[160px] lg:w-[200px] shrink-0 overflow-hidden">
                        <Image
                          src={deal.imageUrl}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                        {/* Teal accent */}
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-teal" />
                        {/* Discount badge */}
                        {savings > 0 && (
                          <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-10 h-10 rounded-full bg-accent">
                            <span className="text-white font-bold text-[11px]">-{savings}%</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center p-4 lg:p-5 min-w-0">
                        <h4 className="font-display text-base lg:text-lg font-bold text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {title}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-2.5">
                          <span className="text-xs text-text-muted line-through">
                            {formatPrice(deal.originalPrice, deal.currency, typedLocale)}
                          </span>
                          <span className="text-lg font-bold text-teal">
                            {formatPrice(deal.discountPrice, deal.currency, typedLocale)}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted mt-1.5">
                          {dict.deals.validUntil}: {formatDate(deal.validUntil, typedLocale)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY BOOK ─── Three value props with numbered layout */}
      <section className="bg-surface-dim relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {d.whyTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {whyReasons.map((reason) => (
              <div key={reason.num} className="text-center">
                {/* Icon circle */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/10 text-teal mb-5">
                  {reason.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm max-w-xs mx-auto">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALL DEALS ─── Full grid */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <div className="h-px w-16 bg-teal mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-[1.1]">
              {d.allDealsTitle}
            </h2>
            <p className="mt-3 text-lg text-text-secondary max-w-2xl leading-relaxed">
              {d.allDealsSubtitle}
            </p>
          </div>

          {allDeals.length === 0 ? (
            <p className="text-text-muted text-center py-12">{dict.deals.noDeals}</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} locale={typedLocale} dict={dict} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Photo-backed teasers */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Explore teaser */}
            <Link
              href={`/${typedLocale}/explore`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/central-beach.jpg"
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
                  {d.ctaExplore}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {d.ctaExploreDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Events teaser */}
            <Link
              href={`/${typedLocale}/events`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/events/opera-open.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                  {dict.nav.events}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {d.ctaEvents}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {d.ctaEventsDesc}
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
                  {d.ctaPlan}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {d.ctaPlanDesc}
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
