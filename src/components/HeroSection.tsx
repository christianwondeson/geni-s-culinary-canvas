import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useState } from "react";
import heroImage from "@/assets/hero-food.jpg";
import { SearchModal } from "./SearchModal";

const t = {
  en: {
    issue: "Volume I · Vol. 26",
    kicker: "An Ethiopian Cookbook",
    line1: "Stories",
    line2: "from",
    line3: "Geni's",
    line4: "kitchen",
    desc: "A hand-collected cookbook of berbere stews, slow-roasted coffee, and recipes passed across generations — written for the home cook, not the algorithm.",
    search: "Doro wot, kitfo, shiro…",
    explore: "Browse the collection",
    stat1: "200 recipes",
    stat2: "12 traditions",
    stat3: "EN · አማ",
  },
  am: {
    issue: "ቅጽ ፩ · እትም ፳፮",
    kicker: "የኢትዮጵያ የምግብ መጽሐፍ",
    line1: "ታሪኮች",
    line2: "ከጀኒ",
    line3: "ኩሽና",
    line4: "",
    desc: "በበርበሬ የተዘጋጁ ወጦች፣ በቀስታ የተጠበሰ ቡና፣ እና ከትውልድ የተላለፉ ምግቦችን የሚመዘግብ መጽሐፍ — ለቤት ውስጥ ምግብ ሰሪ የተጻፈ።",
    search: "ዶሮ ወጥ፣ ክትፎ፣ ሽሮ…",
    explore: "ስብስቡን ያስሱ",
    stat1: "፪፻ ምግቦች",
    stat2: "፲፪ ባህሎች",
    stat3: "EN · አማ",
  },
};

export function HeroSection() {
  const { lang } = useLanguage();
  const l = t[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const handleExplore = () => {
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        ref={ref}
        id="home"
        className="relative min-h-screen pt-28 pb-16 paper-grain"
      >
        <div className="container mx-auto px-4 lg:px-8 relative">
          {/* Editorial masthead row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between border-b border-foreground/15 pb-4 mb-12 text-xs tracking-widest uppercase text-muted-foreground font-body"
          >
            <span>{l.issue}</span>
            <span className="hidden md:inline italic normal-case tracking-normal text-foreground/70">
              “አንድ ማዕድ — one table.”
            </span>
            <span>{l.stat3}</span>
          </motion.div>

          {/* Two-column editorial split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT — type */}
            <div className="lg:col-span-7 lg:pt-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="kicker text-primary mb-6"
              >
                {l.kicker}
              </motion.div>

              <h1 className="font-display font-bold text-foreground leading-[0.95] tracking-tight mb-8">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="block text-[clamp(3rem,8vw,7rem)]"
                >
                  {l.line1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="block text-[clamp(2.2rem,6vw,5rem)] italic font-normal text-muted-foreground pl-[10%]"
                >
                  {l.line2}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="block text-[clamp(3rem,8vw,7rem)] text-primary"
                >
                  {l.line3}
                  {l.line4 && <span className="text-foreground"> {l.line4}</span>}
                </motion.span>
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ originX: 0 }}
                className="accent-rule mb-8"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-base md:text-lg text-foreground/75 max-w-xl mb-10 font-body leading-relaxed drop-cap"
              >
                {l.desc}
              </motion.p>

              {/* Search + CTA */}
              <motion.form
                onSubmit={(e) => { e.preventDefault(); setSearchOpen(true); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex flex-col sm:flex-row gap-3 max-w-xl mb-10"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    placeholder={l.search}
                    className="w-full pl-11 pr-4 py-3.5 border-b-2 border-foreground/30 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary font-body text-sm transition-colors"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleExplore}
                  size="lg"
                  className="rounded-none px-7 py-3.5 h-auto text-sm font-semibold tracking-wider uppercase bg-foreground text-background hover:bg-primary group"
                >
                  {l.explore}
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.form>

              {/* Stats — editorial style, no icons */}
              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex gap-10 pt-6 border-t border-foreground/10"
              >
                {[l.stat1, l.stat2, l.stat3].map((s, i) => (
                  <div key={i}>
                    <dt className="font-display text-2xl font-bold text-foreground">
                      {s.split(" ")[0]}
                    </dt>
                    <dd className="text-xs uppercase tracking-widest text-muted-foreground mt-1 font-body">
                      {s.split(" ").slice(1).join(" ") || "—"}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* RIGHT — image, framed like a photo plate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <motion.img
                  src={heroImage}
                  alt="A spread of Ethiopian dishes — doro wot, injera, and berbere"
                  className="w-full h-[115%] object-cover absolute inset-x-0 top-0"
                  style={{ y: imgY }}
                />
                {/* Photo caption — magazine credit */}
                <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-cream/80 [writing-mode:vertical-rl] rotate-180">
                  Plate № 01 — የጀኒ ኩሽና
                </div>
              </div>

              {/* Hand-drawn note tab */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -bottom-6 -left-6 hidden md:block bg-cream border border-foreground/15 px-5 py-3 shadow-lg max-w-[220px]"
              >
                <p className="font-display italic text-sm text-foreground leading-snug">
                  “Cooking is a story we tell with our hands.”
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-body">— Geni</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} initialQuery={searchQuery} />
    </>
  );
}
