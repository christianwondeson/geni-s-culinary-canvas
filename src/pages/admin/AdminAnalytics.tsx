import { useMemo } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminStore } from "@/lib/adminStore";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const signupData = [
  { month: "Nov", signups: 120, subs: 28 },
  { month: "Dec", signups: 180, subs: 52 },
  { month: "Jan", signups: 240, subs: 78 },
  { month: "Feb", signups: 310, subs: 110 },
  { month: "Mar", signups: 420, subs: 168 },
  { month: "Apr", signups: 510, subs: 215 },
];

const COLORS = ["hsl(15 65% 52%)", "hsl(38 70% 60%)", "hsl(150 25% 32%)", "hsl(25 40% 22%)"];

export default function AdminAnalytics() {
  const recipes = adminStore.getRecipes();
  const users = adminStore.getUsers();

  const topViews = useMemo(
    () => [...recipes].sort((a, b) => b.views - a.views).slice(0, 6).map((r) => ({ name: r.title, views: r.views })),
    [recipes]
  );

  const planDist = useMemo(() => {
    const counts: Record<string, number> = { free: 0, basic: 0, premium: 0, pro: 0 };
    users.forEach((u) => { counts[u.plan] = (counts[u.plan] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [users]);

  return (
    <AdminLayout title="Analytics" subtitle="Where readers come from, what they cook, what they pay for.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Signups & subscriptions" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={signupData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(15 65% 52%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(15 65% 52%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(38 70% 60%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(38 70% 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="signups" stroke="hsl(15 65% 52%)" fill="url(#g1)" strokeWidth={2} />
              <Area type="monotone" dataKey="subs" stroke="hsl(38 70% 60%)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Plan distribution" subtitle={`${users.length} total users`}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={planDist} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3}>
                {planDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Most viewed recipes" subtitle="All-time" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topViews} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
              <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Bar dataKey="views" fill="hsl(15 65% 52%)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </AdminLayout>
  );
}

function Card({ title, subtitle, children, className = "" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className={`bg-background border border-border rounded-2xl p-6 ${className}`}
    >
      <span className="kicker text-primary">Report</span>
      <h2 className="font-display text-xl font-bold mt-2">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground font-body mb-4">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}
