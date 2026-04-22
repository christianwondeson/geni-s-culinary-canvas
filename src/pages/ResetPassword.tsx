import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-food.jpg";
import { toast } from "sonner";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (password !== confirm) return toast.error("Passwords don't match.");
    setDone(true);
    setTimeout(() => navigate("/auth"), 2400);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroImage} alt="Ethiopian cuisine" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/85 to-coffee/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <span className="kicker text-spice-gold mb-4">Account · Recovery</span>
          <h2 className="font-display text-5xl font-bold text-cream leading-[1.05]">
            A fresh<br />start, <em className="text-spice-gold not-italic font-medium italic">on the house.</em>
          </h2>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-body mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>

          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-deep-green/10 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-deep-green" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">Password updated</h1>
              <p className="text-muted-foreground font-body">Redirecting you to sign in…</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/" className="font-display text-2xl font-bold text-foreground mb-8 block">
                Geni's <span className="text-primary">Recipe</span>
              </Link>

              <h1 className="font-display text-3xl font-bold mb-2">Set a new password</h1>
              <p className="text-muted-foreground font-body mb-8">
                Choose something memorable but strong — at least 8 characters.
              </p>

              <form onSubmit={submit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 rounded-xl"
                    required
                  />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="pl-11 h-12 rounded-xl"
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 rounded-xl font-semibold">
                  Update password
                </Button>
              </form>

              <p className="text-xs text-muted-foreground font-body mt-6 text-center">
                Simulation mode — no real password is stored.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
