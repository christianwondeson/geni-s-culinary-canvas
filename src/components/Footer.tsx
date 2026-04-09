import { useState } from "react";
import { Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

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
    <footer className="py-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold text-foreground">
              Geni's <span className="text-primary">Recipe</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed font-body">{l.tagline}</p>
            <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="mt-3 text-sm text-primary hover:underline font-body flex items-center gap-1">
              <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
            </button>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.recipes}</h4>
            <ul className="space-y-2.5">
              {recipeLinksData.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                    {lang === "en" ? link.en : link.am}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.explore}</h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{l.support}</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-body">{l.rights}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2 md:mt-0 font-body">
            {l.madeWith} <Heart className="h-3 w-3 text-primary fill-primary" /> {l.inEthiopia}
          </p>
        </div>
      </div>
    </footer>
  );
}
