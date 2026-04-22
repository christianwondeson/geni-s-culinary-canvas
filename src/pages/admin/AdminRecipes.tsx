import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Eye, FileText, Youtube, X } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { adminStore, Recipe, newId, slugify } from "@/lib/adminStore";
import { toast } from "sonner";

const empty: Recipe = {
  id: "", slug: "", title: "", category: "traditional", difficulty: "Medium", cookTime: 30,
  servings: 4, image: "/placeholder.svg", description: "", ingredients: [], steps: [],
  views: 0, status: "draft", createdAt: new Date().toISOString().slice(0, 10),
};

export default function AdminRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(adminStore.getRecipes());
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Recipe | null>(null);
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");

  const filtered = recipes.filter(
    (r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.category.includes(query.toLowerCase())
  );

  const openNew = () => {
    setEditing({ ...empty, id: newId() });
    setIngredientsText("");
    setStepsText("");
  };

  const openEdit = (r: Recipe) => {
    setEditing(r);
    setIngredientsText(r.ingredients.join("\n"));
    setStepsText(r.steps.join("\n"));
  };

  const close = () => setEditing(null);

  const remove = (id: string) => {
    if (!confirm("Delete this recipe? This cannot be undone.")) return;
    setRecipes(adminStore.deleteRecipe(id));
    toast.success("Recipe deleted");
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) return toast.error("Title is required");
    const recipe: Recipe = {
      ...editing,
      slug: editing.slug || slugify(editing.title),
      ingredients: ingredientsText.split("\n").map((s) => s.trim()).filter(Boolean),
      steps: stepsText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    setRecipes(adminStore.upsertRecipe(recipe));
    toast.success(`Recipe ${editing.status === "published" ? "published" : "saved as draft"}`);
    close();
  };

  return (
    <AdminLayout title="Recipes" subtitle="Write, edit, and publish your kitchen library.">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-background"
          />
        </div>
        <Button onClick={openNew} className="h-11 rounded-xl gap-2">
          <Plus className="h-4 w-4" /> New recipe
        </Button>
      </div>

      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground font-body bg-muted/30 border-b border-border">
          <div className="col-span-5">Recipe</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Views</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 px-5 py-4 border-b border-border/60 last:border-0 items-center hover:bg-muted/20 transition-colors"
          >
            <div className="col-span-5">
              <div className="flex items-center gap-3">
                <span className="step-numeral text-xl">№{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground font-body truncate">/{r.slug} · {r.cookTime} min · {r.servings} servings</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 text-sm font-body capitalize text-muted-foreground">{r.category}</div>
            <div className="col-span-1">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                r.status === "published" ? "bg-deep-green/15 text-deep-green" : "bg-spice-gold/15 text-spice-gold"
              }`}>{r.status}</span>
            </div>
            <div className="col-span-2 text-sm font-body inline-flex items-center gap-1 text-muted-foreground">
              <Eye className="h-3 w-3" /> {r.views.toLocaleString()}
            </div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              <button onClick={() => openEdit(r)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(r.id)} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No recipes match your search.</div>
        )}
      </div>

      {/* Editor drawer */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-background z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <span className="kicker text-primary">{recipes.find((r) => r.id === editing.id) ? "Edit" : "New"}</span>
                  <h3 className="font-display text-xl font-bold mt-1">{editing.title || "Untitled recipe"}</h3>
                </div>
                <button onClick={close} className="p-2 rounded-lg hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-5">
                <Field label="Title">
                  <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="h-11 rounded-xl" />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category">
                    <select
                      value={editing.category}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value as Recipe["category"] })}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-body"
                    >
                      <option value="traditional">Traditional</option>
                      <option value="international">International</option>
                      <option value="drinks">Drinks</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </Field>
                  <Field label="Difficulty">
                    <select
                      value={editing.difficulty}
                      onChange={(e) => setEditing({ ...editing, difficulty: e.target.value as Recipe["difficulty"] })}
                      className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm font-body"
                    >
                      <option>Easy</option><option>Medium</option><option>Hard</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Cook time (minutes)">
                    <Input type="number" value={editing.cookTime} onChange={(e) => setEditing({ ...editing, cookTime: Number(e.target.value) })} className="h-11 rounded-xl" />
                  </Field>
                  <Field label="Servings">
                    <Input type="number" value={editing.servings} onChange={(e) => setEditing({ ...editing, servings: Number(e.target.value) })} className="h-11 rounded-xl" />
                  </Field>
                </div>

                <Field label="Cover image URL">
                  <Input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="h-11 rounded-xl" placeholder="/recipe-cover.jpg" />
                </Field>

                <Field label="YouTube tutorial URL" icon={Youtube}>
                  <Input value={editing.youtubeUrl || ""} onChange={(e) => setEditing({ ...editing, youtubeUrl: e.target.value })} className="h-11 rounded-xl" placeholder="https://youtube.com/watch?v=…" />
                </Field>

                <Field label="Description" icon={FileText}>
                  <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="rounded-xl" />
                </Field>

                <Field label="Ingredients (one per line)">
                  <Textarea value={ingredientsText} onChange={(e) => setIngredientsText(e.target.value)} rows={6} className="rounded-xl font-mono text-sm" placeholder="2 red onions&#10;1 tbsp berbere" />
                </Field>

                <Field label="Steps (one per line)">
                  <Textarea value={stepsText} onChange={(e) => setStepsText(e.target.value)} rows={8} className="rounded-xl font-mono text-sm" placeholder="Caramelize onions for 30 min.&#10;Add berbere and bloom." />
                </Field>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 text-sm font-body">
                    <input
                      type="checkbox"
                      checked={editing.status === "published"}
                      onChange={(e) => setEditing({ ...editing, status: e.target.checked ? "published" : "draft" })}
                      className="rounded border-border"
                    />
                    Publish to site
                  </label>
                  <label className="flex items-center gap-2 text-sm font-body">
                    <input
                      type="checkbox"
                      checked={!!editing.featured}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                      className="rounded border-border"
                    />
                    Feature on homepage
                  </label>
                </div>
              </div>

              <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-6 py-4 flex gap-3">
                <Button variant="outline" onClick={close} className="flex-1 rounded-xl">Cancel</Button>
                <Button onClick={save} className="flex-1 rounded-xl">Save recipe</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}

function Field({ label, children, icon: Icon }: { label: string; children: React.ReactNode; icon?: any }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-2 flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3" />} {label}
      </label>
      {children}
    </div>
  );
}
