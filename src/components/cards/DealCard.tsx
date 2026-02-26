import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebDeal } from "@/lib/types";
import { localize, formatPrice, formatDate, discountPercent } from "@/lib/utils";

interface DealCardProps {
  deal: WebDeal;
  locale: Locale;
  dict: Dictionary;
}

export function DealCard({ deal, locale, dict }: DealCardProps) {
  const title = localize(deal, "title", locale);
  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

  return (
    <Link
      href={`/${locale}/deals/${deal.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-dim">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="400px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal/10 to-teal/5 text-5xl text-teal">
            %
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        {savings > 0 && (
          <div className="absolute right-4 top-4 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-sm font-bold text-white shadow-lg">
            -{savings}%
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-[17px] font-semibold text-text-primary leading-snug group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-sm text-text-muted line-through decoration-accent/40">
            {formatPrice(deal.originalPrice, deal.currency, locale)}
          </span>
          <span className="text-xl font-bold text-teal">
            {formatPrice(deal.discountPrice, deal.currency, locale)}
          </span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {dict.deals.validUntil}: {formatDate(deal.validUntil, locale)}
        </p>
      </div>
    </Link>
  );
}
