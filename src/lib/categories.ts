import type { CategoryMeta, EventCategory, ExploreCategory, PlanCategory } from "./types";

export const eventCategories: Record<EventCategory, CategoryMeta> = {
  concerts: {
    slug: "concerts",
    icon: "🎵",
    color: "#E91E63",
    image: "/images/events/spirit-of-burgas.jpg",
  },
  theater: {
    slug: "theater",
    icon: "🎭",
    color: "#9C27B0",
    image: "/images/events/opera-open.jpg",
  },
  sports: {
    slug: "sports",
    icon: "⚽",
    color: "#4CAF50",
    image: "/images/events/triathlon.jpg",
  },
  art: {
    slug: "art",
    icon: "🎨",
    color: "#FF9800",
    image: "/images/events/flora.jpg",
  },
  family: {
    slug: "family",
    icon: "👨‍👩‍👧‍👦",
    color: "#2196F3",
    image: "/images/events/food-fest.jpg",
  },
  kids: {
    slug: "kids",
    icon: "🧸",
    color: "#FF5722",
    image: "/images/events/kids-theater.jpg",
  },
  business: {
    slug: "business",
    icon: "💼",
    color: "#607D8B",
    image: "/images/events/business-forum.jpg",
  },
  exhibitions: {
    slug: "exhibitions",
    icon: "🖼️",
    color: "#795548",
    image: "/images/events/sand-festival.jpg",
  },
};

export const exploreCategories: Record<ExploreCategory, CategoryMeta> = {
  landmarks: {
    slug: "landmarks",
    icon: "🏛️",
    color: "#0A6EBD",
    image: "/images/places/cathedral.jpg",
  },
  museums: {
    slug: "museums",
    icon: "🏛️",
    color: "#7B1FA2",
    image: "/images/places/history-museum.jpg",
  },
  parks: {
    slug: "parks",
    icon: "🌳",
    color: "#388E3C",
    image: "/images/places/sea-garden.jpg",
  },
  beaches: {
    slug: "beaches",
    icon: "🏖️",
    color: "#00BFA5",
    image: "/images/places/central-beach.jpg",
  },
  "water-sports": {
    slug: "water-sports",
    icon: "🏄",
    color: "#0288D1",
    image: "/images/places/jet-ski.jpg",
  },
  "boat-trips": {
    slug: "boat-trips",
    icon: "⛵",
    color: "#01579B",
    image: "/images/places/st-anastasia.jpg",
  },
  attractions: {
    slug: "attractions",
    icon: "🎡",
    color: "#F5A623",
    image: "/images/places/aquae-calidae.jpg",
  },
  culture: {
    slug: "culture",
    icon: "🎭",
    color: "#C62828",
    image: "/images/places/ethnographic-museum.jpg",
  },
};

export const planCategories: Record<PlanCategory, CategoryMeta> = {
  hotels: {
    slug: "hotels",
    icon: "🏨",
    color: "#0A6EBD",
    image: "/images/places/hotel-bulgaria.jpg",
  },
  cafes: {
    slug: "cafes",
    icon: "☕",
    color: "#795548",
    image: "/images/places/cafe-roma.jpg",
  },
  restaurants: {
    slug: "restaurants",
    icon: "🍽️",
    color: "#E65100",
    image: "/images/places/restaurant-ethno.jpg",
  },
  nightlife: {
    slug: "nightlife",
    icon: "🌙",
    color: "#311B92",
    image: "/images/places/club-escape.jpg",
  },
  transport: {
    slug: "transport",
    icon: "🚌",
    color: "#1B5E20",
    image: "/images/places/bus-station.jpg",
  },
  routes: {
    slug: "routes",
    icon: "🗺️",
    color: "#F57F17",
    image: "/images/places/mandrensko-trail.jpg",
  },
};

export const allCategories = {
  events: eventCategories,
  explore: exploreCategories,
  plan: planCategories,
} as const;
