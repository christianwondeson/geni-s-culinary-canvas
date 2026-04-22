import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminStore } from "@/lib/adminStore";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (adminStore.signIn(password)) {
        toast.success("Welcome back, editor.");
        navigate("/admin");
      } else {
        toast.error("Wrong passphrase. Hint: it's the demo one.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-coffee text-cream">
      {/* Left editorial side */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative paper-grain">
        <Link to="/" className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-sm font-body w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to the magazine
        </Link>

        <div>
          <span className="kicker text-spice-gold">Editorial Desk · Vol. I</span>
          <h1 className="font-display text-5xl xl:text-6xl font-bold leading-[1.05] mt-4">
            The kitchen<br />runs on <em className="text-spice-gold not-italic font-medium italic">trust.</em>
          </h1>
          <p className="text-cream/60 max-w-md mt-6 font-body leading-relaxed">
            This is the back-of-house — where recipes are written, photographs are pulled, and stories are filed before they hit the page.
          </p>
        </div>

        <div className="text-xs text-cream/40 font-body uppercase tracking-[0.3em]">
          Issue 04 · Spring 2026
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 bg-background text-foreground">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-sm text-muted-foreground inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </div>

          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Lock className="h-5 w-5 text-primary" />
          </div>

          <h2 className="font-display text-3xl font-bold mb-2">Editor sign-in</h2>
          <p className="text-muted-foreground font-body text-sm mb-8">
            Restricted area for the studio. Enter the demo passphrase to continue.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <Input
              type="password"
              placeholder="Passphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl"
              autoFocus
            />
            <Button type="submit" disabled={loading || !password} className="w-full h-12 rounded-xl font-semibold">
              {loading ? "Checking…" : "Enter the desk"}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-spice-gold/30 bg-spice-gold/10">
            <ShieldAlert className="h-4 w-4 text-spice-gold mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground font-body leading-relaxed">
              <strong className="text-foreground">Simulation mode.</strong> This is a UI-only gate.
              Demo passphrase: <code className="font-mono text-primary">admin123</code>.
              Enable Lovable Cloud for real authentication.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
