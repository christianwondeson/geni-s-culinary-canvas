import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link as RLink } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-food.jpg";

type AuthMode = "signin" | "signup" | "forgot";

const t = {
  en: {
    back: "Back to Home",
    signinTitle: "Welcome Back", signupTitle: "Create Account", forgotTitle: "Reset Password",
    signinSub: "Sign in to access your saved recipes and premium content",
    signupSub: "Join Geni's Recipe to unlock authentic Ethiopian cooking",
    forgotSub: "Enter your email and we'll send you a reset link",
    fullName: "Full Name", email: "Email address", password: "Password",
    forgotLink: "Forgot password?",
    signinBtn: "Sign In", signupBtn: "Create Account", forgotBtn: "Send Reset Link",
    orContinue: "or continue with",
    noAccount: "Don't have an account?", signUpLink: "Sign Up",
    hasAccount: "Already have an account?", signInLink: "Sign In",
    backToSignIn: "Back to Sign In",
    checkEmail: "Check Your Email", resetSent: "We've sent a password reset link to",
    heroTitle: "Cook Smarter with", heroBrand: "Geni's", heroSub: "Recipes",
    heroDesc: "Discover 200+ authentic Ethiopian & international recipes with step-by-step guides, cooking timers, and cultural stories.",
  },
  am: {
    back: "ወደ ዋና ገጽ ተመለስ",
    signinTitle: "እንኳን ደህና መጡ", signupTitle: "መለያ ይፍጠሩ", forgotTitle: "የይለፍ ቃል ዳግም ያስጀምሩ",
    signinSub: "ያስቀመጡትን ምግቦችና ፕሪሚየም ይዘት ለማግኘት ይግቡ",
    signupSub: "ትክክለኛ የኢትዮጵያ ምግብ ለመክፈት ጀኒ ምግብ ይቀላቀሉ",
    forgotSub: "ኢሜይልዎን ያስገቡ ዳግም ማስጀመሪያ ሊንክ እንልካለን",
    fullName: "ሙሉ ስም", email: "ኢሜይል", password: "የይለፍ ቃል",
    forgotLink: "የይለፍ ቃል ረሱ?",
    signinBtn: "ግባ", signupBtn: "መለያ ፍጠር", forgotBtn: "ሊንክ ላክ",
    orContinue: "ወይም በዚህ ቀጥል",
    noAccount: "መለያ የለዎትም?", signUpLink: "ተመዝገብ",
    hasAccount: "መለያ አለዎት?", signInLink: "ግባ",
    backToSignIn: "ወደ መግቢያ ተመለስ",
    checkEmail: "ኢሜይልዎን ያረጋግጡ", resetSent: "ዳግም ማስጀመሪያ ሊንክ ተልኳል ወደ",
    heroTitle: "በጥበብ ያብሱ ከ", heroBrand: "ጀኒ", heroSub: "ምግቦች ጋር",
    heroDesc: "200+ ትክክለኛ የኢትዮጵያና ዓለም አቀፍ ምግቦችን ከደረጃ መመሪያዎች ጋር ያግኙ።",
  },
};

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const l = t[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") setSubmitted(true);
  };

  const titles = { signin: l.signinTitle, signup: l.signupTitle, forgot: l.forgotTitle };
  const subtitles = { signin: l.signinSub, signup: l.signupSub, forgot: l.forgotSub };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={heroImage} alt="Ethiopian cuisine" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee/80 to-coffee/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="font-display text-4xl font-bold text-cream mb-3">
            {l.heroTitle} <span className="text-spice-gold">{l.heroBrand}</span> {l.heroSub}
          </h2>
          <p className="text-cream/70 text-lg font-body max-w-md">{l.heroDesc}</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm">
              <ArrowLeft className="h-4 w-4" /> {l.back}
            </Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
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
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{l.checkEmail}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-6">{l.resetSent} <strong>{email}</strong></p>
                  <Button variant="outline" className="rounded-full" onClick={() => { setMode("signin"); setSubmitted(false); }}>
                    {l.backToSignIn}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder={l.fullName} value={name} onChange={(e) => setName(e.target.value)} className="pl-11 h-12 rounded-xl font-body" required />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="email" placeholder={l.email} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-11 h-12 rounded-xl font-body" required />
                  </div>
                  {mode !== "forgot" && (
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type={showPassword ? "text" : "password"} placeholder={l.password} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-11 pr-11 h-12 rounded-xl font-body" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  )}
                  {mode === "signin" && (
                    <div className="flex justify-end">
                      <button type="button" onClick={() => setMode("forgot")} className="text-sm text-primary hover:underline font-body">{l.forgotLink}</button>
                    </div>
                  )}
                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
                    {mode === "signin" ? l.signinBtn : mode === "signup" ? l.signupBtn : l.forgotBtn}
                  </Button>
                  {mode !== "forgot" && (
                    <>
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                        <div className="relative flex justify-center"><span className="bg-background px-4 text-sm text-muted-foreground font-body">{l.orContinue}</span></div>
                      </div>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => toast.info("Google sign-in is a UI simulation. Enable Lovable Cloud for real auth.")}
                        className="w-full h-12 rounded-xl gap-2 font-body"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>

                    </>
                  )}
                  <p className="text-center text-sm text-muted-foreground font-body mt-6">
                    {mode === "signin" ? (
                      <>{l.noAccount}{" "}<button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline font-semibold">{l.signUpLink}</button></>
                    ) : mode === "signup" ? (
                      <>{l.hasAccount}{" "}<button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline font-semibold">{l.signInLink}</button></>
                    ) : (
                      <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline font-semibold">{l.backToSignIn}</button>
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
