import Link from "next/link";
import type { Locale } from "@/i18n/config";

interface HighlightsStripProps {
  locale: Locale;
}

const highlights = {
  en: [
    { title: "Events & Festivals", desc: "Live music, theater, and art year-round", href: "/events" },
    { title: "Beautiful Beaches", desc: "Golden sand and crystal-clear Black Sea", href: "/explore/beaches" },
    { title: "Cuisine & Nightlife", desc: "Fresh seafood, local wines, and vibrant bars", href: "/plan/restaurants" },
    { title: "Culture & History", desc: "Ancient ruins, galleries, and museums", href: "/explore/landmarks" },
  ],
  bg: [
    { title: "Събития и фестивали", desc: "Музика, театър и изкуство целогодишно", href: "/events" },
    { title: "Красиви плажове", desc: "Златен пясък и кристално чисто море", href: "/explore/beaches" },
    { title: "Кухня и нощен живот", desc: "Морски деликатеси, местни вина и барове", href: "/plan/restaurants" },
    { title: "Култура и история", desc: "Антични руини, галерии и музеи", href: "/explore/landmarks" },
  ],
  ru: [
    { title: "События и фестивали", desc: "Музыка, театр и искусство круглый год", href: "/events" },
    { title: "Красивые пляжи", desc: "Золотой песок и кристально чистое море", href: "/explore/beaches" },
    { title: "Кухня и ночная жизнь", desc: "Морепродукты, местные вина и бары", href: "/plan/restaurants" },
    { title: "Культура и история", desc: "Древние руины, галереи и музеи", href: "/explore/landmarks" },
  ],
};

const cardStyles = [
  { iconBg: "bg-accent/12", iconText: "text-accent", border: "border-l-accent" },
  { iconBg: "bg-primary/12", iconText: "text-primary", border: "border-l-primary" },
  { iconBg: "bg-secondary/12", iconText: "text-secondary-dark", border: "border-l-secondary" },
  { iconBg: "bg-teal/12", iconText: "text-teal-dark", border: "border-l-teal" },
];

export function HighlightsStrip({ locale }: HighlightsStripProps) {
  const items = highlights[locale] || highlights.en;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {items.map((item, i) => (
        <Link
          key={item.title}
          href={`/${locale}${item.href}`}
          className={`group flex items-start gap-4 rounded-[var(--radius-card)] bg-surface border-l-4 ${cardStyles[i].border} border border-border-light/60 p-5 sm:p-6 shadow-[var(--shadow-hero)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1`}
        >
          <span className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${cardStyles[i].iconBg} ${cardStyles[i].iconText} transition-transform duration-300 group-hover:scale-110`}>
            <HighlightIcon index={i} />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary text-[15px] leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[13px] text-text-muted leading-relaxed">
              {item.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function HighlightIcon({ index }: { index: number }) {
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (index) {
    case 0:
      // Music / Events
      return (
        <svg {...props}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 1:
      // Sun / Beach
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 2:
      // Wine glass / Cuisine
      return (
        <svg {...props}>
          <path d="M8 2h8l-2 9H10L8 2z" />
          <path d="M12 11v9" />
          <path d="M8 22h8" />
          <path d="M7 2l1.5 5" />
          <path d="M17 2l-1.5 5" />
        </svg>
      );
    case 3:
      // Columns / Culture
      return (
        <svg {...props}>
          <path d="M2 20h20" />
          <path d="M5 20V8l7-5 7 5v12" />
          <path d="M9 20v-5h6v5" />
          <path d="M3 8h18" />
        </svg>
      );
    default:
      return null;
  }
}
