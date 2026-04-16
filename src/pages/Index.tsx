import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TraditionalSection } from "@/components/TraditionalSection";
import { ChefsPicksSection } from "@/components/ChefsPicksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <TrendingSection />
      <HowItWorksSection />
      <TraditionalSection />
      <ChefsPicksSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
