import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import { useLanguage } from "@/contexts/LanguageContext";
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
  { title: "Pasta Carbonara", image: recipePasta, time: "25m", difficulty: "Easy" as const, rating: 4.7, category: "International", slug: "pasta-carbonara" },
  { title: "Classic Smash Burger", image: recipeBurger, time: "20m", difficulty: "Easy" as const, rating: 4.8, category: "International", slug: "classic-burger" },
  { title: "Chicken Teriyaki", image: recipeTeriyaki, time: "30m", difficulty: "Easy" as const, rating: 4.6, category: "International", slug: "chicken-teriyaki" },
  { title: "Mexican Chicken Tacos", image: recipeTacos, time: "35m", difficulty: "Easy" as const, rating: 4.7, category: "International", slug: "chicken-tacos" },
];

export function TrendingSection() {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<"ethiopian" | "international">("ethiopian");
  const l = t[lang];

  return (
    <section id="recipes" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8"
        >
          {l.title} <span className="text-primary">{l.highlight}</span>
        </motion.h2>

        <div className="flex gap-2 mb-8">
          {(["ethiopian", "international"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t === "ethiopian" ? l.tab1 : l.tab2}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(tab === "ethiopian" ? ethiopianRecipes : internationalRecipes).map((recipe, i) => (
            <RecipeCard key={recipe.title} {...recipe} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
