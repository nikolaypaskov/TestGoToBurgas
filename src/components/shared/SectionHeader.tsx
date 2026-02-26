import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "left" | "center";
  variant?: "default" | "accent-underline" | "center-large" | "gradient-text";
  theme?: "light" | "dark";
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
  align = "left",
  variant = "default",
  theme = "light",
}: SectionHeaderProps) {
  const textColor = theme === "dark" ? "text-white" : "text-text-primary";
  const subtitleColor = theme === "dark" ? "text-white/60" : "text-text-secondary";
  const linkColor = theme === "dark" ? "text-white/80 hover:text-white" : "text-primary hover:text-primary-dark";

  const titleClass = (() => {
    switch (variant) {
      case "gradient-text":
        return "font-display text-3xl font-bold md:text-4xl lg:text-[42px] leading-tight text-gradient-primary";
      case "center-large":
        return `font-display text-4xl font-bold md:text-5xl lg:text-6xl leading-tight ${textColor}`;
      default:
        return `font-display text-3xl font-bold md:text-4xl lg:text-[42px] leading-tight ${textColor}`;
    }
  })();

  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "flex items-end justify-between"}`}>
      <div>
        <h2 className={titleClass}>
          {title}
        </h2>
        {variant === "accent-underline" && (
          <div className="mt-3 h-1 w-16 rounded-full bg-secondary" />
        )}
        {subtitle && (
          <p className={`mt-2 text-base md:text-lg max-w-2xl ${subtitleColor}`}>
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && viewAllLabel && align === "left" && (
        <Link
          href={viewAllHref}
          className={`group hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors whitespace-nowrap ${linkColor}`}
        >
          {viewAllLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
}
