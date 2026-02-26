import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

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

const months = {
  bg: ["Яну", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ru: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
};

const avgTemp = [3, 4, 7, 12, 17, 22, 25, 25, 21, 15, 10, 5];
const waterTemp = [7, 6, 7, 10, 16, 22, 24, 25, 22, 18, 14, 10];
const sunHours = [3, 4, 5, 7, 9, 10, 11, 10, 8, 6, 4, 3];

export default async function WeatherPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);
  const lang = locale as keyof typeof months;
  const monthNames = months[lang] || months.en;

  const seasonLabels = {
    bg: { spring: "Пролет (Мар–Май)", summer: "Лято (Юни–Авг)", autumn: "Есен (Сеп–Ное)", winter: "Зима (Дек–Фев)" },
    en: { spring: "Spring (Mar–May)", summer: "Summer (Jun–Aug)", autumn: "Autumn (Sep–Nov)", winter: "Winter (Dec–Feb)" },
    ru: { spring: "Весна (Мар–Май)", summer: "Лето (Июн–Авг)", autumn: "Осень (Сен–Ноя)", winter: "Зима (Дек–Фев)" },
  };
  const seasons = seasonLabels[lang] || seasonLabels.en;

  const seasonDesc = {
    bg: {
      spring: "Температурите се покачват, цветята разцъфтяват в Морската градина. Идеално за разходки и посещения на музеи. Фестивалът Флора Бургас е през май.",
      summer: "Перфектно време за плаж — топло и слънчево с водна температура 22-25°C. Фестивали, открити концерти и нощен живот. Най-натовареният сезон.",
      autumn: "Приятни температури за разходки. По-малко туристи, отлични цени. Бургас Фуд Фест и винени фестивали.",
      winter: "Меки зими с рядък сняг. Коледни базари в центъра. Идеално за спа в Акве Калиде и културни събития.",
    },
    en: {
      spring: "Temperatures rise, flowers bloom in the Sea Garden. Ideal for walks and museum visits. Flora Burgas Festival is in May.",
      summer: "Perfect beach weather — warm and sunny with water temperatures of 22-25°C. Festivals, open-air concerts, and nightlife. Peak season.",
      autumn: "Pleasant temperatures for sightseeing. Fewer tourists, excellent prices. Burgas Food Fest and wine festivals.",
      winter: "Mild winters with rare snow. Christmas markets in the center. Ideal for spa at Aquae Calidae and cultural events.",
    },
    ru: {
      spring: "Температура растёт, цветы распускаются в Приморском парке. Идеально для прогулок и посещения музеев. Фестиваль Флора Бургас в мае.",
      summer: "Идеальная пляжная погода — тепло и солнечно, температура воды 22-25°C. Фестивали, концерты под открытым небом и ночная жизнь. Пик сезона.",
      autumn: "Приятная температура для экскурсий. Меньше туристов, отличные цены. Бургас Фуд Фест и винные фестивали.",
      winter: "Мягкие зимы с редким снегом. Рождественские ярмарки в центре. Идеально для спа в Акве Калиде и культурных мероприятий.",
    },
  };
  const desc = seasonDesc[lang] || seasonDesc.en;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.weather.title },
        ]}
      />

      <h1 className="text-4xl font-bold text-text-primary mt-8 mb-12">{dict.weather.title}</h1>

      {/* Monthly Temperature Table */}
      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary text-text-inverse">
              <th className="px-3 py-2 text-left text-sm font-medium">
                {locale === "bg" ? "Месец" : locale === "ru" ? "Месяц" : "Month"}
              </th>
              {monthNames.map((m) => (
                <th key={m} className="px-3 py-2 text-center text-sm font-medium">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-surface-dim">
              <td className="px-3 py-2 text-sm font-medium">
                {locale === "bg" ? "Въздух °C" : locale === "ru" ? "Воздух °C" : "Air °C"}
              </td>
              {avgTemp.map((t, i) => (
                <td key={i} className="px-3 py-2 text-center text-sm">{t}°</td>
              ))}
            </tr>
            <tr>
              <td className="px-3 py-2 text-sm font-medium">
                {locale === "bg" ? "Вода °C" : locale === "ru" ? "Вода °C" : "Water °C"}
              </td>
              {waterTemp.map((t, i) => (
                <td key={i} className="px-3 py-2 text-center text-sm text-primary">{t}°</td>
              ))}
            </tr>
            <tr className="bg-surface-dim">
              <td className="px-3 py-2 text-sm font-medium">
                {locale === "bg" ? "Слънце ч." : locale === "ru" ? "Солнце ч." : "Sun hrs"}
              </td>
              {sunHours.map((h, i) => (
                <td key={i} className="px-3 py-2 text-center text-sm text-secondary">{h}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Seasonal Guide */}
      <h2 className="text-2xl font-semibold mb-8">
        {locale === "bg" ? "Сезонен пътеводител" : locale === "ru" ? "Сезонный путеводитель" : "Seasonal Guide"}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {(["spring", "summer", "autumn", "winter"] as const).map((season) => {
          const colors = {
            spring: "border-l-green-500 bg-green-50",
            summer: "border-l-secondary bg-amber-50",
            autumn: "border-l-orange-600 bg-orange-50",
            winter: "border-l-primary bg-blue-50",
          };
          return (
            <div key={season} className={`border-l-4 rounded-r-xl p-6 ${colors[season]}`}>
              <h3 className="font-semibold text-lg mb-2">{seasons[season]}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{desc[season]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
