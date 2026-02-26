import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllDeals, getDealBySlug } from "@/data/loaders";
import { localize, formatDate, formatPrice, discountPercent } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DealCard } from "@/components/cards/DealCard";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const deals = getAllDeals();
  return locales.flatMap((locale) =>
    deals.map((deal) => ({ locale, slug: deal.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const deal = getDealBySlug(slug);
  if (!deal) return {};
  const title = localize(deal, "title", locale);
  const description = localize(deal, "description", locale);
  return {
    title,
    description: description.slice(0, 160),
  };
}

export default async function DealDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return null;

  const deal = getDealBySlug(slug);
  if (!deal) notFound();

  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);
  const title = localize(deal, "title", typedLocale);
  const description = localize(deal, "description", typedLocale);
  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.deals.title, href: `/${typedLocale}/deals` },
    { label: title },
  ];

  // Get other deals for "More deals" section
  const otherDeals = getAllDeals().filter(d => d.id !== deal.id).slice(0, 3);

  return (
    <article>
      {/* ─── HERO IMAGE ─── Full-width cinematic banner */}
      <div className="relative h-[300px] sm:h-[380px] md:h-[440px] overflow-hidden bg-surface-dim">
        {deal.imageUrl ? (
          <>
            <Image
              src={deal.imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal/20 to-teal/5">
            <span className="font-display text-[120px] text-teal/20 font-bold">%</span>
          </div>
        )}

        {/* Breadcrumbs */}
        <div className="absolute top-0 inset-x-0 z-10 pt-24 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>
        </div>

        {/* Discount badge */}
        {savings > 0 && (
          <div className="absolute top-24 right-4 sm:right-8 lg:right-12 z-10 flex items-center justify-center w-20 h-20 rounded-full bg-accent shadow-xl">
            <span className="text-white font-bold text-xl">-{savings}%</span>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 inset-x-0 z-10 pb-8 pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
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
                <p className="text-text-secondary text-lg leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 rounded-2xl bg-surface-dim border border-border/50 p-6 lg:p-7 h-fit lg:sticky lg:top-24">
              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">{dict.deals.originalPrice}</span>
                  <span className="text-text-muted line-through">
                    {formatPrice(deal.originalPrice, deal.currency, typedLocale)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-text-primary">{dict.deals.discountPrice}</span>
                  <span className="font-display text-2xl font-bold text-teal">
                    {formatPrice(deal.discountPrice, deal.currency, typedLocale)}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <span className="text-sm font-bold text-accent">{dict.deals.savings}</span>
                    <span className="font-bold text-accent">
                      {formatPrice(deal.originalPrice - deal.discountPrice, deal.currency, typedLocale)}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-border/50" />

              {/* Valid until */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  {dict.deals.validUntil}
                </h3>
                <p className="mt-1.5 text-text-primary font-medium">
                  {formatDate(deal.validUntil, typedLocale)}
                </p>
              </div>

              <div className="h-px bg-border/50" />

              {/* Provider */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Provider
                </h3>
                <p className="mt-1.5 text-text-primary font-medium">{deal.provider}</p>
              </div>

              {/* CTA */}
              {deal.providerUrl && (
                <div className="pt-3">
                  <Link
                    href={deal.providerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-teal px-5 py-3.5 font-bold text-white hover:bg-teal/90 transition-colors shadow-md"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {dict.deals.getOffer}
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* ─── MORE DEALS ─── */}
      {otherDeals.length > 0 && (
        <section className="bg-surface-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                {dict.deals.allDeals}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherDeals.map((d) => (
                <DealCard key={d.id} deal={d} locale={typedLocale} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
