import type { Locale } from "@/i18n/config";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  locale: Locale;
  isFree?: boolean;
  freeLabel?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  currency = "BGN",
  locale,
  isFree,
  freeLabel = "Free",
}: PriceDisplayProps) {
  if (isFree || price === 0) {
    return (
      <span className="font-semibold text-accent">{freeLabel}</span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-text-muted line-through">
          {formatPrice(originalPrice, currency, locale)}
        </span>
      )}
      <span className="font-semibold text-text-primary">
        {formatPrice(price, currency, locale)}
      </span>
    </span>
  );
}
