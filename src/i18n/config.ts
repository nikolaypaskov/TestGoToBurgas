export const locales = ["bg", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
