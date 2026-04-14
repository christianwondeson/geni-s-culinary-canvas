import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { Check, Crown, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const t = {
  en: {
    premTitle: "Welcome to Premium!", freeTitle: "You're All Set!", basicTitle: "Basic Plan Activated!", proTitle: "Welcome to Chef Pro!",
    premDesc: "Your 7-day free trial has started. Enjoy unlimited access to all 200+ recipes, exclusive videos, and guided cooking.",
    freeDesc: "Your free account is ready. Start exploring 50+ recipes and save your favorites.",
    basicDesc: "Your Basic plan is active. Enjoy all Ethiopian recipes with step-by-step guides.",
    proDesc: "You now have full Chef Pro access. Download recipes, plan meals, and get 1-on-1 chef consultations.",
    premLabel: "Premium Features Unlocked", freeLabel: "What's Included", basicLabel: "Basic Features", proLabel: "Chef Pro Features",
    premFeatures: ["All 200+ recipes unlocked", "Exclusive video tutorials", "Step-by-step cooking guide with timers", "Amharic & English support", "Priority support", "7-day free trial, then ብር 450/month"],
    freeFeatures: ["Browse 50+ free recipes", "Basic search & filters", "Save up to 10 favorites", "Community access"],
    basicFeatures: ["All 100+ Ethiopian recipes", "Step-by-step guides", "Unlimited favorites", "Cooking timers", "Amharic support"],
    proFeatures: ["Everything in Premium", "Download recipes offline", "Meal planning tools", "Nutritional information", "1-on-1 chef consultations", "Early access to new recipes"],
    explore: "Start Exploring Recipes", upgrade: "Upgrade to Premium",
  },
  am: {
    premTitle: "እንኳን ወደ ፕሪሚየም በደህና መጡ!", freeTitle: "ዝግጁ ነዎት!", basicTitle: "መሰረታዊ ዕቅድ ተነቃቃ!", proTitle: "እንኳን ወደ ሼፍ ፕሮ በደህና መጡ!",
    premDesc: "የ7 ቀን ነፃ ሙከራዎ ተጀምሯል። ሁሉንም 200+ ምግቦች፣ ልዩ ቪዲዮዎችና መመሪያዎች ያግኙ።",
    freeDesc: "ነፃ መለያዎ ዝግጁ ነው። 50+ ምግቦችን ማሰስ ይጀምሩ።",
    basicDesc: "መሰረታዊ ዕቅድዎ ንቁ ነው። ሁሉንም የኢትዮጵያ ምግቦች ከደረጃ መመሪያዎች ጋር ይደሰቱ።",
    proDesc: "ሙሉ ሼፍ ፕሮ ተደራሽነት አለዎት።",
    premLabel: "ፕሪሚየም ባህሪያት ተከፍተዋል", freeLabel: "የተካተተ", basicLabel: "መሰረታዊ ባህሪያት", proLabel: "ሼፍ ፕሮ ባህሪያት",
    premFeatures: ["ሁሉም 200+ ምግቦች ተከፍተዋል", "ልዩ ቪዲዮ ትምህርቶች", "ደረጃ በደረጃ መመሪያ ከሰዓት ቆጣሪ ጋር", "አማርኛ እና እንግሊዝኛ", "ቅድሚያ ድጋፍ", "7 ቀን ነፃ ሙከራ ከዚያ ብር 450/ወር"],
    freeFeatures: ["50+ ነፃ ምግቦችን ያስሱ", "መሰረታዊ ፍለጋ", "እስከ 10 ተወዳጆች", "ማህበረሰብ ተደራሽነት"],
    basicFeatures: ["ሁሉም 100+ የኢትዮጵያ ምግቦች", "ደረጃ በደረጃ መመሪያ", "ያልተገደበ ተወዳጆች", "ሰዓት ቆጣሪዎች", "አማርኛ ድጋፍ"],
    proFeatures: ["ሁሉም ፕሪሚየም ባህሪያት", "ምግቦችን ያውርዱ", "የምግብ ዕቅድ መሣሪያዎች", "የአመጋገብ መረጃ", "የ1-ለ-1 ሼፍ ምክር", "አዲስ ምግቦች ቅድሚያ"],
    explore: "ምግቦችን ማሰስ ይጀምሩ", upgrade: "ወደ ፕሪሚየም ያሻሽሉ",
  },
};

export default function SubscriptionConfirm() {
  const [params] = useSearchParams();
  const plan = params.get("plan") || "free";
  const { lang } = useLanguage();
  const l = t[lang];

  const planConfig: Record<string, { title: string; desc: string; label: string; features: string[]; icon: typeof Crown; color: string }> = {
    free: { title: l.freeTitle, desc: l.freeDesc, label: l.freeLabel, features: l.freeFeatures, icon: Sparkles, color: "text-primary bg-primary/10" },
    basic: { title: l.basicTitle, desc: l.basicDesc, label: l.basicLabel, features: l.basicFeatures, icon: Zap, color: "text-primary bg-primary/10" },
    premium: { title: l.premTitle, desc: l.premDesc, label: l.premLabel, features: l.premFeatures, icon: Crown, color: "text-spice-gold bg-spice-gold/20" },
    pro: { title: l.proTitle, desc: l.proDesc, label: l.proLabel, features: l.proFeatures, icon: Crown, color: "text-spice-gold bg-spice-gold/20" },
  };

  const config = planConfig[plan] || planConfig.free;
  const isPaid = plan !== "free";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-lg">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass-card p-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${config.color}`}>
              <config.icon className="h-10 w-10" />
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">{config.title}</h1>
            <p className="text-muted-foreground font-body mb-8">{config.desc}</p>
            <div className="glass-card p-5 mb-8 text-left">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm">{config.label}</h3>
              <ul className="space-y-2.5">
                {config.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isPaid ? "text-spice-gold" : "text-primary"}`} />
                    <span className="text-sm text-muted-foreground font-body">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/"><Button className="w-full rounded-xl h-12 gap-2 font-semibold">{l.explore} <ArrowRight className="h-4 w-4" /></Button></Link>
              {plan === "free" && (
                <Link to="/subscribe?plan=premium"><Button variant="outline" className="w-full rounded-xl h-12 gap-2 font-body"><Crown className="h-4 w-4" /> {l.upgrade}</Button></Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
