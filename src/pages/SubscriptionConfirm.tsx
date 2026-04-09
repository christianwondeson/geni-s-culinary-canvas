import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { Check, Crown, ArrowRight, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const t = {
  en: {
    premTitle: "Welcome to Premium!", freeTitle: "You're All Set!",
    premDesc: "Your 7-day free trial has started. Enjoy unlimited access to all 200+ recipes, exclusive videos, and guided cooking.",
    freeDesc: "Your free account is ready. Start exploring 50+ recipes and save your favorites.",
    premLabel: "Premium Features Unlocked", freeLabel: "What's Included",
    premFeatures: ["All 200+ recipes unlocked", "Exclusive video tutorials", "Step-by-step cooking guide with timers", "Amharic & English support", "Priority support", "7-day free trial, then ብር 450/month"],
    freeFeatures: ["Browse 50+ free recipes", "Basic search & filters", "Save up to 10 favorites", "Community access"],
    explore: "Start Exploring Recipes", upgrade: "Upgrade to Premium",
  },
  am: {
    premTitle: "እንኳን ወደ ፕሪሚየም በደህና መጡ!", freeTitle: "ዝግጁ ነዎት!",
    premDesc: "የ7 ቀን ነፃ ሙከራዎ ተጀምሯል። ሁሉንም 200+ ምግቦች፣ ልዩ ቪዲዮዎችና መመሪያዎች ያግኙ።",
    freeDesc: "ነፃ መለያዎ ዝግጁ ነው። 50+ ምግቦችን ማሰስ ይጀምሩ።",
    premLabel: "ፕሪሚየም ባህሪያት ተከፍተዋል", freeLabel: "የተካተተ",
    premFeatures: ["ሁሉም 200+ ምግቦች ተከፍተዋል", "ልዩ ቪዲዮ ትምህርቶች", "ደረጃ በደረጃ መመሪያ ከሰዓት ቆጣሪ ጋር", "አማርኛ እና እንግሊዝኛ", "ቅድሚያ ድጋፍ", "7 ቀን ነፃ ሙከራ ከዚያ ብር 450/ወር"],
    freeFeatures: ["50+ ነፃ ምግቦችን ያስሱ", "መሰረታዊ ፍለጋ", "እስከ 10 ተወዳጆች", "ማህበረሰብ ተደራሽነት"],
    explore: "ምግቦችን ማሰስ ይጀምሩ", upgrade: "ወደ ፕሪሚየም ያሻሽሉ",
  },
};

export default function SubscriptionConfirm() {
  const [params] = useSearchParams();
  const plan = params.get("plan") || "free";
  const isPremium = plan === "premium";
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="flex justify-end mb-4">
            <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="text-sm text-primary hover:underline font-body flex items-center gap-1">
              <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
            </button>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="glass-card p-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPremium ? "bg-spice-gold/20" : "bg-primary/10"}`}>
              {isPremium ? <Crown className="h-10 w-10 text-spice-gold" /> : <Sparkles className="h-10 w-10 text-primary" />}
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">{isPremium ? l.premTitle : l.freeTitle}</h1>
            <p className="text-muted-foreground font-body mb-8">{isPremium ? l.premDesc : l.freeDesc}</p>
            <div className="glass-card p-5 mb-8 text-left">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm">{isPremium ? l.premLabel : l.freeLabel}</h3>
              <ul className="space-y-2.5">
                {(isPremium ? l.premFeatures : l.freeFeatures).map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isPremium ? "text-spice-gold" : "text-primary"}`} />
                    <span className="text-sm text-muted-foreground font-body">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/"><Button className="w-full rounded-xl h-12 gap-2 font-semibold">{l.explore} <ArrowRight className="h-4 w-4" /></Button></Link>
              {!isPremium && (
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
