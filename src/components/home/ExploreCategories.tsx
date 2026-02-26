import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { exploreCategories } from "@/lib/categories";
import type { ExploreCategory } from "@/lib/types";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CategoryIcon } from "@/components/shared/CategoryIcon";

interface ExploreCategoriesProps {
  locale: Locale;
  dict: Dictionary;
}

export function ExploreCategories({ locale, dict }: ExploreCategoriesProps) {
  const categories = Object.entries(exploreCategories) as [
    ExploreCategory,
    (typeof exploreCategories)[ExploreCategory],
  ][];

  return (
    <div>
      <SectionHeader
        title={dict.home.exploreTitle}
        subtitle={dict.home.exploreDesc}
        align="center"
        variant="gradient-text"
      />

      {/* Responsive grid: first two items span wider on large screens */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4 lg:gap-5">
        {categories.map(([slug, meta], i) => (
          <Link
            key={slug}
            href={`/${locale}/explore/${slug}`}
            className={`group relative flex flex-col items-center justify-end overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer ${
              i < 2
                ? "aspect-[4/3] sm:aspect-[3/2] md:col-span-2 md:aspect-[16/9] lg:col-span-2"
                : "aspect-[4/3]"
            }`}
          >
            {/* Photo */}
            {meta.image ? (
              <Image
                src={meta.image}
                alt={dict.categories[slug]}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${meta.color}20, ${meta.color}40)` }}
              >
                <CategoryIcon name={meta.icon} size={48} className="opacity-60" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
              style={{ backgroundColor: meta.color }}
            />

            {/* Category label */}
            <div className="relative z-10 w-full p-4 text-center">
              <span className="block text-sm font-semibold text-white tracking-wide drop-shadow-md">
                {dict.categories[slug]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
