import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.legal.terms };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.legal.terms },
        ]}
      />
      <h1 className="text-3xl font-bold mt-8 mb-2">{dict.legal.terms}</h1>
      <p className="text-text-muted mb-8">{locale === "bg" ? "Последна актуализация: 1 февруари 2026" : locale === "ru" ? "Последнее обновление: 1 февраля 2026" : "Last updated: February 1, 2026"}</p>
      <div className="prose prose-slate max-w-none space-y-6 text-text-secondary leading-relaxed">
        <p>Welcome to Go to Burgas (gotoburgas.com). By accessing and using this website, you agree to the following terms and conditions.</p>
        <h2 className="text-xl font-semibold text-text-primary">1. Use of Content</h2>
        <p>All content on this website, including text, images, and data, is provided for informational purposes about tourism in Burgas, Bulgaria. Content may not be reproduced without prior written consent from Burgas Municipality.</p>
        <h2 className="text-xl font-semibold text-text-primary">2. Accuracy of Information</h2>
        <p>While we strive to keep information accurate and up to date, event dates, prices, and availability may change. We recommend confirming details with the respective venues and organizers.</p>
        <h2 className="text-xl font-semibold text-text-primary">3. Third-Party Links</h2>
        <p>This website may contain links to external websites. We are not responsible for the content or privacy practices of these sites.</p>
        <h2 className="text-xl font-semibold text-text-primary">4. Limitation of Liability</h2>
        <p>Go to Burgas and Burgas Municipality shall not be liable for any damages arising from the use of this website or reliance on its content.</p>
        <h2 className="text-xl font-semibold text-text-primary">5. Governing Law</h2>
        <p>These terms are governed by the laws of the Republic of Bulgaria.</p>
      </div>
    </div>
  );
}
