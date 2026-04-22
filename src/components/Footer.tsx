import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";

const t = {
  en: {
    tagline: "Authentic Ethiopian & international recipes, crafted with love and tradition.",
    recipes: "Recipes", explore: "Explore", support: "Support",
    allRecipes: "All Recipes", traditional: "Traditional", chefsPicks: "Chef's Picks", pricing: "Pricing",
    helpCenter: "Help Center", privacy: "Privacy Policy", terms: "Terms of Service", faq: "FAQ",
    rights: "© 2026 Geni's Recipe. All rights reserved.",
    madeWith: "Made with",
    inEthiopia: "in Ethiopia",
  },
  am: {
    tagline: "ትክክለኛ የኢትዮጵያና ዓለም አቀፍ ምግቦች በፍቅርና ባህል የተዘጋጁ።",
    recipes: "ምግቦች", explore: "ያስሱ", support: "ድጋፍ",
    allRecipes: "ሁሉም ምግቦች", traditional: "ባህላዊ", chefsPicks: "የሼፍ ምርጫ", pricing: "ዋጋ",
    helpCenter: "የእርዳታ ማዕከል", privacy: "የግላዊነት ፖሊሲ", terms: "የአገልግሎት ውሎች", faq: "ተደጋጋሚ ጥያቄዎች",
    rights: "© 2026 ጀኒ ምግብ። ሁሉም መብቶች የተጠበቁ ናቸው።",
    madeWith: "የተሰራው በ",
    inEthiopia: "ኢትዮጵያ ውስጥ",
  },
};

const recipeLinksData = [
  { en: "Doro Wot", am: "ዶሮ ወጥ", href: "/recipe/doro-wot" },
  { en: "Kitfo", am: "ክትፎ", href: "/recipe/kitfo" },
  { en: "Shiro Wot", am: "ሽሮ ወጥ", href: "/recipe/shiro-wot" },
  { en: "Pasta Carbonara", am: "ፓስታ ካርቦናራ", href: "/recipe/pasta-carbonara" },
];

export function Footer() {
  const { lang } = useLanguage();
  const l = t[lang];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const exploreLinks = [
    { label: l.allRecipes, href: "/#recipes" },
    { label: l.traditional, href: "/#traditional" },
    { label: l.chefsPicks, href: "/#chefs-picks" },
    { label: l.pricing, href: "/#pricing" },
  ];

  const supportLinks = [
    { label: l.helpCenter, href: "/help" },
    { label: l.privacy, href: "/privacy" },
    { label: l.terms, href: "/terms" },
    { label: l.faq, href: "/help" },
  ];

  return (
    <footer className="pt-20 pb-10 border-t border-border bg-coffee text-cream relative paper-grain">
      {/* Back to top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-spice-gold text-coffee flex items-center justify-center shadow-lg shadow-spice-gold/25"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="ink-divider mb-12 opacity-40" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          <ScrollReveal className="md:col-span-1">
            <span className="kicker text-spice-gold mb-3">Colophon</span>
            <Link to="/" className="font-display text-3xl font-bold text-cream inline-block mt-3">
              Geni's <em className="text-spice-gold not-italic italic font-medium">Recipe</em>
            </Link>
            <p className="text-cream/60 text-sm mt-4 leading-relaxed font-body italic">{l.tagline}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.recipes}</h4>
            <ul className="space-y-3">
              {recipeLinksData.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body inline-block hover:translate-x-1 transition-transform duration-200">
                    {lang === "en" ? link.en : link.am}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.explore}</h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body inline-block hover:translate-x-1 transition-transform duration-200">{link.label}</Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.support}</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body inline-block hover:translate-x-1 transition-transform duration-200">{link.label}</Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-body">{l.rights}</p>
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2 md:mt-0 font-body"
            whileHover={{ scale: 1.05 }}
          >
            {l.madeWith}
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
            </motion.span>
            {l.inEthiopia}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
