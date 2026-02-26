import type { Metadata } from "next";
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
  return { title: dict.weather.title, description: dict.weather.description };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ── Climate Data ──────────────────────────────────────── */
const monthNames = {
  bg: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
};

const avgTemp =   [ 3,  4,  7, 12, 17, 22, 25, 25, 21, 15, 10,  5];
const waterTemp = [ 7,  6,  7, 10, 16, 22, 24, 25, 22, 18, 14, 10];
const sunHours =  [ 3,  4,  5,  7,  9, 10, 11, 10,  8,  6,  4,  3];

/* Temp → color mapping (cold navy → aquamarine → warm gold → hot terracotta) */
function tempColor(t: number): string {
  if (t <= 5) return "#3D7A9E";
  if (t <= 10) return "#5FB49C";
  if (t <= 15) return "#7DC8B4";
  if (t <= 20) return "#D4A843";
  if (t <= 23) return "#D4795E";
  return "#C75B39";
}

/* ── i18n Labels ───────────────────────────────────────── */
const labels = {
  bg: {
    month: "Месец", air: "Въздух", water: "Вода", sun: "Слънце",
    rightNow: "Точно сега в Бургас", airTemp: "Температура на въздуха",
    waterTemp: "Температура на водата", sunHours: "Слънчеви часове",
    annualClimate: "Годишен климат", seasonGuide: "Сезонен пътеводител",
    hoursPerDay: "ч./ден", bestTime: "Кога е най-добре да посетите?",
    bestTimeDesc: "Лято (юни–септември) за плаж и фестивали. Пролет и есен за разходки с по-малко туристи и приятни цени.",
    planTrip: "Планирайте пътуването",
  },
  en: {
    month: "Month", air: "Air", water: "Water", sun: "Sun",
    rightNow: "Right now in Burgas", airTemp: "Air temperature",
    waterTemp: "Water temperature", sunHours: "Sunshine hours",
    annualClimate: "Annual Climate", seasonGuide: "Seasonal Guide",
    hoursPerDay: "hrs/day", bestTime: "When is the best time to visit?",
    bestTimeDesc: "Summer (June–September) for beach and festivals. Spring and autumn for sightseeing with fewer tourists and better prices.",
    planTrip: "Plan your trip",
  },
  ru: {
    month: "Месяц", air: "Воздух", water: "Вода", sun: "Солнце",
    rightNow: "Сейчас в Бургасе", airTemp: "Температура воздуха",
    waterTemp: "Температура воды", sunHours: "Солнечные часы",
    annualClimate: "Годовой климат", seasonGuide: "Сезонный путеводитель",
    hoursPerDay: "ч./день", bestTime: "Когда лучше всего посетить?",
    bestTimeDesc: "Лето (июнь–сентябрь) для пляжа и фестивалей. Весна и осень для экскурсий с меньшим количеством туристов и лучшими ценами.",
    planTrip: "Спланируйте поездку",
  },
};

/* Season icon type for SVG rendering */
type SeasonIcon = "spring" | "summer" | "autumn" | "winter";

