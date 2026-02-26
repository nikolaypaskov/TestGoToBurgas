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
  return { title: dict.legal.privacy };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.legal.privacy },
        ]}
      />
      <h1 className="text-3xl font-bold mt-8 mb-2">{dict.legal.privacy}</h1>
      <p className="text-text-muted mb-8">{locale === "bg" ? "Последна актуализация: 1 февруари 2026" : locale === "ru" ? "Последнее обновление: 1 февраля 2026" : "Last updated: February 1, 2026"}</p>
      <div className="prose prose-slate max-w-none space-y-6 text-text-secondary leading-relaxed">
        <p>Go to Burgas respects your privacy. This policy explains how we collect, use, and protect your personal data.</p>
        <h2 className="text-xl font-semibold text-text-primary">1. Data We Collect</h2>
        <p>We may collect anonymous usage data through analytics tools, including pages visited, time on site, and device information. We do not collect personal information unless you provide it voluntarily (e.g., via a contact form).</p>
        <h2 className="text-xl font-semibold text-text-primary">2. How We Use Data</h2>
        <p>Anonymous data helps us improve the website experience and understand visitor interests. We do not sell or share personal data with third parties for marketing purposes.</p>
        <h2 className="text-xl font-semibold text-text-primary">3. Cookies</h2>
        <p>This website uses cookies to improve functionality and analyze traffic. See our Cookie Policy for details.</p>
        <h2 className="text-xl font-semibold text-text-primary">4. Your Rights</h2>
        <p>Under GDPR, you have the right to access, correct, or delete your personal data. Contact us at tourism@burgas.bg for any data-related requests.</p>
        <h2 className="text-xl font-semibold text-text-primary">5. Contact</h2>
        <p>For privacy-related inquiries: tourism@burgas.bg</p>
      </div>
    </div>
  );
}
