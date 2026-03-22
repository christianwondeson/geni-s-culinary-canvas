import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { TraditionalSection } from "@/components/TraditionalSection";
import { ChefsPicksSection } from "@/components/ChefsPicksSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrendingSection />
      <TraditionalSection />
      <ChefsPicksSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
