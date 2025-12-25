import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden grain-overlay">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[180px] animate-pulse-subtle" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-10 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground font-medium">Live on Solana Mainnet</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl mb-8 animate-slide-up text-balance">
            Récupérez ou brûlez vos{" "}
            <span className="text-gradient">SOL</span>
            <br className="hidden sm:block" />
            <span className="text-foreground"> en toute sécurité</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up text-balance" style={{ animationDelay: "0.1s" }}>
            Claimez vos tokens SOL en quelques clics via Phantom. 
            Transactions traçables et frais transparents.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="premium" size="xl" className="w-full sm:w-auto group">
              Connecter Phantom
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button variant="premium-outline" size="xl" className="w-full sm:w-auto">
              En savoir plus
            </Button>
          </div>

          {/* Features badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(142_76%_45%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">Open-source</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_hsl(45_93%_55%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">Audit pending</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(168_76%_46%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">&lt;30s transactions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;