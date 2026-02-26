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
  return { title: dict.legal.cookies };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.legal.cookies },
        ]}
      />
      <h1 className="text-3xl font-bold mt-8 mb-2">{dict.legal.cookies}</h1>
      <p className="text-text-muted mb-8">{locale === "bg" ? "Последна актуализация: 1 февруари 2026" : locale === "ru" ? "Последнее обновление: 1 февраля 2026" : "Last updated: February 1, 2026"}</p>
      <div className="prose prose-slate max-w-none space-y-6 text-text-secondary leading-relaxed">
        <p>This website uses cookies to ensure you get the best experience. Here is what you need to know about our use of cookies.</p>
        <h2 className="text-xl font-semibold text-text-primary">1. What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>
        <h2 className="text-xl font-semibold text-text-primary">2. Types of Cookies We Use</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Essential cookies</strong> — Required for the website to function (e.g., language preference).</li>
          <li><strong>Analytics cookies</strong> — Help us understand how visitors use the website.</li>
        </ul>
        <h2 className="text-xl font-semibold text-text-primary">3. Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling essential cookies may affect website functionality.</p>
      </div>
    </div>
  );
}
