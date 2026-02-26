import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { planCategories } from "@/lib/categories";
import { getServicesByCategory } from "@/data/loaders";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { PageHero } from "@/components/shared/PageHero";
import type { PlanCategory } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.plan.title,
    description: dict.plan.description,
  };
}

export default async function PlanPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);

  const categories = Object.entries(planCategories) as [PlanCategory, (typeof planCategories)[PlanCategory]][];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.plan.title },
  ];

  const plan = dict.plan as Record<string, string>;

  const tips = [
    { num: "01", title: plan.tip1Title, desc: plan.tip1Desc },
    { num: "02", title: plan.tip2Title, desc: plan.tip2Desc },
    { num: "03", title: plan.tip3Title, desc: plan.tip3Desc },
  ];

  return (
    <>
      {/* ─── HERO ─── Photo-backed with warm amber tone */}
      <PageHero
        title={dict.plan.title}
        subtitle={dict.plan.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/places/alexandrovska.jpg"
      />

      {/* ─── CATEGORIES ─── */}
      <section className="bg-surface-warm">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 lg:gap-5">
            {categories.map(([key, meta]) => {
              const count = getServicesByCategory(key).length;
              return (
                <CategoryCard
                  key={key}
                  slug={key}
                  icon={meta.icon}
                  color={meta.color}
                  image={meta.image}
                  label={dict.categories[key as keyof typeof dict.categories]}
                  href={`/${locale}/plan/${key}`}
                  count={count}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TRAVEL TIPS ─── Editorial numbered layout with photo */}
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/[0.03] blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          {/* Section header */}
          <div className="mb-14 lg:mb-20">
            <div className="h-px w-16 bg-secondary mb-6" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold text-text-primary leading-[1.1]">
              {plan.tipsTitle}
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl leading-relaxed">
              {plan.tipsSubtitle}
            </p>
          </div>

          {/* Reversed layout: text left, photo right */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Numbered tips */}
            <div className="lg:col-span-7 flex flex-col gap-10 lg:gap-14 order-2 lg:order-1">
              {tips.map((tip, i) => (
                <div key={tip.num} className="relative flex gap-5 lg:gap-7">
                  <div className="shrink-0 relative">
                    <span className="font-display text-5xl lg:text-6xl font-bold text-secondary/[0.15] leading-none select-none">
                      {tip.num}
                    </span>
                    {i < tips.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-10 lg:h-14 bg-gradient-to-b from-secondary/15 to-transparent" />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl lg:text-2xl font-bold text-text-primary mb-2.5">
                      {tip.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo with decorative frame */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-[var(--shadow-card-hover)]">
                <Image
                  src="/images/places/restaurant-ethno.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-secondary/15 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Photo-backed teasers */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Explore teaser */}
            <Link
              href={`/${locale}/explore`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer"
            >
              <Image
                src="/images/places/sea-garden.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary-light mb-1.5">
                  {dict.nav.explore}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {plan.ctaExplore}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {plan.ctaExploreDesc}
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
              href={`/${locale}/events`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer"
            >
              <Image
                src="/images/events/opera-open.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                  {dict.nav.events}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {plan.ctaEvents}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {plan.ctaEventsDesc}
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
              href={`/${locale}/deals`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer"
            >
              <Image
                src="/images/places/sea-casino.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-teal" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-teal-light mb-1.5">
                  {dict.nav.deals}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {plan.ctaDeals}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {plan.ctaDealsDesc}
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
