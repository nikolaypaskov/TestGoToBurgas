import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { exploreCategories } from "@/lib/categories";
import type { ExploreCategory } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CategoryCard } from "@/components/cards/CategoryCard";

interface ExploreCategoriesProps {
  locale: Locale;
  dict: Dictionary;
}

export function ExploreCategories({ locale, dict }: ExploreCategoriesProps) {
  const categories = Object.entries(exploreCategories) as [ExploreCategory, (typeof exploreCategories)[ExploreCategory]][];

  return (
    <div>
      <SectionHeader
        title={dict.home.exploreTitle}
        subtitle={dict.home.exploreDesc}
        align="center"
        variant="gradient-text"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
        {categories.map(([slug, meta]) => (
          <CategoryCard
            key={slug}
            slug={slug}
            icon={meta.icon}
            color={meta.color}
            label={dict.categories[slug]}
            href={`/${locale}/explore/${slug}`}
            image={meta.image}
          />
        ))}
      </div>
    </div>
  );
}
