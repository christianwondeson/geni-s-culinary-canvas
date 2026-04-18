import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  en: { kicker: "Chapter One — The Most Loved", title: "Recipes the community returns to", desc: "A rotating shortlist, refreshed weekly from what readers actually cook in their own kitchens.", tab1: "Ethiopian", tab2: "International" },
  am: { kicker: "ምዕራፍ ፩ — በጣም ተወዳጅ", title: "ማህበረሰቡ ደጋግሞ የሚያበስላቸው ምግቦች", desc: "በሳምንት የሚዘምን አጭር ዝርዝር።", tab1: "ኢትዮጵያ", tab2: "ዓለም አቀፍ" },
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
    <section id="recipes" className="py-24 lg:py-32 relative border-t border-foreground/10">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal>
          <div className="kicker text-primary mb-5">{l.kicker}</div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground max-w-2xl leading-[1.05]">
              {l.title}
            </h2>
            <p className="text-muted-foreground font-body max-w-sm md:text-right text-sm">{l.desc}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="ink-divider mb-12" />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-1 mb-12 border-b border-foreground/15">
            {(["ethiopian", "international"] as const).map((tab_) => (
              <button
                key={tab_}
                onClick={() => setTab(tab_)}
                className={`relative px-6 py-3 text-sm font-medium font-body uppercase tracking-wider transition-colors ${
                  tab === tab_ ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === tab_ && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {tab_ === "ethiopian" ? l.tab1 : l.tab2}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
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
