import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString: () => string; toBytes: () => Uint8Array } | null;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
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
  signed: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [signed, setSigned] = useState(false);

  const getProvider = (): PhantomProvider | undefined => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      return window.solana;
    }
    return undefined;
  };

  const fetchBalance = async (address: string) => {
    try {
      // Use multiple RPC endpoints for reliability
      const endpoints = [
        'https://api.mainnet-beta.solana.com',
        'https://solana-mainnet.g.alchemy.com/v2/demo',
      ];
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
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
            const solBalance = data.result.value / 1e9;
            console.log('Balance fetched:', solBalance, 'SOL from', endpoint);
            setBalance(solBalance);
            return;
          }
        } catch (err) {
          console.log('Endpoint failed:', endpoint, err);
          continue;
        }
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const requestSignature = async (provider: PhantomProvider, address: string): Promise<boolean> => {
    try {
      const message = `SOL Claiming - Vérification du wallet\n\nAdresse: ${address.slice(0, 8)}...${address.slice(-8)}\nDate: ${new Date().toISOString()}`;
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
    setSigned(false);
  };

  useEffect(() => {
    const provider = getProvider();
    if (provider) {
      const handleDisconnect = () => {
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
        setSigned(false);
      };

      const handleAccountChanged = () => {
        // Reset on account change
        setConnected(false);
        setPublicKey(null);
        setBalance(null);
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
        fetchBalance(publicKey);
      }, 15000); // Refresh every 15 seconds
      return () => clearInterval(interval);
    }
  }, [connected, publicKey, signed]);

  return (
    <WalletContext.Provider value={{ connected, publicKey, balance, connecting, signed, connect, disconnect }}>
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
