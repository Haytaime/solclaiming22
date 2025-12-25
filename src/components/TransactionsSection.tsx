import { useState } from "react";
import { ExternalLink, ArrowDown, Flame, Clock } from "lucide-react";

interface Transaction {
  type: "claim" | "burn";
  status: "success" | "pending";
  hash: string;
  amount: string;
  date: string;
}

const TransactionsSection = () => {
  const [filter, setFilter] = useState<"all" | "claim" | "burn">("all");

  const transactions: Transaction[] = [
    { type: "claim", status: "success", hash: "5X7gH...kL9pM", amount: "2.45", date: "2025-11-17 14:23" },
    { type: "burn", status: "success", hash: "8K2nP...qR5tW", amount: "0.87", date: "2025-11-17 13:45" },
    { type: "claim", status: "success", hash: "3M9vX...bN4cY", amount: "5.12", date: "2025-11-17 12:18" },
    { type: "burn", status: "pending", hash: "7D4hJ...fG8kL", amount: "1.23", date: "2025-11-17 11:52" },
    { type: "claim", status: "success", hash: "9P6rT...wE2mN", amount: "3.67", date: "2025-11-17 10:34" },
  ];

  const filteredTransactions = transactions.filter(
    (tx) => filter === "all" || tx.type === filter
  );

  return (
    <section id="proof" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Transactions <span className="text-gradient">récentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Suivez toutes les transactions en temps réel.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {(["all", "claim", "burn"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Toutes" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Transactions list */}
          <div className="space-y-4">
            {filteredTransactions.map((tx, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl glass-card hover-lift"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      tx.type === "claim" ? "bg-emerald-500/20" : "bg-amber-500/20"
                    }`}>
                      {tx.type === "claim" ? (
                        <ArrowDown className="w-6 h-6 text-emerald-500" />
                      ) : (
                        <Flame className="w-6 h-6 text-amber-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-semibold capitalize">{tx.type}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === "success" 
                            ? "bg-emerald-500/20 text-emerald-400" 
                            : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {tx.status === "success" ? "Réussie" : "En attente"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Hash: <code className="text-primary font-mono">{tx.hash}</code>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg">{tx.amount} <span className="text-muted-foreground">SOL</span></div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5 justify-end mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {tx.date}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://solscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-medium hover:text-primary-light transition-colors"
                >
                  Voir sur Solscan
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;