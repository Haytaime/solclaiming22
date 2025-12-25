import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, ArrowDown } from "lucide-react";

const ClaimBurnInterface = () => {
  const [mode, setMode] = useState<"claim" | "burn">("claim");
  const [amount, setAmount] = useState("");

  return (
    <section id="claim" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Interface <span className="text-gradient">Claim / Burn</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gérez vos SOL directement depuis cette interface sécurisée.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="p-8 rounded-3xl glass-card">
            {/* Mode selector */}
            <div className="mb-8">
              <label className="block text-sm text-muted-foreground mb-3 font-medium">Mode</label>
              <div className="flex rounded-xl bg-muted/50 p-1.5">
                <button
                  onClick={() => setMode("claim")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    mode === "claim"
                      ? "bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Claim
                </button>
                <button
                  onClick={() => setMode("burn")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
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
                Quantité (SOL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-muted/50 border border-border/50 rounded-xl px-5 py-4 text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-semibold hover:text-primary-light transition-colors">
                  Max
                </button>
              </div>
            </div>

            {/* Connect button */}
            <Button variant="premium" size="xl" className="w-full">
              {mode === "claim" ? (
                <>
                  <ArrowDown className="w-5 h-5" />
                  Connecter votre wallet
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5" />
                  Connecter votre wallet
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