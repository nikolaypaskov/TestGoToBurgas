import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { planCategories } from "@/lib/categories";
import { getServicesByCategory } from "@/data/loaders";
import { CardGrid } from "@/components/shared/CardGrid";
import { PlaceCard } from "@/components/cards/PlaceCard";
import { PageHero } from "@/components/shared/PageHero";
import type { PlanCategory } from "@/lib/types";

type Props = { params: Promise<{ locale: string; category: string }> };

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of locales) {
    for (const category of Object.keys(planCategories)) {
      params.push({ locale, category });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return {};
  if (!(category in planCategories)) return {};
  const dict = await getDictionary(locale);
  const categoryLabel = dict.categories[category as keyof typeof dict.categories] ?? category;
  return {
    title: `${categoryLabel} — ${dict.plan.title}`,
    description: dict.plan.description,
  };
}

export default async function PlanCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return null;
  if (!(category in planCategories)) notFound();

  const dict = await getDictionary(locale as Locale);
  const services = getServicesByCategory(category as PlanCategory);
  const categoryLabel = dict.categories[category as keyof typeof dict.categories] ?? category;

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.plan.title, href: `/${locale}/plan` },
    { label: categoryLabel },
  ];

  return (
    <>
      <PageHero
        title={categoryLabel}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-plan)"
        compact
      />
      <div className="bg-surface-warm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-text-muted">{dict.plan.noServices}</p>
          ) : (
            <CardGrid>
              {services.map((service) => (
                <PlaceCard
                  key={service.id}
                  place={service}
                  locale={locale as Locale}
                  dict={dict}
                  section="plan"
                />
              ))}
            </CardGrid>
          )}
        </div>
      </div>
    </>
  );
}
