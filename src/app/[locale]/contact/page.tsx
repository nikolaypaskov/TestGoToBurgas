import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHero } from "@/components/shared/PageHero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.description };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.contact.title },
  ];

  return (
    <>
      <PageHero
        title={dict.contact.title}
        subtitle={dict.contact.description}
        breadcrumbs={breadcrumbs}
        accentColor="var(--color-primary)"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border-l-4 border-primary bg-surface-dim rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-primary mb-6">{dict.contact.tourismCenter}</h2>
            <div className="space-y-4 text-text-secondary">
              <div>
                <div className="font-medium text-text-primary">{dict.contact.address}</div>
                <div>{dict.contact.tourismAddress}</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{dict.contact.phone}</div>
                <a href="tel:+35956825772" className="text-primary hover:underline">+359 56 825 772</a>
              </div>
              <div>
                <div className="font-medium text-text-primary">{dict.contact.email}</div>
                <a href="mailto:tourism@burgas.bg" className="text-primary hover:underline">tourism@burgas.bg</a>
              </div>
              <div>
                <div className="font-medium text-text-primary">{dict.contact.workingHours}</div>
                <div>{dict.contact.workingHoursValue}</div>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-secondary bg-surface-dim rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-primary mb-6">{dict.contact.municipality}</h2>
            <div className="space-y-4 text-text-secondary">
              <div>
                <div className="font-medium text-text-primary">{dict.contact.address}</div>
                <div>{dict.contact.municipalityAddress}</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{dict.contact.phone}</div>
                <a href="tel:+35956907200" className="text-primary hover:underline">+359 56 907 200</a>
              </div>
              <div>
                <div className="font-medium text-text-primary">{dict.contact.websiteLabel}</div>
                <a href="https://burgas.bg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">burgas.bg</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-l-4 border-red-500 bg-red-50 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 shrink-0">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h2 className="text-xl font-semibold text-red-700">
              {dict.contact.emergencyTitle}
            </h2>
          </div>
          <p className="text-red-600">
            {dict.contact.emergencyText}{" "}
            <a href="tel:112" className="font-bold text-red-700">112</a>
          </p>
        </div>
      </div>
    </>
  );
}
