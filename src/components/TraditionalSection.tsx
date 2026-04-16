import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";
import recipeBeyaynetu from "@/assets/recipe-beyaynetu.jpg";
import recipeCoffee from "@/assets/recipe-coffee.jpg";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";

const dishes = [
  {
    title: "Beyaynetu", titleAm: "በያይነቱ",
    subtitle: "The Fasting Platter", subtitleAm: "የጾም ምግብ",
    description: "A colorful spread of vegetarian dishes served on injera — a staple of Ethiopian fasting tradition.",
    descriptionAm: "በእንጀራ ላይ የሚቀርብ ቀለማ ያለው የጾም ምግብ — የኢትዮጵያ የጾም ባህል ዋና ነው።",
    image: recipeBeyaynetu, slug: "beyaynetu",
  },
  {
    title: "Ethiopian Coffee", titleAm: "ቡና ሥነ ሥርዓት",
    subtitle: "Buna Ceremony", subtitleAm: "ቡና",
    description: "More than a drink — a sacred ritual of roasting, brewing, and sharing that brings people together.",
    descriptionAm: "ከመጠጥ በላይ — ሰዎችን የሚያገናኝ የማጠብሻ፣ የማፍላትና የመሰባሰብ ቅዱስ ሥነ ሥርዓት።",
    image: recipeCoffee, slug: "coffee-ceremony",
  },
  {
    title: "Doro Wot", titleAm: "ዶሮ ወጥ",
    subtitle: "The Queen of Stews", subtitleAm: "የወጥ ንግሥት",
    description: "A rich, spicy chicken stew slow-cooked with berbere spice and served on special occasions.",
    descriptionAm: "በበርበሬ ቅመም ቀስ ብሎ የተበሰለ ጣፋጭ የዶሮ ወጥ፣ በልዩ አጋጣሚዎች ይቀርባል።",
    image: recipeDoro, slug: "doro-wot",
  },
];

const t = {
  en: { badge: "Heritage", title: "Traditional Ethiopian", highlight: "Dishes", desc: "Recipes rooted in centuries of culinary tradition, brought to your kitchen with authentic flavors.", viewRecipe: "View Full Recipe →" },
  am: { badge: "ቅርስ", title: "ባህላዊ የኢትዮጵያ", highlight: "ምግቦች", desc: "ከዘመናት የምግብ ባህል ውስጥ ሥር የሰደዱ ትክክለኛ ጣዕም ያላቸው ምግቦች ወደ ኩሽናዎ።", viewRecipe: "ሙሉ ምግብ ይመልከቱ →" },
};

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative rounded-3xl overflow-hidden h-72 lg:h-96">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[120%] object-cover absolute top-0"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee/30 to-transparent" />
      {/* Hover shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-cream/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}

export function TraditionalSection() {
  const { lang } = useLanguage();
  const l = t[lang];

  return (
    <section id="traditional" className="py-28 bg-muted/40 relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <Leaf className="h-5 w-5 text-secondary" />
            </motion.div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            {l.title} <span className="text-secondary">{l.highlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">{l.desc}</p>
        </ScrollReveal>

        <div className="space-y-24">
          {dishes.map((dish, i) => (
            <div
              key={dish.title}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
            >
              <ScrollReveal className="flex-1 w-full" direction={i % 2 === 0 ? "left" : "right"}>
                <ParallaxImage src={dish.image} alt={dish.title} />
              </ScrollReveal>

              <ScrollReveal className="flex-1" delay={0.2} direction={i % 2 === 0 ? "right" : "left"}>
                <motion.span
                  className="text-primary font-medium text-sm font-body inline-block"
                  whileInView={{ opacity: [0, 1], x: [-20, 0] }}
                  viewport={{ once: true }}
                >
                  {lang === "en" ? dish.subtitle : dish.subtitleAm}
                </motion.span>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-5">
                  {lang === "en" ? dish.title : dish.titleAm}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-body">
                  {lang === "en" ? dish.description : dish.descriptionAm}
                </p>
                <Link to={`/recipe/${dish.slug}`}>
                  <motion.span
                    className="inline-flex items-center gap-2 font-medium text-primary font-body group"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {l.viewRecipe}
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
