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
    description: "A rich, spicy chicken stew slow-cooked with berbere spice, served on injera for special occasions. This iconic Ethiopian dish is the crown jewel of the cuisine and a must-learn for anyone interested in Ethiopian cooking.",
    descriptionAm: "በበርበሬ ቅመም ቀስ ብሎ የተበሰለ ጣፋጭ የዶሮ ወጥ፣ በልዩ አጋጣሚዎች በእንጀራ ላይ ይቀርባል። ይህ ታዋቂ የኢትዮጵያ ምግብ የኩሽና ዘውድ ጌጥ ነው።",
    videoUrl: "https://www.youtube.com/embed/oBiXCNlGk0k",
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
      { name: "Berbere spice mix", nameAm: "በርበሬ", amount: "4 tablespoons", note: "Adjust to taste. Start with 3 tbsp if you prefer less heat.", noteAm: "እንደ ፍላጎትዎ ያስተካክሉ። ያነሰ ሙቀት ከፈለጉ በ3 ማንኪያ ይጀምሩ።" },
      { name: "Niter kibbeh (Ethiopian spiced butter)", nameAm: "ንጥር ቅቤ", amount: "½ cup (120ml)", note: "If unavailable, use regular butter with ½ tsp turmeric, cardamom, and fenugreek.", noteAm: "ከሌለ ቅቡት ከኩርኩም፣ ከሮማን እና ከአብሽ ጋር ይጠቀሙ።" },
      { name: "Hard-boiled eggs", nameAm: "የተቀቀለ እንቁላል", amount: "6", note: "Boil for 10 minutes, peel carefully, and score with a fork in a crosshatch pattern.", noteAm: "ለ10 ደቂቃ ያፍሉ፣ በጥንቃቄ ይግፉ፣ በሹካ ይቧጥጡ።" },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት፣ የተፈጨ", amount: "6 cloves", note: "Fresh garlic gives the best flavor. Mince very finely." },
      { name: "Fresh ginger, grated", nameAm: "ትኩስ ዝንጅብል፣ የተፈጨ", amount: "1 tablespoon", note: "Peel with a spoon for easy grating." },
      { name: "Tomato paste", nameAm: "የቲማቲም ፔስት", amount: "2 tablespoons", note: "Adds depth and color to the sauce." },
      { name: "Lemon juice (for washing chicken)", nameAm: "የሎሚ ጭማቂ", amount: "2 tablespoons" },
      { name: "Salt to taste", nameAm: "ጨው እንደ ፍላጎት", amount: "1-2 teaspoons" },
      { name: "Water", nameAm: "ውሃ", amount: "½ cup", note: "Add only if the sauce becomes too thick." },
    ],
    steps: [
      { instruction: "Wash the chicken pieces thoroughly with lemon juice and cold water. Pat dry with paper towels and set aside. This removes any gamey taste.", instructionAm: "ዶሮውን በሎሚ ጭማቂና ቀዝቃዛ ውሃ በደንብ ይታጠቡ። በወረቀት ያድርቁ።", tip: "Letting the chicken come to room temperature before cooking ensures even cooking.", tipAm: "ዶሮው ከማብሰልዎ በፊት የክፍል ሙቀት እንዲደርስ ማድረግ እኩል ማብሰልን ያረጋግጣል።" },
      { instruction: "In a large, heavy pot over medium heat, add the finely diced onions WITHOUT any oil or butter. Stir constantly and cook until they release their moisture and turn deep golden brown. This is the foundation of the flavor.", instructionAm: "በትልቅ ከባድ ድስት ውስጥ በመካከለኛ እሳት ላይ ሽንኩርቱን ያለ ዘይት ወይም ቅቤ ጨምሩ። ያለማቋረጥ ያነሱ።", timer: 30, tip: "Don't rush this step! The onions should be very dark brown, almost caramelized. If they start to stick, reduce heat slightly.", tipAm: "ይህን ደረጃ አትቸኩሉ! ሽንኩርቱ በጣም ጥቁር ቡናማ መሆን አለበት።" },
      { instruction: "Add the niter kibbeh (spiced butter) and let it melt completely. Stir in the minced garlic and grated ginger. Cook for 2 minutes until fragrant.", instructionAm: "ንጥር ቅቤ ጨምሩ ሙሉ በሙሉ ይቅለጥ። ነጭ ሽንኩርትና ዝንጅብል ጨምሩ። ለ2 ደቂቃ ያብስሉ።", timer: 5 },
      { instruction: "Add the berbere spice and tomato paste. Stir well to combine and cook for 5 minutes, stirring frequently to prevent burning. The mixture should become a thick, fragrant paste.", instructionAm: "በርበሬና የቲማቲም ፔስት ጨምሩ። በደንብ ቀላቅሉ ለ5 ደቂቃ ያብስሉ።", timer: 5, tip: "If the mixture is too dry, add 2 tablespoons of water.", tipAm: "ድብልቁ በጣም ደረቅ ከሆነ 2 ማንኪያ ውሃ ጨምሩ።" },
      { instruction: "Add the chicken pieces one by one, turning each piece to coat well with the sauce. Arrange in a single layer if possible. Cover the pot with a tight-fitting lid.", instructionAm: "የዶሮ ቁርጥራጮቹን አንድ በአንድ ጨምሩ። እያንዳንዱን ቁርጥራጭ በሶሱ ይቀቡ። ድስቱን በደንብ ይክደኑ።", timer: 5 },
      { instruction: "Reduce heat to low and cook covered for 45 minutes. Do not open the lid during this time — the steam helps tenderize the chicken. Check occasionally to ensure nothing is burning.", instructionAm: "እሳቱን ወደ ዝቅተኛ ዝቅ ያድርጉ ለ45 ደቂቃ ድፍን ያብስሉ። በዚህ ጊዜ ውስጥ ክዳኑን አይክፈቱ።", timer: 45, tip: "If you smell burning, very briefly lift the lid and add a splash of water.", tipAm: "ሽታ ከተሰማ ትንሽ ውሃ ይጨምሩ።" },
      { instruction: "Score the hard-boiled eggs in a crosshatch pattern using a fork. Gently add them to the stew, pushing them into the sauce. Simmer uncovered for 20 more minutes.", instructionAm: "በሹካ ተቀቅለው የተገፉ እንቁላሎቹን ይቧጥጡ። ቀስ ብለው ወደ ወጡ ያስገቡ። ያለ ክዳን ለ20 ደቂቃ ያፍሉ።", timer: 20 },
      { instruction: "Taste and adjust seasoning with salt. Remove from heat and let rest for 10 minutes. Serve on a large injera platter, spooning sauce generously over the chicken and eggs.", instructionAm: "ጣዕሙን ይቅመሱ ጨው ያስተካክሉ። ከእሳት ያውጡ ለ10 ደቂቃ ያሳርፉ። በትልቅ እንጀራ ላይ ያቅርቡ።" },
    ],
  },
  "kitfo": {
    title: "Kitfo", titleAm: "ክትፎ",
    image: recipeKitfo, time: "30m", difficulty: "Medium", rating: 4.8,
    category: "Chef's Special", servings: 4,
    description: "Ethiopia's celebrated raw (or lightly cooked) beef delicacy, seasoned with mitmita spice and niter kibbeh. A dish of finesse — the quality of meat and freshness of spices make all the difference.",
    descriptionAm: "በሚጥሚጣና ንጥር ቅቤ የተቀመመ ታዋቂ የኢትዮጵያ ጥሬ ስጋ ምግብ። የስጋ ጥራትና የቅመማ ቅመም ትኩስነት ልዩነቱን ይፈጥራል።",
    videoUrl: "https://www.youtube.com/embed/n_JjAH0KUHI",
    tips: [
      "Always use the freshest, highest-quality lean beef you can find",
      "The beef should be minced by hand for the best texture — avoid pre-ground meat",
      "Warm the butter gently — it should be warm, not hot, to keep the meat tender",
      "For 'leb leb' (lightly cooked) version, toss the meat briefly in the warm butter",
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
      { name: "Very lean beef (tenderloin or round)", nameAm: "በጣም ንጹህ ስጋ (ፊሌ)", amount: "500g", note: "Ask your butcher for the leanest cut. Trim ALL visible fat." },
      { name: "Niter kibbeh (spiced clarified butter)", nameAm: "ንጥር ቅቤ", amount: "¼ cup (60ml)", note: "Must be freshly made or high quality for best results." },
      { name: "Mitmita spice blend", nameAm: "ሚጥሚጣ", amount: "2 tablespoons", note: "A hot chili-based spice. Start with 1 tbsp if you're new to it — it's very spicy!" },
      { name: "Fresh ayib (Ethiopian cottage cheese)", nameAm: "ትኩስ አይብ", amount: "1 cup", note: "If unavailable, use ricotta or fresh farmer's cheese as substitute." },
      { name: "Gomen (collard greens), steamed", nameAm: "ጎመን (የተቀቀለ)", amount: "2 cups", note: "Steam until just tender, about 5-7 minutes. Season lightly with salt." },
      { name: "Kocho or injera for serving", nameAm: "ቆጮ ወይም እንጀራ ለመቅረብ", amount: "as needed" },
      { name: "Cardamom (optional)", nameAm: "ቀረፋ (አማራጭ)", amount: "¼ teaspoon" },
    ],
    steps: [
      { instruction: "If your beef isn't already minced, use a very sharp knife to mince it extremely finely by hand. The meat should be almost paste-like. This is traditionally done with a special curved knife called a 'minchet'.", instructionAm: "ስጋው ካልተፈጨ በጣም ስለት ባለው ቢላ በእጅ በጣም በጥሩ ይፍጩ።", timer: 10, tip: "Chill the meat for 30 minutes before mincing — it's easier to cut when cold.", tipAm: "ከመፍጨትዎ በፊት ለ30 ደቂቃ ያቀዝቁ።" },
      { instruction: "In a wide pan over LOW heat, gently warm the niter kibbeh until just melted and warm — not hot. You should be able to touch the pan without burning yourself.", instructionAm: "በሰፊ ምድጃ ላይ በዝቅተኛ እሳት ንጥር ቅቤውን ቀስ ብለው ያሙቁ።", timer: 3, tip: "If the butter starts sizzling, remove from heat and let it cool slightly.", tipAm: "ቅቤው መፍሰስ ከጀመረ ከእሳት ያውጡ።" },
      { instruction: "Add the minced beef and mitmita spice to the warm butter. Using a fork, gently fold everything together until evenly combined. For 'leb leb' style, let it cook 30 seconds while stirring.", instructionAm: "የተፈጨውን ስጋና ሚጥሚጣ ወደ ሞቀው ቅቤ ጨምሩ። በሹካ ቀስ ብለው ያቀላቅሉ።", timer: 2 },
      { instruction: "Arrange on a plate: mound the kitfo in the center, place fresh ayib on one side and steamed gomen on the other. Serve immediately with kocho or injera.", instructionAm: "በሳህን ላይ ያስቀምጡ: ክትፎውን በመሃል፣ ትኩስ አይብ በአንድ ጎን፣ ጎመን በሌላ ጎን። ከቆጮ ወይም እንጀራ ጋር ወዲያው ያቅርቡ።" },
    ],
  },
  "shiro-wot": {
    title: "Shiro Wot", titleAm: "ሽሮ ወጥ",
    image: recipeShiro, time: "45m", difficulty: "Easy", rating: 4.7,
    category: "Vegan", servings: 4,
    description: "A smooth, comforting chickpea flour stew that is the most beloved everyday dish across Ethiopia. Perfect for fasting days and beginners — simple ingredients, amazing flavor.",
    descriptionAm: "ለስላሳና ጣፋጭ የሽሮ ወጥ። በኢትዮጵያ ውስጥ በጣም ተወዳጅ የዕለት ተዕለት ምግብ ነው። ለጾም ቀናትና ለጀማሪዎች ፍጹም ነው።",
    videoUrl: "https://www.youtube.com/embed/Lf63RcAz3UA",
    tips: [
      "The most important step is cooking the onions long enough — they provide all the flavor",
      "Always add shiro powder gradually while stirring to prevent lumps",
      "Keep stirring frequently while simmering — shiro can stick to the bottom and burn easily",
      "The consistency should be like thick porridge — add water if too thick, cook longer if too thin",
      "Taste and adjust salt at the end — shiro powder may already contain some salt",
    ],
    tipsAm: [
      "በጣም አስፈላጊው ደረጃ ሽንኩርቱን በቂ ጊዜ ማብሰል ነው",
      "ሽሮውን ሁልጊዜ ቀስ በቀስ እየነቃነቁ ጨምሩ",
      "ሲፈላ ያለማቋረጥ ያነሱ — ሽሮ ወደ ታች ተጣብቆ በቀላሉ ሊቃጠል ይችላል",
      "ወፍራም ገንፎ መምሰል አለበት",
      "ጨው በመጨረሻ ይቅመሱና ያስተካክሉ",
    ],
    ingredients: [
      { name: "Shiro powder (chickpea flour blend)", nameAm: "ሽሮ ዱቄት", amount: "1 cup (120g)", note: "Available at Ethiopian/Eritrean grocery stores. Contains ground chickpeas, garlic, and spices." },
      { name: "Red onions, very finely diced", nameAm: "ቀይ ሽንኩርት፣ በጥሩ ተቆርጦ", amount: "3 large", note: "Dice as finely as possible — a food processor works great." },
      { name: "Olive oil or vegetable oil", nameAm: "የወይራ ዘይት", amount: "¼ cup (60ml)", note: "For fasting days use oil; for non-fasting you can use niter kibbeh instead." },
      { name: "Garlic, minced", nameAm: "ነጭ ሽንኩርት", amount: "4 cloves" },
      { name: "Fresh tomato, finely chopped", nameAm: "ትኩስ ቲማቲም", amount: "2 medium", note: "Remove seeds for a smoother sauce." },
      { name: "Berbere spice (optional)", nameAm: "በርበሬ (አማራጭ)", amount: "1 teaspoon", note: "Adds heat and color. Skip if you prefer mild." },
      { name: "Water", nameAm: "ውሃ", amount: "3 cups (720ml)" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
      { name: "Fresh jalapeño (optional)", nameAm: "ቃሪያ (አማራጭ)", amount: "1", note: "Slice and add at the end for extra heat." },
    ],
    steps: [
      { instruction: "Heat oil in a medium pot over medium heat. Add the finely diced onions and cook, stirring occasionally, until they become very soft and deeply golden brown. This is the flavor base — don't rush it.", instructionAm: "ዘይቱን በመካከለኛ ድስት ውስጥ ያሙቁ። ሽንኩርቱን ጨምሩ በጣም እስኪለሰልስና ጥቁር ወርቃማ እስኪሆን ድረስ ያብስሉ።", timer: 15, tip: "If onions start to burn, add a splash of water and reduce heat.", tipAm: "ሽንኩርቱ ከተቃጠለ ትንሽ ውሃ ጨምሩ።" },
      { instruction: "Add the minced garlic and chopped tomatoes. Cook until the tomatoes break down completely and the mixture becomes paste-like. Add berbere if using.", instructionAm: "ነጭ ሽንኩርትና ቲማቲም ጨምሩ። ቲማቲሙ ሙሉ በሙሉ እስኪፈርስ ድረስ ያብስሉ።", timer: 7 },
      { instruction: "In a separate bowl, whisk the shiro powder with 1 cup of water until smooth with no lumps. Set aside.", instructionAm: "በተለየ ሳህን ውስጥ ሽሮውን ከ1 ኩባያ ውሃ ጋር ያቀላቅሉ። ወደ ጎን ያስቀምጡ።", timer: 2, tip: "Using a whisk or fork ensures no lumps form.", tipAm: "ሹካ ወይም ዊስክ መጠቀም ብቻ ይከላከላል።" },
      { instruction: "Add the remaining 2 cups of water to the pot and bring to a gentle boil. Slowly pour in the shiro mixture while stirring continuously in one direction.", instructionAm: "የቀረውን 2 ኩባያ ውሃ ወደ ድስቱ ጨምሩ ቀስ ብሎ ይፍሉ። ሽሮውን ቀስ ብለው እያነሱ ያፍስሱ።", timer: 3 },
      { instruction: "Reduce heat to low and simmer for 20 minutes, stirring frequently to prevent sticking. The shiro should thicken to a creamy, porridge-like consistency. Add water if too thick.", instructionAm: "እሳቱን ዝቅ ያድርጉ ለ20 ደቂቃ ያብስሉ። ያለማቋረጥ ያነሱ። ሽሮው ክሬማ የመሰለ ወፍራም መሆን አለበት።", timer: 20, tip: "The shiro will continue to thicken as it cools, so keep it slightly thinner than desired.", tipAm: "ሽሮው ሲቀዘቅዝ ይወፍራል ስለዚህ ትንሽ ቀጭን ያድርጉት።" },
      { instruction: "Season with salt to taste. Serve hot, drizzled with a little oil on top, alongside fresh injera. Optionally garnish with sliced jalapeño.", instructionAm: "ጨው ይቅመሱ። ሞቅ ብሎ ከእንጀራ ጋር ያቅርቡ። ከፈለጉ ቃሪያ ይጨምሩ።" },
    ],
  },
  "derek-tibs": {
    title: "Derek Tibs", titleAm: "ድርቅ ጥብስ",
    image: recipeTibs, time: "35m", difficulty: "Easy", rating: 4.6,
    category: "Quick Meals", servings: 3,
    description: "Dry-fried cubed beef with rosemary, jalapeños, and onions. One of the easiest and most satisfying Ethiopian dishes to cook — ready in 35 minutes, full of flavor.",
    descriptionAm: "ከሮዝሜሪ፣ ቃሪያና ሽንኩርት ጋር የተጠበሰ ስጋ። ለማብሰል ቀላል ከሆኑ የኢትዮጵያ ምግቦች አንዱ ነው። በ35 ደቂቃ ውስጥ ይጠናቀቃል።",
    videoUrl: "https://www.youtube.com/embed/CqAyM8sPgH8",
    tips: [
      "Use high heat and don't overcrowd the pan — cook in batches if needed",
      "The meat should sizzle when it hits the pan. If it doesn't, your pan isn't hot enough",
      "Pat the beef dry before cooking for better browning",
      "Don't move the meat too much — let it sear on each side for a nice crust",
      "Add the rosemary at the end so it doesn't burn and become bitter",
    ],
    tipsAm: [
      "ከፍተኛ ሙቀት ይጠቀሙ ድስቱን በጣም አይሙሉ",
      "ስጋው ድስቱ ላይ ሲያርፍ ፍስ ማለት አለበት",
      "ለተሻለ ጥብስ ከማብሰልዎ በፊት ስጋውን ያድርቁ",
      "ስጋውን ብዙ አያንቀሳቅሱ",
      "ሮዝሜሪውን በመጨረሻ ጨምሩ",
    ],
    ingredients: [
      { name: "Beef, cut into 1-inch cubes", nameAm: "ስጋ፣ 1 ኢንች ኩብ ተቆራርጦ", amount: "500g", note: "Use sirloin or tenderloin for the most tender results." },
      { name: "Red onion, sliced into half-moons", nameAm: "ቀይ ሽንኩርት፣ ግማሽ ጨረቃ ተቆርጦ", amount: "2 large" },
      { name: "Fresh jalapeño peppers, sliced", nameAm: "ቃሪያ፣ ተቆራርጦ", amount: "3", note: "Remove seeds for less heat. Wear gloves if you have sensitive skin." },
      { name: "Fresh rosemary sprigs", nameAm: "ሮዝሜሪ", amount: "3 sprigs", note: "Fresh is much better than dried. Strip the leaves from the woody stems." },
      { name: "Niter kibbeh or butter", nameAm: "ንጥር ቅቤ", amount: "3 tablespoons" },
      { name: "Black pepper", nameAm: "ጥቁር ቁንዶ በርበሬ", amount: "½ teaspoon" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
      { name: "Awaze sauce (optional, for dipping)", nameAm: "አዋዜ (አማራጭ)", amount: "for serving" },
    ],
    steps: [
      { instruction: "Pat the beef cubes completely dry with paper towels. Season generously with salt and black pepper. Let sit for 5 minutes.", instructionAm: "ስጋውን በወረቀት በደንብ ያድርቁ። በጨውና ጥቁር ቁንዶ በርበሬ ያጣፍጡ። ለ5 ደቂቃ ያስቀምጡ።", timer: 5 },
      { instruction: "Heat niter kibbeh in a large, heavy pan (cast iron is ideal) over HIGH heat until the butter is shimmering and almost smoking.", instructionAm: "ንጥር ቅቤውን በትልቅ ከባድ ድስት ውስጥ በከፍተኛ እሳት ያሙቁ።", timer: 2, tip: "The pan must be very hot for proper searing. This is the key to great tibs.", tipAm: "ድስቱ ለትክክለኛ ጥብስ በጣም ሞቃት መሆን አለበት።" },
      { instruction: "Add the beef cubes in a single layer — don't overcrowd. Sear without moving for 2 minutes, then flip and sear the other side. The meat should have a deep brown crust.", instructionAm: "ስጋውን በአንድ ንብርብር ያስቀምጡ። ሳያንቀሳቅሱ ለ2 ደቂቃ ይጠብሱ፣ ከዚያ ገልብጠው ይጠብሱ።", timer: 6 },
      { instruction: "Add the sliced onions and jalapeños. Toss everything together and cook for 5 minutes until the onions soften but still have some bite.", instructionAm: "ሽንኩርትና ቃሪያ ጨምሩ። ሁሉንም ያቀላቅሉ ለ5 ደቂቃ ያብስሉ።", timer: 5, tip: "Don't let the onions get mushy — they should be slightly crisp.", tipAm: "ሽንኩርቱ መለሰለስ የለበትም — ትንሽ ክሪስፒ መሆን አለበት።" },
      { instruction: "Strip rosemary leaves from stems and scatter over the tibs. Toss once more and remove from heat. Taste and adjust salt.", instructionAm: "ሮዝሜሪውን ከግንዱ ላይ ያውጡ በጥብሱ ላይ ያብትኑ። ከእሳት ያውጡ።", timer: 2 },
      { instruction: "Serve immediately on a hot plate (a clay 'dist' if you have one) with injera or fresh bread. Serve awaze sauce on the side for dipping.", instructionAm: "ወዲያው በሞቃት ሳህን (ጭልፋ ካለ) ከእንጀራ ወይም ዳቦ ጋር ያቅርቡ።" },
    ],
  },
  "beyaynetu": {
    title: "Beyaynetu", titleAm: "በያይነቱ",
    image: recipeBeyaynetu, time: "2h", difficulty: "Medium", rating: 4.8,
    category: "Traditional", servings: 6,
    description: "A stunning fasting platter featuring an assortment of colorful vegetarian dishes served together on injera. This is Ethiopian communal dining at its finest — perfect for gatherings.",
    descriptionAm: "በእንጀራ ላይ በብዙ ዓይነት ጾም ምግቦች የሚቀርብ ድንቅ ምግብ። ይህ ለመሰባሰቢያ ፍጹም ነው።",
    videoUrl: "https://www.youtube.com/embed/UmB0V-O2N9w",
    tips: [
      "Prepare each dish separately and arrange beautifully on the injera",
      "Start with the dishes that take longest (misir wot) and work backwards",
      "Each dish should be seasoned independently — taste as you go",
      "Use colorful vegetables for visual appeal",
      "The platter should have a variety of textures and flavors: spicy, mild, crunchy, smooth",
    ],
    tipsAm: [
      "እያንዳንዱን ምግብ ለብቻ ያዘጋጁ በእንጀራ ላይ በቆንጆ ያስቀምጡ",
      "ረጅም ጊዜ የሚወስዱ ምግቦችን (ምስር ወጥ) ቀድሞ ይጀምሩ",
      "እያንዳንዱ ምግብ ለብቻ ጣዕም ሊኖረው ይገባል",
      "ለእይታ ማራኪነት ቀለማት ያላቸው አትክልቶችን ይጠቀሙ",
      "በሳህኑ ላይ የተለያዩ ሸካራና ጣዕሞች ሊኖሩ ይገባል",
    ],
    ingredients: [
      { name: "Red lentils (for misir wot)", nameAm: "ቀይ ምስር (ለምስር ወጥ)", amount: "2 cups", note: "Wash lentils thoroughly until water runs clear. No need to soak." },
      { name: "Collard greens (for gomen)", nameAm: "ጎመን", amount: "1 large bunch", note: "Remove thick stems and chop leaves finely." },
      { name: "Green cabbage & carrots (for atkilt)", nameAm: "ጎመንና ካሮት (ለአትክልት)", amount: "1 small head + 3 carrots", note: "Shred the cabbage thinly and slice carrots into thin rounds." },
      { name: "Shiro powder", nameAm: "ሽሮ ዱቄት", amount: "1 cup" },
      { name: "Red onions", nameAm: "ቀይ ሽንኩርት", amount: "6 large (total)" },
      { name: "Olive oil", nameAm: "የወይራ ዘይት", amount: "½ cup" },
      { name: "Berbere spice", nameAm: "በርበሬ", amount: "3 tablespoons" },
      { name: "Turmeric", nameAm: "ኩርኩም", amount: "1 teaspoon" },
      { name: "Garlic & ginger", nameAm: "ነጭ ሽንኩርትና ዝንጅብል", amount: "6 cloves + 1 tbsp" },
      { name: "Injera (for serving)", nameAm: "እንጀራ", amount: "4-6 pieces" },
      { name: "Salt", nameAm: "ጨው", amount: "to taste" },
    ],
    steps: [
      { instruction: "Start with Misir Wot: Cook 2 diced onions in oil until golden. Add berbere, then washed lentils with 3 cups water. Simmer until lentils are soft and saucy (about 25 min).", instructionAm: "ምስር ወጥ ይጀምሩ: 2 ሽንኩርት በዘይት ያብስሉ። በርበሬ ጨምሩ፣ ከዚያ ምስሩን ከ3 ኩባያ ውሃ ጋር ያፍሉ።", timer: 30, tip: "Stir lentils occasionally to prevent sticking. Add water if they dry out." },
      { instruction: "Make Gomen: Sauté 1 diced onion and garlic in oil. Add chopped collard greens and cook until tender but still bright green. Season with salt.", instructionAm: "ጎመን: 1 ሽንኩርትና ነጭ ሽንኩርት በዘይት ያብስሉ። ጎመን ጨምሩ እስኪለሰልስ ያብስሉ።", timer: 15 },
      { instruction: "Make Atkilt: Sauté 1 onion with turmeric in oil. Add shredded cabbage and sliced carrots. Cook covered until tender-crisp, about 12 minutes.", instructionAm: "አትክልት: 1 ሽንኩርት ከኩርኩም ጋር ያብስሉ። ጎመንና ካሮት ጨምሩ። ድፍን ለ12 ደቂቃ ያብስሉ።", timer: 15 },
      { instruction: "Make Shiro: Follow the Shiro Wot recipe — cook onions, add shiro powder with water, simmer until thick and creamy.", instructionAm: "ሽሮ: ሽንኩርት ያብስሉ፣ ሽሮ ከውሃ ጋር ጨምሩ፣ እስኪወፍር ያፍሉ።", timer: 25 },
      { instruction: "Arrange the platter: Lay a large injera on a round tray. Spoon each dish in separate sections around the injera, creating a colorful wheel pattern.", instructionAm: "ሳህኑን ያዘጋጁ: ትልቅ እንጀራ ይዘርጉ። እያንዳንዱን ምግብ በተለያየ ቦታ ያስቀምጡ።", timer: 10, tip: "Roll extra injera and place around the edges for tearing and scooping." },
    ],
  },
  "coffee-ceremony": {
    title: "Ethiopian Coffee Ceremony", titleAm: "ቡና ሥነ ሥርዓት",
    image: recipeCoffee, time: "1h", difficulty: "Easy", rating: 4.9,
    category: "Beverage", servings: 6,
    description: "The sacred Ethiopian coffee ceremony (Buna) — a beautiful ritual of roasting, grinding, and brewing that brings people together. More than making coffee, it's a social tradition that has been practiced for centuries.",
    descriptionAm: "ቅዱስ የኢትዮጵያ ቡና ሥነ ሥርዓት — ሰዎችን የሚያገናኝ የማጠብሻ፣ የመፍጨትና የማፍላት ባህላዊ ሥነ ሥርዓት። ለዘመናት ሲለማመዱ የቆዩ ባህል ነው።",
    videoUrl: "https://www.youtube.com/embed/2gQOxfJNDjU",
    tips: [
      "The ceremony traditionally has 3 rounds: Abol (first, strongest), Tona (second), and Bereka (third, mildest)",
      "Burn frankincense (etan) during the ceremony to create a fragrant atmosphere",
      "Always serve with popcorn (fendisha) or kolo (roasted barley snack)",
      "The host traditionally serves the eldest guest first as a sign of respect",
      "A traditional jebena (clay coffee pot) gives the best flavor, but a regular pot works too",
    ],
    tipsAm: [
      "ሥነ ሥርዓቱ 3 ዙሮች አሉት: አቦል (የመጀመሪያ፣ ጠንካራ)፣ ቶና (ሁለተኛ)፣ በረካ (ሦስተኛ፣ ለስላሳ)",
      "ለመዓዛ ከቡና ሥነ ሥርዓቱ ጋር እጣን ያጥኑ",
      "ሁልጊዜ ከፋንድሻ ወይም ቆሎ ጋር ያቅርቡ",
      "አስተናጋጁ በባህል ትልቁን እንግዳ ቀድሞ ያቀርባል",
      "ባህላዊ ጀበና ምርጥ ጣዕም ይሰጣል",
    ],
    ingredients: [
      { name: "Green (raw) coffee beans", nameAm: "ጥሬ ቡና", amount: "200g (about 1 cup)", note: "Ethiopian origin beans (Yirgacheffe or Sidamo) are ideal. Available at specialty coffee shops." },
      { name: "Fresh water", nameAm: "ንጹህ ውሃ", amount: "1 liter", note: "Use filtered water for the best flavor." },
      { name: "Frankincense (etan)", nameAm: "እጣን", amount: "a few pieces", note: "Burn on charcoal during the ceremony for authentic atmosphere." },
      { name: "Sugar", nameAm: "ስኳር", amount: "to taste", note: "Traditionally served with sugar, but some prefer without." },
      { name: "Popcorn (fendisha)", nameAm: "ፋንድሻ", amount: "2 cups, freshly popped", note: "Traditional accompaniment. Pop fresh for the best experience." },
      { name: "Kolo (roasted barley snack)", nameAm: "ቆሎ", amount: "1 cup (optional)" },
      { name: "Small coffee cups (sini)", nameAm: "ሲኒ", amount: "6 cups" },
    ],
    steps: [
      { instruction: "Wash the green coffee beans in a pan of water, removing any debris or broken beans. Drain completely and pat dry.", instructionAm: "ጥሬ ቡናውን በውሃ ሟሟት ይታጠቡ። ሙሉ በሙሉ ያፍስሱ ያድርቁ።", timer: 5 },
      { instruction: "Place a flat pan (mekeshkesha) over medium heat. Add the green beans and roast, shaking the pan frequently. The beans will turn from green to golden, then to dark brown, releasing a wonderful aroma.", instructionAm: "ጠፍጣፋ ድስት (መከሸከሻ) ላይ ያሙቁ። ቡናውን ጨምሩ ያለማቋረጥ ያወዛወዙ። ቡናው ከአረንጓዴ ወደ ወርቃማ ከዚያ ወደ ጥቁር ቡናማ ይቀየራል።", timer: 15, tip: "Watch carefully — the beans can go from perfectly roasted to burnt in seconds. They should be dark brown, not black.", tipAm: "በጥንቃቄ ያስተውሉ — በሰከንዶች ውስጥ ሊቃጠሉ ይችላሉ።" },
      { instruction: "Walk the pan of freshly roasted beans around to let everyone smell the wonderful aroma — this is an important part of the ceremony! Fan the smoke towards each guest.", instructionAm: "ባቀቡን ቡና ሁሉም እንዲሸተው ይዞር — ይህ የሥነ ሥርዓቱ አስፈላጊ ክፍል ነው!", timer: 3 },
      { instruction: "Grind the roasted beans using a mortar and pestle (mukecha and zenezena). Pound rhythmically until you get a fine to medium powder.", instructionAm: "የተጠበሰውን ቡና በሙከቻና ዘነዘና ይፍጩ። ቀጭን ወደ መካከለኛ ዱቄት ያድርጉት።", timer: 8, tip: "The grinding sound is part of the ceremony's rhythm. Traditionally, the grinding motion is meditative.", tipAm: "የመፍጨት ድምፅ የሥነ ሥርዓቱ አካል ነው።" },
      { instruction: "Fill the jebena (clay coffee pot) with water and bring to a boil. Add the ground coffee, stir once, and let it come back to a boil. When it starts to rise, remove from heat and let it settle. Repeat this 2-3 times.", instructionAm: "ጀበናውን ውሃ ሙሉ ያፍሉ። የተፈጨውን ቡና ጨምሩ አንድ ጊዜ ያነሱ ይፍሉ። ሲነሳ ከእሳት ያውጡ ይረጋ። ይህን 2-3 ጊዜ ይድገሙ።", timer: 10 },
      { instruction: "Pour the coffee slowly into small cups (sini) from a height — this aerates the coffee and is part of the presentation. Serve with sugar on the side, popcorn, and kolo. Enjoy three rounds: Abol, Tona, and Bereka.", instructionAm: "ቡናውን ቀስ ብለው ከከፍታ ወደ ሲኒ ይቅዱ። ከስኳር፣ ፋንድሻና ቆሎ ጋር ያቅርቡ። ሶስት ዙር ይጠጡ: አቦል፣ ቶና፣ በረካ።" },
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
            <Button
              variant="ghost" size="sm"
              className="rounded-full gap-1.5 text-muted-foreground"
              onClick={() => setShowVideo(!showVideo)}
            >
              <Youtube className="h-4 w-4" />
              {lang === "en" ? "Watch Video" : "ቪዲዮ ይመልከቱ"}
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

                      {/* Step-specific tip */}
                      {step.tip && i === activeStep && (
                        <div className="mt-3 flex items-start gap-2 p-2 rounded-lg bg-spice-gold/10">
                          <Lightbulb className="h-4 w-4 text-spice-gold flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground font-body">
                            {lang === "en" ? step.tip : (step.tipAm || step.tip)}
                          </span>
                        </div>
                      )}

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
