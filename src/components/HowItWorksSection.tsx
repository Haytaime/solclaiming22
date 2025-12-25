import { Button } from "@/components/ui/button";
import { Wallet, MousePointerClick, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWallet } from "@/contexts/WalletContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const { connect, connected, connecting } = useWallet();

  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      number: "02",
      icon: MousePointerClick,
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      number: "03",
      icon: CheckCircle,
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
  ];

  return (
    <section id="comment" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            {t('how.title')} <span className="text-gradient">{t('how.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
                )}
                
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl glass-card mb-6 group-hover:shadow-glow transition-all duration-300 hover-lift">
                  <span className="font-display text-3xl font-bold text-gradient">{step.number}</span>
                </div>
                
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="premium" 
              size="xl"
              onClick={connect}
              disabled={connecting || connected}
              className="group"
            >
              <Wallet className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {connected ? t('header.connected') : t('how.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
