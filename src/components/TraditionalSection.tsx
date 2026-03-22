import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import recipeBeyaynetu from "@/assets/recipe-beyaynetu.jpg";
import recipeCoffee from "@/assets/recipe-coffee.jpg";
import recipeDoro from "@/assets/recipe-doro-wot.jpg";

const dishes = [
  {
    title: "Beyaynetu",
    subtitle: "The Fasting Platter",
    description: "A colorful spread of vegetarian dishes served on injera — a staple of Ethiopian fasting tradition.",
    image: recipeBeyaynetu,
  },
  {
    title: "Ethiopian Coffee",
    subtitle: "Buna Ceremony",
    description: "More than a drink — a sacred ritual of roasting, brewing, and sharing that brings people together.",
    image: recipeCoffee,
  },
  {
    title: "Doro Wot",
    subtitle: "The Queen of Stews",
    description: "A rich, spicy chicken stew slow-cooked with berbere spice and served on special occasions.",
    image: recipeDoro,
  },
];

export function TraditionalSection() {
  return (
    <section id="traditional" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Heritage</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Traditional Ethiopian <span className="text-secondary">Dishes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Recipes rooted in centuries of culinary tradition, brought to your kitchen with authentic flavors.
          </p>
        </motion.div>

        <div className="space-y-20">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden group">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-72 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 to-transparent" />
                </div>
              </div>

              <div className="flex-1">
                <span className="text-primary font-medium text-sm">{dish.subtitle}</span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                  {dish.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {dish.description}
                </p>
                <button className="font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
                  View Full Recipe →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
