import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPlacesByCategory } from "@/data/loaders";
import { exploreCategories } from "@/lib/categories";
import type { ExploreCategory } from "@/lib/types";
import { CardGrid } from "@/components/shared/CardGrid";
import { PlaceCard } from "@/components/cards/PlaceCard";
import { PageHero } from "@/components/shared/PageHero";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

function isValidExploreCategory(cat: string): cat is ExploreCategory {
  return cat in exploreCategories;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale) || !isValidExploreCategory(category)) return {};
  const dict = await getDictionary(locale);
  const categoryName = dict.categories[category as ExploreCategory];
  return {
    title: `${categoryName} — ${dict.explore.title}`,
    description: `${categoryName} — ${dict.explore.description}`,
  };
}

export async function generateStaticParams() {
  const categories = Object.keys(exploreCategories);
  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

export default async function ExploreCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) notFound();
  if (!isValidExploreCategory(category)) notFound();
  const typedLocale = locale as Locale;

  const dict = await getDictionary(typedLocale);
  const places = getPlacesByCategory(category);
  const categoryName = dict.categories[category];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.explore.title, href: `/${typedLocale}/explore` },
    { label: categoryName },
  ];

  return (
    <>
      <PageHero
        title={categoryName}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-explore)"
        compact
      />
      <div className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {places.length > 0 ? (
            <CardGrid>
              {places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  section="explore"
                  locale={typedLocale}
                  dict={dict}
                />
              ))}
            </CardGrid>
          ) : (
            <p className="text-center text-text-secondary py-12">
              {dict.explore.noPlaces}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
