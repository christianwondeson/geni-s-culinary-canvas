// Local-only admin data store (UI simulation, no backend)
export type Recipe = {
  id: string;
  slug: string;
  title: string;
  category: "traditional" | "international" | "drinks" | "vegan";
  difficulty: "Easy" | "Medium" | "Hard";
  cookTime: number; // minutes
  servings: number;
  image: string;
  youtubeUrl?: string;
  description: string;
  ingredients: string[];
  steps: string[];
  views: number;
  status: "published" | "draft";
  createdAt: string;
  featured?: boolean;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  plan: "free" | "basic" | "premium" | "pro";
  status: "active" | "suspended";
  joinedAt: string;
  lastActive: string;
};

export type Comment = {
  id: string;
  recipeSlug: string;
  recipeTitle: string;
  author: string;
  text: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const KEYS = {
  recipes: "geni_admin_recipes_v1",
  users: "geni_admin_users_v1",
  comments: "geni_admin_comments_v1",
  auth: "geni_admin_auth_v1",
};

const seedRecipes: Recipe[] = [
  { id: "r1", slug: "doro-wot", title: "Doro Wot", category: "traditional", difficulty: "Hard", cookTime: 120, servings: 6, image: "/placeholder.svg", description: "Slow-simmered chicken stew in berbere with hard-boiled eggs.", ingredients: ["1 whole chicken", "4 red onions", "2 tbsp berbere", "Niter kibbeh"], steps: ["Caramelize onions for 30 min.", "Add berbere and bloom.", "Simmer chicken 90 min.", "Add eggs at the end."], views: 12480, status: "published", createdAt: "2025-08-12", featured: true, youtubeUrl: "https://youtube.com/watch?v=demo1" },
  { id: "r2", slug: "kitfo", title: "Kitfo", category: "traditional", difficulty: "Medium", cookTime: 25, servings: 4, image: "/placeholder.svg", description: "Hand-minced beef warmed in spiced butter.", ingredients: ["500g lean beef", "Mitmita", "Niter kibbeh"], steps: ["Mince beef finely.", "Warm niter kibbeh.", "Toss with mitmita.", "Serve with kocho."], views: 8210, status: "published", createdAt: "2025-09-04" },
  { id: "r3", slug: "shiro-wot", title: "Shiro Wot", category: "traditional", difficulty: "Easy", cookTime: 30, servings: 4, image: "/placeholder.svg", description: "Smooth chickpea stew, weeknight comfort.", ingredients: ["1 cup shiro powder", "1 onion", "Niter kibbeh"], steps: ["Sauté onion.", "Whisk in shiro slowly.", "Simmer 20 min."], views: 15300, status: "published", createdAt: "2025-09-20" },
  { id: "r4", slug: "pasta-carbonara", title: "Pasta Carbonara", category: "international", difficulty: "Medium", cookTime: 25, servings: 2, image: "/placeholder.svg", description: "Roman classic, silky and peppery.", ingredients: ["200g spaghetti", "100g guanciale", "2 yolks", "Pecorino"], steps: ["Render guanciale.", "Cook pasta.", "Off heat, toss with eggs."], views: 4320, status: "draft", createdAt: "2025-10-02" },
];

const seedUsers: AdminUser[] = [
  { id: "u1", name: "Hanna Tadesse", email: "hanna@example.com", plan: "premium", status: "active", joinedAt: "2025-06-12", lastActive: "2026-04-20" },
  { id: "u2", name: "Samuel Kebede", email: "samuel@example.com", plan: "basic", status: "active", joinedAt: "2025-07-30", lastActive: "2026-04-19" },
  { id: "u3", name: "Meron Alemu", email: "meron@example.com", plan: "pro", status: "active", joinedAt: "2025-05-02", lastActive: "2026-04-22" },
  { id: "u4", name: "Dawit Tesfaye", email: "dawit@example.com", plan: "free", status: "suspended", joinedAt: "2025-09-15", lastActive: "2026-03-10" },
  { id: "u5", name: "Liya Mengistu", email: "liya@example.com", plan: "premium", status: "active", joinedAt: "2025-10-21", lastActive: "2026-04-21" },
];

const seedComments: Comment[] = [
  { id: "c1", recipeSlug: "doro-wot", recipeTitle: "Doro Wot", author: "Hanna Tadesse", text: "The 30-min onion caramelization tip changed everything. Thank you!", status: "approved", createdAt: "2026-04-18" },
  { id: "c2", recipeSlug: "kitfo", recipeTitle: "Kitfo", author: "Anonymous", text: "spam link removed buy followers", status: "pending", createdAt: "2026-04-21" },
  { id: "c3", recipeSlug: "shiro-wot", recipeTitle: "Shiro Wot", author: "Samuel Kebede", text: "Made this last night — restaurant-quality. The whisking trick is gold.", status: "pending", createdAt: "2026-04-22" },
  { id: "c4", recipeSlug: "pasta-carbonara", recipeTitle: "Pasta Carbonara", author: "Meron Alemu", text: "Finally a carbonara recipe without cream. Grazie!", status: "approved", createdAt: "2026-04-15" },
];

function load<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const adminStore = {
  // Recipes
  getRecipes: (): Recipe[] => load(KEYS.recipes, seedRecipes),
  saveRecipes: (r: Recipe[]) => save(KEYS.recipes, r),
  upsertRecipe: (r: Recipe) => {
    const list = adminStore.getRecipes();
    const idx = list.findIndex((x) => x.id === r.id);
    if (idx >= 0) list[idx] = r; else list.unshift(r);
    save(KEYS.recipes, list);
    return list;
  },
  deleteRecipe: (id: string) => {
    const list = adminStore.getRecipes().filter((x) => x.id !== id);
    save(KEYS.recipes, list);
    return list;
  },
  // Users
  getUsers: (): AdminUser[] => load(KEYS.users, seedUsers),
  updateUser: (id: string, patch: Partial<AdminUser>) => {
    const list = adminStore.getUsers().map((u) => (u.id === id ? { ...u, ...patch } : u));
    save(KEYS.users, list);
    return list;
  },
  // Comments
  getComments: (): Comment[] => load(KEYS.comments, seedComments),
  setCommentStatus: (id: string, status: Comment["status"]) => {
    const list = adminStore.getComments().map((c) => (c.id === id ? { ...c, status } : c));
    save(KEYS.comments, list);
    return list;
  },
  deleteComment: (id: string) => {
    const list = adminStore.getComments().filter((c) => c.id !== id);
    save(KEYS.comments, list);
    return list;
  },
  // Auth (fake gate)
  isAuthed: () => {
    try { return sessionStorage.getItem(KEYS.auth) === "1"; } catch { return false; }
  },
  signIn: (password: string) => {
    if (password === "admin123") { sessionStorage.setItem(KEYS.auth, "1"); return true; }
    return false;
  },
  signOut: () => sessionStorage.removeItem(KEYS.auth),
};

export function newId() { return Math.random().toString(36).slice(2, 9); }
export function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
