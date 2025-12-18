import { Shield, Zap, Eye, ArrowRight } from "lucide-react";

const WhyUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "Smart contracts open-source, audits à venir.",
      link: "Voir la sécurité →",
    },
    {
      icon: Zap,
      title: "Rapidité",
      description: "Transactions traitées en < 30s (selon réseau).",
      link: "Essayer maintenant →",
    },
    {
      icon: Eye,
      title: "Transparence",
      description: "Frais affichés avant confirmation.",
      link: "En savoir plus →",
    },
  ];

  return (
    <section id="pourquoi" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Pourquoi nous choisir
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-primary text-sm hover:underline"
              >
                {feature.link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
