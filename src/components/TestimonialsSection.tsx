import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";

const t = {
  en: {
    badge: "What People Say",
    title: "Loved by Home",
    highlight: "Chefs",
  },
  am: {
    badge: "ሰዎች ምን ይላሉ",
    title: "የቤት ሼፎች",
    highlight: "ይወዱታል",
  },
};

const testimonials = [
  {
    name: "Hanna Tadesse",
    role: { en: "Home Cook, Addis Ababa", am: "የቤት ምግብ ሰሪ፣ አዲስ አበባ" },
    text: { en: "This app taught me how to cook Doro Wot exactly like my grandmother used to. The step-by-step videos are incredible for beginners!", am: "ይህ መተግበሪያ ዶሮ ወጥ እንደ አያቴ አብስሎ እንድሰራ አስተማረኝ። ደረጃ በደረጃ ቪዲዮዎቹ ለጀማሪዎች ድንቅ ናቸው!" },
    avatar: "H",
    rating: 5,
  },
  {
    name: "Samuel Kebede",
    role: { en: "Student, Bahir Dar", am: "ተማሪ፣ ባህር ዳር" },
    text: { en: "I went from burning rice to making Kitfo and Pasta Carbonara. The cooking timers are a lifesaver. Best ብር I've ever spent!", am: "ሩዝ ከማቃጠል ክትፎና ፓስታ ካርቦናራ ወደ መስራት ተሸጋግሬያለሁ። ሰዓት ቆጣሪዎቹ ድንቅ ናቸው!" },
    avatar: "S",
    rating: 5,
  },
  {
    name: "Meron Alemu",
    role: { en: "Food Blogger, Hawassa", am: "የምግብ ብሎገር፣ ሀዋሳ" },
    text: { en: "The international recipes section is amazing. I cook Ethiopian for weekdays and explore Italian, Mexican on weekends. My family loves it!", am: "ዓለም አቀፍ ምግቦች ክፍሉ ድንቅ ነው። በሳምንት ውስጥ ኢትዮጵያ በሳምንት መጨረሻ ጣልያንና ሜክሲኮ እሰራለሁ!" },
    avatar: "M",
    rating: 5,
  },
  {
    name: "Dawit Tesfaye",
    role: { en: "Chef, Dire Dawa", am: "ሼፍ፣ ድሬ ዳዋ" },
    text: { en: "Even as a professional chef, I learned new techniques from these recipes. The cultural stories behind each dish add so much depth.", am: "ባለሙያ ሼፍ ሆኜም ከእነዚህ ምግቦች አዲስ ቴክኒኮችን ተምሬያለሁ። የባህል ታሪኮቹ ጥልቀት ይጨምራሉ።" },
    avatar: "D",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { lang } = useLanguage();
  const l = t[lang];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-3">
            {l.title} <span className="text-secondary">{l.highlight}</span>
          </h2>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-card p-10 md:p-14 text-center relative"
            >
              <Quote className="absolute top-6 left-8 h-10 w-10 text-primary/10" />

              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 500 }}
                  >
                    <Star className="h-5 w-5 fill-spice-gold text-spice-gold" />
                  </motion.div>
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground leading-relaxed font-body mb-8">
                "{testimonials[current].text[lang]}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                  {testimonials[current].avatar}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground font-body">{testimonials[current].role[lang]}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === current ? 32 : 8 }}
                >
                  <div className="absolute inset-0 bg-border" />
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="testimonialDot"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
