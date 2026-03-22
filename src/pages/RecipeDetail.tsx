import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Clock, Flame, Star, Heart, Users, Play, Pause, 
  RotateCcw, Check, ChevronRight, Globe 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import recipeDoro from "@/assets/recipe-doro-wot.jpg";
import recipeKitfo from "@/assets/recipe-kitfo.jpg";
import recipeShiro from "@/assets/recipe-shiro.jpg";
import recipeTibs from "@/assets/recipe-tibs.jpg";
import recipeBeyaynetu from "@/assets/recipe-beyaynetu.jpg";
import recipeCoffee from "@/assets/recipe-coffee.jpg";

const allRecipes: Record<string, {
  title: string; titleAm: string; image: string; time: string;
  difficulty: "Easy" | "Medium" | "Hard"; rating: number; category: string;
  servings: number; description: string; descriptionAm: string;
  ingredients: { name: string; nameAm: string; amount: string }[];
  steps: { instruction: string; instructionAm: string; timer?: number }[];
}> = {
  "doro-wot": {
    title: "Doro Wot", titleAm: "ዶሮ ወጥ",
    image: recipeDoro, time: "2h", difficulty: "Medium", rating: 4.9,
    category: "Traditional", servings: 6,
    description: "A rich, spicy chicken stew slow-cooked with berbere spice, served on injera for special occasions. This iconic Ethiopian dish is the crown jewel of the cuisine.",
    descriptionAm: "በበርበሬ ቅመም ቀስ ብሎ የተበሰለ ጣፋጭ የዶሮ ወጥ፣ በልዩ አጋጣሚዎች በእንጀራ ላይ ይቀርባል።",
    ingredients: [
      { name: "Whole chicken, cut into pieces", nameAm: "ሙሉ ዶሮ፣ ተቆራርጦ", amount: "1 whole" },
      { name: "Red onions, finely diced", nameAm: "ቀይ ሽንኩርት፣ በጥሩ ተቆርጦ", amount: "6 large" },
      { name: "Berbere spice mix", nameAm: "በርበሬ", amount: "3 tbsp" },
      { name: "Niter kibbeh (spiced butter)", nameAm: "ንጥር ቅቤ", amount: "½ cup" },
      { name: "Hard-boiled eggs", nameAm: "የተቀቀለ እንቁላል", amount: "6" },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት", amount: "4 cloves" },
      { name: "Ginger, grated", nameAm: "ዝንጅብል", amount: "1 tbsp" },
      { name: "Salt to taste", nameAm: "ጨው እንደ ፍላጎት", amount: "to taste" },
    ],
    steps: [
      { instruction: "Dry-roast the diced onions in a heavy pot over medium heat, stirring constantly until golden and caramelized.", instructionAm: "ሽንኩርቱን ደረቅ ድስት ውስጥ እያነሳነህ አብስል እስኪወርድ ድረስ።", timer: 30 },
      { instruction: "Add niter kibbeh and let it melt, then stir in the garlic and ginger.", instructionAm: "ንጥር ቅቤ ጨምር፣ ከቀለጠ በኋላ ነጭ ሽንኩርትና ዝንጅብል ጨምር።", timer: 5 },
      { instruction: "Add berbere spice and cook for 5 minutes, stirring to prevent burning.", instructionAm: "በርበሬ ጨምርና 5 ደቂቃ አብስል።", timer: 5 },
      { instruction: "Add the chicken pieces, coat well with the sauce, and cook covered on low heat.", instructionAm: "ዶሮውን ጨምር፣ በሶሱ ቀብተህ በዝቅተኛ እሳት ድፍን አድርገህ አብስል።", timer: 45 },
      { instruction: "Score the hard-boiled eggs and add them to the stew. Simmer for 20 more minutes.", instructionAm: "የተቀቀሉ እንቁላሎችን ቧጥጠህ ወደ ወጡ ጨምር። ለ20 ደቂቃ አፍልቅ።", timer: 20 },
      { instruction: "Adjust seasoning, remove from heat, and serve on a large injera platter.", instructionAm: "ጣዕሙን አስተካክል፣ ከእሳት አውጣና በእንጀራ ላይ አቅርብ።" },
    ],
  },
  "kitfo": {
    title: "Kitfo", titleAm: "ክትፎ",
    image: recipeKitfo, time: "30m", difficulty: "Medium", rating: 4.8,
    category: "Chef's Special", servings: 4,
    description: "Ethiopia's celebrated raw beef delicacy, seasoned with mitmita spice and niter kibbeh. Served with ayib and gomen for a perfect balance.",
    descriptionAm: "በሚጥሚጣና ንጥር ቅቤ የተቀመመ ታዋቂ የኢትዮጵያ ጥሬ ስጋ ምግብ።",
    ingredients: [
      { name: "Lean beef, finely minced", nameAm: "ንጹህ ስጋ፣ በጥሩ የተፈጨ", amount: "500g" },
      { name: "Niter kibbeh", nameAm: "ንጥር ቅቤ", amount: "¼ cup" },
      { name: "Mitmita spice", nameAm: "ሚጥሚጣ", amount: "2 tbsp" },
      { name: "Ayib (cottage cheese)", nameAm: "አይብ", amount: "1 cup" },
      { name: "Gomen (collard greens)", nameAm: "ጎመን", amount: "2 cups" },
    ],
    steps: [
      { instruction: "Warm the niter kibbeh in a pan over low heat until just melted.", instructionAm: "ንጥር ቅቤውን በዝቅተኛ እሳት ላይ አሙቅ።", timer: 3 },
      { instruction: "Add the finely minced beef and mitmita to the warm butter. Mix gently.", instructionAm: "በጥሩ የተፈጨውን ስጋና ሚጥሚጣ ወደ ሞቀው ቅቤ ጨምር።", timer: 2 },
      { instruction: "Serve immediately with fresh ayib and steamed gomen on the side.", instructionAm: "ወዲያው ከአይብና ከጎመን ጋር አቅርብ።" },
    ],
  },
  "shiro-wot": {
    title: "Shiro Wot", titleAm: "ሽሮ ወጥ",
    image: recipeShiro, time: "45m", difficulty: "Easy", rating: 4.7,
    category: "Vegan", servings: 4,
    description: "A smooth, comforting chickpea flour stew that is a beloved everyday dish across Ethiopia. Perfect for fasting days.",
    descriptionAm: "ለስላሳና ጣፋጭ የሽሮ ወጥ፣ በኢትዮጵያ ውስጥ የዕለት ተዕለት ምግብ ነው።",
    ingredients: [
      { name: "Shiro powder", nameAm: "ሽሮ ዱቄት", amount: "1 cup" },
      { name: "Red onions, diced", nameAm: "ቀይ ሽንኩርት", amount: "3 large" },
      { name: "Olive oil", nameAm: "የወይራ ዘይት", amount: "¼ cup" },
      { name: "Garlic", nameAm: "ነጭ ሽንኩርት", amount: "3 cloves" },
      { name: "Tomato, chopped", nameAm: "ቲማቲም", amount: "2" },
      { name: "Water", nameAm: "ውሃ", amount: "3 cups" },
    ],
    steps: [
      { instruction: "Cook onions in oil until deeply caramelized and golden brown.", instructionAm: "ሽንኩርቱን በዘይት ውስጥ እስኪወርድ ድረስ አብስል።", timer: 15 },
      { instruction: "Add garlic and chopped tomatoes, cook until soft.", instructionAm: "ነጭ ሽንኩርትና ቲማቲም ጨምር፣ እስኪለስልስ ድረስ አብስል።", timer: 5 },
      { instruction: "Gradually whisk in shiro powder with water, stirring to avoid lumps.", instructionAm: "ሽሮውን ከውሃ ጋር ቀስ በቀስ እየነቃነቅክ ጨምር።", timer: 5 },
      { instruction: "Simmer on low heat, stirring frequently, until thick and creamy.", instructionAm: "በዝቅተኛ እሳት እያነሳህ አብስል እስኪወፍር ድረስ።", timer: 20 },
    ],
  },
  "derek-tibs": {
    title: "Derek Tibs", titleAm: "ድርቅ ጥብስ",
    image: recipeTibs, time: "35m", difficulty: "Easy", rating: 4.6,
    category: "Quick Meals", servings: 3,
    description: "Dry-fried cubed beef with rosemary, jalapeños, and onions. A quick, flavorful Ethiopian classic.",
    descriptionAm: "ከሮዝሜሪ፣ ቃሪያና ሽንኩርት ጋር የተጠበሰ ስጋ። ፈጣንና ጣፋጭ።",
    ingredients: [
      { name: "Beef, cubed", nameAm: "ስጋ፣ ተቆራርጦ", amount: "500g" },
      { name: "Red onion, sliced", nameAm: "ቀይ ሽንኩርት", amount: "2" },
      { name: "Jalapeño peppers", nameAm: "ቃሪያ", amount: "3" },
      { name: "Fresh rosemary", nameAm: "ሮዝሜሪ", amount: "2 sprigs" },
      { name: "Niter kibbeh", nameAm: "ንጥር ቅቤ", amount: "3 tbsp" },
    ],
    steps: [
      { instruction: "Heat niter kibbeh in a large pan over high heat until shimmering.", instructionAm: "ንጥር ቅቤውን በከፍተኛ እሳት ላይ አሙቅ።", timer: 2 },
      { instruction: "Add cubed beef and sear on all sides until browned and crispy.", instructionAm: "ስጋውን ጨምር፣ በሁሉም ጎን እስኪጠበስ ድረስ አብስል።", timer: 10 },
      { instruction: "Add onions, jalapeños, and rosemary. Toss until fragrant.", instructionAm: "ሽንኩርት፣ ቃሪያና ሮዝሜሪ ጨምር።", timer: 8 },
      { instruction: "Serve hot with injera or bread.", instructionAm: "ሞቅ ብሎ ከእንጀራ ወይም ዳቦ ጋር አቅርብ።" },
    ],
  },
  "beyaynetu": {
    title: "Beyaynetu", titleAm: "በያይነቱ",
    image: recipeBeyaynetu, time: "1h 30m", difficulty: "Medium", rating: 4.8,
    category: "Traditional", servings: 6,
    description: "A stunning fasting platter featuring an assortment of colorful vegetarian dishes served together on injera.",
    descriptionAm: "በእንጀራ ላይ በብዙ ዓይነት ጾም ምግቦች የሚቀርብ ድንቅ ምግብ።",
    ingredients: [
      { name: "Misir wot (red lentils)", nameAm: "ምስር ወጥ", amount: "2 cups" },
      { name: "Gomen (collard greens)", nameAm: "ጎመን", amount: "1 bunch" },
      { name: "Atkilt (cabbage & carrots)", nameAm: "አትክልት", amount: "1 head" },
      { name: "Shiro powder", nameAm: "ሽሮ", amount: "1 cup" },
      { name: "Injera", nameAm: "እንጀራ", amount: "4 pieces" },
    ],
    steps: [
      { instruction: "Prepare each dish separately: misir wot, gomen, atkilt, and shiro.", instructionAm: "እያንዳንዱን ምግብ ለብቻ አዘጋጅ።", timer: 60 },
      { instruction: "Arrange all dishes beautifully on a large injera platter.", instructionAm: "ሁሉንም ምግቦች በትልቅ እንጀራ ላይ በቆንጆ አስቀምጥ።", timer: 10 },
      { instruction: "Garnish with fresh herbs and serve with extra injera on the side.", instructionAm: "በቅጠላ ቅጠል አስውብና ከተጨማሪ እንጀራ ጋር አቅርብ።" },
    ],
  },
  "coffee-ceremony": {
    title: "Ethiopian Coffee", titleAm: "ቡና ሥነ ሥርዓት",
    image: recipeCoffee, time: "45m", difficulty: "Easy", rating: 4.9,
    category: "Beverage", servings: 6,
    description: "The sacred Ethiopian coffee ceremony — a beautiful ritual of roasting, grinding, and brewing that brings people together.",
    descriptionAm: "ቅዱስ የኢትዮጵያ ቡና ሥነ ሥርዓት — ሰዎችን የሚያገናኝ የማጠብሻ፣ የመፍጨትና የማፍላት ሥነ ሥርዓት።",
    ingredients: [
      { name: "Green coffee beans", nameAm: "ጥሬ ቡና", amount: "200g" },
      { name: "Water", nameAm: "ውሃ", amount: "1 liter" },
      { name: "Frankincense (optional)", nameAm: "እጣን", amount: "as desired" },
      { name: "Sugar", nameAm: "ስኳር", amount: "to taste" },
    ],
    steps: [
      { instruction: "Wash the green coffee beans thoroughly, then roast them in a pan over medium heat until dark and fragrant.", instructionAm: "ጥሬ ቡናውን በደንብ ታጠብ፣ ከዚያ በድስት ውስጥ እስኪጠቁር ድረስ ጥበስ።", timer: 15 },
      { instruction: "Grind the roasted beans with a mortar and pestle (mukecha) to a fine powder.", instructionAm: "የተጠበሰውን ቡና በሙከቻ ፍጭ።", timer: 5 },
      { instruction: "Add the ground coffee to the jebena with water. Bring to a boil, then let it settle.", instructionAm: "የተፈጨውን ቡና ከውሃ ጋር ወደ ጀበና ጨምር። አፍልቅና ይረጋ።", timer: 10 },
      { instruction: "Pour carefully into small cups. Serve with popcorn or kolo, and enjoy three rounds.", instructionAm: "ቀስ ብለህ ወደ ሲኒ ቅዳ። ከፋንድሻ ወይም ቆሎ ጋር ሶስት ዙር ጠጣ።" },
    ],
  },
};

