import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, Heart } from "lucide-react";
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
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => { x.set(0); y.set(0); };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="group cursor-pointer will-change-transform"
    >
      <Link to={`/recipe/${slug}`}>
        {/* Editorial photo plate */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />

          {/* Plate number — magazine credit */}
          <span className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-widest bg-cream/95 text-foreground font-body">
            № {String(index + 1).padStart(2, "0")}
          </span>

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 bg-cream/95 backdrop-blur-sm hover:bg-cream transition-colors"
            aria-label="Save recipe"
          >
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-primary text-primary" : "text-foreground/60"}`} />
          </button>
        </div>

        {/* Caption — editorial style */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-body mb-2">
            {category} · {difficulty}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {time}
            </span>
            <span className="text-foreground/30">·</span>
            <span>★ {rating}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
