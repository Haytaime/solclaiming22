import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8 animate-fade-in">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-foreground">Live on Solana Mainnet</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Récupérez ou brûlez vos SOL{" "}
            <span className="text-primary">en toute sécurité</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Claimez vos tokens SOL en quelques clics via Phantom. Transactions traçables et frais transparents.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="cyan" size="xl" className="w-full sm:w-auto">
              Connecter Phantom
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="cyan-outline" size="xl" className="w-full sm:w-auto">
              En savoir plus
            </Button>
          </div>

          {/* Features badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Open-source</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Audit pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>&lt;30s transactions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
