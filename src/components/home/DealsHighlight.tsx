import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebDeal } from "@/lib/types";
import { localize, formatPrice, discountPercent } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DealCard } from "@/components/cards/DealCard";

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
        />

        {/* Featured deal — cinematic editorial card */}
        <FeaturedDealCard deal={featured} locale={locale} dict={dict} />
      </div>

      {/* Remaining deals — horizontal scroll */}
      {restDeals.length > 0 && (
        <div className="mt-8 flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4">
          {restDeals.map((deal) => (
            <div key={deal.id} className="shrink-0 w-[320px] sm:w-[380px] snap-start">
              <DealCard deal={deal} locale={locale} dict={dict} />
            </div>
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
      className="group relative block overflow-hidden rounded-[var(--radius-card)] bg-white/6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/18 cursor-pointer"
    >
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[240px] lg:h-[320px] overflow-hidden">
          {deal.imageUrl ? (
            <Image
              src={deal.imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center">
              <span className="font-display text-[80px] text-white/10 font-bold">%</span>
            </div>
          )}

          {/* Discount badge */}
          {savings > 0 && (
            <div className="absolute top-4 left-4 flex items-center justify-center w-16 h-16 rounded-full bg-accent shadow-lg">
              <span className="text-white font-bold text-base">-{savings}%</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white leading-tight">
            {title}
          </h3>
          <p className="mt-3 text-sm text-white/45 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Pricing */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-white/35 line-through text-sm">
              {formatPrice(deal.originalPrice, deal.currency, locale)}
            </span>
            <span className="font-display text-2xl font-bold text-secondary">
              {formatPrice(deal.discountPrice, deal.currency, locale)}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white transition-all group-hover:bg-teal-light group-hover:scale-[1.02]">
              {dict.deals.getOffer}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
