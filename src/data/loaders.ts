import type { WebEvent, WebPlace, WebDeal, EventCategory, ExploreCategory, PlanCategory } from "@/lib/types";

import eventsData from "./seed/events.json";
import placesData from "./seed/places.json";
import servicesData from "./seed/services.json";
import dealsData from "./seed/deals.json";

const events = eventsData as WebEvent[];
const places = placesData as WebPlace[];
const services = servicesData as WebPlace[];
const deals = dealsData as WebDeal[];

// ── Events ──────────────────────────────────────────────

export function getAllEvents(): WebEvent[] {
  return events;
}

export function getEventsByCategory(category: EventCategory): WebEvent[] {
  return events.filter((e) => e.category === category);
}

export function getEventBySlug(slug: string): WebEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(limit = 4): WebEvent[] {
  return events.filter((e) => e.featured).slice(0, limit);
}

// ── Places (Explore) ────────────────────────────────────

export function getAllPlaces(): WebPlace[] {
  return places;
}

export function getPlacesByCategory(category: ExploreCategory): WebPlace[] {
  return places.filter((p) => p.category === category);
}

export function getPlaceBySlug(slug: string): WebPlace | undefined {
  return places.find((p) => p.slug === slug);
}

export function getFeaturedPlaces(limit = 4): WebPlace[] {
  return places.filter((p) => p.featured).slice(0, limit);
}

// ── Services (Plan) ─────────────────────────────────────

export function getAllServices(): WebPlace[] {
  return services;
}

export function getServicesByCategory(category: PlanCategory): WebPlace[] {
  return services.filter((s) => s.category === (category as unknown as ExploreCategory));
}

export function getServiceBySlug(slug: string): WebPlace | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(limit = 4): WebPlace[] {
  return services.filter((s) => s.featured).slice(0, limit);
}

// ── Deals ───────────────────────────────────────────────

export function getAllDeals(): WebDeal[] {
  return deals;
}

export function getDealBySlug(slug: string): WebDeal | undefined {
  return deals.find((d) => d.slug === slug);
}

export function getFeaturedDeals(limit = 3): WebDeal[] {
  return deals.filter((d) => d.featured).slice(0, limit);
}

// ── Related Items ───────────────────────────────────────

export function getRelatedEvents(event: WebEvent, limit = 3): WebEvent[] {
  return events
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, limit);
}

export function getRelatedPlaces(place: WebPlace, limit = 3): WebPlace[] {
  return places
    .filter((p) => p.id !== place.id && p.category === place.category)
    .slice(0, limit);
}

export function getRelatedServices(service: WebPlace, limit = 3): WebPlace[] {
  return services
    .filter((s) => s.id !== service.id && s.category === service.category)
    .slice(0, limit);
}