const seasonData = {
  bg: [
    { key: "spring", name: "Пролет", months: "Март – Май", range: "7–17°C",
      desc: "Температурите се покачват, цветята разцъфтяват в Морската градина. Идеално за разходки и посещения на музеи. Фестивалът Флора Бургас е през май.",
      icon: "spring" as SeasonIcon, gradient: "from-emerald-400/80 to-teal/60" },
    { key: "summer", name: "Лято", months: "Юни – Август", range: "22–25°C",
      desc: "Перфектно време за плаж — топло и слънчево с водна температура 22–25°C. Фестивали, открити концерти и нощен живот. Най-натовареният сезон.",
      icon: "summer" as SeasonIcon, gradient: "from-secondary/80 to-accent/60" },
    { key: "autumn", name: "Есен", months: "Септември – Ноември", range: "10–21°C",
      desc: "Приятни температури за разходки. По-малко туристи, отлични цени. Бургас Фуд Фест и винени фестивали.",
      icon: "autumn" as SeasonIcon, gradient: "from-orange-500/80 to-secondary-dark/60" },
    { key: "winter", name: "Зима", months: "Декември – Февруари", range: "3–5°C",
      desc: "Меки зими с рядък сняг. Коледни базари в центъра. Идеално за спа в Акве Калиде и културни събития.",
      icon: "winter" as SeasonIcon, gradient: "from-primary/80 to-primary-dark/60" },
  ],
  en: [
    { key: "spring", name: "Spring", months: "March – May", range: "7–17°C",
      desc: "Temperatures rise, flowers bloom in the Sea Garden. Ideal for walks and museum visits. Flora Burgas Festival is in May.",
      icon: "spring" as SeasonIcon, gradient: "from-emerald-400/80 to-teal/60" },
    { key: "summer", name: "Summer", months: "June – August", range: "22–25°C",
      desc: "Perfect beach weather — warm and sunny with water temperatures of 22–25°C. Festivals, open-air concerts, and nightlife. Peak season.",
      icon: "summer" as SeasonIcon, gradient: "from-secondary/80 to-accent/60" },
    { key: "autumn", name: "Autumn", months: "September – November", range: "10–21°C",
      desc: "Pleasant temperatures for sightseeing. Fewer tourists, excellent prices. Burgas Food Fest and wine festivals.",
      icon: "autumn" as SeasonIcon, gradient: "from-orange-500/80 to-secondary-dark/60" },
    { key: "winter", name: "Winter", months: "December – February", range: "3–5°C",
      desc: "Mild winters with rare snow. Christmas markets in the center. Ideal for spa at Aquae Calidae and cultural events.",
      icon: "winter" as SeasonIcon, gradient: "from-primary/80 to-primary-dark/60" },
  ],
  ru: [
    { key: "spring", name: "Весна", months: "Март – Май", range: "7–17°C",
      desc: "Температура растёт, цветы распускаются в Приморском парке. Идеально для прогулок и посещения музеев. Фестиваль Флора Бургас в мае.",
      icon: "spring" as SeasonIcon, gradient: "from-emerald-400/80 to-teal/60" },
    { key: "summer", name: "Лето", months: "Июнь – Август", range: "22–25°C",
      desc: "Идеальная пляжная погода — тепло и солнечно, температура воды 22–25°C. Фестивали, концерты под открытым небом и ночная жизнь.",
      icon: "summer" as SeasonIcon, gradient: "from-secondary/80 to-accent/60" },
    { key: "autumn", name: "Осень", months: "Сентябрь – Ноябрь", range: "10–21°C",
      desc: "Приятная температура для экскурсий. Меньше туристов, отличные цены. Бургас Фуд Фест и винные фестивали.",
      icon: "autumn" as SeasonIcon, gradient: "from-orange-500/80 to-secondary-dark/60" },
    { key: "winter", name: "Зима", months: "Декабрь – Февраль", range: "3–5°C",
      desc: "Мягкие зимы с редким снегом. Рождественские ярмарки в центре. Идеально для спа в Акве Калиде.",
      icon: "winter" as SeasonIcon, gradient: "from-primary/80 to-primary-dark/60" },
  ],
};

function SeasonSvgIcon({ type }: { type: SeasonIcon }) {
  const p = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "text-white/90" };
  switch (type) {
    case "spring":
      return <svg {...p}><path d="M12 22c0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10 0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "summer":
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>;
    case "autumn":
      return <svg {...p}><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 17 3.5s-.3 2.5 2.8 6.5A7 7 0 0111 20z" /><path d="M11 13V7.5" /><path d="M8 16l3-3" /><path d="M14 10l-3 3" /></svg>;
    case "winter":
      return <svg {...p}><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /><line x1="19.07" y1="4.93" x2="4.93" y2="19.07" /><circle cx="12" cy="12" r="3" /></svg>;
  }
}

