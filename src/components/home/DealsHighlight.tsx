import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { WebDeal } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { DealCard } from "@/components/cards/DealCard";

interface DealsHighlightProps {
  deals: WebDeal[];
  locale: Locale;
  dict: Dictionary;
}

export function DealsHighlight({ deals, locale, dict }: DealsHighlightProps) {
  if (deals.length === 0) return null;

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
      </div>

      {/* Horizontal cinema scroll */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4">
        {deals.map((deal) => (
          <div key={deal.id} className="shrink-0 w-[340px] sm:w-[400px] snap-start">
            <DealCard deal={deal} locale={locale} dict={dict} />
          </div>
        ))}
      </div>
    </div>
  );
}
