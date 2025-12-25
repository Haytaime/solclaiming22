import { Button } from "@/components/ui/button";
import { Flame, Globe, Wallet, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWallet } from "@/contexts/WalletContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { connected, publicKey, balance, connecting, connect, disconnect } = useWallet();

  const navItems = [
    { label: t('nav.home'), href: "#accueil" },
    { label: t('nav.why'), href: "#pourquoi" },
    { label: t('nav.how'), href: "#comment" },
    { label: t('nav.claim'), href: "#claim" },
    { label: t('nav.proof'), href: "#proof" },
    { label: t('nav.faq'), href: "#faq" },
    { label: t('nav.security'), href: "#securite" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-all duration-300 group-hover:scale-110">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight">
              <span className="text-foreground">SOL</span>
              <span className="text-gradient">Claiming</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-muted/50 hover:scale-105"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 rounded-lg hover:bg-muted/50 hover:scale-105 active:scale-95"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>
            
            {connected ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl glass-card text-sm">
                  <span className="text-muted-foreground">{t('interface.balance')}:</span>{' '}
                  <span className="font-mono font-semibold text-primary">
                    {balance !== null ? balance.toFixed(4) : '...'} SOL
                  </span>
                </div>
                <Button 
                  variant="premium-outline" 
                  size="default" 
                  onClick={disconnect}
                  className="group"
                >
                  <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  {formatAddress(publicKey || '')}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="premium" 
                size="default" 
                className="hidden sm:flex group"
                onClick={connect}
                disabled={connecting}
              >
                <Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {connecting ? '...' : t('header.connect')}
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border/30 animate-fade-in">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-300 hover:translate-x-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border/30 space-y-3">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">{language === 'fr' ? 'English' : 'Français'}</span>
              </button>
              {connected ? (
                <div className="space-y-3">
                  <div className="px-4 py-2 rounded-xl glass-card text-sm">
                    <span className="text-muted-foreground">{t('interface.balance')}:</span>{' '}
                    <span className="font-mono font-semibold text-primary">
                      {balance !== null ? balance.toFixed(4) : '...'} SOL
                    </span>
                  </div>
                  <Button variant="premium-outline" size="lg" className="w-full" onClick={disconnect}>
                    <Wallet className="w-4 h-4" />
                    {formatAddress(publicKey || '')}
                  </Button>
                </div>
              ) : (
                <Button variant="premium" size="lg" className="w-full" onClick={connect} disabled={connecting}>
                  <Wallet className="w-4 h-4" />
                  {connecting ? '...' : t('header.connect')}
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
