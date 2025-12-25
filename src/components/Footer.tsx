import { Flame, Twitter, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-shadow">
                <Flame className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                <span className="text-foreground">SOL</span>
                <span className="text-gradient">Claiming</span>
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Claimez et brûlez vos tokens SOL en toute sécurité sur Solana Mainnet. 
              Rapide, transparent, open-source.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-5">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#accueil" className="text-muted-foreground hover:text-foreground transition-colors">Accueil</a></li>
              <li><a href="#pourquoi" className="text-muted-foreground hover:text-foreground transition-colors">Pourquoi</a></li>
              <li><a href="#comment" className="text-muted-foreground hover:text-foreground transition-colors">Comment ça marche</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold mb-5">Communauté</h4>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-glow transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-glow transition-all duration-300">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-glow transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 SOLClaiming. Tous droits réservés.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;