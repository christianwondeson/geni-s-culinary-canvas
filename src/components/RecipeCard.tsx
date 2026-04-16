import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, Flame, Heart, Star } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  category: string;
  slug: string;
  index?: number;
}

export function RecipeCard({ title, image, time, difficulty, rating, category, slug, index = 0 }: RecipeCardProps) {
  const [liked, setLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => { x.set(0); y.set(0); };

  const difficultyColor = {
    Easy: "text-deep-green bg-deep-green/10",
    Medium: "text-spice-gold bg-spice-gold/10",
    Hard: "text-primary bg-primary/10",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ rotateX, rotateY, perspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group glass-card overflow-hidden cursor-pointer will-change-transform"
    >
      <Link to={`/recipe/${slug}`}>
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-semibold bg-cream/90 backdrop-blur-md text-foreground font-body shadow-sm"
          >
            {category}
          </motion.span>

          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-cream/90 backdrop-blur-md shadow-sm"
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${liked ? "fill-primary text-primary scale-110" : "text-muted-foreground"}`} />
          </motion.button>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                <Clock className="h-4 w-4" /> {time}
              </span>
              <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full font-body ${difficultyColor[difficulty]}`}>
                <Flame className="h-3 w-3" /> {difficulty}
              </span>
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-spice-gold font-body">
              <Star className="h-4 w-4 fill-spice-gold" /> {rating}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
