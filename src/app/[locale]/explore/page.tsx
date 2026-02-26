import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPlacesByCategory } from "@/data/loaders";
import { exploreCategories } from "@/lib/categories";
import type { ExploreCategory } from "@/lib/types";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { PageHero } from "@/components/shared/PageHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.explore.title,
    description: dict.explore.description,
  };
}

export default async function ExplorePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.explore.title },
  ];

  const categories = Object.entries(exploreCategories).map(([key, meta]) => ({
    key: key as ExploreCategory,
    meta,
    name: dict.categories[key as ExploreCategory],
    count: getPlacesByCategory(key as ExploreCategory).length,
  }));

  const explore = dict.explore as Record<string, string>;

  const highlights = [
    { num: "01", title: explore.highlight1Title, desc: explore.highlight1Desc },
    { num: "02", title: explore.highlight2Title, desc: explore.highlight2Desc },
    { num: "03", title: explore.highlight3Title, desc: explore.highlight3Desc },
  ];

  return (
    <>
      {/* ─── HERO ─── Cinematic photo backdrop */}
      <PageHero
        title={dict.explore.title}
        subtitle={dict.explore.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/places/central-beach.jpg"
      />

      {/* ─── CATEGORIES ─── Photography-first grid */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {categories.map(({ key, meta, name, count }) => (
              <CategoryCard
                key={key}
                slug={key}
                label={name}
                icon={meta.icon}
                color={meta.color}
                image={meta.image}
                count={count}
                href={`/${typedLocale}/explore/${key}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDITORIAL SPREAD ─── "Why Burgas" magazine layout */}
      <section className="bg-surface relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {/* Editorial section header */}
          <div className="mb-14 lg:mb-20">
            <div className="h-px w-16 bg-primary mb-6" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1]">
              {explore.whyTitle}
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-relaxed">
              {explore.whySubtitle}
            </p>
          </div>

          {/* Two-column: photo + numbered highlights */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Photo with decorative offset frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-[var(--shadow-card-hover)]">
                <Image
                  src="/images/places/lake-bridge.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Offset decorative border */}
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/15 -z-10" />
            </div>

            {/* Numbered highlights with connecting line */}
            <div className="lg:col-span-7 flex flex-col gap-10 lg:gap-14">
              {highlights.map((h, i) => (
                <div key={h.num} className="relative flex gap-5 lg:gap-7">
                  {/* Large decorative number */}
                  <div className="shrink-0 relative">
                    <span className="font-display text-5xl lg:text-6xl font-bold text-primary/[0.12] leading-none select-none">
                      {h.num}
                    </span>
                    {/* Connector line to next item */}
                    {i < highlights.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-10 lg:h-14 bg-gradient-to-b from-primary/15 to-transparent" />
                    )}
                  </div>
                  {/* Text content */}
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-text-primary mb-2.5">
                      {h.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSIDER TIP ─── Magazine pull-quote */}
      <section className="bg-surface-dim relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="relative">
            {/* Giant decorative quotation mark */}
            <span className="absolute -top-8 -left-2 lg:-top-12 lg:-left-4 font-display text-[140px] lg:text-[200px] leading-none text-primary/[0.07] select-none pointer-events-none" aria-hidden="true">
              &ldquo;
            </span>

            {/* Tip label */}
            <div className="relative flex items-center gap-3 mb-8">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                {explore.tipTitle}
              </span>
            </div>

            {/* The quote itself — display font for gravitas */}
            <blockquote className="relative font-display text-2xl md:text-3xl lg:text-[34px] text-text-primary leading-snug lg:leading-[1.4]">
              {explore.tipText}
            </blockquote>

            {/* Accent underline */}
            <div className="mt-10 h-1 w-16 rounded-full bg-secondary" />
          </div>
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Photo-backed "Continue your journey" teasers */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Events teaser */}
            <Link
              href={`/${typedLocale}/events`}
              className="group relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/events/spirit-of-burgas.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2">
                  {dict.nav.events}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1.5">
                  {explore.ctaEvents}
                </h3>
                <p className="text-sm text-white/60 max-w-xs mb-5 leading-relaxed">
                  {explore.ctaEventsDesc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1.5">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Plan teaser */}
            <Link
              href={`/${typedLocale}/plan`}
              className="group relative h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/alexandrovska.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-2">
                  {dict.nav.plan}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1.5">
                  {explore.ctaPlan}
                </h3>
                <p className="text-sm text-white/60 max-w-xs mb-5 leading-relaxed">
                  {explore.ctaPlanDesc}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1.5">
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
