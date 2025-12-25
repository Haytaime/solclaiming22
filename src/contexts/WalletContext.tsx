import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string } | null;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
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
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);

  const getProvider = (): PhantomProvider | undefined => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      return window.solana;
    }
    return undefined;
  };

  const fetchBalance = async (address: string) => {
    try {
      const response = await fetch('https://api.mainnet-beta.solana.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address],
        }),
      });
      const data = await response.json();
      if (data.result?.value !== undefined) {
        setBalance(data.result.value / 1e9); // Convert lamports to SOL
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
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
      const response = await provider.connect();
      const address = response.publicKey.toString();
      setPublicKey(address);
      setConnected(true);
      await fetchBalance(address);
    } catch (error) {
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
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      const handleDisconnect = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
      };

      provider.on('disconnect', handleDisconnect);
      
      // Check if already connected
      if (provider.publicKey) {
        const address = provider.publicKey.toString();
        setPublicKey(address);
        setConnected(true);
        fetchBalance(address);
      }

      return () => {
        provider.off('disconnect', handleDisconnect);
      };
    }
  }, []);

  // Refresh balance periodically when connected
  useEffect(() => {
    if (connected && publicKey) {
      const interval = setInterval(() => {
        fetchBalance(publicKey);
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [connected, publicKey]);

  return (
    <WalletContext.Provider value={{ connected, publicKey, balance, connecting, connect, disconnect }}>
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
