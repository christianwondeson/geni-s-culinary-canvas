import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";
import recipeKitfo from "@/assets/recipe-kitfo.jpg";
import recipeShiro from "@/assets/recipe-shiro.jpg";
import recipeTibs from "@/assets/recipe-tibs.jpg";
import recipePasta from "@/assets/recipe-pasta-carbonara.jpg";
import recipeBurger from "@/assets/recipe-burger.jpg";
import recipeTeriyaki from "@/assets/recipe-teriyaki.jpg";
import recipeTacos from "@/assets/recipe-tacos.jpg";

const t = {
  en: { badge: "Trending Now", title: "Most Loved", highlight: "Recipes", tab1: "Ethiopian", tab2: "International" },
  am: { badge: "አሁን ተወዳጅ", title: "በጣም ተወዳጅ", highlight: "ምግቦች", tab1: "ኢትዮጵያ", tab2: "ዓለም አቀፍ" },
};

const ethiopianRecipes = [
  { title: "Doro Wot", image: recipeDoro, time: "2h", difficulty: "Medium" as const, rating: 4.9, category: "Traditional", slug: "doro-wot" },
  { title: "Kitfo", image: recipeKitfo, time: "30m", difficulty: "Medium" as const, rating: 4.8, category: "Chef's Special", slug: "kitfo" },
  { title: "Shiro Wot", image: recipeShiro, time: "45m", difficulty: "Easy" as const, rating: 4.7, category: "Vegan", slug: "shiro-wot" },
  { title: "Derek Tibs", image: recipeTibs, time: "35m", difficulty: "Easy" as const, rating: 4.6, category: "Quick Meals", slug: "derek-tibs" },
];

const internationalRecipes = [
  { title: "Pasta Carbonara", image: recipePasta, time: "25m", difficulty: "Easy" as const, rating: 4.7, category: "Italian", slug: "pasta-carbonara" },
  { title: "Classic Smash Burger", image: recipeBurger, time: "20m", difficulty: "Easy" as const, rating: 4.8, category: "American", slug: "classic-burger" },
  { title: "Chicken Teriyaki", image: recipeTeriyaki, time: "30m", difficulty: "Easy" as const, rating: 4.6, category: "Japanese", slug: "chicken-teriyaki" },
  { title: "Mexican Chicken Tacos", image: recipeTacos, time: "35m", difficulty: "Easy" as const, rating: 4.7, category: "Mexican", slug: "chicken-tacos" },
];

export function TrendingSection() {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<"ethiopian" | "international">("ethiopian");
  const l = t[lang];

  return (
    <section id="recipes" className="py-28 relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <TrendingUp className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-10">
            {l.title} <span className="text-primary">{l.highlight}</span>
          </h2>
        </ScrollReveal>

        {/* Tabs with animated indicator */}
        <ScrollReveal delay={0.2}>
          <div className="flex gap-2 mb-10 relative">
            {(["ethiopian", "international"] as const).map((t) => (
              <motion.button
                key={t}
                onClick={() => setTab(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-6 py-3 rounded-full text-sm font-medium font-body transition-colors duration-300 ${
                  tab === t
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === t && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t === "ethiopian" ? l.tab1 : l.tab2}</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(tab === "ethiopian" ? ethiopianRecipes : internationalRecipes).map((recipe, i) => (
              <RecipeCard key={recipe.title} {...recipe} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
