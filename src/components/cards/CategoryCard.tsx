import Image from "next/image";
import Link from "next/link";
import { CategoryIcon } from "@/components/shared/CategoryIcon";

interface CategoryCardProps {
  slug: string;
  icon: string;
  color: string;
  label: string;
  href: string;
  image?: string;
  count?: number;
}

export function CategoryCard({ icon, color, label, href, image, count }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center justify-end overflow-hidden rounded-[var(--radius-card)] aspect-[4/3] shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Photo background */}
      {image ? (
        <Image
          src={image}
          alt={label}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        /* Gradient fallback when no image — show SVG icon centered */
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}
        >
          <CategoryIcon name={icon} size={48} className="opacity-60" />
        </div>
      )}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Colored accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: color }}
      />

      {/* Label + count (no emoji when there's a photo) */}
      <div className="relative z-10 w-full p-4 text-center">
        <span className="block text-sm font-semibold text-white tracking-wide drop-shadow-md">
          {label}
        </span>
        {count !== undefined && count > 0 && (
          <span className="block mt-1 text-xs text-white/60">
            {count} {count === 1 ? "item" : "items"}
          </span>
        )}
      </div>
    </Link>
  );
}
