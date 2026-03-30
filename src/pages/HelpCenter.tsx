import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, CreditCard, ChefHat, Globe, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";

const categories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    titleAm: "መጀመር",
    items: [
      { q: "How do I create an account?", qAm: "መለያ እንዴት እፈጥራለሁ?", a: "Click the 'Sign In' button in the navigation bar and select 'Sign Up'. Fill in your name, email, and a password. You can also sign up using Google or Apple.", aAm: "በአሰሳ አሞሌ ላይ ያለውን 'ግባ' ቁልፍ ጠቅ ያድርጉ እና 'ተመዝገብ' ን ይምረጡ።" },
      { q: "How do I search for recipes?", qAm: "የምግብ አሰራሮችን እንዴት እፈልጋለሁ?", a: "Use the search bar on the home page to find recipes by name, ingredient, or cuisine type. You can filter by difficulty and cooking time.", aAm: "በመነሻ ገጹ ላይ ያለውን የፍለጋ አሞሌ ይጠቀሙ።" },
      { q: "How do I save favorite recipes?", qAm: "የምወዳቸውን የምግብ አሰራሮች እንዴት አስቀምጣለሁ?", a: "Click the heart icon on any recipe card to save it to your favorites. Access all saved recipes from your profile.", aAm: "በማንኛውም የምግብ ካርድ ላይ የልብ አዶውን ጠቅ ያድርጉ።" },
    ],
  },
  {
    icon: ChefHat,
    title: "Cooking & Recipes",
    titleAm: "ማብሰልና ምግቦች",
    items: [
      { q: "How do cooking timers work?", qAm: "የማብሰያ ሰዓት ቆጣሪዎች እንዴት ይሰራሉ?", a: "Each recipe step has a built-in timer. Click the play button to start the timer, pause to stop, and the reset button to restart. You'll see a circular progress indicator.", aAm: "እያንዳንዱ የማብሰያ ደረጃ አብሮ የተሰራ ሰዓት ቆጣሪ አለው።" },
      { q: "Can I switch the language to Amharic?", qAm: "ቋንቋውን ወደ አማርኛ መቀየር እችላለሁ?", a: "Yes! Each recipe page has a language toggle button. Click the globe icon to switch between English and Amharic (አማርኛ).", aAm: "አዎ! እያንዳንዱ ገጽ የቋንቋ ቀያሪ አለው።" },
      { q: "Are the recipes beginner-friendly?", qAm: "ለጀማሪዎች ተስማሚ ናቸው?", a: "Absolutely! Each recipe includes detailed step-by-step instructions, ingredient amounts, cooking tips, and timers. Difficulty levels (Easy, Medium, Hard) help you choose recipes that match your skill level.", aAm: "በእርግጥ! እያንዳንዱ የምግብ አሰራር ዝርዝር መመሪያዎች አሉት።" },
    ],
  },
  {
    icon: CreditCard,
    title: "Subscription & Billing",
    titleAm: "ምዝገባ",
    items: [
      { q: "What's included in the free plan?", qAm: "በነፃ ዕቅዱ ውስጥ ምን ይካተታል?", a: "The free plan gives you access to 50+ recipes, basic search, and up to 10 saved favorites. It's free forever — no credit card required.", aAm: "የነፃ ዕቅዱ 50+ የምግብ አሰራሮችን ያቀርባል።" },
      { q: "How much does Premium cost?", qAm: "ፕሪሚየም ስንት ያስከፍላል?", a: "Premium costs ብር 450 per month. It includes a 7-day free trial so you can try all features risk-free.", aAm: "ፕሪሚየም በወር ብር 450 ያስከፍላል። 7 ቀን ነፃ ሙከራ ይካተታል።" },
      { q: "How do I cancel my subscription?", qAm: "ምዝገባዬን እንዴት እሰርዛለሁ?", a: "You can cancel anytime from your account settings. You'll continue to have access until the end of your billing period.", aAm: "በማንኛውም ጊዜ ከመለያ ቅንብሮችዎ መሰረዝ ይችላሉ።" },
    ],
  },
  {
    icon: Globe,
    title: "Language & Accessibility",
    titleAm: "ቋንቋ",
    items: [
      { q: "What languages are supported?", qAm: "ምን ቋንቋዎች ይደገፋሉ?", a: "Currently, Geni's Recipe supports English and Amharic (አማርኛ). You can switch languages on each page using the language toggle.", aAm: "በአሁኑ ጊዜ እንግሊዝኛ እና አማርኛ ይደገፋሉ።" },
      { q: "Is the site mobile-friendly?", qAm: "ድረ-ገጹ ለሞባይል ተስማሚ ነው?", a: "Yes! Geni's Recipe is fully responsive and works beautifully on phones, tablets, and desktops.", aAm: "አዎ! ድረ-ገጹ ለሁሉም መሳሪያዎች ተስማሚ ነው።" },
    ],
  },
];

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [lang, setLang] = useState<"en" | "am">("en");
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
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
              <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Home" : "ዋና ገጽ"}
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "am" : "en")}
              className="text-sm text-primary hover:underline font-body flex items-center gap-1"
            >
              <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
            </button>
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
              <Input
                placeholder={lang === "en" ? "Search for help..." : "እርዳታ ፈልግ..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-xl font-body"
              />
            </div>
          </motion.div>

          <div className="space-y-8">
            {filtered.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <cat.icon className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {lang === "en" ? cat.title : cat.titleAm}
                  </h2>
                </div>

                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const key = item.q;
                    const isOpen = openItem === key;
                    return (
                      <div key={key} className="glass-card overflow-hidden">
                        <button
                          onClick={() => setOpenItem(isOpen ? null : key)}
                          className="w-full text-left p-4 flex items-center justify-between"
                        >
                          <span className="font-body font-medium text-foreground text-sm">
                            {lang === "en" ? item.q : item.qAm}
                          </span>
                          <span className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                        </button>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="px-4 pb-4"
                          >
                            <p className="text-muted-foreground font-body text-sm leading-relaxed">
                              {lang === "en" ? item.a : item.aAm}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center mt-12"
          >
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              {lang === "en" ? "Still need help?" : "አሁንም እርዳታ ይፈልጋሉ?"}
            </h3>
            <p className="text-muted-foreground font-body text-sm mb-4">
              {lang === "en" ? "Contact us at support@genisrecipe.com" : "በ support@genisrecipe.com ያግኙን"}
            </p>
            <Button className="rounded-full">
              <Mail className="h-4 w-4 mr-2" /> {lang === "en" ? "Send Email" : "ኢሜይል ላክ"}
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
