import { Code, Shield, Key, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SecuritySection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Code,
      title: t('security.opensource.title'),
      description: t('security.opensource.desc'),
    },
    {
      icon: Shield,
      title: t('security.audit.title'),
      description: t('security.audit.desc'),
    },
    {
      icon: Key,
      title: t('security.local.title'),
      description: t('security.local.desc'),
    },
    {
      icon: AlertTriangle,
      title: t('security.phishing.title'),
      description: t('security.phishing.desc'),
    },
  ];

  return (
    <section id="securite" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            {t('security.title')} <span className="text-gradient">{t('security.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('security.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl glass-card hover-lift text-center border-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 hover:scale-110">
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
