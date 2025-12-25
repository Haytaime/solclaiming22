import { Code, Shield, Key, AlertTriangle } from "lucide-react";

const SecuritySection = () => {
  const features = [
    {
      icon: Code,
      title: "Open-source",
      description: "Tous nos smart contracts sont open-source et vérifiables publiquement.",
    },
    {
      icon: Shield,
      title: "Audits à venir",
      description: "Nos contrats seront audités par des firmes de sécurité reconnues.",
    },
    {
      icon: Key,
      title: "Signature locale",
      description: "Vos clés privées restent dans votre wallet. Nous ne les voyons jamais.",
    },
    {
      icon: AlertTriangle,
      title: "Anti-phishing",
      description: "Vérifiez toujours l'URL et ne partagez jamais votre seed phrase.",
    },
  ];

  return (
    <section id="securite" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Sécurité & <span className="text-gradient">Conformité</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre sécurité est notre priorité absolue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl glass-card hover-lift text-center border-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;