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

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.plan.title, href: `/${locale}/plan` },
    { label: categoryLabel, href: `/${locale}/plan/${category}` },
    { label: title },
  ];

  const googleMapsUrl =
    service.latitude && service.longitude
      ? `https://www.google.com/maps?q=${service.latitude},${service.longitude}`
      : null;

  return (
    <article>
      {/* ─── HERO IMAGE ─── Full-width cinematic banner */}
      <div className="relative h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden bg-surface-dim">
        {service.imageUrl ? (
          <>
            <Image
              src={service.imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-dim to-surface">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted/20">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
            </svg>
          </div>
        )}

        {/* Breadcrumbs on image */}
        <div className="absolute top-0 inset-x-0 z-10 pt-24 pb-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 inset-x-0 z-10 pb-8 pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
            {service.rating !== undefined && service.rating > 0 && (
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.round(service.rating!) ? "text-secondary text-lg" : "text-white/30 text-lg"}
                  >
                    &#9733;
                  </span>
                ))}
                <span className="ml-2 text-white/70 text-sm">
                  {service.rating.toFixed(1)}
                </span>
              </div>
            )}
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
                <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 rounded-2xl bg-surface-dim border border-border/50 p-6 lg:p-7 h-fit lg:sticky lg:top-24">
              {address && (
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {dict.explore.address}
                  </h3>
                  <p className="mt-1.5 text-text-primary font-medium">{address}</p>
                </div>
              )}
              {service.phone && (
                <>
                  <div className="h-px bg-border/50" />
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      {dict.explore.phone}
                    </h3>
                    <p className="mt-1.5">
                      <a href={`tel:${service.phone}`} className="text-primary font-medium hover:underline">
                        {service.phone}
                      </a>
                    </p>
                  </div>
                </>
              )}
              {service.website && (
                <>
                  <div className="h-px bg-border/50" />
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                      </svg>
                      {dict.explore.website}
                    </h3>
                    <p className="mt-1.5">
                      <a
                        href={service.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline break-all"
                      >
                        {service.website.replace(/^https?:\/\//, "")}
                      </a>
                    </p>
                  </div>
                </>
              )}
              {hours && (
                <>
                  <div className="h-px bg-border/50" />
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-text-muted uppercase tracking-wider">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {dict.explore.hours}
                    </h3>
                    <p className="mt-1.5 text-text-primary font-medium">{hours}</p>
                  </div>
                </>
              )}
              {googleMapsUrl && (
                <div className="pt-3">
                  <Link
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-5 py-3.5 font-bold text-white hover:bg-primary-dark transition-colors shadow-md cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {dict.explore.directions}
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      {/* ─── RELATED SERVICES ─── */}
      {related.length > 0 && (
        <section className="bg-surface-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                {dict.plan.allServices}
              </h2>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {related.map((s) => (
                <div key={s.id} className="min-w-[300px] max-w-[340px] flex-shrink-0">
                  <PlaceCard
                    place={s}
                    locale={locale as Locale}
                    dict={dict}
                    section="plan"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
