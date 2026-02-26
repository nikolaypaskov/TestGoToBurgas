import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHero } from "@/components/shared/PageHero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.description };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${typedLocale}` },
    { label: dict.contact.title },
  ];

  const c = dict.contact as Record<string, string>;

  return (
    <>
      {/* ─── HERO ─── Photo-backed with Alexandrovska street */}
      <PageHero
        title={dict.contact.title}
        subtitle={dict.contact.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/places/alexandrovska.jpg"
      />

      {/* ─── CONTACT CARDS ─── Two main offices + emergency */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* Tourism Information Center */}
            <div className="rounded-2xl bg-surface border border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
              {/* Accent header */}
              <div className="h-1.5 bg-primary" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl font-bold text-text-primary">{c.tourismCenter}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{c.tourismCenterDesc}</p>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.address}</div>
                      <div className="text-sm text-text-primary">{c.tourismAddress}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.phone}</div>
                      <a href="tel:+35956825772" className="text-sm text-primary font-medium hover:underline">+359 56 825 772</a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.email}</div>
                      <a href="mailto:tourism@burgas.bg" className="text-sm text-primary font-medium hover:underline">tourism@burgas.bg</a>
                    </div>
                  </div>

                  {/* Working hours */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.workingHours}</div>
                      <div className="text-sm text-text-primary">{c.workingHoursValue}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Municipality */}
            <div className="rounded-2xl bg-surface border border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
              <div className="h-1.5 bg-secondary" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-secondary/10">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl font-bold text-text-primary">{c.municipality}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{c.municipalityDesc}</p>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.address}</div>
                      <div className="text-sm text-text-primary">{c.municipalityAddress}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.phone}</div>
                      <a href="tel:+35956907200" className="text-sm text-primary font-medium hover:underline">+359 56 907 200</a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-text-muted opacity-60">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                    <div>
                      <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">{c.websiteLabel}</div>
                      <a href="https://burgas.bg" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-medium hover:underline">burgas.bg</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency */}
            <div className="rounded-2xl bg-surface border border-red-200/60 shadow-[var(--shadow-card)] overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="h-1.5 bg-red-500" />
              <div className="p-7 lg:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-red-50">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h2 className="font-display text-xl font-bold text-red-700">{c.emergencyTitle}</h2>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{c.emergencyDesc}</p>

                <div className="flex items-center gap-4 rounded-xl bg-red-50 p-5">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-red-600">{c.emergencyText}</div>
                    <a href="tel:112" className="font-display text-3xl font-bold text-red-700 hover:underline">112</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP AREA ─── Location context with embedded map */}
      <section className="bg-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Text side */}
            <div className="lg:col-span-5">
              <div className="h-px w-16 bg-primary mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary leading-[1.1] mb-4">
                {c.findUsTitle}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {c.findUsDesc}
              </p>

              {/* Quick address summary */}
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{c.tourismCenter}</div>
                    <div className="text-sm text-text-secondary">{c.tourismAddress}</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{c.municipality}</div>
                    <div className="text-sm text-text-secondary">{c.municipalityAddress}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-card-hover)] aspect-[4/3] lg:aspect-[16/10]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5880.821025849621!2d27.4685!3d42.4975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a69435e2e5d905%3A0x400a01269bf4e20!2sBurgas%20Center!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Burgas city center map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Photo-backed teasers */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Explore teaser */}
            <Link
              href={`/${typedLocale}/explore`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/sea-garden.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary-light mb-1.5">
                  {dict.nav.explore}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {c.ctaExplore}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {c.ctaExploreDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Events teaser */}
            <Link
              href={`/${typedLocale}/events`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/events/spirit-of-burgas.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-1.5">
                  {dict.nav.events}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {c.ctaEvents}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {c.ctaEventsDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Plan teaser */}
            <Link
              href={`/${typedLocale}/plan`}
              className="group relative h-[260px] sm:h-[320px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
            >
              <Image
                src="/images/places/hotel-bulgaria.jpg"
                alt=""
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-1.5">
                  {dict.nav.plan}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
                  {c.ctaPlan}
                </h3>
                <p className="text-xs text-white/55 max-w-xs mb-4 leading-relaxed line-clamp-2">
                  {c.ctaPlanDesc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
