import { useState } from "react";
import { ExternalLink, ArrowDown, Flame, Clock, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface Transaction {
  type: "claim" | "burn";
  status: "success" | "pending";
  hash: string;
  amount: string;
  hoursAgo: number;
}

const TransactionsSection = () => {
  const [filter, setFilter] = useState<"all" | "claim" | "burn">("all");
  const [showAll, setShowAll] = useState(false);
  const { t } = useLanguage();

  const transactions: Transaction[] = [
    { type: "claim", status: "success", hash: "5X7gH...kL9pM", amount: "0.24", hoursAgo: 0.5 },
    { type: "burn", status: "success", hash: "8K2nP...qR5tW", amount: "0.08", hoursAgo: 1 },
    { type: "claim", status: "success", hash: "3M9vX...bN4cY", amount: "0.52", hoursAgo: 2 },
    { type: "burn", status: "pending", hash: "7D4hJ...fG8kL", amount: "0.13", hoursAgo: 3 },
    { type: "claim", status: "success", hash: "9P6rT...wE2mN", amount: "0.67", hoursAgo: 5 },
    { type: "burn", status: "success", hash: "2L8mQ...xH4nR", amount: "0.04", hoursAgo: 7 },
    { type: "claim", status: "success", hash: "6N3kW...pT9vY", amount: "0.19", hoursAgo: 12 },
    { type: "burn", status: "success", hash: "4R7jF...mC2bX", amount: "0.34", hoursAgo: 18 },
    { type: "claim", status: "success", hash: "1Y5sG...dK6wZ", amount: "0.56", hoursAgo: 24 },
    { type: "burn", status: "success", hash: "8B9eP...hL3qM", amount: "0.07", hoursAgo: 36 },
    { type: "claim", status: "success", hash: "3V2nT...rA7kJ", amount: "0.12", hoursAgo: 48 },
    { type: "burn", status: "pending", hash: "7M4xC...sF9pL", amount: "0.45", hoursAgo: 52 },
    { type: "claim", status: "success", hash: "5K8wR...yB2nQ", amount: "0.31", hoursAgo: 72 },
    { type: "burn", status: "success", hash: "9G1jH...tC5mV", amount: "0.09", hoursAgo: 96 },
    { type: "claim", status: "success", hash: "2D6pL...xN8kS", amount: "0.78", hoursAgo: 120 },
    { type: "burn", status: "success", hash: "4F3nM...wQ7tK", amount: "0.02", hoursAgo: 144 },
    { type: "claim", status: "success", hash: "8H5rJ...bL9mP", amount: "0.41", hoursAgo: 168 },
    { type: "burn", status: "success", hash: "1T8vX...cN2wS", amount: "0.15", hoursAgo: 192 },
  ];

  const getTimeAgo = (hoursAgo: number): string => {
    if (hoursAgo < 1) {
      return t('tx.ago.minutes', { n: Math.floor(hoursAgo * 60) });
    } else if (hoursAgo < 24) {
      return t('tx.ago.hours', { n: Math.floor(hoursAgo) });
    } else {
      return t('tx.ago.days', { n: Math.floor(hoursAgo / 24) });
    }
  };

  const filteredTransactions = transactions.filter(
    (tx) => filter === "all" || tx.type === filter
  );

  const displayedTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 5);
  const hasMore = filteredTransactions.length > 5;

  return (
    <section id="proof" className="py-24 lg:py-32 bg-surface-elevated/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance tracking-[0.01em]">
            {t('tx.title')} <span className="text-gradient tracking-[0.02em]">{t('tx.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('tx.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Filter tabs */}
          <div className="flex justify-center gap-2 mb-10">
            {(["all", "claim", "burn"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover-scale ${
                  filter === f
                    ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                    : "glass-card text-muted-foreground hover:text-foreground hover-glow"
                }`}
              >
                {f === "all" ? t('tx.all') : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Transactions list */}
          <div className="space-y-4">
            {displayedTransactions.map((tx, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl glass-card hover-lift"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
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
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                          tx.status === "success" 
                            ? "bg-emerald-500/20 text-emerald-400" 
                            : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {tx.status === "success" ? t('tx.success') : t('tx.pending')}
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
                      {getTimeAgo(tx.hoursAgo)}
                    </div>
                  </div>
                </div>
                <a
                  href={`https://solscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm text-primary font-medium hover:text-primary-light transition-all duration-300 hover:gap-2.5"
                >
                  {t('tx.view')}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* View more button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <Button
                variant="premium-outline"
                size="lg"
                onClick={() => setShowAll(!showAll)}
                className="group"
              >
                {showAll ? 'Voir moins' : 'Voir plus'}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;