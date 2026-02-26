import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllDeals } from "@/data/loaders";
import { CardGrid } from "@/components/shared/CardGrid";
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
  const dict = await getDictionary(locale as Locale);
  const deals = getAllDeals();

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.deals.title },
  ];

  return (
    <>
      <PageHero
        title={dict.deals.title}
        subtitle={dict.deals.description}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-deals)"
      />
      <div className="bg-surface-warm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {deals.length === 0 ? (
            <p className="text-text-muted">{dict.deals.noDeals}</p>
          ) : (
            <CardGrid>
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} locale={locale as Locale} dict={dict} />
              ))}
            </CardGrid>
          )}
        </div>
      </div>
    </>
  );
}
