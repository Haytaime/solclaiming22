import { Button } from "@/components/ui/button";
import { Wallet, MousePointerClick, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: "Connecter votre wallet",
      description: "Connectez votre wallet Phantom ou Solflare en un clic sécurisé.",
    },
    {
      number: "02",
      icon: MousePointerClick,
      title: "Sélectionner l'action",
      description: "Choisissez Claim ou Burn et indiquez la quantité de SOL.",
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Confirmer la transaction",
      description: "Signez la transaction dans votre wallet et suivez-la sur Solscan.",
    },
  ];

  return (
    <section id="comment" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Comment ça <span className="text-gradient">marche</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trois étapes simples pour gérer vos SOL.
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
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl glass-card mb-6 group-hover:shadow-glow transition-shadow duration-300">
                  <span className="font-display text-3xl font-bold text-gradient">{step.number}</span>
                </div>
                
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="premium" size="xl">
              Commencer maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;