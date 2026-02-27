import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";

interface AIAssistantPromoProps {
  locale: Locale;
}

const content = {
  en: {
    title: "Your Local Insider",
    subtitle:
      "Wondering where locals eat fresh mussels at sunset? Curious about a secret beach only fishermen know? Ask our AI guide — it knows Burgas like a native.",
    cta: "Start a Conversation",
  },
  bg: {
    title: "Вашият местен познавач",
    subtitle:
      "Питате се къде местните ядат пресни миди на залез? Любопитни за таен плаж, който само рибарите знаят? Попитайте нашия AI гид — познава Бургас като местен.",
    cta: "Започнете разговор",
  },
  ru: {
    title: "Ваш местный знаток",
    subtitle:
      "Хотите узнать, где местные едят свежие мидии на закате? Интересует тайный пляж, известный только рыбакам? Спросите нашего AI-гида — он знает Бургас как местный.",
    cta: "Начать разговор",
  },
};

export function AIAssistantPromo({ locale }: AIAssistantPromoProps) {
  const t = content[locale] || content.en;

  return (
    <section className="relative min-h-[45vh] sm:min-h-0 sm:h-[55vh] lg:h-[60vh] py-12 sm:py-0 overflow-hidden grain-overlay">
      <div className="absolute inset-0">
        <Image
          src="/images/places/sea-garden.jpg"
          alt="Burgas Sea Garden"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/70 to-primary-dark/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-4 sm:px-10 lg:px-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-teal" />
            <div className="h-px w-6 bg-teal/50" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] italic tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/55 leading-relaxed max-w-xl">
            {t.subtitle}
          </p>

          <Link
            href={`/${locale}/chat`}
            className="mt-6 sm:mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-white/22 hover:border-white/35 cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
