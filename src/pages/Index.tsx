import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import WhyUsSection from "@/components/WhyUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ClaimBurnInterface from "@/components/ClaimBurnInterface";
import TransactionsSection from "@/components/TransactionsSection";
import FAQSection from "@/components/FAQSection";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyUsSection />
        <HowItWorksSection />
        <ClaimBurnInterface />
        <TransactionsSection />
        <FAQSection />
        <SecuritySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
