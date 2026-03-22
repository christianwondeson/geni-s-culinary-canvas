import { motion } from "framer-motion";
import { Clock, Flame, Heart, Star } from "lucide-react";
import { useState } from "react";

interface RecipeCardProps {
  title: string;
  image: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  category: string;
  index?: number;
}

export function RecipeCard({ title, image, time, difficulty, rating, category, index = 0 }: RecipeCardProps) {
  const [liked, setLiked] = useState(false);

  const difficultyColor = {
    Easy: "text-deep-green bg-deep-green/10",
    Medium: "text-spice-gold bg-spice-gold/10",
    Hard: "text-primary bg-primary/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group glass-card overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-cream/90 backdrop-blur-sm text-foreground">
          {category}
        </span>

        {/* Favorite */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-cream/90 backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {time}
            </span>
            <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor[difficulty]}`}>
              <Flame className="h-3 w-3" /> {difficulty}
            </span>
          </div>

          <span className="flex items-center gap-1 text-sm font-medium text-spice-gold">
            <Star className="h-4 w-4 fill-spice-gold" /> {rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
