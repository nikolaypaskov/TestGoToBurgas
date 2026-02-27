import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebDeal } from "@/lib/types";
import { localize, formatPrice, discountPercent } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface DealsHighlightProps {
  deals: WebDeal[];
  locale: Locale;
  dict: Dictionary;
}

export function DealsHighlight({ deals, locale, dict }: DealsHighlightProps) {
  if (deals.length === 0) return null;

  const [featured, ...restDeals] = deals;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={dict.home.dealsTitle}
          subtitle={dict.home.dealsDesc}
          viewAllHref={`/${locale}/deals`}
          viewAllLabel={dict.home.viewAll}
          theme="dark"
          variant="editorial"
        />

        {/* Featured deal — full-width image with overlaid text */}
        <FeaturedDealCard deal={featured} locale={locale} dict={dict} />
      </div>

      {/* Remaining deals — horizontal scroll, simpler thumbnail + caption */}
      {restDeals.length > 0 && (
        <div className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4">
          {restDeals.map((deal) => (
            <ScrollDealCard key={deal.id} deal={deal} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedDealCard({
  deal,
  locale,
  dict,
}: {
  deal: WebDeal;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = localize(deal, "title", locale);
  const description = localize(deal, "description", locale);
  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

  return (
    <Link
      href={`/${locale}/deals/${deal.slug}`}
      className="group relative block overflow-hidden h-[260px] sm:h-[320px] lg:h-[380px] cursor-pointer"
    >
      {/* Full-width image */}
      <div className="absolute inset-0">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1024px) 100vw, 1280px"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center">
            <span className="font-display text-[80px] text-white/10 font-bold">%</span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Overlaid text content */}
      <div className="absolute inset-0 flex items-center p-4 sm:p-6 lg:p-10">
        <div className="max-w-md sm:max-w-lg">
          {savings > 0 && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-light mb-3 block">
              Save {savings}%
            </span>
          )}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/50 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Pricing */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-white/35 line-through text-sm">
              {formatPrice(deal.originalPrice, deal.currency, locale)}
            </span>
            <span className="font-display text-2xl font-bold text-secondary">
              {formatPrice(deal.discountPrice, deal.currency, locale)}
            </span>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
            {dict.deals.getOffer}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

function ScrollDealCard({
  deal,
  locale,
  dict,
}: {
  deal: WebDeal;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = localize(deal, "title", locale);
  const savings = discountPercent(deal.originalPrice, deal.discountPrice);

  return (
    <Link
      href={`/${locale}/deals/${deal.slug}`}
      className="group shrink-0 w-[240px] sm:w-[280px] md:w-[320px] snap-start cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
        {deal.imageUrl ? (
          <Image
            src={deal.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            sizes="320px"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-teal/15 to-teal/5 flex items-center justify-center">
            <span className="font-display text-4xl text-white/10 font-bold">%</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Caption */}
      <h3 className="text-sm font-semibold text-white/90 leading-snug line-clamp-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-xs text-white/35 line-through">
          {formatPrice(deal.originalPrice, deal.currency, locale)}
        </span>
        <span className="text-base font-bold text-secondary">
          {formatPrice(deal.discountPrice, deal.currency, locale)}
        </span>
        {savings > 0 && (
          <span className="text-[10px] font-semibold text-accent-light uppercase">
            -{savings}%
          </span>
        )}
      </div>
    </Link>
  );
}
