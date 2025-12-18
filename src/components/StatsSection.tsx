const StatsSection = () => {
  const stats = [
    { value: "1,247,856", label: "SOL Brûlés" },
    { value: "45,823", label: "Transactions" },
    { value: "99.7%", label: "Taux de Réussite" },
    { value: "Soon", label: "Audits à venir" },
  ];

  return (
    <section className="relative py-16 border-y border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
