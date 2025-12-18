import { Button } from "@/components/ui/button";
import { Wallet, MousePointerClick, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: Wallet,
      title: "Connecter votre wallet",
      description: "Connectez votre wallet Phantom ou Solflare en un clic.",
    },
    {
      number: "2",
      icon: MousePointerClick,
      title: "Sélectionner l'action",
      description: "Choisissez Claim ou Burn et indiquez la quantité de SOL.",
    },
    {
      number: "3",
      icon: CheckCircle,
      title: "Confirmer la transaction",
      description: "Signez la transaction dans votre wallet et suivez-la sur Solscan.",
    },
  ];

  return (
    <section id="comment" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Comment ça marche
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary mb-4">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="cyan" size="lg">
              Commencer maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
