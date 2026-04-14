import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  en: {
    badge: "Pricing", title: "Choose Your", highlight: "Plan", desc: "Start free, upgrade when you're ready for the full experience.",
    freeName: "Free", freePrice: "ብር 0", freePeriod: "forever", freeDesc: "Explore the basics",
    freeFeatures: ["Browse 50+ free recipes", "Basic search & filters", "Save up to 10 favorites", "Community access"],
    freeCta: "Get Started",
    basicName: "Basic", basicPrice: "ብር 199", basicPeriod: "/month", basicDesc: "For home cooks",
    basicFeatures: ["All 100+ Ethiopian recipes", "Step-by-step guides", "Save unlimited favorites", "Cooking timers", "Amharic support"],
    basicCta: "Start Basic",
    premName: "Premium", premPrice: "ብር 450", premPeriod: "/month", premDesc: "Full chef experience",
    premFeatures: ["All 200+ recipes (Ethiopian + International)", "Exclusive video tutorials", "Step-by-step cooking guide", "Built-in cooking timers", "Priority support", "New recipes every week"],
    premCta: "Start Free Trial", popular: "Most Popular",
    proName: "Chef Pro", proPrice: "ብር 899", proPeriod: "/month", proDesc: "For professionals",
    proFeatures: ["Everything in Premium", "Download recipes offline", "Meal planning tools", "Nutritional information", "1-on-1 chef consultations", "Early access to new recipes", "Commercial use license"],
    proCta: "Go Pro",
  },
  am: {
    badge: "ዋጋ", title: "የእርስዎን", highlight: "ዕቅድ ይምረጡ", desc: "በነፃ ይጀምሩ፣ ሙሉ ልምድ ሲፈልጉ ያሻሽሉ።",
    freeName: "ነፃ", freePrice: "ብር 0", freePeriod: "ለዘላለም", freeDesc: "መሰረታዊ ያስሱ",
    freeFeatures: ["50+ ነፃ ምግቦችን ያስሱ", "መሰረታዊ ፍለጋ", "እስከ 10 ተወዳጆች ያስቀምጡ", "ማህበረሰብ ተደራሽነት"],
    freeCta: "ይጀምሩ",
    basicName: "መሰረታዊ", basicPrice: "ብር 199", basicPeriod: "/ወር", basicDesc: "ለቤት ውስጥ ምግብ ሰሪዎች",
    basicFeatures: ["ሁሉም 100+ የኢትዮጵያ ምግቦች", "ደረጃ በደረጃ መመሪያ", "ያልተገደበ ተወዳጆች", "ሰዓት ቆጣሪዎች", "አማርኛ ድጋፍ"],
    basicCta: "መሰረታዊ ይጀምሩ",
    premName: "ፕሪሚየም", premPrice: "ብር 450", premPeriod: "/ወር", premDesc: "ሙሉ ሼፍ ልምድ",
    premFeatures: ["ሁሉም 200+ ምግቦች (ኢትዮጵያ + ዓለም አቀፍ)", "ልዩ ቪዲዮ ትምህርቶች", "ደረጃ በደረጃ መመሪያ", "አብሮ የተሰራ ሰዓት ቆጣሪ", "ቅድሚያ ድጋፍ", "በየሳምንቱ አዲስ ምግቦች"],
    premCta: "ነፃ ሙከራ ይጀምሩ", popular: "በጣም ተወዳጅ",
    proName: "ሼፍ ፕሮ", proPrice: "ብር 899", proPeriod: "/ወር", proDesc: "ለባለሙያዎች",
    proFeatures: ["ሁሉም ፕሪሚየም ባህሪያት", "ምግቦችን ያውርዱ", "የምግብ ዕቅድ መሣሪያዎች", "የአመጋገብ መረጃ", "የ1-ለ-1 ሼፍ ምክር", "አዲስ ምግቦች ቅድሚያ ተደራሽነት", "ለንግድ አጠቃቀም ፈቃድ"],
    proCta: "ፕሮ ይሁኑ",
  },
};

export function PricingSection() {
  const { lang } = useLanguage();
  const l = t[lang];

  const plans = [
    { name: l.freeName, price: l.freePrice, period: l.freePeriod, description: l.freeDesc, features: l.freeFeatures, cta: l.freeCta, ctaLink: "/subscribe?plan=free", featured: false, icon: Sparkles },
    { name: l.basicName, price: l.basicPrice, period: l.basicPeriod, description: l.basicDesc, features: l.basicFeatures, cta: l.basicCta, ctaLink: "/subscribe?plan=basic", featured: false, icon: Zap },
    { name: l.premName, price: l.premPrice, period: l.premPeriod, description: l.premDesc, features: l.premFeatures, cta: l.premCta, ctaLink: "/subscribe?plan=premium", featured: true, icon: Crown },
    { name: l.proName, price: l.proPrice, period: l.proPeriod, description: l.proDesc, features: l.proFeatures, cta: l.proCta, ctaLink: "/subscribe?plan=pro", featured: false, icon: Crown },
  ];

  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-spice-gold" />
            <span className="text-spice-gold font-semibold text-sm uppercase tracking-wider">{l.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {l.title} <span className="text-primary">{l.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">{l.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-7 ${plan.featured ? "bg-foreground text-background shadow-2xl scale-[1.02] lg:scale-105" : "glass-card"}`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-spice-gold text-accent-foreground text-xs font-bold">
                  <Crown className="h-3 w-3" /> {l.popular}
                </div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.featured ? "bg-spice-gold/20" : "bg-primary/10"}`}>
                <plan.icon className={`h-5 w-5 ${plan.featured ? "text-spice-gold" : "text-primary"}`} />
              </div>
              <h3 className={`font-display text-xl font-bold mb-1 ${plan.featured ? "text-background" : "text-foreground"}`}>{plan.name}</h3>
              <p className={`text-sm mb-5 ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-display font-bold ${plan.featured ? "text-background" : "text-foreground"}`}>{plan.price}</span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>{plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-spice-gold" : "text-primary"}`} />
                    <span className={`text-sm ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.ctaLink}>
                <Button
                  className={`w-full rounded-2xl h-11 font-semibold text-sm ${plan.featured ? "bg-spice-gold text-accent-foreground hover:bg-spice-gold/90" : ""}`}
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
