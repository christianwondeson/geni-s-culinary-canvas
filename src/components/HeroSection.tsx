import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown, Clock, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import heroImage from "@/assets/hero-food.jpg";
import { SearchModal } from "./SearchModal";

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
  { emoji: "🌶️", x: "10%", y: "20%", delay: 0, size: "text-5xl md:text-7xl" },
  { emoji: "🫚", x: "82%", y: "12%", delay: 1, size: "text-4xl md:text-6xl" },
  { emoji: "🧄", x: "75%", y: "68%", delay: 2, size: "text-3xl md:text-5xl" },
  { emoji: "🌿", x: "12%", y: "72%", delay: 0.5, size: "text-4xl md:text-6xl" },
  { emoji: "🍋", x: "88%", y: "42%", delay: 1.5, size: "text-3xl md:text-5xl" },
  { emoji: "☕", x: "50%", y: "8%", delay: 0.8, size: "text-3xl md:text-4xl" },
];

const wordAnimation = {
  hidden: { opacity: 0, y: 50, rotateX: -45 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] },
  }),
};

export function HeroSection() {
  const { lang } = useLanguage();
  const l = t[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleExplore = () => {
    const target = document.getElementById("recipes") || document.getElementById("trending");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroImage} alt="Ethiopian cuisine spread" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/95 via-coffee/75 to-coffee/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating spice emojis with parallax */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none`}
          style={{ left: item.x, top: item.y, opacity }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 + item.delay * 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.span
            className="block"
            animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.emoji}
          </motion.span>
        </motion.div>
      ))}

      <motion.div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24" style={{ y: textY }}>
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-md text-cream text-sm font-medium mb-8 border border-primary/10">
              <motion.span animate={{ rotate: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Star className="h-4 w-4 fill-spice-gold text-spice-gold" />
              </motion.span>
              {l.badge}
            </span>
          </motion.div>

          {/* Headline with word-by-word reveal */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-6" style={{ perspective: "600px" }}>
            {[l.line1].map((word, i) => (
              <motion.span key={`l1-${i}`} custom={i} variants={wordAnimation} initial="hidden" animate="visible" className="inline-block mr-3">
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span custom={2} variants={wordAnimation} initial="hidden" animate="visible" className="inline-block mr-3">
              {l.line2}
            </motion.span>
            <motion.span
              custom={3}
              variants={wordAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block text-spice-gold relative"
            >
              {l.brand}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-spice-gold/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </motion.span>
            <br />
            <motion.span custom={4} variants={wordAnimation} initial="hidden" animate="visible" className="inline-block">
              {l.line3}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-cream/80 max-w-lg mb-10 font-body leading-relaxed"
          >
            {l.desc}
          </motion.p>

          {/* Search + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <motion.div className="flex-1 relative" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={l.search}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-cream/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body shadow-xl shadow-coffee/20 transition-shadow focus:shadow-2xl focus:shadow-primary/10"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="rounded-2xl px-8 py-4 h-auto text-base font-semibold shadow-xl shadow-primary/30">
                {l.explore}
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats with staggered reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap gap-8 mt-12"
          >
            {[
              { icon: Flame, label: l.stat1, color: "text-spice-gold" },
              { icon: Clock, label: l.stat2, color: "text-cream" },
              { icon: Star, label: l.stat3, color: "text-spice-gold" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.3 + i * 0.15, type: "spring", stiffness: 200 }}
                className="flex items-center gap-2.5 text-cream/70"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </motion.div>
                <span className="text-sm font-medium tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-cream/40 text-xs font-body tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
