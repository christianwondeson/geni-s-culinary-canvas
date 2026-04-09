import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, Clock, Flame, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

const t = {
  en: {
    badge: "Chef's Collection",
    line1: "Cook Smarter",
    line2: "with",
    brand: "Geni's",
    line3: "Recipes",
    desc: "Discover authentic Ethiopian & international recipes passed down through generations. Step-by-step guides, cooking timers, and cultural stories.",
    search: "Search recipes, ingredients...",
    explore: "Explore",
    stat1: "200+ Recipes",
    stat2: "Quick & Easy",
    stat3: "Chef Approved",
  },
  am: {
    badge: "የሼፍ ስብስብ",
    line1: "በጥበብ ያብሱ",
    line2: "ከ",
    brand: "ጀኒ",
    line3: "ምግቦች ጋር",
    desc: "ከትውልድ ወደ ትውልድ የተላለፉ ትክክለኛ የኢትዮጵያና ዓለም አቀፍ ምግቦችን ያግኙ። ደረጃ በደረጃ መመሪያዎች፣ ሰዓት ቆጣሪዎችና ባህላዊ ታሪኮች።",
    search: "ምግቦች፣ ግብዓቶች ፈልግ...",
    explore: "ያስሱ",
    stat1: "200+ ምግቦች",
    stat2: "ፈጣንና ቀላል",
    stat3: "ሼፍ ያፀደቀ",
  },
};

const floatingItems = [
  { emoji: "🌶️", x: "10%", y: "20%", delay: 0 },
  { emoji: "🫚", x: "85%", y: "15%", delay: 1 },
  { emoji: "🧄", x: "75%", y: "70%", delay: 2 },
  { emoji: "🌿", x: "15%", y: "75%", delay: 0.5 },
  { emoji: "🍋", x: "90%", y: "45%", delay: 1.5 },
];

export function HeroSection() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Ethiopian cuisine spread" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/90 via-coffee/70 to-coffee/40" />
      </div>

      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl pointer-events-none select-none opacity-60"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Language Toggle */}
      <button
        onClick={() => setLang(lang === "en" ? "am" : "en")}
        className="absolute top-24 right-6 z-20 text-sm text-cream/70 hover:text-cream transition-colors font-body flex items-center gap-1 bg-cream/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
      >
        <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
      </button>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-cream text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-spice-gold text-spice-gold" /> {l.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-6"
          >
            {l.line1}<br />{l.line2} <span className="text-spice-gold">{l.brand}</span><br />{l.line3}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-cream/80 max-w-lg mb-8 font-body"
          >
            {l.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={l.search}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-cream/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body"
              />
            </div>
            <Button size="lg" className="rounded-2xl px-8 py-4 h-auto text-base font-semibold">
              {l.explore}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            {[
              { icon: Flame, label: l.stat1, color: "text-spice-gold" },
              { icon: Clock, label: l.stat2, color: "text-cream" },
              { icon: Star, label: l.stat3, color: "text-spice-gold" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-cream/70">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-cream/50" />
      </motion.div>
    </section>
  );
}
