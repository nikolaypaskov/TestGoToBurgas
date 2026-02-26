"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

interface HighlightsStripProps {
  locale: Locale;
}

interface Highlight {
  title: string;
  desc: string;
  href: string;
  stat: string;
  unit: string;
}

const highlights: Record<string, Highlight[]> = {
  en: [
    { stat: "300", unit: "+", title: "Sunny Days", desc: "Year-round warmth on the Black Sea", href: "/weather" },
    { stat: "35", unit: "km", title: "Coastline", desc: "Golden beaches and coastal trails", href: "/explore/beaches" },
    { stat: "10", unit: "+", title: "Beaches", desc: "From vibrant to secluded shores", href: "/explore/beaches" },
    { stat: "2500", unit: "+", title: "Years of History", desc: "Ancient ruins, culture, and heritage", href: "/explore/landmarks" },
  ],
  bg: [
    { stat: "300", unit: "+", title: "Слънчеви дни", desc: "Целогодишна топлина на Черно море", href: "/weather" },
    { stat: "35", unit: "км", title: "Крайбрежие", desc: "Златни плажове и крайбрежни пътеки", href: "/explore/beaches" },
    { stat: "10", unit: "+", title: "Плажа", desc: "От оживени до усамотени брегове", href: "/explore/beaches" },
    { stat: "2500", unit: "+", title: "Години история", desc: "Антични руини, култура и наследство", href: "/explore/landmarks" },
  ],
  ru: [
    { stat: "300", unit: "+", title: "Солнечных дней", desc: "Круглогодичное тепло на Чёрном море", href: "/weather" },
    { stat: "35", unit: "км", title: "Побережье", desc: "Золотые пляжи и прибрежные тропы", href: "/explore/beaches" },
    { stat: "10", unit: "+", title: "Пляжей", desc: "От оживлённых до уединённых берегов", href: "/explore/beaches" },
    { stat: "2500", unit: "+", title: "Лет истории", desc: "Древние руины, культура и наследие", href: "/explore/landmarks" },
  ],
};

const accentColors = [
  "text-secondary",
  "text-primary",
  "text-teal",
  "text-accent",
];

const iconBgs = [
  "bg-secondary/10",
  "bg-primary/10",
  "bg-teal/10",
  "bg-accent/10",
];

export function HighlightsStrip({ locale }: HighlightsStripProps) {
  const items = highlights[locale] || highlights.en;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {items.map((item, i) => (
        <Link
          key={item.title}
          href={`/${locale}${item.href}`}
          className="group relative overflow-hidden rounded-[var(--radius-card)] bg-surface border border-border-light/60 p-5 sm:p-6 shadow-[var(--shadow-hero)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 100}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 100}ms`,
          }}
        >
          {/* Accent top line */}
          <div
            className={`absolute top-0 left-0 right-0 h-[3px] ${iconBgs[i].replace("/10", "")} opacity-60 transition-opacity group-hover:opacity-100`}
            style={{ backgroundColor: `var(--color-${["secondary", "primary", "teal", "accent"][i]})` }}
          />

          {/* Icon circle */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBgs[i]} mb-4 transition-transform duration-300 group-hover:scale-110`}>
            <HighlightIcon index={i} className={accentColors[i]} />
          </div>

          {/* Animated stat number */}
          <div className="flex items-baseline gap-0.5 mb-1">
            <AnimatedNumber value={parseInt(item.stat)} visible={visible} delay={i * 100} className={`font-display text-3xl sm:text-4xl font-bold ${accentColors[i]}`} />
            <span className={`text-lg sm:text-xl font-bold ${accentColors[i]}`}>{item.unit}</span>
          </div>

          <h3 className="text-sm font-semibold text-text-primary leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted leading-relaxed hidden sm:block">
            {item.desc}
          </p>
        </Link>
      ))}
    </div>
  );
}

function AnimatedNumber({
  value,
  visible,
  delay,
  className,
}: {
  value: number;
  visible: boolean;
  delay: number;
  className: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(() => {
      const duration = 1200;
      const steps = 30;
      const stepTime = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current++;
        const progress = current / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));

        if (current >= steps) {
          clearInterval(timer);
          setCount(value);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, delay + 200);

    return () => clearTimeout(timeout);
  }, [visible, value, delay]);

  return <span className={className}>{visible ? count.toLocaleString() : "0"}</span>;
}

function HighlightIcon({ index, className }: { index: number; className: string }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (index) {
    case 0:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case 3:
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
