import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
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

export function TraditionalSection() {
  const { lang } = useLanguage();
  const l = t[lang];

  return (
    <section id="traditional" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider font-body">{l.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {l.title} <span className="text-secondary">{l.highlight}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-body">{l.desc}</p>
        </motion.div>

        <div className="space-y-20">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              <div className="flex-1 w-full">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} className="relative rounded-3xl overflow-hidden group">
                  <img src={dish.image} alt={dish.title} loading="lazy" className="w-full h-72 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 to-transparent" />
                </motion.div>
              </div>
              <div className="flex-1">
                <span className="text-primary font-medium text-sm font-body">{lang === "en" ? dish.subtitle : dish.subtitleAm}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                  {lang === "en" ? dish.title : dish.titleAm}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-body">
                  {lang === "en" ? dish.description : dish.descriptionAm}
                </p>
                <Link to={`/recipe/${dish.slug}`} className="font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4 font-body">
                  {l.viewRecipe}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
