import { motion } from "framer-motion";
import { Search, ChevronDown, Clock, Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

const floatingItems = [
  { emoji: "🌶️", x: "10%", y: "20%", delay: 0 },
  { emoji: "🫚", x: "85%", y: "15%", delay: 1 },
  { emoji: "🧄", x: "75%", y: "70%", delay: 2 },
  { emoji: "🌿", x: "15%", y: "75%", delay: 0.5 },
  { emoji: "🍋", x: "90%", y: "45%", delay: 1.5 },
];

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Ethiopian cuisine spread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/90 via-coffee/70 to-coffee/40" />
      </div>

      {/* Floating Ingredients */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-6xl pointer-events-none select-none opacity-60"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-cream text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-spice-gold text-spice-gold" /> Chef's Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[1.05] mb-6"
          >
            Cook Smarter
            <br />
            with <span className="text-spice-gold">Geni's</span>
            <br />
            Recipes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-cream/80 max-w-lg mb-8 font-body"
          >
            Discover authentic Ethiopian recipes passed down through generations.
            Step-by-step guides, cooking timers, and cultural stories.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search recipes, ingredients..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-cream/95 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body"
              />
            </div>
            <Button size="lg" className="rounded-2xl px-8 py-4 h-auto text-base font-semibold">
              Explore
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6 mt-10"
          >
            {[
              { icon: Flame, label: "200+ Recipes", color: "text-spice-gold" },
              { icon: Clock, label: "Quick & Easy", color: "text-cream" },
              { icon: Star, label: "Chef Approved", color: "text-spice-gold" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-cream/70">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-cream/50" />
      </motion.div>
    </section>
  );
}
