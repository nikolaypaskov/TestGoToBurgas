import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getEventsByCategory } from "@/data/loaders";
import { eventCategories } from "@/lib/categories";
import type { EventCategory } from "@/lib/types";
import { CardGrid } from "@/components/shared/CardGrid";
import { EventCard } from "@/components/cards/EventCard";
import { PageHero } from "@/components/shared/PageHero";

type Props = {
  params: Promise<{ locale: string; category: string }>;
};

function isValidEventCategory(cat: string): cat is EventCategory {
  return cat in eventCategories;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale) || !isValidEventCategory(category)) return {};
  const dict = await getDictionary(locale);
  const categoryName = dict.categories[category as EventCategory];
  return {
    title: `${categoryName} — ${dict.events.title}`,
    description: `${categoryName} — ${dict.events.description}`,
  };
}

export async function generateStaticParams() {
  const categories = Object.keys(eventCategories);
  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

export default async function EventsCategoryPage({ params }: Props) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) notFound();
  if (!isValidEventCategory(category)) notFound();
  const typedLocale = locale as Locale;

  const dict = await getDictionary(typedLocale);
  const events = getEventsByCategory(category);
  const categoryName = dict.categories[category];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.events.title, href: `/${typedLocale}/events` },
    { label: categoryName },
  ];

  return (
    <>
      <PageHero
        title={categoryName}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-events)"
        compact
      />
      <div className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {events.length > 0 ? (
            <CardGrid>
              {events.map((event) => (
                <EventCard key={event.id} event={event} locale={typedLocale} dict={dict} />
              ))}
            </CardGrid>
          ) : (
            <p className="text-center text-text-secondary py-12">
              {dict.events.noEvents}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
