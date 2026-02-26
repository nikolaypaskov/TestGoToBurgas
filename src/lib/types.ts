export interface WebEvent {
  id: string;
  slug: string;
  category: EventCategory;
  title_bg: string;
  title_en: string;
  title_ru: string;
  description_bg: string;
  description_en: string;
  description_ru: string;
  imageUrl: string;
  date: string; // ISO date
  endDate?: string;
  time?: string;
  location_bg: string;
  location_en: string;
  location_ru: string;
  price?: number;
  priceCurrency?: string;
  isFree: boolean;
  ticketUrl?: string;
  organizer?: string;
  featured?: boolean;
}

export interface WebPlace {
  id: string;
  slug: string;
  category: ExploreCategory;
  title_bg: string;
  title_en: string;
  title_ru: string;
  description_bg: string;
  description_en: string;
  description_ru: string;
  imageUrl: string;
  address_bg: string;
  address_en: string;
  address_ru: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  workingHours_bg?: string;
  workingHours_en?: string;
  workingHours_ru?: string;
  rating?: number;
  featured?: boolean;
}

export interface WebDeal {
  id: string;
  slug: string;
  title_bg: string;
  title_en: string;
  title_ru: string;
  description_bg: string;
  description_en: string;
  description_ru: string;
  imageUrl: string;
  originalPrice: number;
  discountPrice: number;
  currency: string;
  validUntil: string; // ISO date
  provider: string;
  providerUrl?: string;
  featured?: boolean;
}

export type EventCategory =
  | "concerts"
  | "theater"
  | "sports"
  | "art"
  | "family"
  | "kids"
  | "business"
  | "exhibitions";

export type ExploreCategory =
  | "landmarks"
  | "museums"
  | "parks"
  | "beaches"
  | "water-sports"
  | "boat-trips"
  | "attractions"
  | "culture";

export type PlanCategory =
  | "hotels"
  | "cafes"
  | "restaurants"
  | "nightlife"
  | "transport"
  | "routes";

export type ContentSection = "events" | "explore" | "plan" | "deals";

export interface CategoryMeta {
  slug: string;
  icon: string;
  color: string;
  image: string;
}

export interface NavItem {
  key: string;
  href: string;
  children?: NavItem[];
}

export type LocaleField<T extends string> = `${T}_bg` | `${T}_en` | `${T}_ru`;
