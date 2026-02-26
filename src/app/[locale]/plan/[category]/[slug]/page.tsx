import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { planCategories } from "@/lib/categories";
import { getAllServices, getServiceBySlug, getRelatedServices } from "@/data/loaders";
import { localize } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CardGrid } from "@/components/shared/CardGrid";
import { PlaceCard } from "@/components/cards/PlaceCard";

type Props = { params: Promise<{ locale: string; category: string; slug: string }> };

export async function generateStaticParams() {
  const services = getAllServices();
  const params: { locale: string; category: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const s of services) {
      params.push({ locale, category: s.category, slug: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = localize(service, "title", locale);
  const description = localize(service, "description", locale);
  return {
    title,
    description: description.slice(0, 160),
  };
}

export default async function PlanDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  if (!isValidLocale(locale)) return null;
  if (!(category in planCategories)) notFound();

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const dict = await getDictionary(locale as Locale);
  const title = localize(service, "title", locale);
  const description = localize(service, "description", locale);
  const address = localize(service, "address", locale);
  const hours = localize(service, "workingHours", locale);
  const categoryLabel = dict.categories[category as keyof typeof dict.categories] ?? category;
  const related = getRelatedServices(service);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.plan.title, href: `/${locale}/plan` },
          { label: categoryLabel, href: `/${locale}/plan/${category}` },
          { label: title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="relative h-[300px] w-full overflow-hidden rounded-xl bg-surface-dim md:h-[420px]">
            {service.imageUrl ? (
              <Image
                src={service.imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">
                {planCategories[category as keyof typeof planCategories]?.icon}
              </div>
            )}
          </div>

          <h1 className="mt-6 text-3xl font-bold text-text-primary md:text-4xl">
            {title}
          </h1>

          {service.rating !== undefined && service.rating > 0 && (
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={i < Math.round(service.rating!) ? "text-secondary text-xl" : "text-border text-xl"}
                >
                  &#9733;
                </span>
              ))}
              <span className="ml-2 text-text-muted">
                {service.rating.toFixed(1)}
              </span>
            </div>
          )}

          <div className="prose prose-lg mt-6 max-w-none text-text-secondary">
            <p>{description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 rounded-xl bg-surface-dim p-6">
          {address && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.explore.address}</h3>
              <p className="mt-1 text-text-primary">{address}</p>
            </div>
          )}
          {service.phone && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.explore.phone}</h3>
              <p className="mt-1">
                <a href={`tel:${service.phone}`} className="text-primary hover:underline">
                  {service.phone}
                </a>
              </p>
            </div>
          )}
          {service.website && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.explore.website}</h3>
              <p className="mt-1">
                <a
                  href={service.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {service.website.replace(/^https?:\/\//, "")}
                </a>
              </p>
            </div>
          )}
          {hours && (
            <div>
              <h3 className="text-sm font-semibold text-text-muted">{dict.explore.hours}</h3>
              <p className="mt-1 text-text-primary">{hours}</p>
            </div>
          )}
          {service.latitude && service.longitude && (
            <div className="pt-2">
              <Link
                href={`https://www.google.com/maps?q=${service.latitude},${service.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                {dict.explore.directions}
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-text-primary">
            {dict.plan.allServices}
          </h2>
          <CardGrid>
            {related.map((s) => (
              <PlaceCard
                key={s.id}
                place={s}
                locale={locale as Locale}
                dict={dict}
                section="plan"
              />
            ))}
          </CardGrid>
        </section>
      )}
    </div>
  );
}
