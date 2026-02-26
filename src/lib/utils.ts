import type { Locale } from "@/i18n/config";

/** Combine class names, filtering out falsy values */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Generate a URL-safe slug from text */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Get a localized field from an object. e.g. localize(event, 'title', 'bg') → event.title_bg */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localize(item: any, field: string, locale: Locale): string {
  return item[`${field}_${locale}`] || item[`${field}_en`] || item[`${field}_bg`] || "";
}

/** Format date for display */
export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr);
  const localeMap: Record<Locale, string> = {
    bg: "bg-BG",
    en: "en-US",
    ru: "ru-RU",
  };
  return date.toLocaleDateString(localeMap[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Format date range */
export function formatDateRange(start: string, end: string | undefined, locale: Locale): string {
  if (!end || start === end) return formatDate(start, locale);
  return `${formatDate(start, locale)} – ${formatDate(end, locale)}`;
}

/** Format price display */
export function formatPrice(
  price: number | undefined,
  currency: string = "BGN",
  locale: Locale
): string {
  if (price === undefined || price === 0) return "";
  const localeMap: Record<Locale, string> = {
    bg: "bg-BG",
    en: "en-US",
    ru: "ru-RU",
  };
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/** Calculate discount percentage */
export function discountPercent(original: number, discounted: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/** Truncate text to maxLength, respecting word boundaries */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}
