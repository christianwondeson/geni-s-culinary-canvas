import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-food.jpg";

type AuthMode = "signin" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setSubmitted(true);
    }
    // UI-only for now
  };

  const titles = {
    signin: "Welcome Back",
    signup: "Create Account",
    forgot: "Reset Password",
  };

  const subtitles = {
    signin: "Sign in to access your saved recipes and premium content",
    signup: "Join Geni's Recipe to unlock authentic Ethiopian cooking",
    forgot: "Enter your email and we'll send you a reset link",
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroImage} alt="Ethiopian cuisine" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/80 to-coffee/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="font-display text-4xl font-bold text-cream mb-3">
            Cook Smarter with <span className="text-spice-gold">Geni's</span> Recipes
          </h2>
          <p className="text-cream/70 text-lg font-body max-w-md">
            Discover 200+ authentic Ethiopian recipes with step-by-step guides, cooking timers, and cultural stories.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-body text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="font-display text-2xl font-bold text-foreground mb-8 block">
                Geni's <span className="text-primary">Recipe</span>
              </Link>

              <h1 className="font-display text-3xl font-bold text-foreground mb-2">{titles[mode]}</h1>
              <p className="text-muted-foreground font-body mb-8">{subtitles[mode]}</p>

              {mode === "forgot" && submitted ? (
                <div className="glass-card p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Check Your Email</h3>
                  <p className="text-muted-foreground font-body text-sm mb-6">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => { setMode("signin"); setSubmitted(false); }}
                  >
                    Back to Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-11 h-12 rounded-xl font-body"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 rounded-xl font-body"
                      required
                    />
                  </div>

                  {mode !== "forgot" && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-11 pr-11 h-12 rounded-xl font-body"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-sm text-primary hover:underline font-body"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
                    {mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                  </Button>

                  {mode !== "forgot" && (
                    <>
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-background px-4 text-sm text-muted-foreground font-body">or continue with</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button" className="h-12 rounded-xl gap-2 font-body">
                          <Chrome className="h-5 w-5" /> Google
                        </Button>
                        <Button variant="outline" type="button" className="h-12 rounded-xl gap-2 font-body">
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.46C5.56 7.95 7.1 7 8.78 6.97C10.06 6.95 11.27 7.84 12.05 7.84C12.83 7.84 14.29 6.77 15.82 6.93C16.45 6.96 18.18 7.18 19.27 8.81C19.17 8.87 16.96 10.15 16.99 12.83C17.02 16.01 19.79 17.08 19.82 17.09C19.79 17.16 19.39 18.52 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                          </svg>
                          Apple
                        </Button>
                      </div>
                    </>
                  )}

                  <p className="text-center text-sm text-muted-foreground font-body mt-6">
                    {mode === "signin" ? (
                      <>Don't have an account?{" "}
                        <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline font-semibold">
                          Sign Up
                        </button>
                      </>
                    ) : mode === "signup" ? (
                      <>Already have an account?{" "}
                        <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline font-semibold">
                          Sign In
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline font-semibold">
                        Back to Sign In
                      </button>
                    )}
                  </p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
