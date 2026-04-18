import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./AnimatedText";
import recipeBeyaynetu from "@/assets/recipe-beyaynetu.jpg";
import recipeCoffee from "@/assets/recipe-coffee.jpg";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";

const dishes = [
  {
    title: "Beyaynetu", titleAm: "በያይነቱ",
    subtitle: "The Fasting Platter", subtitleAm: "የጾም ምግብ",
    description: "A colorful spread of vegetarian wots — shiro, misir, gomen, key sir — arranged on a single round of injera. Eaten with bare hands, shared from one platter, the way it has been for centuries.",
    descriptionAm: "በአንድ እንጀራ ላይ የሚቀርቡ የጾም ወጦች ስብስብ — ሽሮ፣ ምስር፣ ጎመን፣ ቀይ ሥር። በእጅ ይበላል፣ ከአንድ ሰሐን ይካፈላል፣ ለዘመናት እንደነበረው።",
    image: recipeBeyaynetu, slug: "beyaynetu",
    chapter: "I",
  },
  {
    title: "Buna Ceremony", titleAm: "ቡና ሥነ ሥርዓት",
    subtitle: "More than a drink", subtitleAm: "ከመጠጥ በላይ",
    description: "Green beans roasted over charcoal, ground by hand, brewed in a clay jebena. Three rounds — abol, tona, baraka — each one slower than the last. This is how time is measured at home.",
    descriptionAm: "በከሰል የሚጠብሱት ጥሬ ቡና፣ በእጅ የሚፈጭ፣ በጀበና የሚፈላ። ሦስት ዙር — አቦል፣ ቶና፣ በረካ — ሁሉም ከቀዳሚው የበለጠ ቀስ ብሎ።",
    image: recipeCoffee, slug: "coffee-ceremony",
    chapter: "II",
  },
  {
    title: "Doro Wot", titleAm: "ዶሮ ወጥ",
    subtitle: "The queen of stews", subtitleAm: "የወጥ ንግሥት",
    description: "Onions cooked down for an hour without oil. Berbere bloomed slowly. Chicken on the bone, hard-boiled eggs, niter kibbeh. Served at weddings, holidays, and any day worth celebrating.",
    descriptionAm: "ሽንኩርት ያለ ዘይት ለአንድ ሰዓት ይብሰለሰላል። በርበሬ ቀስ ብሎ ይከፈታል። ዶሮ በአጥንት፣ የተቀቀለ እንቁላል፣ ንጥር ቅቤ።",
    image: recipeDoro, slug: "doro-wot",
    chapter: "III",
  },
];

const t = {
  en: { kicker: "Heritage — Three Plates", title: "The dishes that built a culture", desc: "Recipes rooted in centuries, written for your kitchen with the same hands that taught us.", viewRecipe: "Read the recipe" },
  am: { kicker: "ቅርስ — ሦስት ሰሐኖች", title: "ባህልን የገነቡ ምግቦች", desc: "ለዘመናት ሥር የሰደዱ ምግቦች።", viewRecipe: "ምግቡን ያንብቡ" },
};

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden bg-muted">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-[120%] object-cover absolute top-0"
        style={{ y }}
      />
    </div>
  );
}

export function TraditionalSection() {
  const { lang } = useLanguage();
  const l = t[lang];

  return (
    <section id="traditional" className="py-24 lg:py-32 border-t border-foreground/10 paper-grain">
      <div className="container mx-auto px-4 lg:px-8 relative">
        <ScrollReveal className="max-w-2xl mb-16">
          <div className="kicker text-secondary mb-5">{l.kicker}</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-[1.05]">
            {l.title}
          </h2>
          <p className="text-muted-foreground text-base font-body">{l.desc}</p>
          <div className="ink-divider mt-8 !bg-position-left" style={{ backgroundPosition: "left center" }} />
        </ScrollReveal>

        <div className="space-y-28 lg:space-y-40">
          {dishes.map((dish, i) => (
            <article
              key={dish.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >
              <ScrollReveal className="lg:col-span-6" direction={i % 2 === 0 ? "left" : "right"}>
                <ParallaxImage src={dish.image} alt={`${dish.title} — Ethiopian dish`} />
              </ScrollReveal>

              <ScrollReveal className="lg:col-span-6 lg:px-6" delay={0.2} direction={i % 2 === 0 ? "right" : "left"}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="step-numeral text-7xl md:text-8xl">{dish.chapter}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-body">
                    {lang === "en" ? dish.subtitle : dish.subtitleAm}
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-[1.05]">
                  {lang === "en" ? dish.title : dish.titleAm}
                </h3>
                <p className="text-foreground/75 text-base lg:text-lg leading-relaxed mb-8 font-body max-w-md drop-cap">
                  {lang === "en" ? dish.description : dish.descriptionAm}
                </p>
                <Link
                  to={`/recipe/${dish.slug}`}
                  className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-primary hover:gap-5 transition-all font-body border-b-2 border-primary pb-1"
                >
                  {l.viewRecipe}
                </Link>
              </ScrollReveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
