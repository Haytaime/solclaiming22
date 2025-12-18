import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, ArrowDown } from "lucide-react";

const ClaimBurnInterface = () => {
  const [mode, setMode] = useState<"claim" | "burn">("claim");
  const [amount, setAmount] = useState("");

  return (
    <section id="claim" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Interface Claim / Burn
        </h2>

        <div className="max-w-md mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border">
            {/* Mode selector */}
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">Mode</label>
              <div className="flex rounded-lg bg-secondary p-1">
                <button
                  onClick={() => setMode("claim")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    mode === "claim"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Claim
                </button>
                <button
                  onClick={() => setMode("burn")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    mode === "burn"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Burn
                </button>
              </div>
            </div>

            {/* Amount input */}
            <div className="mb-6">
              <label className="block text-sm text-muted-foreground mb-2">
                Quantité (SOL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline">
                  Max
                </button>
              </div>
            </div>

            {/* Connect button */}
            <Button variant="cyan" size="lg" className="w-full">
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