export default async function WeatherPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const lang = locale as "bg" | "en" | "ru";
  const months = monthNames[lang] || monthNames.en;
  const l = labels[lang] || labels.en;
  const seasons = seasonData[lang] || seasonData.en;

  const currentMonth = new Date().getMonth();
  const maxTemp = Math.max(...avgTemp);

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.weather.title },
  ];

  return (
    <>
      {/* ─── HERO ─── Atmospheric sky photo */}
      <PageHero
        title={dict.weather.title}
        subtitle={dict.weather.description}
        breadcrumbs={breadcrumbs}
        backgroundImage="/images/places/sarafovo-beach.jpg"
      />

      {/* ─── RIGHT NOW ─── Current month feature card */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-dark via-[#102C42] to-primary-dark p-8 md:p-12 text-white">
            {/* Decorative glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[100px] -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-teal/10 blur-[80px] translate-y-1/3 -translate-x-1/4" />

            <div className="relative">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50">
                {l.rightNow}
              </span>

              <div className="mt-6 grid sm:grid-cols-3 gap-8 sm:gap-6">
                {/* Air Temperature */}
                <div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-7xl md:text-8xl font-bold leading-none" style={{ color: tempColor(avgTemp[currentMonth]) }}>
                      {avgTemp[currentMonth]}°
                    </span>
                    <span className="text-sm text-white/40 mb-3">C</span>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{l.airTemp}</p>
                </div>

                {/* Water Temperature */}
                <div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-7xl md:text-8xl font-bold leading-none text-primary-light">
                      {waterTemp[currentMonth]}°
                    </span>
                    <span className="text-sm text-white/40 mb-3">C</span>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{l.waterTemp}</p>
                  {/* Mini wave decoration */}
                  <svg viewBox="0 0 120 12" className="mt-3 w-24 h-3 text-primary-light/30">
                    <path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>

                {/* Sun Hours */}
                <div>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-7xl md:text-8xl font-bold leading-none text-secondary">
                      {sunHours[currentMonth]}
                    </span>
                    <span className="text-sm text-white/40 mb-3">{l.hoursPerDay}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/50">{l.sunHours}</p>
                  {/* Mini sun rays */}
                  <div className="mt-3 flex gap-1">
                    {Array.from({ length: sunHours[currentMonth] }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-secondary/40" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ANNUAL CLIMATE CHART ─── Visual temperature bars */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mb-12">
            <div className="h-px w-16 bg-primary mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {l.annualClimate}
            </h2>
          </div>

          {/* Temperature Bar Chart */}
          <div className="rounded-2xl bg-surface-warm border border-border/50 p-6 md:p-8">
            {/* Air temperature bars */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{l.air} °C</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3 items-end h-[180px] sm:h-[220px]">
              {avgTemp.map((temp, i) => {
                const height = Math.max(12, (temp / maxTemp) * 100);
                const isActive = i === currentMonth;
                return (
                  <div key={i} className="flex flex-col items-center justify-end h-full gap-1.5">
                    {/* Value label */}
                    <span className={`text-[10px] sm:text-xs font-bold ${isActive ? "text-text-primary" : "text-text-muted"}`}>
                      {temp}°
                    </span>
                    {/* Bar */}
                    <div
                      className={`w-full rounded-t-lg transition-all ${isActive ? "ring-2 ring-offset-2 ring-primary/30" : ""}`}
                      style={{
                        height: `${height}%`,
                        backgroundColor: tempColor(temp),
                        opacity: isActive ? 1 : 0.7,
                      }}
                    />
                    {/* Month label */}
                    <span className={`text-[9px] sm:text-[10px] md:text-xs ${isActive ? "font-bold text-text-primary" : "text-text-muted"}`}>
                      {months[i]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Water temperature — wave-styled */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{l.water} °C</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3">
              {waterTemp.map((temp, i) => {
                const isActive = i === currentMonth;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-full h-10 sm:h-12 rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-bold text-white ${isActive ? "ring-2 ring-offset-1 ring-primary/40" : ""}`}
                      style={{
                        backgroundColor: tempColor(temp),
                        opacity: isActive ? 1 : 0.6,
                      }}
                    >
                      {temp}°
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-border" />

            {/* Sun hours — dot visualization */}
            <div className="mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{l.sun}</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 sm:gap-2 md:gap-3">
              {sunHours.map((hrs, i) => {
                const isActive = i === currentMonth;
                const size = 20 + (hrs / 11) * 28;
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${isActive ? "ring-2 ring-offset-1 ring-secondary/40" : ""}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: isActive ? "var(--color-secondary)" : `color-mix(in srgb, var(--color-secondary) ${30 + (hrs / 11) * 50}%, transparent)`,
                        color: isActive || hrs >= 8 ? "white" : "var(--color-secondary-dark)",
                      }}
                    >
                      {hrs}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEASONAL GUIDE ─── Immersive season cards */}
      <section className="bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mb-12">
            <div className="h-px w-16 bg-secondary mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {l.seasonGuide}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {seasons.map((season) => (
              <div
                key={season.key}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${season.gradient} p-7 md:p-8 text-white`}
              >
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <SeasonSvgIcon type={season.icon} />
                    <span className="font-display text-2xl md:text-3xl font-bold text-white/90">
                      {season.range}
                    </span>
                  </div>

                  <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                    {season.name}
                  </h3>
                  <span className="text-xs text-white/60 font-medium tracking-wide uppercase">
                    {season.months}
                  </span>

                  <p className="mt-4 text-sm text-white/80 leading-relaxed">
                    {season.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST TIME CTA ─── */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="relative overflow-hidden rounded-2xl bg-surface-dim border border-border/50 p-8 md:p-12">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-secondary/[0.04] blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative max-w-2xl">
              <span className="absolute -top-6 -left-3 font-display text-[120px] lg:text-[160px] leading-none text-secondary/[0.06] select-none pointer-events-none" aria-hidden="true">
                ?
              </span>

              <h2 className="relative font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {l.bestTime}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                {l.bestTimeDesc}
              </p>
              <Link
                href={`/${locale}/plan`}
                className="inline-flex items-center gap-2.5 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-surface-dark transition-all hover:bg-secondary-light hover:shadow-lg cursor-pointer"
              >
                {l.planTrip}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
