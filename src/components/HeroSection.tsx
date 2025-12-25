import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWallet } from "@/contexts/WalletContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const { connect, connected, connecting } = useWallet();

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden grain-overlay">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[180px] animate-pulse-subtle" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-10 animate-fade-in hover-glow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm text-muted-foreground font-medium">{t('hero.badge')}</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-display-md md:text-display-lg lg:text-display-xl mb-8 animate-slide-up text-balance">
            {t('hero.title1')}{" "}
            <span className="text-gradient">SOL</span>
            <br className="hidden sm:block" />
            <span className="text-foreground"> {t('hero.title2')}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up text-balance" style={{ animationDelay: "0.1s" }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button 
              variant="premium" 
              size="xl" 
              className="w-full sm:w-auto group"
              onClick={connect}
              disabled={connecting || connected}
            >
              <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {connected ? t('header.connected') : connecting ? '...' : t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="premium-outline" size="xl" className="w-full sm:w-auto group">
              {t('hero.learn')}
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Features badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2.5 hover-scale cursor-default">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_hsl(142_76%_45%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">{t('hero.opensource')}</span>
            </div>
            <div className="flex items-center gap-2.5 hover-scale cursor-default">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_hsl(45_93%_55%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">{t('hero.audit')}</span>
            </div>
            <div className="flex items-center gap-2.5 hover-scale cursor-default">
              <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(168_76%_46%/0.5)]" />
              <span className="text-sm text-muted-foreground font-medium">{t('hero.fast')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
