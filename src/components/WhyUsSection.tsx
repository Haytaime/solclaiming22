import { Shield, Zap, Eye } from "lucide-react";

const WhyUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Smart contracts open-source, audits à venir. Vos clés privées ne quittent jamais votre wallet.",
      link: "Voir la sécurité",
    },
    {
      icon: Zap,
      title: "Rapidité Optimale",
      description: "Transactions traitées en moins de 30 secondes grâce à la puissance du réseau Solana.",
      link: "Essayer maintenant",
    },
    {
      icon: Eye,
      title: "Transparence Totale",
      description: "Tous les frais sont affichés avant confirmation. Aucun coût caché, jamais.",
      link: "En savoir plus",
    },
  ];

  return (
    <section id="pourquoi" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Pourquoi nous <span className="text-gradient">choisir</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme conçue pour la simplicité, la sécurité et la transparence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl glass-card hover-lift border-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all"
              >
                {feature.link}
                <span className="text-primary">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;