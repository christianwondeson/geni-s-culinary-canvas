import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";
import recipeKitfo from "@/assets/recipe-kitfo.jpg";
import recipeTibs from "@/assets/recipe-tibs.jpg";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";

const picks = [
  { title: "Kitfo Special", titleAm: "ክትፎ ልዩ", desc: "Geni's signature take on the classic raw beef delicacy, served with mitmita and ayib.", descAm: "ጀኒ ልዩ ክትፎ ከሚጥሚጣና አይብ ጋር።", image: recipeKitfo, tag: "Signature", slug: "kitfo" },
  { title: "Awaze Tibs", titleAm: "አዋዜ ጥብስ", desc: "Sautéed beef with Geni's secret awaze sauce — sharp, smoky, three-pepper heat.", descAm: "በጀኒ ምስጢር አዋዜ ሶስ የተጠበሰ ስጋ።", image: recipeTibs, tag: "Exclusive", slug: "derek-tibs" },
  { title: "Royal Doro Wot", titleAm: "ንጉሣዊ ዶሮ ወጥ", desc: "Premium twelve-spice version, slow-cooked over five hours for holidays.", descAm: "ፕሪሚየም ከ12 ቅመም ጋር ቀስ ብሎ የተበሰለ።", image: recipeDoro, tag: "Premium", slug: "doro-wot" },
];

const t = {
  en: { kicker: "Curated by the Chef", title: "Three plates worth booking the day for", viewAll: "Browse the full menu →" },
  am: { kicker: "በሼፍ የተመረጡ", title: "ቀኑን ለማስያዝ የሚገባቸው ሦስት ምግቦች", viewAll: "ሁሉንም ምግቦች ይመልከቱ →" },
};

export function ChefsPicksSection() {
  const { lang } = useLanguage();
  const l = t[lang];

  return (
    <section id="chefs-picks" className="py-24 lg:py-32 border-t border-foreground/10 bg-muted/40 paper-grain">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="kicker text-spice-gold mb-5">{l.kicker}</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05]">
                {l.title}
              </h2>
            </div>
            <Link to="/#recipes" className="text-sm uppercase tracking-widest font-semibold text-primary hover:text-spice-gold font-body">
              {l.viewAll}
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {picks.map((pick, i) => (
            <ScrollReveal key={pick.title} delay={i * 0.12}>
              <Link to={`/recipe/${pick.slug}`} className="block group">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className={`relative ${i === 1 ? "tilt-right" : i === 0 ? "tilt-left" : ""}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-foreground">
                    <motion.img
                      src={pick.image}
                      alt={pick.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.0 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee/90 via-coffee/20 to-transparent" />

                    {/* Wax-stamp tag */}
                    <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-spice-gold flex items-center justify-center text-[10px] uppercase tracking-widest text-coffee font-body font-bold rotate-[-8deg] shadow-lg">
                      {pick.tag.slice(0, 3)}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-spice-gold font-body mb-2">
                        № 0{i + 1} · {pick.tag}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2 leading-tight">
                        {lang === "en" ? pick.title : pick.titleAm}
                      </h3>
                      <p className="text-cream/75 text-sm font-body leading-relaxed line-clamp-2">
                        {lang === "en" ? pick.desc : pick.descAm}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
