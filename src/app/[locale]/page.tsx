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
import { Testimonials } from "@/components/home/Testimonials";
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

      {/* 2. Editor's Picks — filmstrip overlapping hero */}
      <section className="relative -mt-12 z-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HighlightsStrip locale={typedLocale} />
        </div>
      </section>

      {/* 3. Featured Events — editorial magazine grid */}
      <section className="py-14 sm:py-20 bg-surface">
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

      {/* 5. Explore Categories — editorial mosaic */}
      <section className="py-14 sm:py-20 bg-surface-dim overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <ExploreCategories locale={typedLocale} dict={dict} />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. AI Assistant — full-bleed editorial section */}
      <ScrollReveal>
        <AIAssistantPromo locale={typedLocale} />
      </ScrollReveal>

      {/* 7. Deals — ocean blue with featured spotlight */}
      <section className="py-14 sm:py-20 bg-primary overflow-hidden">
        <ScrollReveal>
          <DealsHighlight deals={featuredDeals} locale={typedLocale} dict={dict} />
        </ScrollReveal>
      </section>

      {/* 8. Must-See Places — magazine portraits */}
      <section className="py-14 sm:py-20 bg-surface-warm">
        <ScrollReveal>
          <MustSeePlaces places={featuredPlaces} locale={typedLocale} dict={dict} />
        </ScrollReveal>
      </section>

      {/* 9. Testimonials — full-bleed pull quotes */}
      <ScrollReveal>
        <Testimonials locale={typedLocale} />
      </ScrollReveal>

      {/* 10. Newsletter — editorial closing CTA */}
      <ScrollReveal>
        <NewsletterCTA locale={typedLocale} dict={dict} />
      </ScrollReveal>
    </>
  );
}
