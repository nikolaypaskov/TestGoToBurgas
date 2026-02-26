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
  const height = compact ? "min-h-[220px]" : "min-h-[320px] sm:min-h-[360px]";

  return (
    <section className={`relative ${height} flex items-end overflow-hidden grain-overlay`}>
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
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: accentColor }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/55" />
        </>
      )}

      {/* Decorative blur orb */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[200px] rounded-full bg-white/[0.04] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full pb-12 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} theme="dark" />

          {/* Decorative accent line */}
          <div className="mt-4 mb-3 flex items-center gap-2">
            <div className="h-px w-10 bg-white/25" />
            <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
          </div>

          <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl leading-[1.1]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
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
