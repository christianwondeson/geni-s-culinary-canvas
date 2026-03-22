import { motion } from "framer-motion";
import { Check, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "ብር 0",
    period: "ለዘላለም",
    description: "Explore the basics",
    features: [
      "Browse 50+ free recipes",
      "Basic search & filters",
      "Save up to 10 favorites",
      "Community access",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Premium",
    price: "ብር 450",
    period: "/month",
    description: "Full chef experience",
    features: [
      "All 200+ recipes unlocked",
      "Exclusive video tutorials",
      "Step-by-step cooking guide",
      "Built-in cooking timers",
      "Amharic & English support",
      "Priority support",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-spice-gold" />
            <span className="text-spice-gold font-semibold text-sm uppercase tracking-wider">Pricing</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Start free, upgrade when you're ready for the full experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className={`relative rounded-3xl p-8 ${
                plan.featured
                  ? "bg-foreground text-background shadow-2xl scale-[1.02]"
                  : "glass-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full bg-spice-gold text-accent-foreground text-xs font-bold">
                  <Crown className="h-3 w-3" /> Most Popular
                </div>
              )}

              <h3 className={`font-display text-2xl font-bold mb-1 ${plan.featured ? "text-background" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-5xl font-display font-bold ${plan.featured ? "text-background" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.featured ? "text-spice-gold" : "text-primary"}`} />
                    <span className={`text-sm ${plan.featured ? "text-background/80" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-2xl h-12 font-semibold ${
                  plan.featured
                    ? "bg-spice-gold text-accent-foreground hover:bg-spice-gold/90"
                    : ""
                }`}
                variant={plan.featured ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
