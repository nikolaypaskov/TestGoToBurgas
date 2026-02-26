import type { CategoryMeta, EventCategory, ExploreCategory, PlanCategory } from "./types";

export const eventCategories: Record<EventCategory, CategoryMeta> = {
  concerts: {
    slug: "concerts",
    icon: "music",
    color: "#C75B39",
    image: "/images/events/spirit-of-burgas.jpg",
  },
  theater: {
    slug: "theater",
    icon: "theater",
    color: "#8B5A8B",
    image: "/images/events/opera-open.jpg",
  },
  sports: {
    slug: "sports",
    icon: "sports",
    color: "#3E9A80",
    image: "/images/events/triathlon.jpg",
  },
  art: {
    slug: "art",
    icon: "palette",
    color: "#D4A843",
    image: "/images/events/flora.jpg",
  },
  family: {
    slug: "family",
    icon: "family",
    color: "#3D7A9E",
    image: "/images/events/food-fest.jpg",
  },
  kids: {
    slug: "kids",
    icon: "kids",
    color: "#D4795E",
    image: "/images/events/kids-theater.jpg",
  },
  business: {
    slug: "business",
    icon: "briefcase",
    color: "#5A7080",
    image: "/images/events/business-forum.jpg",
  },
  exhibitions: {
    slug: "exhibitions",
    icon: "gallery",
    color: "#7A6352",
    image: "/images/events/sand-festival.jpg",
  },
};

export const exploreCategories: Record<ExploreCategory, CategoryMeta> = {
  landmarks: {
    slug: "landmarks",
    icon: "landmark",
    color: "#1B4965",
    image: "/images/places/cathedral.jpg",
  },
  museums: {
    slug: "museums",
    icon: "museum",
    color: "#6B4F8A",
    image: "/images/places/history-museum.jpg",
  },
  parks: {
    slug: "parks",
    icon: "tree",
    color: "#3E9A80",
    image: "/images/places/sea-garden.jpg",
  },
  beaches: {
    slug: "beaches",
    icon: "beach",
    color: "#5FB49C",
    image: "/images/places/central-beach.jpg",
  },
  "water-sports": {
    slug: "water-sports",
    icon: "waves",
    color: "#3D7A9E",
    image: "/images/places/jet-ski.jpg",
  },
  "boat-trips": {
    slug: "boat-trips",
    icon: "sailboat",
    color: "#0F2E44",
    image: "/images/places/st-anastasia.jpg",
  },
  attractions: {
    slug: "attractions",
    icon: "star",
    color: "#D4A843",
    image: "/images/places/aquae-calidae.jpg",
  },
  culture: {
    slug: "culture",
    icon: "theater",
    color: "#A84828",
    image: "/images/places/ethnographic-museum.jpg",
  },
};

export const planCategories: Record<PlanCategory, CategoryMeta> = {
  hotels: {
    slug: "hotels",
    icon: "hotel",
    color: "#1B4965",
    image: "/images/places/hotel-bulgaria.jpg",
  },
  cafes: {
    slug: "cafes",
    icon: "coffee",
    color: "#7A6352",
    image: "/images/places/cafe-roma.jpg",
  },
  restaurants: {
    slug: "restaurants",
    icon: "utensils",
    color: "#C75B39",
    image: "/images/places/restaurant-ethno.jpg",
  },
  nightlife: {
    slug: "nightlife",
    icon: "moon",
    color: "#2E1B5E",
    image: "/images/places/club-escape.jpg",
  },
  transport: {
    slug: "transport",
    icon: "bus",
    color: "#1A4A30",
    image: "/images/places/bus-station.jpg",
  },
  routes: {
    slug: "routes",
    icon: "map",
    color: "#B08A2A",
    image: "/images/places/mandrensko-trail.jpg",
  },
};

export const allCategories = {
  events: eventCategories,
  explore: exploreCategories,
  plan: planCategories,
} as const;
