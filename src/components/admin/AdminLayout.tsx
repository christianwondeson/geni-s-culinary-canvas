import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, ChefHat, Users, MessageSquare, BarChart3, LogOut, ExternalLink } from "lucide-react";
import { adminStore } from "@/lib/adminStore";
import { motion } from "framer-motion";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/recipes", label: "Recipes", icon: ChefHat },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/comments", label: "Comments", icon: MessageSquare },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = () => {
    adminStore.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-coffee text-cream border-r border-coffee/40">
        <div className="px-6 py-6 border-b border-cream/10">
          <Link to="/admin" className="font-display text-xl font-bold tracking-tight">
            Geni's <span className="text-spice-gold">Studio</span>
          </Link>
          <p className="text-xs text-cream/50 mt-1 uppercase tracking-[0.2em]">Editorial Desk</p>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${
                    isActive ? "bg-spice-gold text-coffee font-semibold" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-cream/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/60 hover:bg-cream/5 hover:text-cream transition-colors font-body"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-cream/60 hover:bg-destructive/20 hover:text-destructive transition-colors font-body"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile bar */}
        <div className="md:hidden flex items-center justify-between bg-coffee text-cream px-4 py-3">
          <Link to="/admin" className="font-display font-bold">Geni's Studio</Link>
          <button onClick={signOut} className="text-xs text-cream/70">Sign out</button>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-1 px-3 py-2 bg-coffee/95 border-b border-coffee/40">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-body ${
                  isActive ? "bg-spice-gold text-coffee" : "text-cream/70"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <header className="px-6 lg:px-10 py-8 border-b border-border bg-background">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="kicker text-primary">Admin</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">{title}</h1>
            {subtitle && <p className="text-muted-foreground font-body mt-1">{subtitle}</p>}
          </motion.div>
        </header>

        <div className="flex-1 px-6 lg:px-10 py-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
