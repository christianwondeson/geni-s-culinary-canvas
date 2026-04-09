import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import recipeKitfo from "@/assets/recipe-kitfo.jpg";
import recipeTibs from "@/assets/recipe-tibs.jpg";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";

const picks = [
  { title: "Kitfo Special", titleAm: "ክትፎ ልዩ", desc: "Geni's signature take on the classic raw beef delicacy", descAm: "ጀኒ ልዩ ክትፎ", image: recipeKitfo, tag: "Signature", slug: "kitfo" },
  { title: "Awaze Tibs", titleAm: "አዋዜ ጥብስ", desc: "Sautéed beef with Geni's secret awaze sauce", descAm: "በጀኒ ምስጢር አዋዜ ሶስ የተጠበሰ ስጋ", image: recipeTibs, tag: "Exclusive", slug: "derek-tibs" },
  { title: "Royal Doro Wot", titleAm: "ንጉሣዊ ዶሮ ወጥ", desc: "A premium, slow-cooked version with 12 spices", descAm: "ፕሪሚየም ከ12 ቅመም ጋር ቀስ ብሎ የተበሰለ", image: recipeDoro, tag: "Premium", slug: "doro-wot" },
];

const t = {
  en: { badge: "Curated", title: "Chef's", highlight: "Special Picks", viewAll: "View All" },
  am: { badge: "የተመረጡ", title: "የሼፍ", highlight: "ልዩ ምርጫዎች", viewAll: "ሁሉንም ይመልከቱ" },
};

export function ChefsPicksSection() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

  return (
    <section id="chefs-picks" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="h-5 w-5 text-spice-gold" />
              <span className="text-spice-gold font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
              <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="ml-4 text-sm text-primary hover:underline font-body flex items-center gap-1">
                <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
              </button>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              {l.title} <span className="text-spice-gold">{l.highlight}</span>
            </h2>
          </div>
          <Link to="/#recipes">
            <Button variant="outline" className="mt-4 md:mt-0 rounded-full gap-2 font-body">
              {l.viewAll} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {picks.map((pick, i) => (
            <Link to={`/recipe/${pick.slug}`} key={pick.title}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="relative group rounded-3xl overflow-hidden cursor-pointer h-96"
              >
                <img src={pick.image} alt={pick.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee/90 via-coffee/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-spice-gold text-accent-foreground font-body">{pick.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-cream mb-2">{lang === "en" ? pick.title : pick.titleAm}</h3>
                  <p className="text-cream/70 text-sm font-body">{lang === "en" ? pick.desc : pick.descAm}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
