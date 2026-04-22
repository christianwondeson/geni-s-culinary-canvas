import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminStore, Comment } from "@/lib/adminStore";
import { toast } from "sonner";

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>(adminStore.getComments());
  const [tab, setTab] = useState<Comment["status"] | "all">("pending");

  const visible = comments.filter((c) => tab === "all" || c.status === tab);
  const counts = {
    all: comments.length,
    pending: comments.filter((c) => c.status === "pending").length,
    approved: comments.filter((c) => c.status === "approved").length,
    rejected: comments.filter((c) => c.status === "rejected").length,
  };

  const setStatus = (id: string, status: Comment["status"]) => {
    setComments(adminStore.setCommentStatus(id, status));
    toast.success(`Comment ${status}`);
  };

  const remove = (id: string) => {
    setComments(adminStore.deleteComment(id));
    toast.success("Comment deleted");
  };

  return (
    <AdminLayout title="Comments" subtitle="Moderate reader contributions before they go live.">
      <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6 w-fit">
        {(["pending", "approved", "rejected", "all"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-body capitalize transition-colors ${
              tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            {t} <span className="ml-1 text-xs opacity-60">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-background border border-border rounded-2xl p-5 paper-grain"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-deep-green flex items-center justify-center text-cream font-display font-bold flex-shrink-0">
                {c.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-display font-semibold text-foreground">{c.author}</p>
                  <span className="text-xs text-muted-foreground font-body">on</span>
                  <span className="text-sm font-body italic text-primary">{c.recipeTitle}</span>
                  <span className="text-xs text-muted-foreground font-body ml-auto">{c.createdAt}</span>
                </div>
                <p className="text-sm text-foreground font-body mt-2 leading-relaxed">"{c.text}"</p>

                <div className="flex items-center gap-2 mt-4">
                  {c.status !== "approved" && (
                    <button onClick={() => setStatus(c.id, "approved")} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-deep-green/10 text-deep-green hover:bg-deep-green/20 transition-colors font-body">
                      <Check className="h-3 w-3" /> Approve
                    </button>
                  )}
                  {c.status !== "rejected" && (
                    <button onClick={() => setStatus(c.id, "rejected")} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-spice-gold/10 text-spice-gold hover:bg-spice-gold/20 transition-colors font-body">
                      <X className="h-3 w-3" /> Reject
                    </button>
                  )}
                  <button onClick={() => remove(c.id)} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors font-body ml-auto">
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {visible.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">No comments in this view.</div>
        )}
      </div>
    </AdminLayout>
  );
}
