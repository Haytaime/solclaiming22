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
import { LanguageProvider } from "@/contexts/LanguageContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.pathname.replace(/^\/+/, "");

    // "accueil" and "/" both mean: go to top
    if (!sectionId || sectionId === "accueil") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) return;

    // Allow the page to render before scrolling
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <WalletProvider>
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
      </WalletProvider>
    </LanguageProvider>
  );
};

export default Index;
