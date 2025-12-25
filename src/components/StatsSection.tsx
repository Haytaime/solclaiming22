import { useLanguage } from "@/contexts/LanguageContext";

const StatsSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { value: "1,247,856", label: t('stats.burned'), prefix: "", suffix: "" },
    { value: "45,823", label: t('stats.transactions'), prefix: "", suffix: "+" },
    { value: "99.7", label: t('stats.success'), prefix: "", suffix: "%" },
    { value: "Soon", label: t('stats.audit'), prefix: "", suffix: "" },
  ];

  return (
    <section className="relative py-20 border-y border-border/30 bg-surface-elevated/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-default">
              <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-3 transition-all duration-300 group-hover:scale-110">
                {stat.prefix}
                <span className="font-mono">{stat.value}</span>
                {stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
