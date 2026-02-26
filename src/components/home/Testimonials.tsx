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
  rating: number;
  trip: string;
}

const testimonials: Record<string, Testimonial[]> = {
  en: [
    {
      name: "Elena Petrova",
      from: "Moscow, Russia",
      text: "Burgas surprised me with its charm. The Sea Garden is stunning, the beaches are pristine, and the locals are incredibly warm. We'll definitely come back next summer!",
      avatar: "/images/avatars/traveler-1.jpg",
      rating: 5,
      trip: "Family vacation, August 2025",
    },
    {
      name: "Thomas Weber",
      from: "Munich, Germany",
      text: "As a foodie, Burgas exceeded all my expectations. The restaurants offer amazing Black Sea cuisine at great prices. The old town walking tour was a highlight of our trip.",
      avatar: "/images/avatars/traveler-2.jpg",
      rating: 5,
      trip: "Couple getaway, July 2025",
    },
    {
      name: "Sophie Laurent",
      from: "Lyon, France",
      text: "We loved the Spirit of Burgas festival! The city has this perfect mix of beach life and culture. St. Anastasia Island was magical. A hidden gem of the Black Sea coast.",
      avatar: "/images/avatars/traveler-3.jpg",
      rating: 5,
      trip: "Friends trip, June 2025",
    },
    {
      name: "James Mitchell",
      from: "London, UK",
      text: "Incredible value for money. Beautiful beaches, excellent restaurants, and a charming old quarter. The weather was perfect throughout our stay. Highly recommended!",
      avatar: "/images/avatars/traveler-4.jpg",
      rating: 4,
      trip: "Solo travel, September 2025",
    },
  ],
  bg: [
    {
      name: "Елена Петрова",
      from: "Москва, Русия",
      text: "Бургас ме изненада с очарованието си. Морската градина е зашеметяваща, плажовете са чисти, а хората са невероятно топли. Определено ще се върнем следващото лято!",
      avatar: "/images/avatars/traveler-1.jpg",
      rating: 5,
      trip: "Семейна ваканция, август 2025",
    },
    {
      name: "Томас Вебер",
      from: "Мюнхен, Германия",
      text: "Като гурман, Бургас надмина всичките ми очаквания. Ресторантите предлагат невероятна черноморска кухня на страхотни цени. Пешеходната обиколка на стария град беше акцент.",
      avatar: "/images/avatars/traveler-2.jpg",
      rating: 5,
      trip: "Романтика за двама, юли 2025",
    },
    {
      name: "Софи Лоран",
      from: "Лион, Франция",
      text: "Обожавахме фестивала Spirit of Burgas! Градът има перфектния микс от плажен живот и култура. Остров Света Анастасия беше магичен. Скрито бижу на Черноморието.",
      avatar: "/images/avatars/traveler-3.jpg",
      rating: 5,
      trip: "Приятелско пътуване, юни 2025",
    },
    {
      name: "Джеймс Мичъл",
      from: "Лондон, Великобритания",
      text: "Невероятно съотношение цена-качество. Красиви плажове, отлични ресторанти и очарователен стар квартал. Времето беше перфектно през целия ни престой.",
      avatar: "/images/avatars/traveler-4.jpg",
      rating: 4,
      trip: "Самостоятелно пътуване, септември 2025",
    },
  ],
  ru: [
    {
      name: "Елена Петрова",
      from: "Москва, Россия",
      text: "Бургас удивил меня своим очарованием. Приморский парк великолепен, пляжи чистейшие, а местные жители невероятно радушны. Обязательно вернёмся следующим летом!",
      avatar: "/images/avatars/traveler-1.jpg",
      rating: 5,
      trip: "Семейный отдых, август 2025",
    },
    {
      name: "Томас Вебер",
      from: "Мюнхен, Германия",
      text: "Как гурман, Бургас превзошёл все мои ожидания. Рестораны предлагают удивительную черноморскую кухню по отличным ценам. Пешая экскурсия по старому городу — ярчайшее впечатление.",
      avatar: "/images/avatars/traveler-2.jpg",
      rating: 5,
      trip: "Романтический отдых, июль 2025",
    },
    {
      name: "Софи Лоран",
      from: "Лион, Франция",
      text: "Мы были в восторге от фестиваля Spirit of Burgas! Город идеально сочетает пляжный отдых и культуру. Остров Святой Анастасии был волшебным. Скрытая жемчужина Черноморья.",
      avatar: "/images/avatars/traveler-3.jpg",
      rating: 5,
      trip: "Поездка с друзьями, июнь 2025",
    },
    {
      name: "Джеймс Митчелл",
      from: "Лондон, Великобритания",
      text: "Невероятное соотношение цены и качества. Красивые пляжи, отличные рестораны и очаровательный старый квартал. Погода была идеальной на протяжении всего пребывания.",
      avatar: "/images/avatars/traveler-4.jpg",
      rating: 4,
      trip: "Путешествие соло, сентябрь 2025",
    },
  ],
};

