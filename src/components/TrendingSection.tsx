import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { RecipeCard } from "./RecipeCard";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";
import recipeKitfo from "@/assets/recipe-kitfo.jpg";
import recipeShiro from "@/assets/recipe-shiro.jpg";
import recipeTibs from "@/assets/recipe-tibs.jpg";

const trendingRecipes = [
  { title: "Doro Wot", image: recipeDoro, time: "2h", difficulty: "Medium" as const, rating: 4.9, category: "Traditional", slug: "doro-wot" },
  { title: "Kitfo", image: recipeKitfo, time: "30m", difficulty: "Medium" as const, rating: 4.8, category: "Chef's Special", slug: "kitfo" },
  { title: "Shiro Wot", image: recipeShiro, time: "45m", difficulty: "Easy" as const, rating: 4.7, category: "Vegan", slug: "shiro-wot" },
  { title: "Derek Tibs", image: recipeTibs, time: "35m", difficulty: "Easy" as const, rating: 4.6, category: "Quick Meals", slug: "derek-tibs" },
];

export function TrendingSection() {
  return (
    <section id="recipes" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-3"
        >
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-primary font-semibold text-sm uppercase tracking-wider font-body">Trending Now</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-foreground mb-12"
        >
          Most Loved <span className="text-primary">Recipes</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.title} {...recipe} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
