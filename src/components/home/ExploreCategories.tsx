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

// Irregular grid sizes — col-span-2 only on sm+ to avoid oversized items on mobile
const gridSizes = [
  "sm:col-span-2 sm:row-span-2",     // large featured (regular on mobile)
  "col-span-1 row-span-1",           // small
  "col-span-1 row-span-1",           // small
  "sm:col-span-2 row-span-1",        // panoramic wide (regular on mobile)
  "col-span-1 row-span-1",           // small
  "col-span-1 row-span-1",           // small
  "col-span-1 row-span-1",           // small
  "col-span-1 row-span-1",           // small
];

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
        variant="editorial"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 auto-rows-[130px] sm:auto-rows-[160px] md:auto-rows-[200px]">
        {categories.map(([slug, meta], i) => (
          <Link
            key={slug}
            href={`/${locale}/explore/${slug}`}
            className={`group relative overflow-hidden cursor-pointer ${gridSizes[i] || "col-span-1 row-span-1"}`}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-opacity group-hover:from-black/60" />

            {/* Category label — simple overlaid text */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                {dict.categories[slug]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
