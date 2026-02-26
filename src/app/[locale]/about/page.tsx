import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PageHero } from "@/components/shared/PageHero";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.about.title,
    description: dict.about.description,
  };
}

/* ── Localized Content ──────────────────────────────────── */
const content = {
  en: {
    intro: "Burgas is the fourth largest city in Bulgaria, located on the southern Black Sea coast. With a population of approximately 210,000, it serves as the economic, cultural, and administrative center of southeastern Bulgaria.",
    locationTitle: "Location & Geography",
    locationText: "Situated on the westernmost point of the Bay of Burgas, the city is surrounded by three lakes — Atanasovsko, Burgas Lake (Vaya), and Mandrensko — which are home to over 250 bird species. The region enjoys a mild maritime climate with over 2,500 hours of sunshine per year, making it one of the sunniest places in Europe.",
    historyTitle: "History",
    historyText: "The area has been inhabited since antiquity. Ancient Thracian settlements and the Greek colony of Pyrgos lay the historical foundations of modern Burgas. Over the centuries, the city developed as a key port on the Black Sea, and today it is Bulgaria's largest port city.",
    cultureTitle: "Culture & Festivals",
    cultureText: "Burgas is known as a city of festivals. Every summer, the city hosts Spirit of Burgas (international music festival), the Sand Sculpture Festival on the Central Beach, Opera Open in the Sea Garden, and numerous art and theater events. The city boasts a vibrant cultural scene with the Burgas Opera, the Adriana Budevska Drama Theater, and a rich gallery network.",
    natureTitle: "Nature & Parks",
    natureText: "The Sea Garden (Morska Gradina) is a 7-kilometer park stretching along the coastline, featuring sculptures, fountains, playgrounds, and a summer theater. The Poda Protected Area, located just south of the city, is a bird sanctuary and one of the most important wetlands on the Bulgarian Black Sea coast.",
    climateTitle: "Climate & Best Time to Visit",
    climateText: "Burgas has a mild maritime climate with warm summers (average 27-30°C in July-August) and cool winters (3-5°C in January). The sea water temperature reaches 24-26°C during the summer months. The best time for a beach vacation is June through September, while spring and autumn offer pleasant weather for cultural tourism and nature walks.",
    economyTitle: "Economy & Transport",
    economyText: "Burgas is a major industrial and transport hub. The city has an international airport (BOJ) with direct flights to many European cities, a central railway station, and an extensive bus network. The port of Burgas is the largest on the Bulgarian Black Sea coast, handling cargo and passenger ferries.",
    factsTitle: "Burgas at a Glance",
    stats: { population: "210,000", area: "253.6", beaches: "20+", sunshine: "2,500+", lakes: "3", birds: "250+" },
    statLabels: { population: "Population", area: "km² area", beaches: "km of beaches", sunshine: "hours of sunshine", lakes: "Surrounding lakes", birds: "Bird species" },
    ctaExplore: "Explore the City",
    ctaPlan: "Plan Your Stay",
    ctaEvents: "See What's On",
  },
  bg: {
    intro: "Бургас е четвъртият по големина град в България, разположен на южното Черноморско крайбрежие. С население около 210 000 души, той е икономическият, културният и административният център на Югоизточна България.",
    locationTitle: "Местоположение и география",
    locationText: "Разположен на най-западната точка на Бургаския залив, градът е заобиколен от три езера — Атанасовско, Бургаско (Вая) и Мандренско — които са дом на над 250 вида птици. Регионът се радва на мек морски климат с над 2500 слънчеви часа годишно, което го прави едно от най-слънчевите места в Европа.",
    historyTitle: "История",
    historyText: "Районът е населяван от древността. Древните тракийски селища и гръцката колония Пиргос полагат историческите основи на съвременния Бургас. През вековете градът се развива като ключово пристанище на Черно море, а днес е най-големият пристанищен град в България.",
    cultureTitle: "Култура и фестивали",
    cultureText: "Бургас е известен като град на фестивалите. Всяко лято градът е домакин на Spirit of Burgas (международен музикален фестивал), Фестивала на пясъчните скулптури на Централния плаж, Opera Open в Морската градина, както и множество арт и театрални събития. Градът разполага с Бургаска опера, Драматичен театър \u201EАдриана Будевска\u201C и богата галерийна мрежа.",
    natureTitle: "Природа и паркове",
    natureText: "Морската градина е 7-километров парк, простиращ се покрай бреговата линия, с множество скулптури, фонтани, детски площадки и летен театър. Защитената местност Пода, разположена южно от града, е птичи резерват и едно от най-важните влажни зони по българското Черноморие.",
    climateTitle: "Климат и най-добро време за посещение",
    climateText: "Бургас има мек морски климат с топли лета (средно 27-30°C през юли-август) и меки зими (3-5°C през януари). Температурата на морската вода достига 24-26°C през летните месеци. Най-доброто време за плажна ваканция е от юни до септември, докато пролетта и есента предлагат приятно време за културен туризъм и разходки сред природата.",
    economyTitle: "Икономика и транспорт",
    economyText: "Бургас е голям индустриален и транспортен център. Градът разполага с международно летище (BOJ), централна ж.п. гара и обширна автобусна мрежа. Пристанището на Бургас е най-голямото по българското Черноморие.",
    factsTitle: "Бургас накратко",
    stats: { population: "210 000", area: "253,6", beaches: "20+", sunshine: "2 500+", lakes: "3", birds: "250+" },
    statLabels: { population: "Население", area: "km² площ", beaches: "km плажове", sunshine: "слънчеви часа", lakes: "Езера около града", birds: "Вида птици" },
    ctaExplore: "Разгледайте града",
    ctaPlan: "Планирайте престоя",
    ctaEvents: "Вижте събитията",
  },
  ru: {
    intro: "Бургас — четвёртый по величине город Болгарии, расположенный на южном побережье Чёрного моря. С населением около 210 000 человек, он является экономическим, культурным и административным центром юго-восточной Болгарии.",
    locationTitle: "Местоположение и география",
    locationText: "Расположенный в самой западной точке Бургасского залива, город окружён тремя озёрами — Атанасовское, Бургасское (Вая) и Мандренское — в которых обитает более 250 видов птиц. Регион отличается мягким морским климатом с более чем 2500 солнечными часами в год, что делает его одним из самых солнечных мест в Европе.",
    historyTitle: "История",
    historyText: "Этот район был населён с древних времён. Древние фракийские поселения и греческая колония Пиргос заложили исторические основы современного Бургаса. На протяжении веков город развивался как ключевой порт на Чёрном море, а сегодня является крупнейшим портовым городом Болгарии.",
    cultureTitle: "Культура и фестивали",
    cultureText: "Бургас известен как город фестивалей. Каждое лето здесь проходят Spirit of Burgas (международный музыкальный фестиваль), Фестиваль песчаных скульптур на Центральном пляже, Opera Open в Приморском парке, а также множество художественных и театральных мероприятий. В городе есть Бургасская опера, Драматический театр «Адриана Будевска» и богатая галерейная сеть.",
    natureTitle: "Природа и парки",
    natureText: "Приморский парк (Морска градина) — это 7-километровый парк вдоль береговой линии с множеством скульптур, фонтанов, детских площадок и летним театром. Охраняемая территория Пода, расположенная к югу от города, является птичьим заповедником и одним из важнейших водно-болотных угодий болгарского Черноморья.",
    climateTitle: "Климат и лучшее время для посещения",
    climateText: "Бургас имеет мягкий морской климат с тёплым летом (в среднем 27-30°C в июле-августе) и прохладной зимой (3-5°C в январе). Температура морской воды достигает 24-26°C летом. Лучшее время для пляжного отдыха — с июня по сентябрь, весна и осень идеальны для культурного туризма и прогулок на природе.",
    economyTitle: "Экономика и транспорт",
    economyText: "Бургас — крупный индустриальный и транспортный центр. В городе есть международный аэропорт (BOJ), центральный ж/д вокзал и разветвлённая автобусная сеть. Порт Бургаса — крупнейший на болгарском Черноморье.",
    factsTitle: "Бургас кратко",
    stats: { population: "210 000", area: "253,6", beaches: "20+", sunshine: "2 500+", lakes: "3", birds: "250+" },
    statLabels: { population: "Население", area: "км² площадь", beaches: "км пляжей", sunshine: "солнечных часов", lakes: "Озёра вокруг", birds: "Видов птиц" },
    ctaExplore: "Исследуйте город",
    ctaPlan: "Спланируйте визит",
    ctaEvents: "Смотрите события",
  },
} as const;

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const dict = await getDictionary(locale as Locale);
  const c = content[locale as keyof typeof content] ?? content.en;

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.about.title },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <PageHero
        title={dict.about.title}
        subtitle={c.intro}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/places/sea-garden.jpg"
      />

      {/* ─── STATS STRIP ─── Key facts as bold numbers */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {(Object.keys(c.stats) as (keyof typeof c.stats)[]).map((key) => (
              <div key={key} className="text-center">
                <span className="font-display text-3xl md:text-4xl font-bold text-primary">
                  {c.stats[key]}
                </span>
                <span className="block mt-1 text-xs font-medium text-text-muted uppercase tracking-wider">
                  {c.statLabels[key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATION ─── Photo left, text right */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-card-hover)]">
                <Image src="/images/places/lake-bridge.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 to-transparent" />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/15 -z-10" />
            </div>
            <div className="lg:col-span-7">
              <div className="h-px w-16 bg-primary mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">{c.locationTitle}</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{c.locationText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HISTORY ─── Text left, photo right (reversed) */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="h-px w-16 bg-secondary mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">{c.historyTitle}</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{c.historyText}</p>
            </div>
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-card-hover)]">
                <Image src="/images/places/aquae-calidae.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/15 to-transparent" />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-secondary/15 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CULTURE INTERLUDE ─── Full-bleed photo with quote */}
      <section className="relative h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden grain-overlay">
        <Image src="/images/events/spirit-of-burgas.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-2xl px-6 sm:px-12 lg:px-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">{c.cultureTitle}</h2>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed">{c.cultureText}</p>
          </div>
        </div>
      </section>

      {/* ─── NATURE ─── Photo left, text right */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-card-hover)]">
                <Image src="/images/places/poda.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal/15 to-transparent" />
              </div>
              <div className="hidden lg:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-teal/15 -z-10" />
            </div>
            <div className="lg:col-span-7">
              <div className="h-px w-16 bg-teal mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">{c.natureTitle}</h2>
              <p className="text-text-secondary leading-relaxed text-lg">{c.natureText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIMATE + TRANSPORT ─── Side by side cards */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-surface border border-border/50 p-8">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-3">{c.climateTitle}</h2>
              <p className="text-text-secondary leading-relaxed">{c.climateText}</p>
              <Link href={`/${locale}/weather`} className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                {dict.weather.title}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="rounded-2xl bg-surface border border-border/50 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-3">{c.economyTitle}</h2>
              <p className="text-text-secondary leading-relaxed">{c.economyText}</p>
              <Link href={`/${locale}/plan/transport`} className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors cursor-pointer">
                {dict.categories.transport}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CROSS-LINKS ─── Three photo-backed teasers */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid sm:grid-cols-3 gap-5">
            <Link href={`/${locale}/explore`} className="group relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer">
              <Image src="/images/places/cathedral.jpg" alt="" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" sizes="(max-width: 640px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{c.ctaExplore}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
            <Link href={`/${locale}/plan`} className="group relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer">
              <Image src="/images/places/restaurant-ethno.jpg" alt="" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" sizes="(max-width: 640px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-secondary" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{c.ctaPlan}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
            <Link href={`/${locale}/events`} className="group relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer">
              <Image src="/images/events/opera-open.jpg" alt="" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" sizes="(max-width: 640px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{c.ctaEvents}</h3>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  {dict.home.viewAll}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
