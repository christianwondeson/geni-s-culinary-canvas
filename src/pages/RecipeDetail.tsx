import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Clock, Flame, Star, Heart, Users, Play, Pause, 
  RotateCcw, Check, ChevronRight, Globe, Youtube, Lightbulb, AlertTriangle
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
import recipePasta from "@/assets/recipe-pasta-carbonara.jpg";
import recipeBurger from "@/assets/recipe-burger.jpg";
import recipeTeriyaki from "@/assets/recipe-teriyaki.jpg";
import recipeTacos from "@/assets/recipe-tacos.jpg";

const allRecipes: Record<string, {
  title: string; titleAm: string; image: string; time: string;
  difficulty: "Easy" | "Medium" | "Hard"; rating: number; category: string;
  servings: number; description: string; descriptionAm: string;
  videoUrl: string; tips: string[]; tipsAm: string[];
  ingredients: { name: string; nameAm: string; amount: string; note?: string; noteAm?: string }[];
  steps: { instruction: string; instructionAm: string; timer?: number; tip?: string; tipAm?: string }[];
}> = {
  "doro-wot": {
    title: "Doro Wot", titleAm: "ዶሮ ወጥ",
    image: recipeDoro, time: "2h 30m", difficulty: "Medium", rating: 4.9,
    category: "Traditional", servings: 6,
    description: "A rich, spicy chicken stew slow-cooked with berbere spice, served on injera for special occasions.",
    descriptionAm: "በበርበሬ ቅመም ቀስ ብሎ የተበሰለ ጣፋጭ የዶሮ ወጥ፣ በልዩ አጋጣሚዎች በእንጀራ ላይ ይቀርባል።",
    videoUrl: "https://www.youtube.com/embed/yFlaRGKaBgo?rel=0",
    tips: [
      "Use a heavy-bottomed pot (preferably cast iron) for even heat distribution",
      "Never add oil or water when caramelizing onions — they release their own moisture",
      "The key to great doro wot is patience: cook the onions for at least 30 minutes until deep brown",
      "Score the hard-boiled eggs with a fork so the sauce penetrates inside",
      "Let the stew rest for 10 minutes before serving for the best flavor",
    ],
    tipsAm: [
      "ለእኩል ሙቀት ክብደት ያለው ድስት (የብረት ድስት ከተቻለ) ይጠቀሙ",
      "ሽንኩርቱን ሲያበስሉ ዘይት ወይም ውሃ አይጨምሩ",
      "ጥሩ ዶሮ ወጥ ቁልፉ ትዕግስት ነው: ሽንኩርቱን ቢያንስ ለ30 ደቂቃ ያብስሉ",
      "ሶሱ ወደ ውስጥ እንዲገባ እንቁላሎቹን በሹካ ይቧጥጡ",
      "ለምርጥ ጣዕም ከማቅረብዎ በፊት ለ10 ደቂቃ ያሳርፉ",
    ],
    ingredients: [
      { name: "Whole chicken, cut into 12 pieces", nameAm: "ሙሉ ዶሮ፣ 12 ቁርጥ", amount: "1 whole (about 1.5kg)", note: "Remove skin for a leaner stew. Wash with lemon juice and water.", noteAm: "ቆዳውን ለቀቅ ያድርጉ። በሎሚ ጭማቂ ይታጠቡ።" },
      { name: "Red onions, very finely diced", nameAm: "ቀይ ሽንኩርት፣ በጣም በጥሩ ተቆርጦ", amount: "6 large (about 1kg)", note: "The onions should be almost paste-like. Use a food processor if available.", noteAm: "ሽንኩርቱ ማለት ይቻላል ፔስት መሆን አለበት።" },
      { name: "Berbere spice mix", nameAm: "በርበሬ", amount: "4 tablespoons", note: "Adjust to taste. Start with 3 tbsp if you prefer less heat.", noteAm: "እንደ ፍላጎትዎ ያስተካክሉ።" },
      { name: "Niter kibbeh (Ethiopian spiced butter)", nameAm: "ንጥር ቅቤ", amount: "½ cup (120ml)", note: "If unavailable, use regular butter with ½ tsp turmeric, cardamom, and fenugreek." },
      { name: "Hard-boiled eggs", nameAm: "የተቀቀለ እንቁላል", amount: "6", note: "Boil for 10 minutes, peel carefully, and score with a fork." },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት፣ የተፈጨ", amount: "6 cloves" },
      { name: "Fresh ginger, grated", nameAm: "ትኩስ ዝንጅብል፣ የተፈጨ", amount: "1 tablespoon" },
      { name: "Tomato paste", nameAm: "የቲማቲም ፔስት", amount: "2 tablespoons" },
      { name: "Lemon juice", nameAm: "የሎሚ ጭማቂ", amount: "2 tablespoons" },
      { name: "Salt to taste", nameAm: "ጨው እንደ ፍላጎት", amount: "1-2 teaspoons" },
      { name: "Water", nameAm: "ውሃ", amount: "½ cup" },
    ],
    steps: [
      { instruction: "Wash the chicken pieces thoroughly with lemon juice and cold water. Pat dry with paper towels and set aside.", instructionAm: "ዶሮውን በሎሚ ጭማቂና ቀዝቃዛ ውሃ በደንብ ይታጠቡ። በወረቀት ያድርቁ።", tip: "Let the chicken come to room temperature before cooking.", tipAm: "ዶሮው ከማብሰልዎ በፊት የክፍል ሙቀት እንዲደርስ ያድርጉ።" },
      { instruction: "In a large, heavy pot over medium heat, add the finely diced onions WITHOUT any oil or butter. Stir constantly and cook until deep golden brown.", instructionAm: "በትልቅ ከባድ ድስት ውስጥ ሽንኩርቱን ያለ ዘይት ወይም ቅቤ ጨምሩ። ያለማቋረጥ ያነሱ።", timer: 30, tip: "Don't rush this step! The onions should be very dark brown.", tipAm: "ይህን ደረጃ አትቸኩሉ!" },
      { instruction: "Add the niter kibbeh and let it melt. Stir in garlic and ginger. Cook for 2 minutes until fragrant.", instructionAm: "ንጥር ቅቤ ጨምሩ። ነጭ ሽንኩርትና ዝንጅብል ጨምሩ። ለ2 ደቂቃ ያብስሉ።", timer: 5 },
      { instruction: "Add berbere and tomato paste. Stir well and cook for 5 minutes until thick and fragrant.", instructionAm: "በርበሬና የቲማቲም ፔስት ጨምሩ። ለ5 ደቂቃ ያብስሉ።", timer: 5 },
      { instruction: "Add the chicken pieces one by one, coating each with sauce. Cover the pot.", instructionAm: "የዶሮ ቁርጥራጮቹን አንድ በአንድ ጨምሩ። ድስቱን ይክደኑ።", timer: 5 },
      { instruction: "Reduce heat to low and cook covered for 45 minutes. Do not open the lid.", instructionAm: "እሳቱን ዝቅ ያድርጉ ለ45 ደቂቃ ድፍን ያብስሉ።", timer: 45 },
      { instruction: "Score the eggs in a crosshatch pattern. Add to the stew. Simmer uncovered for 20 minutes.", instructionAm: "እንቁላሎቹን ይቧጥጡ። ወደ ወጡ ያስገቡ። ለ20 ደቂቃ ያፍሉ።", timer: 20 },
      { instruction: "Season with salt. Let rest 10 minutes. Serve on injera.", instructionAm: "ጨው ያስተካክሉ። ለ10 ደቂቃ ያሳርፉ። በእንጀራ ላይ ያቅርቡ።" },
    ],
  },
  "kitfo": {
    title: "Kitfo", titleAm: "ክትፎ",
    image: recipeKitfo, time: "30m", difficulty: "Medium", rating: 4.8,
    category: "Chef's Special", servings: 4,
    description: "Ethiopia's celebrated raw (or lightly cooked) beef delicacy, seasoned with mitmita spice and niter kibbeh.",
    descriptionAm: "በሚጥሚጣና ንጥር ቅቤ የተቀመመ ታዋቂ የኢትዮጵያ ጥሬ ስጋ ምግብ።",
    videoUrl: "https://www.youtube.com/embed/dQG-IasjsFo?rel=0",
    tips: [
      "Always use the freshest, highest-quality lean beef you can find",
      "The beef should be minced by hand for the best texture",
      "Warm the butter gently — it should be warm, not hot",
      "For 'leb leb' (lightly cooked), toss the meat briefly in the warm butter",
      "Serve immediately — kitfo does not taste as good when reheated",
    ],
    tipsAm: [
      "ሁልጊዜ ትኩስ ከፍተኛ ጥራት ያለው ንጹህ ስጋ ይጠቀሙ",
      "ለምርጥ ሸካራ ስጋው በእጅ መፈጨት አለበት",
      "ቅቤውን ቀስ ብለው ያሙቁ — ሞቅ ያለ እንጂ ትኩስ መሆን የለበትም",
      "ለ'ለብ ለብ' ስጋውን በሞቀ ቅቤ ውስጥ ጥቂት ያቅልቡት",
      "ወዲያውኑ ያቅርቡ — ክትፎ ሲሞቅ ጣፋጭ አይሆንም",
    ],
    ingredients: [
      { name: "Very lean beef (tenderloin)", nameAm: "በጣም ንጹህ ስጋ (ፊሌ)", amount: "500g", note: "Ask your butcher for the leanest cut. Trim ALL visible fat." },
      { name: "Niter kibbeh", nameAm: "ንጥር ቅቤ", amount: "¼ cup (60ml)" },
      { name: "Mitmita spice blend", nameAm: "ሚጥሚጣ", amount: "2 tablespoons", note: "Very spicy! Start with 1 tbsp if you're new to it." },
      { name: "Fresh ayib (Ethiopian cottage cheese)", nameAm: "ትኩስ አይብ", amount: "1 cup", note: "If unavailable, use ricotta." },
      { name: "Gomen (collard greens), steamed", nameAm: "ጎመን (የተቀቀለ)", amount: "2 cups" },
      { name: "Kocho or injera", nameAm: "ቆጮ ወይም እንጀራ", amount: "as needed" },
    ],
    steps: [
      { instruction: "Mince the beef extremely finely by hand with a sharp knife. It should be almost paste-like.", instructionAm: "ስጋውን በስለት ቢላ በእጅ በጣም በጥሩ ይፍጩ።", timer: 10, tip: "Chill the meat for 30 minutes before mincing." },
      { instruction: "Gently warm the niter kibbeh over LOW heat until just melted and warm — not hot.", instructionAm: "ንጥር ቅቤውን በዝቅተኛ እሳት ቀስ ብለው ያሙቁ።", timer: 3 },
      { instruction: "Add the minced beef and mitmita to the warm butter. Fold gently with a fork.", instructionAm: "ስጋና ሚጥሚጣ ወደ ሞቀው ቅቤ ጨምሩ። በሹካ ያቀላቅሉ።", timer: 2 },
      { instruction: "Arrange on a plate: kitfo in the center, ayib on one side, gomen on the other. Serve immediately with injera.", instructionAm: "ክትፎውን በመሃል፣ አይብ በአንድ ጎን፣ ጎመን በሌላ ጎን ያቅርቡ።" },
    ],
  },
  "shiro-wot": {
    title: "Shiro Wot", titleAm: "ሽሮ ወጥ",
    image: recipeShiro, time: "45m", difficulty: "Easy", rating: 4.7,
    category: "Vegan", servings: 4,
    description: "A smooth, comforting chickpea flour stew — the most beloved everyday dish across Ethiopia.",
    descriptionAm: "ለስላሳና ጣፋጭ የሽሮ ወጥ። በኢትዮጵያ ውስጥ በጣም ተወዳጅ የዕለት ተዕለት ምግብ ነው።",
    videoUrl: "https://www.youtube.com/embed/C0mPfcSgJP8?rel=0",
    tips: [
      "The most important step is cooking the onions long enough",
      "Always add shiro powder gradually while stirring to prevent lumps",
      "Keep stirring frequently — shiro can stick and burn easily",
      "Consistency should be like thick porridge",
      "Taste and adjust salt at the end",
    ],
    tipsAm: [
      "ሽንኩርቱን በቂ ጊዜ ማብሰል በጣም አስፈላጊ ነው",
      "ሽሮውን ሁልጊዜ ቀስ በቀስ እየነቃነቁ ጨምሩ",
      "ያለማቋረጥ ያነሱ — ሽሮ ሊቃጠል ይችላል",
      "ወፍራም ገንፎ መምሰል አለበት",
      "ጨው በመጨረሻ ይቅመሱ",
    ],
    ingredients: [
      { name: "Shiro powder", nameAm: "ሽሮ ዱቄት", amount: "1 cup (120g)", note: "Available at Ethiopian/Eritrean grocery stores." },
      { name: "Red onions, finely diced", nameAm: "ቀይ ሽንኩርት", amount: "3 large" },
      { name: "Olive oil", nameAm: "የወይራ ዘይት", amount: "¼ cup (60ml)" },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት", amount: "4 cloves" },
      { name: "Fresh tomato, chopped", nameAm: "ትኩስ ቲማቲም", amount: "2 medium" },
      { name: "Water", nameAm: "ውሃ", amount: "3 cups (720ml)" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
    ],
    steps: [
      { instruction: "Heat oil in a pot. Cook onions until deeply golden brown.", instructionAm: "ዘይቱን ያሙቁ። ሽንኩርቱን ጥቁር ወርቃማ እስኪሆን ያብስሉ።", timer: 15 },
      { instruction: "Add garlic and tomatoes. Cook until tomatoes break down.", instructionAm: "ነጭ ሽንኩርትና ቲማቲም ጨምሩ። ቲማቲሙ እስኪፈርስ ያብስሉ።", timer: 7 },
      { instruction: "Whisk shiro powder with 1 cup water until smooth. Set aside.", instructionAm: "ሽሮውን ከ1 ኩባያ ውሃ ጋር ያቀላቅሉ።", timer: 2 },
      { instruction: "Add remaining water to the pot. Slowly pour in shiro mixture while stirring.", instructionAm: "የቀረውን ውሃ ጨምሩ። ሽሮውን ቀስ ብለው እያነሱ ያፍስሱ።", timer: 3 },
      { instruction: "Simmer on low for 20 minutes, stirring frequently. Serve with injera.", instructionAm: "ለ20 ደቂቃ ያብስሉ። ከእንጀራ ጋር ያቅርቡ።", timer: 20 },
    ],
  },
  "derek-tibs": {
    title: "Derek Tibs", titleAm: "ድርቅ ጥብስ",
    image: recipeTibs, time: "35m", difficulty: "Easy", rating: 4.6,
    category: "Quick Meals", servings: 3,
    description: "Dry-fried cubed beef with rosemary, jalapeños, and onions. One of the easiest Ethiopian dishes — ready in 35 minutes.",
    descriptionAm: "ከሮዝሜሪ፣ ቃሪያና ሽንኩርት ጋር የተጠበሰ ስጋ። ለማብሰል ቀላል የኢትዮጵያ ምግብ ነው።",
    videoUrl: "https://www.youtube.com/embed/a3pGiRuLfDo?rel=0",
    tips: [
      "Use high heat and don't overcrowd the pan",
      "Pat the beef dry before cooking for better browning",
      "Don't move the meat too much — let it sear",
      "Add rosemary at the end so it doesn't burn",
    ],
    tipsAm: [
      "ከፍተኛ ሙቀት ይጠቀሙ ድስቱን በጣም አይሙሉ",
      "ለተሻለ ጥብስ ስጋውን ያድርቁ",
      "ስጋውን ብዙ አያንቀሳቅሱ",
      "ሮዝሜሪውን በመጨረሻ ጨምሩ",
    ],
    ingredients: [
      { name: "Beef, cut into 1-inch cubes", nameAm: "ስጋ፣ ኩብ ተቆራርጦ", amount: "500g", note: "Use sirloin or tenderloin." },
      { name: "Red onion, sliced", nameAm: "ቀይ ሽንኩርት", amount: "2 large" },
      { name: "Fresh jalapeño peppers", nameAm: "ቃሪያ", amount: "3" },
      { name: "Fresh rosemary", nameAm: "ሮዝሜሪ", amount: "3 sprigs" },
      { name: "Niter kibbeh", nameAm: "ንጥር ቅቤ", amount: "3 tablespoons" },
      { name: "Black pepper", nameAm: "ጥቁር ቁንዶ በርበሬ", amount: "½ teaspoon" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
    ],
    steps: [
      { instruction: "Pat beef dry. Season with salt and pepper. Let sit 5 minutes.", instructionAm: "ስጋውን ያድርቁ። በጨውና ቁንዶ በርበሬ ያጣፍጡ።", timer: 5 },
      { instruction: "Heat niter kibbeh in a heavy pan over HIGH heat until shimmering.", instructionAm: "ንጥር ቅቤውን በከፍተኛ እሳት ያሙቁ።", timer: 2 },
      { instruction: "Sear the beef in a single layer. 2 minutes per side for a deep brown crust.", instructionAm: "ስጋውን ያለማቋረጥ ይጠብሱ።", timer: 6 },
      { instruction: "Add onions and jalapeños. Toss and cook 5 minutes.", instructionAm: "ሽንኩርትና ቃሪያ ጨምሩ። ለ5 ደቂቃ ያብስሉ።", timer: 5 },
      { instruction: "Add rosemary leaves. Toss once and serve on a hot plate with injera.", instructionAm: "ሮዝሜሪ ጨምሩ። ከእንጀራ ጋር ያቅርቡ።", timer: 2 },
    ],
  },
  "beyaynetu": {
    title: "Beyaynetu", titleAm: "በያይነቱ",
    image: recipeBeyaynetu, time: "2h", difficulty: "Medium", rating: 4.8,
    category: "Traditional", servings: 6,
    description: "A stunning fasting platter featuring an assortment of colorful vegetarian dishes served together on injera.",
    descriptionAm: "በእንጀራ ላይ በብዙ ዓይነት ጾም ምግቦች የሚቀርብ ድንቅ ምግብ።",
    videoUrl: "https://www.youtube.com/embed/Kpb7keGawDQ?rel=0",
    tips: [
      "Prepare each dish separately and arrange beautifully on the injera",
      "Start with the dishes that take longest (misir wot)",
      "Each dish should be seasoned independently",
      "Use colorful vegetables for visual appeal",
    ],
    tipsAm: [
      "እያንዳንዱን ምግብ ለብቻ ያዘጋጁ",
      "ረጅም ጊዜ የሚወስዱ ምግቦችን ቀድሞ ይጀምሩ",
      "እያንዳንዱ ምግብ ለብቻ ጣዕም ሊኖረው ይገባል",
      "ቀለማት ያላቸው አትክልቶችን ይጠቀሙ",
    ],
    ingredients: [
      { name: "Red lentils (for misir wot)", nameAm: "ቀይ ምስር", amount: "2 cups" },
      { name: "Collard greens (for gomen)", nameAm: "ጎመን", amount: "1 large bunch" },
      { name: "Green cabbage & carrots", nameAm: "ጎመንና ካሮት", amount: "1 head + 3 carrots" },
      { name: "Shiro powder", nameAm: "ሽሮ ዱቄት", amount: "1 cup" },
      { name: "Red onions", nameAm: "ቀይ ሽንኩርት", amount: "6 large" },
      { name: "Olive oil", nameAm: "የወይራ ዘይት", amount: "½ cup" },
      { name: "Berbere spice", nameAm: "በርበሬ", amount: "3 tablespoons" },
      { name: "Turmeric", nameAm: "ኩርኩም", amount: "1 teaspoon" },
      { name: "Injera", nameAm: "እንጀራ", amount: "4-6 pieces" },
    ],
    steps: [
      { instruction: "Start with Misir Wot: Cook diced onions in oil until golden. Add berbere, then lentils with 3 cups water. Simmer 25 minutes.", instructionAm: "ምስር ወጥ ይጀምሩ: ሽንኩርት ያብስሉ። በርበሬና ምስር ጨምሩ።", timer: 30 },
      { instruction: "Make Gomen: Sauté onion and garlic. Add collard greens and cook until tender.", instructionAm: "ጎመን: ሽንኩርትና ነጭ ሽንኩርት ያብስሉ። ጎመን ጨምሩ።", timer: 15 },
      { instruction: "Make Atkilt: Sauté onion with turmeric. Add cabbage and carrots. Cook covered 12 min.", instructionAm: "አትክልት: ሽንኩርት ከኩርኩም ጋር ያብስሉ። ጎመንና ካሮት ጨምሩ።", timer: 15 },
      { instruction: "Arrange the platter: Lay injera on a round tray. Spoon each dish in separate sections.", instructionAm: "ትልቅ እንጀራ ይዘርጉ። እያንዳንዱን ምግብ በተለያየ ቦታ ያስቀምጡ።", timer: 10 },
    ],
  },
  "coffee-ceremony": {
    title: "Ethiopian Coffee Ceremony", titleAm: "ቡና ሥነ ሥርዓት",
    image: recipeCoffee, time: "1h", difficulty: "Easy", rating: 4.9,
    category: "Beverage", servings: 6,
    description: "The sacred Ethiopian coffee ceremony — roasting, grinding, and brewing that brings people together.",
    descriptionAm: "ቅዱስ የኢትዮጵያ ቡና ሥነ ሥርዓት — ሰዎችን የሚያገናኝ ባህላዊ ሥነ ሥርዓት።",
    videoUrl: "https://www.youtube.com/embed/j5RoFVDuYr8?rel=0",
    tips: [
      "The ceremony has 3 rounds: Abol (strongest), Tona (second), Bereka (mildest)",
      "Burn frankincense (etan) for authentic atmosphere",
      "Always serve with popcorn (fendisha) or kolo",
      "The host traditionally serves the eldest guest first",
    ],
    tipsAm: [
      "ሥነ ሥርዓቱ 3 ዙሮች: አቦል፣ ቶና፣ በረካ",
      "ለመዓዛ እጣን ያጥኑ",
      "ከፋንድሻ ወይም ቆሎ ጋር ያቅርቡ",
      "ትልቁን እንግዳ ቀድሞ ያቅርቡ",
    ],
    ingredients: [
      { name: "Green coffee beans", nameAm: "ጥሬ ቡና", amount: "200g", note: "Ethiopian origin (Yirgacheffe or Sidamo) is ideal." },
      { name: "Fresh water", nameAm: "ንጹህ ውሃ", amount: "1 liter" },
      { name: "Frankincense (etan)", nameAm: "እጣን", amount: "a few pieces" },
      { name: "Sugar", nameAm: "ስኳር", amount: "to taste" },
      { name: "Popcorn (fendisha)", nameAm: "ፋንድሻ", amount: "2 cups" },
    ],
    steps: [
      { instruction: "Wash the green coffee beans, removing debris. Drain and pat dry.", instructionAm: "ጥሬ ቡናውን ይታጠቡ ያድርቁ።", timer: 5 },
      { instruction: "Roast beans in a flat pan over medium heat, shaking frequently. They'll turn from green to dark brown.", instructionAm: "ቡናውን በመከሸከሻ ያጠብሱ። ጥቁር ቡናማ እስኪሆን።", timer: 15, tip: "Watch carefully — they can burn in seconds." },
      { instruction: "Walk the roasted beans around to let everyone smell the aroma.", instructionAm: "ባቀቡን ቡና ሁሉም እንዲሸተው ይዞር።", timer: 3 },
      { instruction: "Grind using mortar and pestle until fine powder.", instructionAm: "በሙከቻና ዘነዘና ይፍጩ።", timer: 8 },
      { instruction: "Boil water in jebena. Add ground coffee, let it rise 2-3 times.", instructionAm: "ውሃ በጀበና ያፍሉ። ቡና ጨምሩ 2-3 ጊዜ ይፍሉ።", timer: 10 },
      { instruction: "Pour slowly into cups from a height. Serve with sugar, popcorn, and kolo.", instructionAm: "ቀስ ብለው ከከፍታ ወደ ሲኒ ይቅዱ። ያቅርቡ።" },
    ],
  },
  // --- WESTERN / FOREIGN DISHES ---
  "pasta-carbonara": {
    title: "Pasta Carbonara", titleAm: "ፓስታ ካርቦናራ",
    image: recipePasta, time: "25m", difficulty: "Easy", rating: 4.7,
    category: "International", servings: 4,
    description: "Classic Italian pasta with a creamy egg and cheese sauce, crispy guanciale (or pancetta), and freshly cracked black pepper. A simple yet luxurious dish.",
    descriptionAm: "ክላሲክ የጣሊያን ፓስታ ከክሬም እንቁላልና ቺዝ ሶስ ጋር። ቀላል ግን የሚያማልል ምግብ።",
    videoUrl: "https://www.youtube.com/embed/D_2DBLAt57c?rel=0",
    tips: [
      "Use guanciale (cured pork cheek) for the most authentic flavor — pancetta or thick-cut bacon works too",
      "Never add cream — traditional carbonara gets its creaminess from eggs and cheese only",
      "Take the pan OFF the heat before adding the egg mixture to avoid scrambling",
      "Save plenty of pasta water — it's the secret to a silky sauce",
      "Use Pecorino Romano for authentic flavor, or mix with Parmigiano-Reggiano",
    ],
    tipsAm: [
      "ለትክክለኛ ጣዕም ጓንቻሌ ይጠቀሙ — ፓንቼታ ወይም ቤከን ይሰራል",
      "ክሬም አይጨምሩ — ባህላዊ ካርቦናራ ከእንቁላልና ቺዝ ብቻ ክሬማ ይሆናል",
      "የእንቁላሉን ድብልቅ ከመጨመርዎ በፊት ድስቱን ከእሳት ያውጡ",
      "የፓስታ ውሃ ያስቀምጡ — ለስስ ሶስ ምስጢሩ ነው",
      "ለትክክለኛ ጣዕም ፔኮሪኖ ሮማኖ ይጠቀሙ",
    ],
    ingredients: [
      { name: "Spaghetti or rigatoni pasta", nameAm: "ስፓጌቲ ወይም ሪጋቶኒ ፓስታ", amount: "400g", note: "Use a thick pasta that holds the sauce well." },
      { name: "Guanciale or thick-cut bacon", nameAm: "ጓንቻሌ ወይም ቤከን", amount: "200g", note: "Cut into small strips or cubes." },
      { name: "Egg yolks", nameAm: "የእንቁላል አስኳል", amount: "4 large", note: "Plus 1 whole egg. Room temperature is best." },
      { name: "Pecorino Romano cheese, finely grated", nameAm: "ፔኮሪኖ ሮማኖ ቺዝ", amount: "100g", note: "Or mix 50/50 with Parmesan." },
      { name: "Freshly cracked black pepper", nameAm: "ትኩስ ጥቁር ቁንዶ በርበሬ", amount: "2 teaspoons", note: "Use a pepper mill and crack it fresh — this is a key flavor." },
      { name: "Salt (for pasta water)", nameAm: "ጨው (ለፓስታ ውሃ)", amount: "generous" },
    ],
    steps: [
      { instruction: "Bring a large pot of well-salted water to a rolling boil (it should taste like the sea). Add the pasta and cook until al dente — about 1 minute less than package directions.", instructionAm: "ትልቅ ድስት ውሃ ያፍሉ ጨው ጨምሩ። ፓስታውን ጨምሩ አል ዴንቴ (ትንሽ ጠንከር) ያብስሉ።", timer: 10, tip: "Save 2 cups of starchy pasta water before draining — you'll need it!", tipAm: "ከማፍሰሱ በፊት 2 ኩባያ የፓስታ ውሃ ያስቀምጡ!" },
      { instruction: "While pasta cooks, cut guanciale into strips. Cook in a cold pan over medium heat — let the fat render slowly until crispy and golden, about 8 minutes.", instructionAm: "ፓስታው ሲበስል ጓንቻሌውን ቁራጭ ያድርጉ። በቀዝቃዛ ድስት ላይ ያብስሉ — ቅባቱ ቀስ ብሎ ይቀልጣል።", timer: 8, tip: "Start in a cold pan — this renders the fat perfectly without burning.", tipAm: "በቀዝቃዛ ድስት ይጀምሩ — ቅባቱ በትክክል ይቀልጣል።" },
      { instruction: "In a bowl, whisk together egg yolks, whole egg, grated Pecorino, and most of the black pepper until smooth. This is your carbonara sauce.", instructionAm: "በሳህን ውስጥ የእንቁላል አስኳሎችን፣ ሙሉ እንቁላልን፣ ቺዝንና ቁንዶ በርበሬን ያቀላቅሉ።", timer: 2 },
      { instruction: "When pasta is al dente, transfer it directly to the pan with guanciale using tongs (keep the pasta water!). Toss for 30 seconds to coat.", instructionAm: "ፓስታው ሲበስል በቀጥታ ወደ ጓንቻሌው ድስት ያዛውሩ። ለ30 ሰከንድ ያቀላቅሉ።", timer: 1 },
      { instruction: "REMOVE the pan from heat. Wait 30 seconds, then pour the egg-cheese mixture over the pasta while tossing vigorously. Add pasta water 1 tablespoon at a time until silky and creamy.", instructionAm: "ድስቱን ከእሳት ያውጡ። 30 ሰከንድ ይጠብቁ ከዚያ የእንቁላሉን ድብልቅ እያነሱ ያፍስሱ። የፓስታ ውሃ ቀስ ብለው ይጨምሩ።", timer: 2, tip: "The residual heat will cook the eggs gently into a cream — never put it back on direct heat!", tipAm: "ቀሪው ሙቀት እንቁላሎቹን ቀስ ብሎ ወደ ክሬም ያበስላል — ወደ ቀጥታ ሙቀት አይመልሱ!" },
      { instruction: "Serve immediately in warm bowls. Top with extra Pecorino and a generous crack of black pepper. Enjoy!", instructionAm: "ወዲያው በሞቃት ሳህኖች ያቅርቡ። ተጨማሪ ቺዝና ቁንዶ በርበሬ ይጨምሩ።" },
    ],
  },
  "classic-burger": {
    title: "Classic Smash Burger", titleAm: "ክላሲክ ስማሽ በርገር",
    image: recipeBurger, time: "20m", difficulty: "Easy", rating: 4.8,
    category: "International", servings: 4,
    description: "Juicy, crispy-edged smash burgers with melted cheese, fresh toppings, and a toasted sesame bun. Restaurant-quality at home.",
    descriptionAm: "ጣፋጭ ከቺዝ ጋር የተቀጠቀጠ በርገር ከትኩስ ንጥረ ነገሮች ጋር። የቤት ውስጥ የሬስቶራንት ጥራት።",
    videoUrl: "https://www.youtube.com/embed/gJCaOlgp5LI?rel=0",
    tips: [
      "Use beef with 80/20 lean-to-fat ratio — the fat makes it juicy",
      "Don't overwork the meat when forming balls — just loosely shape them",
      "Get your pan screaming hot before smashing — cast iron works best",
      "Smash once and don't touch it again until you flip — this creates the crispy crust",
      "Add cheese right after flipping while the patty is still on the pan",
    ],
    tipsAm: [
      "80/20 ስጋ-ቅባት ጥመርታ ይጠቀሙ — ቅባቱ ጣፋጭ ያደርገዋል",
      "ስጋውን ሲያዘጋጁ ብዙ አያድርሱ — በልማድ ያጠጋጉ",
      "ከመጨፍለቅዎ በፊት ድስቱን በጣም ያሙቁ — የብረት ድስት ምርጥ ነው",
      "አንድ ጊዜ ይጨፍልቁ ከዚያ እስኪገለበጥ አይንኩት",
      "ሲገልብጡ ወዲያው ቺዝ ይጨምሩ",
    ],
    ingredients: [
      { name: "Ground beef (80/20)", nameAm: "የተፈጨ ስጋ (80/20)", amount: "500g", note: "Divide into 4 equal balls, about 125g each." },
      { name: "American or cheddar cheese slices", nameAm: "አሜሪካን ወይም ቼዳር ቺዝ", amount: "4 slices" },
      { name: "Sesame seed burger buns", nameAm: "ሰሰሚ ሲድ በርገር ዳቦ", amount: "4", note: "Toast cut-side down in butter for best results." },
      { name: "Iceberg lettuce", nameAm: "ሰላጣ", amount: "4 leaves" },
      { name: "Tomato, sliced", nameAm: "ቲማቲም ተቆራርጦ", amount: "1 large" },
      { name: "Red onion, sliced into thin rings", nameAm: "ቀይ ሽንኩርት", amount: "1" },
      { name: "Pickles", nameAm: "ፒክልስ", amount: "8 slices" },
      { name: "Ketchup & mustard", nameAm: "ከቸፕና ሞስታርድ", amount: "to taste" },
      { name: "Salt & pepper", nameAm: "ጨውና ቁንዶ በርበሬ", amount: "to taste" },
      { name: "Butter (for toasting buns)", nameAm: "ቅቤ (ለዳቦ)", amount: "2 tablespoons" },
    ],
    steps: [
      { instruction: "Divide ground beef into 4 balls (about 125g each). Do NOT flatten them yet. Season the outside generously with salt and pepper.", instructionAm: "ስጋውን ወደ 4 ኳሶች ይከፋፍሉ። ገና አያጠፍጡ። በጨውና ቁንዶ በርበሬ ያጣፍጡ።", timer: 3 },
      { instruction: "Heat a cast iron pan or flat griddle over HIGH heat for 2 minutes — it needs to be smoking hot. Add a tiny bit of oil.", instructionAm: "የብረት ድስት ለ2 ደቂቃ በከፍተኛ ሙቀት ያሙቁ — ጭስ ማጠን ያስፈልገዋል።", timer: 2, tip: "If it's not smoking, it's not hot enough!", tipAm: "ጭስ ካላጠነ በቂ ሙቀት የለውም!" },
      { instruction: "Place a beef ball on the pan and SMASH it flat with a sturdy spatula or pan press. Press hard for 10 seconds. Season the top. Cook without touching for 2-3 minutes until edges are dark and crispy.", instructionAm: "ስጋውን በድስቱ ላይ ያስቀምጡ በጠንካራ ስፓቱላ ይጨፍልቁ። ሳይነኩ ለ2-3 ደቂቃ ያብስሉ።", timer: 3, tip: "You should hear an aggressive sizzle — that's the Maillard reaction creating flavor.", tipAm: "ጠንካራ ፍስ ድምፅ መስማት አለብዎት — ጣዕም የሚፈጥረው ነው።" },
      { instruction: "Flip the patty. Immediately place a slice of cheese on top. Cook for 1 more minute. The cheese should melt from the residual heat.", instructionAm: "ስጋውን ገልብጡ። ወዲያው ቺዝ ይጨምሩ። ለ1 ደቂቃ ያብስሉ።", timer: 1 },
      { instruction: "Toast the buns: Spread butter on the cut sides and place face-down in the hot pan for 30 seconds until golden.", instructionAm: "ዳቦውን ያጠብሱ: ቅቤ ይቀቡ ለ30 ሰከንድ ወደ ታች ያድርጉ።", timer: 1 },
      { instruction: "Assemble: Bottom bun → ketchup → lettuce → patty with cheese → pickles → onion → tomato → mustard → top bun. Serve immediately!", instructionAm: "ያገጣጥሙ: ዳቦ → ከቸፕ → ሰላጣ → ስጋና ቺዝ → ፒክልስ → ሽንኩርት → ቲማቲም → ሞስታርድ → ዳቦ። ወዲያው ያቅርቡ!" },
    ],
  },
  "chicken-teriyaki": {
    title: "Chicken Teriyaki", titleAm: "ቺኬን ቴሪያኪ",
    image: recipeTeriyaki, time: "30m", difficulty: "Easy", rating: 4.6,
    category: "International", servings: 4,
    description: "Tender chicken thighs glazed with a sweet-savory homemade teriyaki sauce, served over steamed rice with sesame seeds and scallions.",
    descriptionAm: "ጣፋጭ-ጨዋማ ቴሪያኪ ሶስ የተቀቡ ዶሮ ለግ ቁርጥራጮች ከዴስ ሩዝ ጋር ይቀርባሉ።",
    videoUrl: "https://www.youtube.com/embed/VCRk_sLsB6Q?rel=0",
    tips: [
      "Use chicken thighs instead of breast — they're more tender and flavorful",
      "Make the teriyaki sauce from scratch — it's much better than store-bought",
      "Let the sauce reduce until it coats the back of a spoon (nappe stage)",
      "For extra crispy chicken, pat dry and sear skin-side down first",
      "Garnish with toasted sesame seeds and thinly sliced green onions",
    ],
    tipsAm: [
      "ከጡት ይልቅ ዶሮ ለግ ይጠቀሙ — ይበልጥ ለስላሳና ጣፋጭ ናቸው",
      "ቴሪያኪ ሶስ ከባዶ ይስሩ — ከመደብር የተገዛ ይበልጣል",
      "ሶሱ ማንኪያውን እስኪለብስ ድረስ ይቀንሱ",
      "ለተጨማሪ ክሪስፒ ዶሮ ያድርቁ ቆዳውን ወደ ታች ያጠብሱ",
      "በቶስት ሰሰሚ ሲድና ቀጫጭን ስካሊዮን ያስጌጡ",
    ],
    ingredients: [
      { name: "Boneless chicken thighs", nameAm: "አጥንት የሌለው ዶሮ ለግ", amount: "600g (about 6 thighs)", note: "Trim excess fat. Score the thick parts for even cooking." },
      { name: "Soy sauce", nameAm: "ሶይ ሶስ", amount: "¼ cup (60ml)", note: "Use regular soy sauce, not low-sodium." },
      { name: "Mirin (sweet rice wine)", nameAm: "ሚሪን", amount: "3 tablespoons", note: "If unavailable, use 2 tbsp rice vinegar + 1 tbsp sugar." },
      { name: "Brown sugar or honey", nameAm: "ቡናማ ስኳር ወይም ማር", amount: "2 tablespoons" },
      { name: "Rice vinegar", nameAm: "ሩዝ ቪኒገር", amount: "1 tablespoon" },
      { name: "Fresh ginger, grated", nameAm: "ዝንጅብል", amount: "1 teaspoon" },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት", amount: "2 cloves" },
      { name: "Cornstarch + water (slurry)", nameAm: "ኮርንስታርች + ውሃ", amount: "1 tbsp + 2 tbsp water", note: "Mix together — this thickens the sauce." },
      { name: "Steamed rice", nameAm: "የተቀቀለ ሩዝ", amount: "3 cups cooked" },
      { name: "Sesame seeds & green onions", nameAm: "ሰሰሚ ሲድና ስካሊዮን", amount: "for garnish" },
      { name: "Vegetable oil", nameAm: "የአትክልት ዘይት", amount: "1 tablespoon" },
    ],
    steps: [
      { instruction: "Make the teriyaki sauce: Whisk together soy sauce, mirin, brown sugar, rice vinegar, ginger, and garlic in a small bowl. Set aside.", instructionAm: "ቴሪያኪ ሶስ ይስሩ: ሶይ ሶስ፣ ሚሪን፣ ስኳር፣ ቪኒገር፣ ዝንጅብል እና ነጭ ሽንኩርት ያቀላቅሉ።", timer: 2 },
      { instruction: "Pat the chicken thighs completely dry. Season with a pinch of salt and pepper. Heat oil in a large pan over medium-high heat.", instructionAm: "ዶሮውን በደንብ ያድርቁ። ትንሽ ጨውና ቁንዶ በርበሬ ይጨምሩ። ዘይቱን ያሙቁ።", timer: 2 },
      { instruction: "Place chicken skin-side down (or smooth-side). Cook undisturbed for 5-6 minutes until deep golden. Flip and cook 3 more minutes.", instructionAm: "ዶሮውን ቆዳ ወደ ታች ያስቀምጡ። ሳያንቀሳቅሱ ለ5-6 ደቂቃ ያብስሉ። ገልብጠው ለ3 ደቂቃ ያብስሉ።", timer: 9, tip: "Don't move the chicken while searing — let the crust develop.", tipAm: "ሲጠብሱ ዶሮውን አያንቀሳቅሱ — ክራስት እንዲፈጠር ያድርጉ።" },
      { instruction: "Pour the teriyaki sauce into the pan. Let it simmer and reduce for 3-4 minutes, spooning it over the chicken continuously.", instructionAm: "ቴሪያኪ ሶሱን ወደ ድስቱ ያፍስሱ። ለ3-4 ደቂቃ ያፍሉ ዶሮውን ያለማቋረጥ ይቀቡ።", timer: 4 },
      { instruction: "Add the cornstarch slurry to the sauce. Stir and cook for 1 minute until the sauce is thick and glossy, coating the chicken.", instructionAm: "ኮርንስታርች ድብልቅ ወደ ሶሱ ጨምሩ። ለ1 ደቂቃ ያቀላቅሉ ሶሱ ወፍራምና ብሩህ እስኪሆን።", timer: 1 },
      { instruction: "Slice the chicken into strips. Serve over steamed rice, drizzle with extra sauce, and garnish with sesame seeds and sliced green onions.", instructionAm: "ዶሮውን ቁራጭ ያድርጉ። ከዴስ ሩዝ ላይ ያቅርቡ፣ ሶስ ያፍስሱ፣ ሰሰሚ ሲድና ስካሊዮን ይጨምሩ።" },
    ],
  },
  "chicken-tacos": {
    title: "Mexican Chicken Tacos", titleAm: "ሜክሲካን ቺኬን ታኮስ",
    image: recipeTacos, time: "35m", difficulty: "Easy", rating: 4.7,
    category: "International", servings: 4,
    description: "Flavorful seasoned chicken tacos with fresh salsa, guacamole, and all the fixings in warm corn tortillas.",
    descriptionAm: "በቅመም የተቀመመ ዶሮ ታኮስ ከትኩስ ሳልሳ፣ ጉዋካሞሌ እና ንጥረ ነገሮች ጋር።",
    videoUrl: "https://www.youtube.com/embed/wLzN6Nkjwwc?rel=0",
    tips: [
      "Use chicken thighs for juicier tacos — breast tends to dry out",
      "Warm the tortillas in a dry pan or directly over a gas flame for best flavor",
      "Make the salsa fresh — it only takes 5 minutes and the flavor is incomparable",
      "Season the chicken generously — taco meat should be well-seasoned",
      "Serve everything family-style so everyone can build their own tacos",
    ],
    tipsAm: [
      "ለጣፋጭ ታኮስ ዶሮ ለግ ይጠቀሙ — ጡት ይደርቃል",
      "ቶርቲላዎችን በደረቅ ድስት ወይም በእሳት ላይ ያሙቁ",
      "ሳልሳውን ትኩስ ይስሩ — 5 ደቂቃ ብቻ ይወስዳል",
      "ዶሮውን በጣም ያጣፍጡ — የታኮ ስጋ በደንብ ጣዕም ሊኖረው ይገባል",
      "ሁሉም ሰው የራሱን ታኮ እንዲሰራ ያቅርቡ",
    ],
    ingredients: [
      { name: "Boneless chicken thighs", nameAm: "አጥንት የሌለው ዶሮ ለግ", amount: "500g" },
      { name: "Taco seasoning (cumin, chili powder, paprika, garlic powder, oregano)", nameAm: "ታኮ ቅመም", amount: "2 tablespoons", note: "Or make your own: 1 tsp each cumin, chili powder, paprika, ½ tsp garlic powder, ½ tsp oregano." },
      { name: "Corn or flour tortillas", nameAm: "ኮርን ወይም ፍላወር ቶርቲላ", amount: "12 small" },
      { name: "Ripe avocados (for guacamole)", nameAm: "አቮካዶ (ለጉዋካሞሌ)", amount: "2", note: "Should be slightly soft when pressed." },
      { name: "Roma tomatoes, diced", nameAm: "ቲማቲም ተቆራርጦ", amount: "3" },
      { name: "Red onion, finely diced", nameAm: "ቀይ ሽንኩርት", amount: "1" },
      { name: "Fresh cilantro, chopped", nameAm: "ትኩስ ሲላንትሮ", amount: "½ cup" },
      { name: "Lime", nameAm: "ሎሚ", amount: "3" },
      { name: "Sour cream", nameAm: "ሳወር ክሬም", amount: "½ cup" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
      { name: "Olive oil", nameAm: "የወይራ ዘይት", amount: "2 tablespoons" },
    ],
    steps: [
      { instruction: "Season chicken with taco seasoning, salt, and juice of 1 lime. Let it marinate for 10 minutes (or up to overnight in the fridge).", instructionAm: "ዶሮውን በታኮ ቅመም፣ ጨውና ሎሚ ያጣፍጡ። ለ10 ደቂቃ ያስፈልጉ።", timer: 10 },
      { instruction: "Heat oil in a pan over medium-high heat. Cook chicken for 5-6 minutes per side until charred and cooked through (internal temp 165°F/74°C). Rest 5 min, then dice or shred.", instructionAm: "ዘይቱን ያሙቁ። ዶሮውን በእያንዳንዱ ጎን ለ5-6 ደቂቃ ያብስሉ። 5 ደቂቃ ያሳርፉ ከዚያ ይቁረጡ።", timer: 15, tip: "Let the chicken rest before cutting — it keeps the juices inside.", tipAm: "ከመቁረጥዎ በፊት ዶሮውን ያሳርፉ — ጭማቂው ውስጥ ይቆያል።" },
      { instruction: "Make guacamole: Mash avocados with lime juice, diced onion, cilantro, salt. Leave it slightly chunky for texture.", instructionAm: "ጉዋካሞሌ: አቮካዶ ከሎሚ ጭማቂ፣ ሽንኩርት፣ ሲላንትሮ ጋር ይፈጩ።", timer: 3 },
      { instruction: "Make fresh salsa: Combine diced tomatoes, remaining onion, cilantro, lime juice, and salt.", instructionAm: "ሳልሳ: ቲማቲም፣ ሽንኩርት፣ ሲላንትሮ፣ ሎሚ ጭማቂና ጨው ያቀላቅሉ።", timer: 2 },
      { instruction: "Warm tortillas in a dry pan for 30 seconds each side, or over a gas flame for a few seconds until slightly charred.", instructionAm: "ቶርቲላዎችን በደረቅ ድስት ለ30 ሰከንድ በእያንዳንዱ ጎን ያሙቁ።", timer: 3 },
      { instruction: "Assemble tacos: Warm tortilla → chicken → salsa → guacamole → sour cream → fresh cilantro → squeeze of lime. Serve immediately!", instructionAm: "ታኮስ ያገጣጥሙ: ቶርቲላ → ዶሮ → ሳልሳ → ጉዋካሞሌ → ሳወር ክሬም → ሲላንትሮ → ሎሚ። ወዲያው ያቅርቡ!" },
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 mt-3"
    >
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
        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setRunning(!running)}>
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full" onClick={() => { setRemaining(seconds * 60); setRunning(false); }}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? allRecipes[slug] : undefined;
  const [activeStep, setActiveStep] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [lang, setLang] = useState<"en" | "am">("en");
  const [liked, setLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6 font-body">This recipe doesn't exist yet.</p>
            <Link to="/"><Button className="rounded-full">← Back to Home</Button></Link>
          </motion.div>
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
                <ArrowLeft className="h-4 w-4" /> {lang === "en" ? "Back to recipes" : "ወደ ምግቦች ተመለስ"}
              </Link>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cream/20 backdrop-blur-sm text-cream">{recipe.category}</span>
                <span className={`flex items-center gap-1 text-sm font-medium ${diffColor[recipe.difficulty]}`}>
                  <Flame className="h-4 w-4" /> {recipe.difficulty}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-2">
                {lang === "en" ? recipe.title : recipe.titleAm}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-4 text-cream/80 text-sm font-body">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {recipe.time}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {recipe.servings} {lang === "en" ? "servings" : "ሰዎች"}</span>
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
              {liked ? (lang === "en" ? "Saved" : "ተቀምጧል") : (lang === "en" ? "Save" : "አስቀምጥ")}
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full gap-1.5 text-muted-foreground" onClick={() => setShowVideo(!showVideo)}>
              <Youtube className="h-4 w-4" />
              {lang === "en" ? "Watch Video" : "ቪዲዮ ይመልከቱ"}
            </Button>
          </div>
          <Button variant="outline" size="sm" className="rounded-full gap-1.5" onClick={() => setLang(lang === "en" ? "am" : "en")}>
            <Globe className="h-4 w-4" />
            {lang === "en" ? "አማርኛ" : "English"}
          </Button>
        </div>
      </div>

      {/* Video Section */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-coffee"
          >
            <div className="container mx-auto px-4 lg:px-8 py-6">
              <div className="aspect-video rounded-2xl overflow-hidden max-w-3xl mx-auto">
                <iframe
                  src={recipe.videoUrl}
                  title={`${recipe.title} cooking video`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips Section */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 border-l-4 border-spice-gold"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-spice-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">
              {lang === "en" ? "Beginner Tips" : "ለጀማሪዎች ምክሮች"}
            </h3>
          </div>
          <ul className="space-y-2">
            {(lang === "en" ? recipe.tips : recipe.tipsAm).map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-spice-gold font-bold text-sm mt-0.5">{i + 1}.</span>
                <span className="text-muted-foreground font-body text-sm leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-12">
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
                  <li key={i} onClick={() => toggleIngredient(i)} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedIngredients.has(i) ? "bg-primary border-primary" : "border-border group-hover:border-primary"
                    }`}>
                      {checkedIngredients.has(i) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <div className={`transition-opacity ${checkedIngredients.has(i) ? "opacity-50" : ""}`}>
                      <span className={`text-sm font-medium text-foreground font-body ${checkedIngredients.has(i) ? "line-through" : ""}`}>
                        {lang === "en" ? ing.name : ing.nameAm}
                      </span>
                      <span className="text-xs text-primary ml-2 font-body font-semibold">{ing.amount}</span>
                      {ing.note && !checkedIngredients.has(i) && (
                        <p className="text-xs text-muted-foreground mt-0.5 font-body leading-relaxed">
                          💡 {lang === "en" ? ing.note : (ing.noteAm || ing.note)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-3 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-spice-gold" />
                  <span className="text-xs font-body font-medium">
                    {lang === "en" ? "Check for allergens before cooking" : "ከማብሰልዎ በፊት አለርጂዎችን ያረጋግጡ"}
                  </span>
                </div>
              </div>
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
                <div key={i} className="flex-1">
                  <motion.div
                    className={`h-1.5 rounded-full ${i <= activeStep ? "bg-primary" : "bg-muted"}`}
                    initial={false}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
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
                      i <= activeStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {i < activeStep ? <Check className="h-4 w-4" /> : i + 1}
                    </div>

                    <div className="flex-1">
                      <p className="text-foreground font-body leading-relaxed">
                        {lang === "en" ? step.instruction : step.instructionAm}
                      </p>

                      {step.tip && i === activeStep && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex items-start gap-2 p-2 rounded-lg bg-spice-gold/10"
                        >
                          <Lightbulb className="h-4 w-4 text-spice-gold flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground font-body">
                            {lang === "en" ? step.tip : (step.tipAm || step.tip)}
                          </span>
                        </motion.div>
                      )}

                      {step.timer && i === activeStep && (
                        <StepTimer seconds={step.timer} stepIndex={i} />
                      )}
                    </div>

                    {i === activeStep && <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1" />}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" className="rounded-full" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
                ← {lang === "en" ? "Previous" : "ቀዳሚ"}
              </Button>
              <Button className="rounded-full" disabled={activeStep === recipe.steps.length - 1} onClick={() => setActiveStep(activeStep + 1)}>
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
