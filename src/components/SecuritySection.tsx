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
    <section id="securite" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sécurité & Conformité
          </h2>
          <p className="text-muted-foreground">
            Votre sécurité est notre priorité absolue
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
