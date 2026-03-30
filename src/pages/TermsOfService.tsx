import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sections = [
  {
    title: "Acceptance of Terms",
    titleAm: "ውሎችን መቀበል",
    content: "By accessing and using Geni's Recipe, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.",
    contentAm: "ጀኒ ምግብን በመጠቀም በእነዚህ የአገልግሎት ውሎች ለመገዛት ይስማማሉ።",
  },
  {
    title: "User Accounts",
    titleAm: "የተጠቃሚ መለያዎች",
    content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information during registration. One person may not maintain more than one free account.",
    contentAm: "የመለያ ምስጢራዊነትዎን ለመጠበቅ ኃላፊነት አለብዎት። በምዝገባ ጊዜ ትክክለኛ መረጃ ማቅረብ አለብዎት።",
  },
  {
    title: "Content Usage",
    titleAm: "የይዘት አጠቃቀም",
    content: "All recipes, images, videos, and content on Geni's Recipe are protected by copyright. You may use recipes for personal, non-commercial purposes. Redistribution or commercial use requires written permission.",
    contentAm: "ሁሉም የምግብ አሰራሮች፣ ምስሎች እና ይዘቶች በቅጂ መብት የተጠበቁ ናቸው። ለግል አጠቃቀም ብቻ ይፈቀዳል።",
  },
  {
    title: "Subscription Terms",
    titleAm: "የምዝገባ ውሎች",
    content: "Premium subscriptions are billed monthly at ብር 450. You can cancel anytime. Refunds are available within 7 days of initial purchase. The free trial lasts 7 days.",
    contentAm: "ፕሪሚየም ምዝገባዎች በወር ብር 450 ይከፈላሉ። በማንኛውም ጊዜ መሰረዝ ይችላሉ።",
  },
  {
    title: "Limitation of Liability",
    titleAm: "የተጠያቂነት ገደብ",
    content: "Geni's Recipe provides recipes for informational purposes. We are not responsible for any adverse reactions, allergies, or injuries resulting from following our recipes. Always exercise caution when cooking.",
    contentAm: "ጀኒ ምግብ ለመረጃ ዓላማ የምግብ አሰራሮችን ያቀርባል። ሲያበስሉ ሁልጊዜ ጥንቃቄ ያድርጉ።",
  },
];

export default function TermsOfService() {
  const [lang, setLang] = useState<"en" | "am">("en");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
              <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Home" : "ዋና ገጽ"}
            </Link>
            <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="text-sm text-primary hover:underline font-body flex items-center gap-1">
              <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold text-foreground">
                {lang === "en" ? "Terms of Service" : "የአገልግሎት ውሎች"}
              </h1>
            </div>
            <p className="text-muted-foreground font-body mb-8">
              {lang === "en" ? "Last updated: March 2026" : "መጨረሻ የተዘመነው: መጋቢት 2026"}
            </p>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">
                    {lang === "en" ? section.title : section.titleAm}
                  </h2>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {lang === "en" ? section.content : section.contentAm}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