function StepTimer({ seconds, stepIndex }: { seconds: number; stepIndex: number }) {
  const [remaining, setRemaining] = useState(seconds * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRemaining(seconds * 60);
    setRunning(false);
  }, [seconds, stepIndex]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const progress = 1 - remaining / (seconds * 60);

  return (
    <div className="flex items-center gap-3 mt-3">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-muted" strokeWidth="3" />
          <circle
            cx="18" cy="18" r="15.5" fill="none"
            className="stroke-primary" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${progress * 97.4} 97.4`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground font-body">
          {mins}:{secs.toString().padStart(2, "0")}
        </span>
      </div>
      <div className="flex gap-1.5">
        <Button
          size="icon" variant="outline"
          className="h-8 w-8 rounded-full"
          onClick={() => setRunning(!running)}
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button
          size="icon" variant="ghost"
          className="h-8 w-8 rounded-full"
          onClick={() => { setRemaining(seconds * 60); setRunning(false); }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? allRecipes[slug] : undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [lang, setLang] = useState<"en" | "am">("en");
  const [liked, setLiked] = useState(false);

  const toggleIngredient = useCallback((i: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6 font-body">This recipe doesn't exist yet.</p>
            <Link to="/">
              <Button className="rounded-full">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const diffColor = { Easy: "text-deep-green", Medium: "text-spice-gold", Hard: "text-primary" };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px]">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee/90 via-coffee/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream transition-colors mb-4 font-body text-sm">
                <ArrowLeft className="h-4 w-4" /> Back to recipes
              </Link>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cream/20 backdrop-blur-sm text-cream">
                  {recipe.category}
                </span>
                <span className={`flex items-center gap-1 text-sm font-medium ${diffColor[recipe.difficulty]}`}>
                  <Flame className="h-4 w-4" /> {recipe.difficulty}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-2">
                {lang === "en" ? recipe.title : recipe.titleAm}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-4 text-cream/80 text-sm font-body">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {recipe.time}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {recipe.servings} servings</span>
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-spice-gold text-spice-gold" /> {recipe.rating}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Actions Bar */}
      <div className="sticky top-16 z-30 glass border-b border-border/30">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost" size="sm"
              className={`rounded-full gap-1.5 ${liked ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
              {liked ? "Saved" : "Save"}
            </Button>
          </div>
          <Button
            variant="outline" size="sm"
            className="rounded-full gap-1.5"
            onClick={() => setLang(lang === "en" ? "am" : "en")}
          >
            <Globe className="h-4 w-4" />
            {lang === "en" ? "አማርኛ" : "English"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Ingredients Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 sticky top-36">
              <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                {lang === "en" ? "Ingredients" : "ግብዓቶች"}
              </h2>
              <p className="text-muted-foreground text-sm mb-5 font-body">
                {checkedIngredients.size}/{recipe.ingredients.length} {lang === "en" ? "selected" : "ተመርጠዋል"}
              </p>

              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedIngredients.has(i)
                        ? "bg-primary border-primary"
                        : "border-border group-hover:border-primary"
                    }`}>
                      {checkedIngredients.has(i) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className={`transition-opacity ${checkedIngredients.has(i) ? "opacity-50 line-through" : ""}`}>
                      <span className="text-sm font-medium text-foreground font-body">
                        {lang === "en" ? ing.name : ing.nameAm}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 font-body">{ing.amount}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {lang === "en" ? "Cooking Steps" : "የማብሰያ ደረጃዎች"}
            </h2>
            <p className="text-muted-foreground text-sm mb-8 font-body">
              {lang === "en" ? recipe.description : recipe.descriptionAm}
            </p>

            {/* Progress Bar */}
            <div className="flex items-center gap-1 mb-8">
              {recipe.steps.map((_, i) => (
                <div key={i} className="flex-1 flex items-center gap-1">
                  <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= activeStep ? "bg-primary" : "bg-muted"
                  }`} />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {recipe.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveStep(i)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    i === activeStep
                      ? "glass-card ring-2 ring-primary/30 shadow-lg"
                      : i < activeStep
                      ? "bg-muted/30 opacity-60"
                      : "bg-muted/20 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm font-body ${
                      i <= activeStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {i < activeStep ? <Check className="h-4 w-4" /> : i + 1}
                    </div>

                    <div className="flex-1">
                      <p className="text-foreground font-body leading-relaxed">
                        {lang === "en" ? step.instruction : step.instructionAm}
                      </p>
                      {step.timer && i === activeStep && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <StepTimer seconds={step.timer} stepIndex={i} />
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>

                    {i === activeStep && (
                      <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline" className="rounded-full"
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                ← {lang === "en" ? "Previous" : "ቀዳሚ"}
              </Button>
              <Button
                className="rounded-full"
                disabled={activeStep === recipe.steps.length - 1}
                onClick={() => setActiveStep(activeStep + 1)}
              >
                {lang === "en" ? "Next" : "ቀጣይ"} →
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
