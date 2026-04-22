import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, BookOpen, ChefHat, Utensils } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";

const t = {
  en: {
    badge: "How It Works",
    title: "From Craving to",
    highlight: "Cooking",
    desc: "Three simple steps to your next delicious meal.",
    steps: [
      { icon: Search, title: "Discover", desc: "Browse our curated collection of authentic Ethiopian and international recipes." },
      { icon: BookOpen, title: "Learn", desc: "Follow detailed, beginner-friendly step-by-step instructions with video guides." },
      { icon: ChefHat, title: "Cook", desc: "Use built-in timers and tips to create restaurant-quality dishes at home." },
      { icon: Utensils, title: "Enjoy", desc: "Share your creations with family and join our community of home chefs." },
    ],
  },
  am: {
    badge: "እንዴት ይሰራል",
    title: "ከፍላጎት ወደ",
    highlight: "ምግብ ማብሰል",
    desc: "ወደ ቀጣዩ ጣፋጭ ምግብ ሦስት ቀላል ደረጃዎች።",
    steps: [
      { icon: Search, title: "ያግኙ", desc: "ትክክለኛ የኢትዮጵያና ዓለም አቀፍ ምግቦችን ያስሱ።" },
      { icon: BookOpen, title: "ይማሩ", desc: "ለጀማሪ ተስማሚ ደረጃ በደረጃ መመሪያ ይከተሉ።" },
      { icon: ChefHat, title: "ያብሱ", desc: "ሰዓት ቆጣሪና ምክሮችን በመጠቀም ጥራት ያለው ምግብ ያዘጋጁ።" },
      { icon: Utensils, title: "ይደሰቱ", desc: "ፍጥረቶችዎን ከቤተሰብ ጋር ያጋሩ።" },
    ],
  },
};

export function HowItWorksSection() {
  const { lang } = useLanguage();
  const l = t[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal className="text-center mb-20 max-w-2xl mx-auto">
          <span className="kicker text-primary justify-center">Chapter II · {l.badge}</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-4 mb-5 leading-[1.05]">
            {l.title} <em className="text-primary not-italic font-medium italic">{l.highlight}</em>
          </h2>
          <div className="ink-divider mx-auto mb-5" />
          <p className="text-muted-foreground text-lg font-body leading-relaxed">{l.desc}</p>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border">
            <motion.div className="w-full bg-gradient-to-b from-primary to-accent" style={{ height: lineHeight }} />
          </div>

          {l.steps.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={i} delay={i * 0.1} direction={isEven ? "left" : "right"}>
                <div className={`relative flex items-center gap-8 mb-16 last:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 hidden md:block ${isEven ? "text-right" : "text-left"}`}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="inline-block glass-card p-8 max-w-sm"
                    >
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground font-body leading-relaxed">{step.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                    >
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Mobile content */}
                  <div className="flex-1 pl-24 md:hidden">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{step.desc}</p>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
