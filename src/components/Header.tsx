import { Button } from "@/components/ui/button";
import { Flame, Globe } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Accueil", href: "#accueil" },
    { label: "Pourquoi", href: "#pourquoi" },
    { label: "Comment ça marche", href: "#comment" },
    { label: "Claim / Burn", href: "#claim" },
    { label: "Proof", href: "#proof" },
    { label: "FAQ", href: "#faq" },
    { label: "Sécurité", href: "#securite" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-shadow duration-300">
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
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50">
              <Globe className="w-4 h-4" />
              <span className="font-medium">FR</span>
            </button>
            <Button variant="premium" size="default" className="hidden sm:flex">
              Connecter Phantom
            </Button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
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
                  className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border/30">
              <Button variant="premium" size="lg" className="w-full">
                Connecter Phantom
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;