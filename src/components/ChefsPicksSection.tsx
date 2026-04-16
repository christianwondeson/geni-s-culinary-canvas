import { motion } from "framer-motion";
import { ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";
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
  const { lang } = useLanguage();
  const l = t[lang];

  return (
    <section id="chefs-picks" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <ChefHat className="h-5 w-5 text-spice-gold" />
                </motion.div>
                <span className="text-spice-gold font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
                {l.title} <span className="text-spice-gold">{l.highlight}</span>
              </h2>
            </div>
            <Link to="/#recipes">
              <motion.div whileHover={{ scale: 1.05, x: 4 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="mt-4 md:mt-0 rounded-full gap-2 font-body">
                  {l.viewAll} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {picks.map((pick, i) => (
            <Link to={`/recipe/${pick.slug}`} key={pick.title}>
              <ScrollReveal delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -12, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="relative group rounded-3xl overflow-hidden cursor-pointer h-[420px]"
                >
                  <motion.img
                    src={pick.image}
                    alt={pick.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee/95 via-coffee/40 to-transparent" />

                  {/* Animated tag */}
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  >
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-spice-gold text-accent-foreground font-body shadow-lg shadow-spice-gold/25">
                      {pick.tag}
                    </span>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <motion.h3
                      className="font-display text-2xl font-bold text-cream mb-2"
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                    >
                      {lang === "en" ? pick.title : pick.titleAm}
                    </motion.h3>
                    <p className="text-cream/70 text-sm font-body leading-relaxed">
                      {lang === "en" ? pick.desc : pick.descAm}
                    </p>

                    {/* Hover reveal arrow */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-spice-gold text-sm font-medium font-body"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {lang === "en" ? "View Recipe" : "ምግብ ይመልከቱ"} →
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