const sectionLabels = {
  en: { badge: "Traveler Stories", title: "Loved by Visitors from Around the World", stat: "4.8", statLabel: "Average rating" },
  bg: { badge: "Истории на пътешественици", title: "Обичан от посетители от цял свят", stat: "4.8", statLabel: "Средна оценка" },
  ru: { badge: "Истории путешественников", title: "Любим гостями со всего мира", stat: "4.8", statLabel: "Средний рейтинг" },
};

export function Testimonials({ locale }: TestimonialsProps) {
  const items = testimonials[locale] || testimonials.en;
  const labels = sectionLabels[locale as keyof typeof sectionLabels] || sectionLabels.en;
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [items.length]);

  function goTo(idx: number) {
    setActive(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 5000);
  }

  const t = items[active];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 mb-5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xs font-semibold text-secondary tracking-wide uppercase">{labels.badge}</span>
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight italic">
          {labels.title}
        </h2>
      </div>

      {/* Testimonial display */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: active testimonial card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[var(--radius-card)] bg-surface border border-border/50 shadow-[var(--shadow-card)] p-8 md:p-10">
            {/* Aurora accent glow behind card */}
            <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-br from-teal/10 via-secondary/5 to-accent/10 blur-sm -z-10" />

            {/* Quote mark */}
            <span className="absolute -top-4 left-8 font-display text-[100px] leading-none text-primary/[0.07] select-none pointer-events-none" aria-hidden="true">
              &ldquo;
            </span>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < t.rating ? "var(--color-secondary)" : "none"} stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="relative font-display text-xl md:text-2xl text-text-primary leading-relaxed italic min-h-[120px]">
              {t.text}
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-surface-dim ring-2 ring-primary/20">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                {/* Fallback initials */}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary bg-primary/10">
                  {t.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="font-semibold text-text-primary text-sm">{t.name}</div>
                <div className="text-xs text-text-muted">{t.from}</div>
                <div className="text-xs text-text-muted mt-0.5">{t.trip}</div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-8">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    active === i
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-text-muted"
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: rating summary + mini cards */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Big rating card with aurora gradient */}
          <div className="relative overflow-hidden rounded-[var(--radius-card)] p-8 text-white aurora-bg">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl md:text-7xl font-bold">{labels.stat}</span>
                <span className="text-white/50 text-lg">/5</span>
              </div>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < 5 ? "white" : "none"} stroke="white" strokeWidth="2" opacity={i < 5 ? 0.9 : 0.3}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/60">{labels.statLabel}</p>
            </div>
          </div>

          {/* Mini testimonial preview cards */}
          {items.slice(0, 3).map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 cursor-pointer ${
                active === i
                  ? "bg-primary/5 border border-primary/20 shadow-sm"
                  : "bg-surface border border-border/50 hover:bg-surface-dim"
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-surface-dim shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary bg-primary/10">
                  {item.name.charAt(0)}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text-primary truncate">{item.name}</div>
                <div className="text-xs text-text-muted truncate">{item.text.slice(0, 60)}...</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
