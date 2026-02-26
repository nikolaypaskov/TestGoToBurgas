import type { Locale } from "@/i18n/config";

interface HighlightsStripProps {
  locale: Locale;
}

const borderColors = [
  "border-l-primary",
  "border-l-secondary",
  "border-l-accent",
  "border-l-teal",
];

const highlights = {
  en: [
    { icon: "🎭", title: "Events & Festivals", desc: "Live music, theater, and art year-round" },
    { icon: "🏖️", title: "Beautiful Beaches", desc: "Golden sand and crystal-clear Black Sea" },
    { icon: "🍽️", title: "Cuisine & Nightlife", desc: "Fresh seafood, local wines, and vibrant bars" },
    { icon: "🏛️", title: "Culture & History", desc: "Ancient ruins, galleries, and museums" },
  ],
  bg: [
    { icon: "🎭", title: "Събития и фестивали", desc: "Музика, театър и изкуство целогодишно" },
    { icon: "🏖️", title: "Красиви плажове", desc: "Златен пясък и кристално чисто море" },
    { icon: "🍽️", title: "Кухня и нощен живот", desc: "Морски деликатеси, местни вина и барове" },
    { icon: "🏛️", title: "Култура и история", desc: "Антични руини, галерии и музеи" },
  ],
  ru: [
    { icon: "🎭", title: "События и фестивали", desc: "Музыка, театр и искусство круглый год" },
    { icon: "🏖️", title: "Красивые пляжи", desc: "Золотой песок и кристально чистое море" },
    { icon: "🍽️", title: "Кухня и ночная жизнь", desc: "Морепродукты, местные вина и бары" },
    { icon: "🏛️", title: "Культура и история", desc: "Древние руины, галереи и музеи" },
  ],
};

export function HighlightsStrip({ locale }: HighlightsStripProps) {
  const items = highlights[locale] || highlights.en;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`group flex items-start gap-4 rounded-[var(--radius-card)] bg-surface border-l-4 ${borderColors[i]} border border-border-light/60 p-5 sm:p-6 shadow-[var(--shadow-hero)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5`}
        >
          <span className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-dim text-2xl transition-transform duration-300 group-hover:scale-110">
            {item.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-text-primary text-[15px] leading-snug">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[13px] text-text-muted leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
