import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChefHat, Users, MessageSquare, Eye, ArrowUpRight, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminStore } from "@/lib/adminStore";

function Stat({ label, value, delta, icon: Icon, tone = "primary" }: {
  label: string; value: string; delta?: string; icon: any; tone?: "primary" | "secondary" | "spice-gold" | "deep-green";
}) {
  const tones: Record<string, string> = {
    "primary": "text-primary bg-primary/10",
    "secondary": "text-secondary bg-secondary/10",
    "spice-gold": "text-spice-gold bg-spice-gold/10",
    "deep-green": "text-deep-green bg-deep-green/10",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="bg-background border border-border rounded-2xl p-5 paper-grain"
    >
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-deep-green bg-deep-green/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" /> {delta}
          </span>
        )}
      </div>
      <p className="text-3xl font-display font-bold text-foreground mt-4">{value}</p>
      <p className="text-sm text-muted-foreground font-body mt-1">{label}</p>
    </motion.div>
  );
}

export default function AdminOverview() {
  const recipes = adminStore.getRecipes();
  const users = adminStore.getUsers();
  const comments = adminStore.getComments();

  const stats = useMemo(() => {
    const totalViews = recipes.reduce((a, r) => a + r.views, 0);
    const subs = users.filter((u) => u.plan !== "free").length;
    const pending = comments.filter((c) => c.status === "pending").length;
    return { totalViews, subs, pending, recipeCount: recipes.length };
  }, [recipes, users, comments]);

  const topRecipes = [...recipes].sort((a, b) => b.views - a.views).slice(0, 5);
  const recentComments = [...comments].slice(0, 4);

  return (
    <AdminLayout title="Overview" subtitle="Welcome back. Here's what's cooking.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Stat label="Recipes published" value={String(stats.recipeCount)} delta="+2 this week" icon={ChefHat} tone="primary" />
        <Stat label="Active subscribers" value={String(stats.subs)} delta="+12%" icon={Users} tone="deep-green" />
        <Stat label="Total recipe views" value={stats.totalViews.toLocaleString()} delta="+8.4%" icon={Eye} tone="spice-gold" />
        <Stat label="Comments awaiting" value={String(stats.pending)} icon={MessageSquare} tone="secondary" />
      </div>

      <div className="ink-divider opacity-60 mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="kicker text-primary">Most read</span>
              <h2 className="font-display text-2xl font-bold mt-2">Top recipes this week</h2>
            </div>
            <Link to="/admin/recipes" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              All recipes <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {topRecipes.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 py-3 border-b border-border/60 last:border-0"
              >
                <span className="step-numeral text-2xl w-8">№{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-semibold text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground font-body capitalize">{r.category} · {r.difficulty}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-foreground">{r.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground font-body">views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-background border border-border rounded-2xl p-6">
          <span className="kicker text-secondary">Latest</span>
          <h2 className="font-display text-2xl font-bold mt-2 mb-6">From readers</h2>
          <div className="space-y-4">
            {recentComments.map((c) => (
              <div key={c.id} className="border-l-2 border-primary/30 pl-3">
                <p className="text-sm text-foreground font-body line-clamp-2">"{c.text}"</p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  — {c.author} on <span className="italic">{c.recipeTitle}</span>
                </p>
              </div>
            ))}
          </div>
          <Link to="/admin/comments" className="mt-6 text-sm text-primary hover:underline inline-flex items-center gap-1">
            Moderate all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
