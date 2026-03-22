import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-foreground">
              Geni's <span className="text-primary">Recipe</span>
            </span>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Authentic Ethiopian recipes, crafted with love and tradition.
            </p>
          </div>

          {[
            { title: "Explore", links: ["All Recipes", "Traditional", "Quick Meals", "Desserts"] },
            { title: "Company", links: ["About Geni", "Our Story", "Contact", "Blog"] },
            { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "FAQ"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2026 Geni's Recipe. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart className="h-3 w-3 text-primary fill-primary" /> in Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
