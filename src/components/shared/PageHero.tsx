import Image from "next/image";
import { Breadcrumbs } from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  accentColor?: string;
  backgroundImage?: string;
  compact?: boolean;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  accentColor = "var(--color-primary)",
  backgroundImage,
  compact = false,
}: PageHeroProps) {
  const height = compact ? "min-h-[200px]" : "min-h-[280px]";

  return (
    <section className={`relative ${height} flex items-end overflow-hidden`}>
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: accentColor }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/50" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 w-full pb-10 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} theme="dark" />
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-lg text-white/70">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Wave separator */}
      <div className="page-hero-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[30px] sm:h-[40px] md:h-[50px]">
          <path
            d="M0,20 C360,50 720,0 1080,30 C1260,45 1380,15 1440,25 L1440,60 L0,60 Z"
            fill="var(--color-surface-warm)"
          />
        </svg>
      </div>
    </section>
  );
}
