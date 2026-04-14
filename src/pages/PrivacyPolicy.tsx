import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const sections = [
  { title: "Information We Collect", titleAm: "የምንሰበስበው መረጃ", content: "We collect information you provide when creating an account (name, email), recipe preferences, and usage data to improve your experience. We do not sell your personal data to third parties.", contentAm: "መለያ ሲፈጥሩ የሚሰጡትን መረጃ (ስም፣ ኢሜይል)፣ የምግብ ምርጫዎች እና የአጠቃቀም ውሂብ እንሰበስባለን።" },
  { title: "How We Use Your Data", titleAm: "ውሂብዎን እንዴት እንጠቀማለን", content: "Your data is used to personalize recipe recommendations, provide customer support, send relevant updates about new recipes and features, and improve our platform's functionality.", contentAm: "ውሂብዎ የምግብ ምክሮችን ለማበጀት፣ የደንበኛ ድጋፍ ለመስጠት እና መድረኩን ለማሻሻል ይውላል።" },
  { title: "Data Security", titleAm: "የውሂብ ደህንነት", content: "We use industry-standard encryption and security measures to protect your personal information. Your payment information is processed securely and never stored on our servers.", contentAm: "ግላዊ መረጃዎን ለመጠበቅ ደረጃቸውን የጠበቁ የምስጠራ እና የደህንነት እርምጃዎችን እንጠቀማለን።" },
  { title: "Cookies", titleAm: "ኩኪዎች", content: "We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage cookie settings in your browser.", contentAm: "የአሰሳ ልምድዎን ለማሻሻል፣ ምርጫዎችዎን ለማስታወስ ኩኪዎችን እንጠቀማለን።" },
  { title: "Your Rights", titleAm: "መብቶችዎ", content: "You have the right to access, update, or delete your personal data at any time. Contact us at privacy@genisrecipe.com for any data-related requests.", contentAm: "በማንኛውም ጊዜ ግላዊ ውሂብዎን የማግኘት፣ የማዘመን ወይም የመሰረዝ መብት አለዎት።" },
];

export default function PrivacyPolicy() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
              <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Home" : "ዋና ገጽ"}
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="font-display text-4xl font-bold text-foreground">{lang === "en" ? "Privacy Policy" : "የግላዊነት ፖሊሲ"}</h1>
            </div>
            <p className="text-muted-foreground font-body mb-8">{lang === "en" ? "Last updated: March 2026" : "መጨረሻ የተዘመነው: መጋቢት 2026"}</p>
            <div className="space-y-8">
              {sections.map((section, i) => (
                <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                  <h2 className="font-display text-xl font-bold text-foreground mb-3">{lang === "en" ? section.title : section.titleAm}</h2>
                  <p className="text-muted-foreground font-body leading-relaxed">{lang === "en" ? section.content : section.contentAm}</p>
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
