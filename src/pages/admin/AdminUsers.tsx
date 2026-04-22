import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShieldCheck, Ban, Crown } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/input";
import { adminStore, AdminUser } from "@/lib/adminStore";
import { toast } from "sonner";

const planColors: Record<string, string> = {
  free: "bg-muted text-muted-foreground",
  basic: "bg-secondary/15 text-secondary",
  premium: "bg-spice-gold/15 text-spice-gold",
  pro: "bg-primary/15 text-primary",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(adminStore.getUsers());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "subscribers" | "free">("all");

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchF = filter === "all" || (filter === "subscribers" ? u.plan !== "free" : u.plan === "free");
    return matchQ && matchF;
  });

  const update = (id: string, patch: Partial<AdminUser>) => {
    setUsers(adminStore.updateUser(id, patch));
    toast.success("User updated");
  };

  const counts = {
    all: users.length,
    subscribers: users.filter((u) => u.plan !== "free").length,
    free: users.filter((u) => u.plan === "free").length,
  };

  return (
    <AdminLayout title="Users & Subscribers" subtitle="Manage your community and subscription tiers.">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email…" value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 h-11 rounded-xl bg-background" />
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {(["all", "subscribers", "free"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-body capitalize transition-colors ${
                filter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {f} <span className="ml-1 text-xs opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-body bg-muted/30 border-b border-border">
          <div className="col-span-4">User</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last active</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {filtered.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-4 border-b border-border/60 last:border-0 items-center hover:bg-muted/20 transition-colors"
          >
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold">
                {u.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-foreground truncate">{u.name}</p>
                <p className="text-xs text-muted-foreground font-body truncate">{u.email}</p>
              </div>
            </div>
            <div className="col-span-2">
              <select
                value={u.plan}
                onChange={(e) => update(u.id, { plan: e.target.value as AdminUser["plan"] })}
                className={`text-xs px-2.5 py-1.5 rounded-full font-medium border-0 cursor-pointer ${planColors[u.plan]}`}
              >
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="pro">Pro</option>
              </select>
            </div>
            <div className="col-span-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                u.status === "active" ? "bg-deep-green/15 text-deep-green" : "bg-destructive/15 text-destructive"
              }`}>{u.status}</span>
            </div>
            <div className="col-span-2 text-sm text-muted-foreground font-body">{u.lastActive}</div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              {u.status === "active" ? (
                <button onClick={() => update(u.id, { status: "suspended" })} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Suspend">
                  <Ban className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={() => update(u.id, { status: "active" })} className="p-2 rounded-lg hover:bg-deep-green/10 text-muted-foreground hover:text-deep-green transition-colors" title="Reactivate">
                  <ShieldCheck className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => update(u.id, { plan: "premium" })} className="p-2 rounded-lg hover:bg-spice-gold/10 text-muted-foreground hover:text-spice-gold transition-colors" title="Upgrade to Premium">
                <Crown className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}
