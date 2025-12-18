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
    <section id="proof" className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Transactions récentes
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {(["all", "claim", "burn"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
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
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === "claim" ? "bg-green-500/20" : "bg-orange-500/20"
                    }`}>
                      {tx.type === "claim" ? (
                        <ArrowDown className={`w-5 h-5 ${tx.type === "claim" ? "text-green-500" : "text-orange-500"}`} />
                      ) : (
                        <Flame className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium capitalize">{tx.type}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          tx.status === "success" 
                            ? "bg-green-500/20 text-green-500" 
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {tx.status === "success" ? "Réussie" : "En attente"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Hash: <code className="text-primary">{tx.hash}</code>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{tx.amount} SOL</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {tx.date}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://solscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                >
                  Voir sur Solscan
                  <ExternalLink className="w-3 h-3" />
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
