import { Flame, Twitter, Github, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & description */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-foreground">SOL</span>
                <span className="text-primary">Claiming</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground max-w-sm">
              Claimez et brûlez vos tokens SOL en toute sécurité sur Solana Mainnet.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#accueil" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accueil</a></li>
              <li><a href="#pourquoi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pourquoi</a></li>
              <li><a href="#comment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Comment ça marche</a></li>
              <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Communauté</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 SOLClaiming. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
