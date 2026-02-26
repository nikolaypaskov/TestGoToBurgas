import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllDeals, getDealBySlug } from "@/data/loaders";
import { localize, formatDate, formatPrice, discountPercent } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PriceDisplay } from "@/components/shared/PriceDisplay";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const deals = getAllDeals();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const deal of deals) {
      params.push({ locale, slug: deal.slug });
    }
  }
  return params;
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

  const dict = await getDictionary(locale as Locale);
  const title = localize(deal, "title", locale);
  const description = localize(deal, "description", locale);
  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.deals.title, href: `/${locale}/deals` },
          { label: title },
        ]}
      />

      <ScrollReveal>
        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-surface-dim md:h-[420px]">
              {deal.imageUrl ? (
                <Image
                  src={deal.imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl text-accent">
                  %
                </div>
              )}
              {savings > 0 && (
                <div className="absolute right-4 top-4 rounded-full bg-accent px-4 py-2 text-lg font-bold text-white">
                  -{savings}%
                </div>
              )}
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold text-text-primary md:text-4xl">
              {title}
            </h1>

            <div className="prose prose-lg mt-6 max-w-none text-text-secondary">
              <p>{description}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 rounded-xl bg-surface-dim p-6 h-fit">
            {/* Pricing */}
            <div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">{dict.deals.originalPrice}</span>
                  <span className="text-text-muted line-through">
                    {formatPrice(deal.originalPrice, deal.currency, locale as Locale)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-primary">{dict.deals.discountPrice}</span>
                  <PriceDisplay
                    price={deal.discountPrice}
                    originalPrice={deal.originalPrice}
                    currency={deal.currency}
                    locale={locale as Locale}
                  />
                </div>
                {savings > 0 && (
                  <div className="flex items-center justify-between border-t border-border pt-2">
                    <span className="text-sm font-semibold text-accent">{dict.deals.savings}</span>
                    <span className="font-bold text-accent">
                      {formatPrice(deal.originalPrice - deal.discountPrice, deal.currency, locale as Locale)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Valid until */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.deals.validUntil}</h3>
              <p className="mt-1 text-text-primary">{formatDate(deal.validUntil, locale as Locale)}</p>
            </div>

            {/* Provider */}
            <div>
              <h3 className="text-sm font-semibold text-text-muted">Provider</h3>
              <p className="mt-1 text-text-primary">{deal.provider}</p>
            </div>

            {/* CTA */}
            {deal.providerUrl && (
              <Link
                href={deal.providerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg bg-accent px-4 py-3 text-center font-semibold text-white hover:bg-accent/90 transition-colors"
              >
                {dict.deals.getOffer}
              </Link>
            )}
          </aside>
        </div>
      </ScrollReveal>
    </div>
  );
}
