import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Flame, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const allRecipes = [
  { title: "Doro Wot", titleAm: "ዶሮ ወጥ", slug: "doro-wot", category: "Traditional", time: "2h 30m", difficulty: "Medium", rating: 4.9 },
  { title: "Kitfo", titleAm: "ክትፎ", slug: "kitfo", category: "Chef's Special", time: "30m", difficulty: "Medium", rating: 4.8 },
  { title: "Shiro Wot", titleAm: "ሽሮ ወጥ", slug: "shiro-wot", category: "Vegan", time: "45m", difficulty: "Easy", rating: 4.7 },
  { title: "Derek Tibs", titleAm: "ድርቅ ጥብስ", slug: "derek-tibs", category: "Quick Meals", time: "35m", difficulty: "Easy", rating: 4.6 },
  { title: "Beyaynetu", titleAm: "በያይነቱ", slug: "beyaynetu", category: "Traditional", time: "2h", difficulty: "Medium", rating: 4.8 },
  { title: "Ethiopian Coffee", titleAm: "ቡና ሥነ ሥርዓት", slug: "coffee-ceremony", category: "Beverage", time: "1h", difficulty: "Easy", rating: 4.9 },
  { title: "Pasta Carbonara", titleAm: "ፓስታ ካርቦናራ", slug: "pasta-carbonara", category: "International", time: "25m", difficulty: "Easy", rating: 4.7 },
  { title: "Classic Smash Burger", titleAm: "ክላሲክ ስማሽ በርገር", slug: "classic-burger", category: "International", time: "20m", difficulty: "Easy", rating: 4.8 },
  { title: "Chicken Teriyaki", titleAm: "ቺከን ቴሪያኪ", slug: "chicken-teriyaki", category: "International", time: "30m", difficulty: "Easy", rating: 4.6 },
  { title: "Mexican Chicken Tacos", titleAm: "ሜክሲካን ቺከን ታኮስ", slug: "chicken-tacos", category: "International", time: "35m", difficulty: "Easy", rating: 4.7 },
];

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) onClose(); // parent handles toggle
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = allRecipes.filter((r) => {
    const q = query.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.titleAm.includes(query) ||
      r.category.toLowerCase().includes(q) ||
      r.slug.includes(q)
    );
  });

  const diffColor: Record<string, string> = {
    Easy: "text-deep-green",
    Medium: "text-spice-gold",
    Hard: "text-primary",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-coffee/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] w-full max-w-xl mx-4"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={lang === "en" ? "Search recipes, ingredients..." : "ምግቦች፣ ግብዓቶች ፈልግ..."}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-body"
                />
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground font-body text-sm">
                    {lang === "en" ? "No recipes found" : "ምንም ምግብ አልተገኘም"}
                  </div>
                ) : (
                  filtered.map((recipe) => (
                    <Link
                      key={recipe.slug}
                      to={`/recipe/${recipe.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <div>
                        <p className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                          {lang === "en" ? recipe.title : recipe.titleAm}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground font-body">{recipe.category}</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground font-body">
                            <Clock className="h-3 w-3" /> {recipe.time}
                          </span>
                          <span className={`flex items-center gap-1 text-xs font-body ${diffColor[recipe.difficulty]}`}>
                            <Flame className="h-3 w-3" /> {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-sm text-spice-gold font-body">
                        <Star className="h-3.5 w-3.5 fill-spice-gold" /> {recipe.rating}
                      </span>
                    </Link>
                  ))
                )}
              </div>

              <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-body">
                <span>{filtered.length} {lang === "en" ? "recipes" : "ምግቦች"}</span>
                <span className="hidden sm:block">ESC {lang === "en" ? "to close" : "ለመዝጋት"}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
