import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Flame, ArrowDown, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWallet } from "@/contexts/WalletContext";

const ClaimBurnInterface = () => {
  const [mode, setMode] = useState<"claim" | "burn">("claim");
  const [amount, setAmount] = useState("");
  const { t } = useLanguage();
  const { connected, balance, fetchingBalance, connect, connecting, signed } = useWallet();

  // Calcul des montants basés sur le solde réel
  const transactionFee = 0.02;
  const balanceKnown = balance !== null;
  const claimableAmount = balanceKnown && balance > 0 ? 0.24 : 0;
  const hasClaimable = claimableAmount > 0;

  return (
    <section id="claim" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance tracking-[0.01em]">
            {t('interface.title')} <span className="text-gradient tracking-[0.02em]">{t('interface.title2')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('interface.subtitle')}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="p-8 rounded-3xl glass-card hover-glow">
            {/* Balance display when connected and signed */}
            {connected && signed && (
              <div className="mb-6 space-y-3">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('interface.balance')}</span>
                    <span className="font-display font-bold text-lg text-primary">
                      {fetchingBalance ? '...' : balanceKnown ? `${balance.toFixed(4)} SOL` : '--'}
                    </span>
                  </div>
                </div>

                {/* Claimable amount display */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('interface.claimable')}</span>
                    <span className="font-display font-bold text-lg text-emerald-400">
                      {fetchingBalance ? '...' : hasClaimable ? `${claimableAmount.toFixed(2)} SOL` : '0.00 SOL'}
                    </span>
                  </div>
                </div>

                {/* Transaction fee info */}
                <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Frais par transaction à récupérer</span>
                    <span className="font-display font-semibold text-muted-foreground">{transactionFee} SOL</span>
                  </div>
                </div>

                {/* Status messages */}
                {!fetchingBalance && balanceKnown && !hasClaimable && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-amber-400">Aucun SOL à claim pour le moment</span>
                  </div>
                )}

                {!fetchingBalance && !balanceKnown && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-sm text-amber-400">Solde indisponible pour le moment</span>
                  </div>
                )}
              </div>
            )}

            {/* Mode selector */}
            <div className="mb-8">
              <label className="block text-sm text-muted-foreground mb-3 font-medium">{t('interface.mode')}</label>
              <div className="flex rounded-xl bg-muted/50 p-1.5">
                <button
                  onClick={() => setMode("claim")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover-scale ${
                    mode === "claim"
                      ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Claim
                </button>
                <button
                  onClick={() => setMode("burn")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 hover-scale ${
                    mode === "burn"
                      ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Burn
                </button>
              </div>
            </div>

            {/* Amount input */}
            <div className="mb-8">
              <label className="block text-sm text-muted-foreground mb-3 font-medium">
                {t('interface.amount')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-muted/50 border border-border/50 rounded-xl px-5 py-4 text-lg font-display text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-primary/30"
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-semibold hover:text-primary-light transition-all duration-300 hover:scale-105 active:scale-95"
                  onClick={() => {
                    if (mode === "claim" && hasClaimable) {
                      setAmount(claimableAmount.toString());
                    } else if (balance) {
                      setAmount(balance.toString());
                    }
                  }}
                >
                  Max
                </button>
              </div>
            </div>

            {/* Connect button */}
            <Button 
              variant="premium" 
              size="xl" 
              className="w-full group"
              onClick={connected ? undefined : connect}
              disabled={
                connecting ||
                fetchingBalance ||
                (connected && mode === "claim" && (!balanceKnown || !hasClaimable))
              }
            >
              {mode === "claim" ? (
                <>
                  <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {connected ? (hasClaimable ? 'Claim SOL' : 'Rien à claim') : t('interface.connect')}
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {connected ? 'Burn SOL' : t('interface.connect')}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClaimBurnInterface;