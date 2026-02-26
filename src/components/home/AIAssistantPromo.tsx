"use client";

import { useState, useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";

interface AIAssistantPromoProps {
  locale: Locale;
}

const content = {
  en: {
    badge: "AI-Powered",
    title: "Your Personal City Guide",
    subtitle:
      "Ask anything about Burgas — beaches, restaurants, events, history, or travel tips. Available 24/7 in Bulgarian, English, and Russian.",
    cta: "Start a Conversation",
    features: [
      { label: "24/7 Available", desc: "Instant answers anytime" },
      { label: "3 Languages", desc: "BG, EN, and RU" },
      { label: "Local Knowledge", desc: "Insider tips and hidden gems" },
    ],
    chatUser: "What are the best beaches near the center?",
    chatAssistant:
      "Central Beach is just a 5-minute walk from the city center! For a quieter experience, try Sarafovo Beach — it's a short bus ride away and much less crowded.",
  },
  bg: {
    badge: "С изкуствен интелект",
    title: "Вашият личен гид за Бургас",
    subtitle:
      "Попитайте каквото и да е за Бургас — плажове, ресторанти, събития, история или съвети за пътуване. Достъпен 24/7 на български, английски и руски.",
    cta: "Започнете разговор",
    features: [
      { label: "24/7 достъпен", desc: "Мигновени отговори по всяко време" },
      { label: "3 езика", desc: "БГ, EN и RU" },
      { label: "Местни познания", desc: "Вътрешни съвети и скрити кътчета" },
    ],
    chatUser: "Кои са най-добрите плажове до центъра?",
    chatAssistant:
      "Централният плаж е на 5 минути пеша от центъра! За по-спокойно изживяване опитайте плаж Сарафово — кратко пътуване с автобус.",
  },
  ru: {
    badge: "На базе ИИ",
    title: "Ваш персональный гид по Бургасу",
    subtitle:
      "Спросите что угодно о Бургасе — пляжи, рестораны, события, история или советы для путешествий. Доступен 24/7 на болгарском, английском и русском.",
    cta: "Начать разговор",
    features: [
      { label: "Доступен 24/7", desc: "Мгновенные ответы в любое время" },
      { label: "3 языка", desc: "БГ, EN и RU" },
      { label: "Местные знания", desc: "Советы и скрытые жемчужины" },
    ],
    chatUser: "Какие лучшие пляжи рядом с центром?",
    chatAssistant:
      "Центральный пляж всего в 5 минутах ходьбы от центра! Для более спокойного отдыха попробуйте пляж Сарафово — короткая поездка на автобусе.",
  },
};

export function AIAssistantPromo({ locale }: AIAssistantPromoProps) {
  const t = content[locale] || content.en;

  return (
    <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Left: Text content */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/15 border border-teal/20 px-4 py-1.5 mb-6">
          <span className="h-2 w-2 rounded-full bg-teal animate-float" />
          <span className="text-xs font-semibold text-teal tracking-wide uppercase">
            {t.badge}
          </span>
        </div>

        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
          {t.title}
        </h2>

        <p className="mt-4 text-base text-white/55 leading-relaxed max-w-lg">
          {t.subtitle}
        </p>

        {/* Feature pills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {t.features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 rounded-xl bg-white/6 border border-white/10 px-4 py-2.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal shrink-0">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <span className="text-xs font-semibold text-white/80">{f.label}</span>
                <span className="text-xs text-white/40 ml-1.5 hidden sm:inline">— {f.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-teal px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-light hover:scale-[1.02] hover:shadow-xl cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          {t.cta}
        </button>
      </div>

      {/* Right: Phone mockup with animated chat */}
      <div className="flex justify-center lg:justify-end">
        <PhoneMockup locale={locale} userMsg={t.chatUser} assistantMsg={t.chatAssistant} />
      </div>
    </div>
  );
}

function PhoneMockup({
  locale,
  userMsg,
  assistantMsg,
}: {
  locale: Locale;
  userMsg: string;
  assistantMsg: string;
}) {
  const [showUser, setShowUser] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const triggered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => setShowUser(true), 400);
          setTimeout(() => setShowTyping(true), 1200);
          setTimeout(() => {
            setShowTyping(false);
            setShowAssistant(true);
          }, 2400);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const placeholder =
    locale === "bg"
      ? "Попитайте нещо..."
      : locale === "ru"
        ? "Спросите что-нибудь..."
        : "Ask something...";

  return (
    <div ref={containerRef} className="relative w-[300px] sm:w-[320px]">
      {/* Glow effect behind phone */}
      <div className="absolute inset-0 -m-6 rounded-[48px] bg-teal/10 blur-[40px]" />

      {/* Phone frame */}
      <div className="relative rounded-[36px] border-2 border-white/12 bg-surface-dark/80 backdrop-blur-sm p-4 shadow-hero">
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal" />
            <span className="text-[11px] font-medium text-white/45">
              Go to Burgas AI
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-white/25" />
            <div className="w-1 h-1 rounded-full bg-white/25" />
            <div className="w-1 h-1 rounded-full bg-white/25" />
          </div>
        </div>

        {/* Chat area */}
        <div className="space-y-3 px-1 min-h-[180px]">
          {/* User message */}
          <div
            className="flex justify-end transition-all duration-500"
            style={{
              opacity: showUser ? 1 : 0,
              transform: showUser ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5">
              <p className="text-xs text-white leading-relaxed">{userMsg}</p>
            </div>
          </div>

          {/* Typing indicator */}
          {showTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/40"
                      style={{
                        animation: `typingDot 1.4s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assistant message */}
          <div
            className="flex justify-start transition-all duration-500"
            style={{
              opacity: showAssistant ? 1 : 0,
              transform: showAssistant ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5">
              <p className="text-xs text-white/80 leading-relaxed">{assistantMsg}</p>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="mt-4 flex items-center gap-2 rounded-full bg-white/6 border border-white/8 px-4 py-2.5">
          <div className="flex-1 text-xs text-white/25">{placeholder}</div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal/50">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
