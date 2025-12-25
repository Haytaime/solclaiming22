import { Shield, Zap, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyUsSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('why.security.title'),
      description: t('why.security.desc'),
      link: t('why.security.link'),
    },
    {
      icon: Zap,
      title: t('why.speed.title'),
      description: t('why.speed.desc'),
      link: t('why.speed.link'),
    },
    {
      icon: Eye,
      title: t('why.transparency.title'),
      description: t('why.transparency.desc'),
      link: t('why.transparency.link'),
    },
  ];

  return (
    <section id="pourquoi" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            {t('why.title')} <span className="text-gradient">{t('why.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('why.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl glass-card hover-lift border-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300"
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
