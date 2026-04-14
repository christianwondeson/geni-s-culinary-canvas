import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, CreditCard, ChefHat, Globe, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started", titleAm: "መጀመር",
    items: [
      { q: "How do I create an account?", qAm: "መለያ እንዴት እፈጥራለሁ?", a: "Click the 'Sign In' button in the navigation bar and select 'Sign Up'. Fill in your name, email, and a password. You can also sign up using Google or Apple.", aAm: "በአሰሳ አሞሌ ላይ ያለውን 'ግባ' ቁልፍ ጠቅ ያድርጉ እና 'ተመዝገብ' ን ይምረጡ።" },
      { q: "How do I search for recipes?", qAm: "የምግብ አሰራሮችን እንዴት እፈልጋለሁ?", a: "Use the search icon in the navbar or press Ctrl+K to search recipes by name, ingredient, or cuisine type.", aAm: "በአሰሳ አሞሌ ላይ ያለውን የፍለጋ አዶ ይጠቀሙ ወይም Ctrl+K ይጫኑ።" },
      { q: "How do I save favorite recipes?", qAm: "የምወዳቸውን የምግብ አሰራሮች እንዴት አስቀምጣለሁ?", a: "Click the heart icon on any recipe card to save it to your favorites.", aAm: "በማንኛውም የምግብ ካርድ ላይ የልብ አዶውን ጠቅ ያድርጉ።" },
    ],
  },
  {
    icon: ChefHat,
    title: "Cooking & Recipes", titleAm: "ማብሰልና ምግቦች",
    items: [
      { q: "How do cooking timers work?", qAm: "የማብሰያ ሰዓት ቆጣሪዎች እንዴት ይሰራሉ?", a: "Each recipe step has a built-in timer. Click the play button to start, pause to stop, and reset to restart.", aAm: "እያንዳንዱ የማብሰያ ደረጃ አብሮ የተሰራ ሰዓት ቆጣሪ አለው።" },
      { q: "Can I switch the language to Amharic?", qAm: "ቋንቋውን ወደ አማርኛ መቀየር እችላለሁ?", a: "Yes! Use the globe icon in the navigation bar to switch between English and Amharic. The entire site will change language.", aAm: "አዎ! በአሰሳ አሞሌ ላይ ያለውን ዓለም አዶ ይጠቀሙ። ጣቢያው ሙሉ ቋንቋ ይቀየራል።" },
      { q: "Are the recipes beginner-friendly?", qAm: "ለጀማሪዎች ተስማሚ ናቸው?", a: "Absolutely! Each recipe includes detailed instructions, ingredient amounts, tips, and timers.", aAm: "በእርግጥ! እያንዳንዱ የምግብ አሰራር ዝርዝር መመሪያዎች አሉት።" },
    ],
  },
  {
    icon: CreditCard,
    title: "Subscription & Billing", titleAm: "ምዝገባ",
    items: [
      { q: "What plans are available?", qAm: "ምን ዕቅዶች አሉ?", a: "We offer 4 plans: Free (ብር 0), Basic (ብር 199/month), Premium (ብር 450/month), and Chef Pro (ብር 899/month).", aAm: "4 ዕቅዶች አሉን: ነፃ (ብር 0)፣ መሰረታዊ (ብር 199/ወር)፣ ፕሪሚየም (ብር 450/ወር)፣ ሼፍ ፕሮ (ብር 899/ወር)።" },
      { q: "How do I cancel my subscription?", qAm: "ምዝገባዬን እንዴት እሰርዛለሁ?", a: "You can cancel anytime from your account settings.", aAm: "በማንኛውም ጊዜ ከመለያ ቅንብሮችዎ መሰረዝ ይችላሉ።" },
    ],
  },
  {
    icon: Globe,
    title: "Language & Accessibility", titleAm: "ቋንቋ",
    items: [
      { q: "What languages are supported?", qAm: "ምን ቋንቋዎች ይደገፋሉ?", a: "English and Amharic (አማርኛ). Use the globe icon in the navbar to switch globally.", aAm: "እንግሊዝኛ እና አማርኛ። በአሰሳ አሞሌ ላይ ያለውን ዓለም አዶ ይጠቀሙ።" },
      { q: "Is the site mobile-friendly?", qAm: "ድረ-ገጹ ለሞባይል ተስማሚ ነው?", a: "Yes! Fully responsive on phones, tablets, and desktops.", aAm: "አዎ! ለሁሉም መሳሪያዎች ተስማሚ ነው።" },
    ],
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const { lang } = useLanguage();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = categories.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => {
      const query = search.toLowerCase();
      return item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
    }),
  })).filter((cat) => cat.items.length > 0);

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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {lang === "en" ? "Help Center" : "የእርዳታ ማዕከል"}
            </h1>
            <p className="text-muted-foreground font-body text-lg mb-8">
              {lang === "en" ? "Find answers to common questions about Geni's Recipe" : "ስለ ጀኒ ምግብ ለተለመዱ ጥያቄዎች መልሶችን ያግኙ"}
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder={lang === "en" ? "Search for help..." : "እርዳታ ፈልግ..."} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-12 h-12 rounded-xl font-body" />
            </div>
          </motion.div>

          <div className="space-y-8">
            {filtered.map((cat, ci) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 }}>
                <div className="flex items-center gap-2 mb-4">
                  <cat.icon className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-foreground">{lang === "en" ? cat.title : cat.titleAm}</h2>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const key = item.q;
                    const isOpen = openItem === key;
                    return (
                      <div key={key} className="glass-card overflow-hidden">
                        <button onClick={() => setOpenItem(isOpen ? null : key)} className="w-full text-left p-4 flex items-center justify-between">
                          <span className="font-body font-medium text-foreground text-sm">{lang === "en" ? item.q : item.qAm}</span>
                          <span className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                        </button>
                        {isOpen && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-4 pb-4">
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">{lang === "en" ? item.a : item.aAm}</p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 text-center mt-12">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{lang === "en" ? "Still need help?" : "አሁንም እርዳታ ይፈልጋሉ?"}</h3>
            <p className="text-muted-foreground font-body text-sm mb-4">{lang === "en" ? "Contact us at support@genisrecipe.com" : "በ support@genisrecipe.com ያግኙን"}</p>
            <Button className="rounded-full"><Mail className="h-4 w-4 mr-2" /> {lang === "en" ? "Send Email" : "ኢሜይል ላክ"}</Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
