"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/i18n/config";

interface TestimonialsProps {
  locale: Locale;
}

interface Testimonial {
  name: string;
  from: string;
  text: string;
  avatar: string;
  trip: string;
}

const testimonials: Record<string, Testimonial[]> = {
  en: [
    {
      name: "Elena Petrova",
      from: "Moscow, Russia",
      text: "Burgas surprised me with its charm. The Sea Garden is stunning, the beaches are pristine, and the locals are incredibly warm. We'll definitely come back next summer!",
      avatar: "/images/avatars/traveler-1.jpg",
      trip: "Family vacation, August 2025",
    },
    {
      name: "Thomas Weber",
      from: "Munich, Germany",
      text: "As a foodie, Burgas exceeded all my expectations. The restaurants offer amazing Black Sea cuisine at great prices. The old town walking tour was a highlight of our trip.",
      avatar: "/images/avatars/traveler-2.jpg",
      trip: "Couple getaway, July 2025",
    },
    {
      name: "Sophie Laurent",
      from: "Lyon, France",
      text: "We loved the Spirit of Burgas festival! The city has this perfect mix of beach life and culture. St. Anastasia Island was magical. A hidden gem of the Black Sea coast.",
      avatar: "/images/avatars/traveler-3.jpg",
      trip: "Friends trip, June 2025",
    },
    {
      name: "James Mitchell",
      from: "London, UK",
      text: "Incredible value for money. Beautiful beaches, excellent restaurants, and a charming old quarter. The weather was perfect throughout our stay. Highly recommended!",
      avatar: "/images/avatars/traveler-4.jpg",
      trip: "Solo travel, September 2025",
    },
  ],
  bg: [
    {
      name: "Елена Петрова",
      from: "Москва, Русия",
      text: "Бургас ме изненада с очарованието си. Морската градина е зашеметяваща, плажовете са чисти, а хората са невероятно топли. Определено ще се върнем следващото лято!",
      avatar: "/images/avatars/traveler-1.jpg",
      trip: "Семейна ваканция, август 2025",
    },
    {
      name: "Томас Вебер",
      from: "Мюнхен, Германия",
      text: "Като гурман, Бургас надмина всичките ми очаквания. Ресторантите предлагат невероятна черноморска кухня на страхотни цени. Пешеходната обиколка на стария град беше акцент.",
      avatar: "/images/avatars/traveler-2.jpg",
      trip: "Романтика за двама, юли 2025",
    },
    {
      name: "Софи Лоран",
      from: "Лион, Франция",
      text: "Обожавахме фестивала Spirit of Burgas! Градът има перфектния микс от плажен живот и култура. Остров Света Анастасия беше магичен. Скрито бижу на Черноморието.",
      avatar: "/images/avatars/traveler-3.jpg",
      trip: "Приятелско пътуване, юни 2025",
    },
    {
      name: "Джеймс Мичъл",
      from: "Лондон, Великобритания",
      text: "Невероятно съотношение цена-качество. Красиви плажове, отлични ресторанти и очарователен стар квартал. Времето беше перфектно през целия ни престой.",
      avatar: "/images/avatars/traveler-4.jpg",
      trip: "Самостоятелно пътуване, септември 2025",
    },
  ],
  ru: [
    {
      name: "Елена Петрова",
      from: "Москва, Россия",
      text: "Бургас удивил меня своим очарованием. Приморский парк великолепен, пляжи чистейшие, а местные жители невероятно радушны. Обязательно вернёмся следующим летом!",
      avatar: "/images/avatars/traveler-1.jpg",
      trip: "Семейный отдых, август 2025",
    },
    {
      name: "Томас Вебер",
      from: "Мюнхен, Германия",
      text: "Как гурман, Бургас превзошёл все мои ожидания. Рестораны предлагают удивительную черноморскую кухню по отличным ценам. Пешая экскурсия по старому городу — ярчайшее впечатление.",
      avatar: "/images/avatars/traveler-2.jpg",
      trip: "Романтический отдых, июль 2025",
    },
    {
      name: "Софи Лоран",
      from: "Лион, Франция",
      text: "Мы были в восторге от фестиваля Spirit of Burgas! Город идеально сочетает пляжный отдых и культуру. Остров Святой Анастасии был волшебным. Скрытая жемчужина Черноморья.",
      avatar: "/images/avatars/traveler-3.jpg",
      trip: "Поездка с друзьями, июнь 2025",
    },
    {
      name: "Джеймс Митчелл",
      from: "Лондон, Великобритания",
      text: "Невероятное соотношение цены и качества. Красивые пляжи, отличные рестораны и очаровательный старый квартал. Погода была идеальной на протяжении всего пребывания.",
      avatar: "/images/avatars/traveler-4.jpg",
      trip: "Путешествие соло, сентябрь 2025",
    },
  ],
};

const sectionLabels = {
  en: "Traveler\u2019s Journal",
  bg: "Дневник на пътешественика",
  ru: "Дневник путешественника",
};

const bgImages = [
  "/images/places/sea-garden.jpg",
  "/images/places/sea-casino.jpg",
  "/images/places/st-anastasia.jpg",
  "/images/hero-burgas.jpg",
];

export function Testimonials({ locale }: TestimonialsProps) {
  const items = testimonials[locale] || testimonials.en;
  const label = sectionLabels[locale as keyof typeof sectionLabels] || sectionLabels.en;
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items.length]);

  function goTo(idx: number) {
    setActive(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
  }

  const t = items[active];

  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[60vh] py-12 sm:py-0 sm:h-[60vh] lg:h-[65vh] overflow-hidden grain-overlay">
      {/* Background images with crossfade */}
      {bgImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: active === i ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-4xl px-4 sm:px-10 lg:px-20">
          {/* Section label */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
            {label}
          </p>

          {/* Pull quote */}
          <blockquote className="border-l-3 border-secondary pl-4 sm:pl-6">
            <p className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-[1.2] sm:leading-[1.15] italic tracking-tight">
              &ldquo;{t.text}&rdquo;
            </p>
          </blockquote>

          {/* Author */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white/10">
              <Image
                src={t.avatar}
                alt={t.name}
                fill
                className="object-cover"
                sizes="48px"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white/60">
                {t.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{t.name}</div>
              <div className="text-xs text-white/45">{t.from} &middot; {t.trip}</div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex gap-2 mt-6 sm:mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  active === i
                    ? "w-8 bg-secondary"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
