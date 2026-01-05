import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string; toBytes: () => Uint8Array } | null;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  signAndSendTransaction: (transaction: any) => Promise<{ signature: string }>;
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
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [fetchingBalance, setFetchingBalance] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [signed, setSigned] = useState(false);

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
      console.log('Fetching balance via edge function for:', address);

      const { data, error } = await supabase.functions.invoke('get-solana-balance', {
        body: { address },
      });

      if (error) {
        console.error('Edge function error:', error);
        setBalance(null);
        if (!silent) {
          toast({
            title: 'Solde indisponible',
            description: "Impossible de récupérer le solde SOL. Réessaie dans quelques secondes.",
            variant: 'destructive',
          });
        }
        return;
      }

      if (typeof data?.balance === 'number') {
        console.log('Balance fetched successfully:', data.balance, 'SOL');
        setBalance(data.balance);
        return;
      }

      console.error('Balance fetch unexpected response:', data);
      setBalance(null);
      if (!silent) {
        toast({
          title: 'Solde indisponible',
          description: "Impossible de récupérer le solde SOL. Réessaie plus tard.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
      if (!silent) {
        toast({
          title: 'Solde indisponible',
          description: "Impossible de récupérer le solde SOL. Réessaie dans quelques secondes.",
          variant: 'destructive',
        });
      }
    } finally {
      setFetchingBalance(false);
    }
  };

  const requestSignature = async (provider: PhantomProvider, address: string): Promise<boolean> => {
    try {
      const message = "Bienvenuee sur Solclaiming nouveau utilisateur";
      const encodedMessage = new TextEncoder().encode(message);
      
      const { signature } = await provider.signMessage(encodedMessage, 'utf8');
      console.log('Message signed successfully:', signature);
      return true;
    } catch (error: any) {
      console.error('Signature error:', error);
      if (error?.code === 4001) {
        console.log('User rejected signature');
      }
      return false;
    }
  };

  const connect = async () => {
    const provider = getProvider();
    if (!provider) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setConnecting(true);
      setSigned(false);
      
      let address: string;
      
      // Request connection
      try {
        const response = await provider.connect();
        address = response.publicKey.toString();
      } catch (error: any) {
        console.error('Connection error:', error);
        if (error?.code === 4001) {
          console.log('User rejected connection');
        }
        return;
      }

      // Request signature to verify ownership
      const signedSuccessfully = await requestSignature(provider, address);
      
      if (signedSuccessfully) {
        setPublicKey(address);
        setConnected(true);
        setSigned(true);
        await fetchBalance(address);
      } else {
        // User rejected signature, disconnect
        await provider.disconnect();
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        setFetchingBalance(false);
        setSigned(false);
      }
    } catch (error: any) {
      console.error('Connection error:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    const provider = getProvider();
    if (provider) {
      try {
        await provider.disconnect();
      } catch (error) {
        console.error('Disconnect error:', error);
      }
    }
    setConnected(false);
    setPublicKey(null);
    setBalance(null);
    setFetchingBalance(false);
    setSigned(false);
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      const handleDisconnect = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        setFetchingBalance(false);
        setSigned(false);
      };

      const handleAccountChanged = () => {
        // Reset on account change
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        setFetchingBalance(false);
        setSigned(false);
      };

      provider.on('disconnect', handleDisconnect);
      provider.on('accountChanged', handleAccountChanged);

      return () => {
        provider.off('disconnect', handleDisconnect);
        provider.off('accountChanged', handleAccountChanged);
      };
    }
  }, []);

  // Refresh balance periodically when connected and signed
  useEffect(() => {
    if (connected && publicKey && signed) {
      fetchBalance(publicKey);
      const interval = setInterval(() => {
        fetchBalance(publicKey, { silent: true });
      }, 15000); // Refresh every 15 seconds
      return () => clearInterval(interval);
    }
  }, [connected, publicKey, signed]);

  return (
    <WalletContext.Provider value={{ connected, publicKey, balance, fetchingBalance, connecting, signed, connect, disconnect }}>
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
