import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllPlaces, getPlaceBySlug, getRelatedPlaces } from "@/data/loaders";
import { exploreCategories } from "@/lib/categories";
import type { ExploreCategory } from "@/lib/types";
import { localize } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";
import { PlaceCard } from "@/components/cards/PlaceCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

function isValidExploreCategory(cat: string): cat is ExploreCategory {
  return cat in exploreCategories;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const place = getPlaceBySlug(slug);
  if (!place) return {};
  const title = localize(place, "title", locale);
  const description = localize(place, "description", locale);
  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      images: place.imageUrl ? [{ url: place.imageUrl }] : [],
    },
  };
}

export async function generateStaticParams() {
  const places = getAllPlaces();
  return locales.flatMap((locale) =>
    places.map((place) => ({
      locale,
      category: place.category,
      slug: place.slug,
    }))
  );
}

export default async function PlaceDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  if (!isValidExploreCategory(category)) notFound();
  const typedLocale = locale as Locale;

  const place = getPlaceBySlug(slug);
  if (!place) notFound();
  if (place.category !== category) notFound();

  const dict = await getDictionary(typedLocale);
  const relatedPlaces = getRelatedPlaces(place);

  const title = localize(place, "title", typedLocale);
  const description = localize(place, "description", typedLocale);
  const address = localize(place, "address", typedLocale);
  const workingHours = localize(place, "workingHours", typedLocale);
  const categoryName = dict.categories[place.category];
  const categoryMeta = exploreCategories[place.category];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.explore.title, href: `/${typedLocale}/explore` },
    { label: categoryName, href: `/${typedLocale}/explore/${place.category}` },
    { label: title },
  ];

  const googleMapsUrl =
    place.latitude && place.longitude
      ? `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
      : null;

  return (
    <article>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-6 grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero image */}
            {place.imageUrl && (
              <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-surface-dim md:h-[420px]">
                <Image
                  src={place.imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Title and badge */}
            <div className="mt-6 mb-6">
              <Badge label={categoryName} color={categoryMeta.color} />
              <h1 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
                {title}
              </h1>
              {place.rating && (
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.round(place.rating!) ? "text-secondary text-xl" : "text-border text-xl"}
                    >
                      &#9733;
                    </span>
                  ))}
                  <span className="ml-2 text-text-muted">
                    {place.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 rounded-xl bg-surface-dim p-6 h-fit">
            {address && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted">{dict.explore.address}</h3>
                <p className="mt-1 text-text-primary">{address}</p>
              </div>
            )}
            {workingHours && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted">{dict.explore.hours}</h3>
                <p className="mt-1 text-text-primary">{workingHours}</p>
              </div>
            )}
            {place.phone && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted">{dict.explore.phone}</h3>
                <p className="mt-1">
                  <a href={`tel:${place.phone}`} className="text-primary hover:underline">
                    {place.phone}
                  </a>
                </p>
              </div>
            )}
            {place.website && (
              <div>
                <h3 className="text-sm font-semibold text-text-muted">{dict.explore.website}</h3>
                <p className="mt-1">
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {place.website.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              </div>
            )}
            {googleMapsUrl && (
              <div className="pt-2">
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-primary px-4 py-3 text-center font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  {dict.explore.directions}
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* Related places */}
        {relatedPlaces.length > 0 && (
          <ScrollReveal>
            <section className="mt-16 pt-8 border-t border-border">
              <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">
                {dict.home.exploreTitle}
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {relatedPlaces.map((related) => (
                  <div key={related.id} className="min-w-[300px] max-w-[340px] flex-shrink-0">
                    <PlaceCard
                      place={related}
                      section="explore"
                      locale={typedLocale}
                      dict={dict}
                    />
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
    </article>
  );
}
