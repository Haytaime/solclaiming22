import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Heart, Copy, ExternalLink, Loader2, CheckCircle } from 'lucide-react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RECIPIENT_ADDRESS = "4tdTZ5rk4ZYDdZmLDMY4YTqtcE9A8ERqhcVb8urR2Tzx";
const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

const TipJar = () => {
  const { connected, publicKey, balance, connect } = useWallet();
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(RECIPIENT_ADDRESS);
    setCopied(true);
    toast({
      title: "Adresse copiée",
      description: "L'adresse a été copiée dans le presse-papier",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const sendTip = async () => {
    if (!publicKey || !amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide",
        variant: "destructive",
      });
      return;
    }

    const tipAmount = parseFloat(amount);
    
    if (balance !== null && tipAmount > balance) {
      toast({
        title: "Solde insuffisant",
        description: `Vous n'avez que ${balance.toFixed(4)} SOL disponible`,
        variant: "destructive",
      });
      return;
    }

    const provider = window.solana as any;
    if (!provider) {
      toast({
        title: "Wallet non trouvé",
        description: "Veuillez installer Phantom wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      setSending(true);

      const connection = new Connection(SOLANA_RPC, 'confirmed');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(publicKey),
          toPubkey: new PublicKey(RECIPIENT_ADDRESS),
          lamports: Math.floor(tipAmount * LAMPORTS_PER_SOL),
        })
      );

      transaction.feePayer = new PublicKey(publicKey);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await provider.signAndSendTransaction(transaction);
      
      toast({
        title: "Pourboire envoyé ! 🎉",
        description: `${tipAmount} SOL envoyés avec succès. Signature: ${signed.signature.slice(0, 8)}...`,
      });
      
      setAmount('');
    } catch (error: any) {
      console.error('Transaction error:', error);
      if (error?.code === 4001) {
        toast({
          title: "Transaction annulée",
          description: "Vous avez annulé la transaction",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur de transaction",
          description: error?.message || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } finally {
      setSending(false);
    }
  };

  const presetAmounts = [0.1, 0.5, 1, 5];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="glass-card rounded-2xl p-8 border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Tip Jar
            </h2>
            <p className="text-muted-foreground">
              Soutenez le projet en envoyant un pourboire en SOL
            </p>
          </div>

          {/* Recipient Address */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              Adresse de réception
            </label>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border">
              <code className="text-sm text-foreground font-mono flex-1 truncate">
                {RECIPIENT_ADDRESS}
              </code>
              <button
                onClick={copyAddress}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title="Copier l'adresse"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <a
                href={`https://solscan.io/account/${RECIPIENT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title="Voir sur Solscan"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Montant (SOL)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="text-lg font-mono"
            />
          </div>

          {/* Preset Amounts */}
          <div className="flex gap-2 mb-6">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className="flex-1 py-2 px-3 text-sm font-medium rounded-lg border border-border bg-secondary/50 hover:bg-primary/10 hover:border-primary/50 transition-colors"
              >
                {preset} SOL
              </button>
            ))}
          </div>

          {/* Balance Display */}
          {connected && balance !== null && (
            <div className="mb-6 p-3 bg-secondary/30 rounded-lg border border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Votre solde</span>
                <span className="font-mono text-foreground">{balance.toFixed(4)} SOL</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          {connected ? (
            <Button
              onClick={sendTip}
              disabled={sending || !amount || parseFloat(amount) <= 0}
              className="w-full btn-glow"
              size="lg"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 mr-2" />
                  Envoyer {amount ? `${amount} SOL` : 'un pourboire'}
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={connect}
              className="w-full btn-glow"
              size="lg"
            >
              Connecter Phantom pour envoyer
            </Button>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            En envoyant un pourboire, vous effectuez un transfert volontaire et irréversible de SOL vers l'adresse affichée ci-dessus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TipJar;
