import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllEvents } from "@/data/loaders";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CardGrid } from "@/components/shared/CardGrid";
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
  const events = getAllEvents();

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.events.title },
  ];

  return (
    <>
      <PageHero
        title={dict.events.title}
        subtitle={dict.events.description}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-events)"
      />
      <div className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CardGrid>
            {events.map((event) => (
              <EventCard key={event.id} event={event} locale={typedLocale} dict={dict} />
            ))}
          </CardGrid>
        </div>
      </div>
    </>
  );
}
