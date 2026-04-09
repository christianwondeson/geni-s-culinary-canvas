import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const t = {
  en: { home: "Home", recipes: "Recipes", traditional: "Traditional", chefsPicks: "Chef's Picks", pricing: "Pricing", signIn: "Sign In" },
  am: { home: "ዋና ገጽ", recipes: "ምግቦች", traditional: "ባህላዊ", chefsPicks: "የሼፍ ምርጫ", pricing: "ዋጋ", signIn: "ግባ" },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "am">("en");
  const l = t[lang];

  const navLinks = [
    { label: l.home, href: "#home" },
    { label: l.recipes, href: "#recipes" },
    { label: l.traditional, href: "#traditional" },
    { label: l.chefsPicks, href: "#chefs-picks" },
    { label: l.pricing, href: "#pricing" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="font-display text-2xl font-bold text-foreground">
          Geni's <span className="text-primary">Recipe</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => setLang(lang === "en" ? "am" : "en")}>
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Heart className="h-5 w-5" />
          </Button>
          <Link to="/auth">
            <Button size="sm" className="rounded-full px-6">
              <User className="h-4 w-4 mr-2" /> {l.signIn}
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-foreground font-medium hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
              <button onClick={() => setLang(lang === "en" ? "am" : "en")} className="text-sm text-primary font-body flex items-center gap-1">
                <Globe className="h-4 w-4" /> {lang === "en" ? "አማርኛ" : "English"}
              </button>
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="rounded-full mt-2 w-full">
                  <User className="h-4 w-4 mr-2" /> {l.signIn}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
