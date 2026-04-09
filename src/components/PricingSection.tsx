import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const t = {
  en: {
    badge: "Pricing", title: "Choose Your", highlight: "Plan", desc: "Start free, upgrade when you're ready for the full experience.",
    freeName: "Free", freePrice: "ብር 0", freePeriod: "forever", freeDesc: "Explore the basics",
    freeFeatures: ["Browse 50+ free recipes", "Basic search & filters", "Save up to 10 favorites", "Community access"],
    freeCta: "Get Started",
    premName: "Premium", premPrice: "ብር 450", premPeriod: "/month", premDesc: "Full chef experience",
    premFeatures: ["All 200+ recipes unlocked", "Exclusive video tutorials", "Step-by-step cooking guide", "Built-in cooking timers", "Amharic & English support", "Priority support"],
    premCta: "Start Free Trial", popular: "Most Popular",
  },
  am: {
    badge: "ዋጋ", title: "የእርስዎን", highlight: "ዕቅድ ይምረጡ", desc: "በነፃ ይጀምሩ፣ ሙሉ ልምድ ሲፈልጉ ያሻሽሉ።",
    freeName: "ነፃ", freePrice: "ብር 0", freePeriod: "ለዘላለም", freeDesc: "መሰረታዊ ያስሱ",
    freeFeatures: ["50+ ነፃ ምግቦችን ያስሱ", "መሰረታዊ ፍለጋ", "እስከ 10 ተወዳጆች ያስቀምጡ", "ማህበረሰብ ተደራሽነት"],
    freeCta: "ይጀምሩ",
    premName: "ፕሪሚየም", premPrice: "ብር 450", premPeriod: "/ወር", premDesc: "ሙሉ ሼፍ ልምድ",
    premFeatures: ["ሁሉም 200+ ምግቦች ተከፍተዋል", "ልዩ ቪዲዮ ትምህርቶች", "ደረጃ በደረጃ መመሪያ", "አብሮ የተሰራ ሰዓት ቆጣሪ", "አማርኛ እና እንግሊዝኛ", "ቅድሚያ ድጋፍ"],
    premCta: "ነፃ ሙከራ ይጀምሩ", popular: "በጣም ተወዳጅ",
  },
};

export function PricingSection() {
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

  const plans = [
    { name: l.freeName, price: l.freePrice, period: l.freePeriod, description: l.freeDesc, features: l.freeFeatures, cta: l.freeCta, ctaLink: "/subscribe?plan=free", featured: false },
    { name: l.premName, price: l.premPrice, period: l.premPeriod, description: l.premDesc, features: l.premFeatures, cta: l.premCta, ctaLink: "/subscribe?plan=premium", featured: true },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-spice-gold" />
            <span className="text-spice-gold font-semibold text-sm uppercase tracking-wider">{l.badge}</span>
            <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="ml-4 text-sm text-primary hover:underline font-body flex items-center gap-1">
              <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
            </button>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {l.title} <span className="text-primary">{l.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{l.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-8 ${plan.featured ? "bg-foreground text-background shadow-2xl scale-[1.02]" : "glass-card"}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-spice-gold text-accent-foreground text-xs font-bold">
                  <Crown className="h-3 w-3" /> {l.popular}
                </div>
              )}
              <h3 className={`font-display text-2xl font-bold mb-1 ${plan.featured ? "text-background" : "text-foreground"}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-display font-bold ${plan.featured ? "text-background" : "text-foreground"}`}>{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.featured ? "text-spice-gold" : "text-primary"}`} />
                    <span className={`text-sm ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.ctaLink}>
                <Button
                  className={`w-full rounded-2xl h-12 font-semibold ${plan.featured ? "bg-spice-gold text-accent-foreground hover:bg-spice-gold/90" : ""}`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
