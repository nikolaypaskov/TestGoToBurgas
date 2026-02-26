import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getFeaturedEvents, getFeaturedDeals, getFeaturedPlaces } from "@/data/loaders";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsStrip } from "@/components/home/HighlightsStrip";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { PostcardSection } from "@/components/home/PostcardSection";
import { ExploreCategories } from "@/components/home/ExploreCategories";
import { AIAssistantPromo } from "@/components/home/AIAssistantPromo";
import { DealsHighlight } from "@/components/home/DealsHighlight";
import { MustSeePlaces } from "@/components/home/MustSeePlaces";
import { AboutSection } from "@/components/home/AboutSection";
import { Testimonials } from "@/components/home/Testimonials";
import { TripPlannerCTA } from "@/components/home/TripPlannerCTA";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.site.name} — ${dict.site.tagline}`,
    description: dict.site.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;

  const dict = await getDictionary(typedLocale);
  const featuredEvents = getFeaturedEvents();
  const featuredDeals = getFeaturedDeals();
  const featuredPlaces = getFeaturedPlaces(6);

  return (
    <>
      {/* 1. Hero — cinematic slideshow with Ken Burns */}
      <HeroSection locale={typedLocale} dict={dict} />

      {/* 2. Highlights — animated stat cards overlapping hero */}
      <section className="relative -mt-12 z-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HighlightsStrip locale={typedLocale} />
        </div>
      </section>

      {/* 3. Featured Events — editorial magazine grid */}
      <section className="py-16 sm:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <FeaturedEvents events={featuredEvents} locale={typedLocale} dict={dict} />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Postcard — cinematic full-bleed photo break */}
      <ScrollReveal>
        <PostcardSection locale={typedLocale} dict={dict} />
      </ScrollReveal>

      {/* 5. Explore Categories — photo card grid */}
      <section className="relative py-16 sm:py-24 bg-surface-dim overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <ExploreCategories locale={typedLocale} dict={dict} />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. AI Assistant — dark section with animated chat mockup */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-surface-dark via-[#102C42] to-primary-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-secondary/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full bg-teal/8 blur-[100px]" />
        <ScrollReveal>
          <AIAssistantPromo locale={typedLocale} />
        </ScrollReveal>
      </section>

      {/* 7. Deals — ocean blue with featured spotlight */}
      <section className="py-16 sm:py-24 bg-primary overflow-hidden">
        <ScrollReveal>
          <DealsHighlight deals={featuredDeals} locale={typedLocale} dict={dict} />
        </ScrollReveal>
      </section>

      {/* 8. Must-See Places — horizontal portrait scroll with nav arrows */}
      <section className="py-16 sm:py-24 bg-surface-warm">
        <ScrollReveal>
          <MustSeePlaces places={featuredPlaces} locale={typedLocale} dict={dict} />
        </ScrollReveal>
      </section>

      {/* 9. Testimonials — traveler stories with aurora rating card */}
      <section className="py-16 sm:py-24 bg-surface">
        <ScrollReveal>
          <Testimonials locale={typedLocale} />
        </ScrollReveal>
      </section>

      {/* 10. Trip Planner CTA — step-by-step journey planner with aurora stats */}
      <section className="py-16 sm:py-24 bg-surface-warm">
        <ScrollReveal>
          <TripPlannerCTA locale={typedLocale} />
        </ScrollReveal>
      </section>

      {/* 11. About — full-bleed photo with glass stat cards */}
      <ScrollReveal>
        <AboutSection locale={typedLocale} dict={dict} />
      </ScrollReveal>

      {/* 10. Newsletter — gradient CTA */}
      <ScrollReveal>
        <NewsletterCTA locale={typedLocale} dict={dict} />
      </ScrollReveal>
    </>
  );
}
