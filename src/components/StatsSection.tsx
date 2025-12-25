const StatsSection = () => {
  const stats = [
    { value: "1,247,856", label: "SOL Brûlés", prefix: "", suffix: "" },
    { value: "45,823", label: "Transactions", prefix: "", suffix: "+" },
    { value: "99.7", label: "Taux de Réussite", prefix: "", suffix: "%" },
    { value: "Soon", label: "Audits à venir", prefix: "", suffix: "" },
  ];

  return (
    <section className="relative py-20 border-y border-border/30 bg-surface-elevated/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-3 transition-transform group-hover:scale-105">
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