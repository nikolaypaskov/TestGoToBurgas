import type { Locale } from "@/i18n/config";

export interface NavSection {
  key: string;
  href: (locale: Locale) => string;
  children?: { key: string; href: (locale: Locale) => string }[];
}

export const mainNavigation: NavSection[] = [
  {
    key: "events",
    href: (l) => `/${l}/events`,
    children: [
      { key: "concerts", href: (l) => `/${l}/events/concerts` },
      { key: "theater", href: (l) => `/${l}/events/theater` },
      { key: "sports", href: (l) => `/${l}/events/sports` },
      { key: "art", href: (l) => `/${l}/events/art` },
      { key: "family", href: (l) => `/${l}/events/family` },
      { key: "kids", href: (l) => `/${l}/events/kids` },
      { key: "exhibitions", href: (l) => `/${l}/events/exhibitions` },
    ],
  },
  {
    key: "explore",
    href: (l) => `/${l}/explore`,
    children: [
      { key: "landmarks", href: (l) => `/${l}/explore/landmarks` },
      { key: "museums", href: (l) => `/${l}/explore/museums` },
      { key: "parks", href: (l) => `/${l}/explore/parks` },
      { key: "beaches", href: (l) => `/${l}/explore/beaches` },
      { key: "water-sports", href: (l) => `/${l}/explore/water-sports` },
      { key: "boat-trips", href: (l) => `/${l}/explore/boat-trips` },
      { key: "attractions", href: (l) => `/${l}/explore/attractions` },
      { key: "culture", href: (l) => `/${l}/explore/culture` },
    ],
  },
  {
    key: "plan",
    href: (l) => `/${l}/plan`,
    children: [
      { key: "hotels", href: (l) => `/${l}/plan/hotels` },
      { key: "cafes", href: (l) => `/${l}/plan/cafes` },
      { key: "restaurants", href: (l) => `/${l}/plan/restaurants` },
      { key: "nightlife", href: (l) => `/${l}/plan/nightlife` },
      { key: "transport", href: (l) => `/${l}/plan/transport` },
      { key: "routes", href: (l) => `/${l}/plan/routes` },
    ],
  },
  {
    key: "deals",
    href: (l) => `/${l}/deals`,
  },
  {
    key: "about",
    href: (l) => `/${l}/about`,
  },
  {
    key: "contact",
    href: (l) => `/${l}/contact`,
  },
  {
    key: "weather",
    href: (l) => `/${l}/weather`,
  },
];
