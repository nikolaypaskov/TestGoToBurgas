import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllEvents, getAllPlaces, getAllServices, getAllDeals } from "@/data/loaders";
import { eventCategories, exploreCategories, planCategories } from "@/lib/categories";

const BASE_URL = "https://gotoburgas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Static pages
    entries.push(
      { url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
      { url: `${BASE_URL}/${locale}/events`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
      { url: `${BASE_URL}/${locale}/explore`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/${locale}/plan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${BASE_URL}/${locale}/deals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
      { url: `${BASE_URL}/${locale}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
      { url: `${BASE_URL}/${locale}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
      { url: `${BASE_URL}/${locale}/weather`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    );

    // Event categories
    for (const cat of Object.keys(eventCategories)) {
      entries.push({ url: `${BASE_URL}/${locale}/events/${cat}`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 });
    }

    // Explore categories
    for (const cat of Object.keys(exploreCategories)) {
      entries.push({ url: `${BASE_URL}/${locale}/explore/${cat}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 });
    }

    // Plan categories
    for (const cat of Object.keys(planCategories)) {
      entries.push({ url: `${BASE_URL}/${locale}/plan/${cat}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 });
    }

    // Event detail pages
    for (const event of getAllEvents()) {
      entries.push({ url: `${BASE_URL}/${locale}/events/${event.category}/${event.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 });
    }

    // Place detail pages
    for (const place of getAllPlaces()) {
      entries.push({ url: `${BASE_URL}/${locale}/explore/${place.category}/${place.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 });
    }

    // Service detail pages
    for (const service of getAllServices()) {
      entries.push({ url: `${BASE_URL}/${locale}/plan/${service.category}/${service.slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 });
    }

    // Deal detail pages
    for (const deal of getAllDeals()) {
      entries.push({ url: `${BASE_URL}/${locale}/deals/${deal.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 });
    }
  }

  return entries;
}
