import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.why': { fr: 'Pourquoi', en: 'Why Us' },
  'nav.how': { fr: 'Comment ça marche', en: 'How It Works' },
  'nav.claim': { fr: 'Claim / Burn', en: 'Claim / Burn' },
  'nav.proof': { fr: 'Proof', en: 'Proof' },
  'nav.faq': { fr: 'FAQ', en: 'FAQ' },
  'nav.security': { fr: 'Sécurité', en: 'Security' },
  'header.connect': { fr: 'Connecter Phantom', en: 'Connect Phantom' },
  'header.connected': { fr: 'Connecté', en: 'Connected' },

  // Hero
  'hero.badge': { fr: 'Live sur Solana Mainnet', en: 'Live on Solana Mainnet' },
  'hero.title1': { fr: 'Récupérez ou brûlez vos', en: 'Claim or burn your' },
  'hero.title2': { fr: 'en toute sécurité', en: 'safely and securely' },
  'hero.subtitle': { fr: 'Claimez vos tokens SOL en quelques clics via Phantom. Transactions traçables et frais transparents.', en: 'Claim your SOL tokens in a few clicks via Phantom. Traceable transactions and transparent fees.' },
  'hero.cta': { fr: 'Connecter Phantom', en: 'Connect Phantom' },
  'hero.learn': { fr: 'En savoir plus', en: 'Learn More' },
  'hero.opensource': { fr: 'Open-source', en: 'Open-source' },
  'hero.audit': { fr: 'Audit à venir', en: 'Audit pending' },
  'hero.fast': { fr: '<30s transactions', en: '<30s transactions' },

  // Stats
  'stats.burned': { fr: 'SOL Brûlés', en: 'SOL Burned' },
  'stats.transactions': { fr: 'Transactions', en: 'Transactions' },
  'stats.success': { fr: 'Taux de Réussite', en: 'Success Rate' },
  'stats.audit': { fr: 'Audits à venir', en: 'Audits Coming' },

  // Why Us
  'why.title': { fr: 'Pourquoi nous', en: 'Why' },
  'why.title2': { fr: 'choisir', en: 'choose us' },
  'why.subtitle': { fr: 'Une plateforme conçue pour la simplicité, la sécurité et la transparence.', en: 'A platform designed for simplicity, security and transparency.' },
  'why.security.title': { fr: 'Sécurité Maximale', en: 'Maximum Security' },
  'why.security.desc': { fr: 'Smart contracts open-source, audits à venir. Vos clés privées ne quittent jamais votre wallet.', en: 'Open-source smart contracts, audits coming. Your private keys never leave your wallet.' },
  'why.security.link': { fr: 'Voir la sécurité', en: 'View security' },
  'why.speed.title': { fr: 'Rapidité Optimale', en: 'Optimal Speed' },
  'why.speed.desc': { fr: 'Transactions traitées en moins de 30 secondes grâce à la puissance du réseau Solana.', en: 'Transactions processed in less than 30 seconds thanks to the power of Solana network.' },
  'why.speed.link': { fr: 'Essayer maintenant', en: 'Try now' },
  'why.transparency.title': { fr: 'Transparence Totale', en: 'Total Transparency' },
  'why.transparency.desc': { fr: 'Tous les frais sont affichés avant confirmation. Aucun coût caché, jamais.', en: 'All fees are displayed before confirmation. No hidden costs, ever.' },
  'why.transparency.link': { fr: 'En savoir plus', en: 'Learn more' },

  // How It Works
  'how.title': { fr: 'Comment ça', en: 'How it' },
  'how.title2': { fr: 'marche', en: 'works' },
  'how.subtitle': { fr: 'Trois étapes simples pour gérer vos SOL.', en: 'Three simple steps to manage your SOL.' },
  'how.step1.title': { fr: 'Connecter votre wallet', en: 'Connect your wallet' },
  'how.step1.desc': { fr: 'Connectez votre wallet Phantom ou Solflare en un clic sécurisé.', en: 'Connect your Phantom or Solflare wallet with one secure click.' },
  'how.step2.title': { fr: 'Sélectionner l\'action', en: 'Select action' },
  'how.step2.desc': { fr: 'Choisissez Claim ou Burn et indiquez la quantité de SOL.', en: 'Choose Claim or Burn and enter the amount of SOL.' },
  'how.step3.title': { fr: 'Confirmer la transaction', en: 'Confirm transaction' },
  'how.step3.desc': { fr: 'Signez la transaction dans votre wallet et suivez-la sur Solscan.', en: 'Sign the transaction in your wallet and track it on Solscan.' },
  'how.cta': { fr: 'Commencer maintenant', en: 'Start now' },

  // Claim/Burn Interface
  'interface.title': { fr: 'Interface', en: 'Interface' },
  'interface.title2': { fr: 'Claim / Burn', en: 'Claim / Burn' },
  'interface.subtitle': { fr: 'Gérez vos SOL directement depuis cette interface sécurisée.', en: 'Manage your SOL directly from this secure interface.' },
  'interface.mode': { fr: 'Mode', en: 'Mode' },
  'interface.amount': { fr: 'Quantité (SOL)', en: 'Amount (SOL)' },
  'interface.connect': { fr: 'Connecter votre wallet', en: 'Connect your wallet' },
  'interface.balance': { fr: 'Solde', en: 'Balance' },
  'interface.claimable': { fr: 'À récupérer', en: 'To claim' },

  // Transactions
  'tx.title': { fr: 'Transactions', en: 'Recent' },
  'tx.title2': { fr: 'récentes', en: 'Transactions' },
  'tx.subtitle': { fr: 'Suivez toutes les transactions en temps réel.', en: 'Track all transactions in real time.' },
  'tx.all': { fr: 'Toutes', en: 'All' },
  'tx.success': { fr: 'Réussie', en: 'Success' },
  'tx.pending': { fr: 'En attente', en: 'Pending' },
  'tx.view': { fr: 'Voir sur Solscan', en: 'View on Solscan' },
  'tx.ago.hours': { fr: 'il y a {n} heure(s)', en: '{n} hour(s) ago' },
  'tx.ago.days': { fr: 'il y a {n} jour(s)', en: '{n} day(s) ago' },
  'tx.ago.minutes': { fr: 'il y a {n} minute(s)', en: '{n} minute(s) ago' },

  // FAQ
  'faq.title': { fr: 'Questions', en: 'Frequently Asked' },
  'faq.title2': { fr: 'fréquentes', en: 'Questions' },
  'faq.subtitle': { fr: 'Tout ce que vous devez savoir pour commencer.', en: 'Everything you need to know to get started.' },
  'faq.q1': { fr: 'Quels wallets sont supportés ?', en: 'Which wallets are supported?' },
  'faq.a1': { fr: 'Nous supportons actuellement Phantom et Solflare. D\'autres wallets seront ajoutés prochainement.', en: 'We currently support Phantom and Solflare. More wallets will be added soon.' },
  'faq.q2': { fr: 'Y a-t-il des frais ?', en: 'Are there any fees?' },
  'faq.a2': { fr: 'Oui, des frais de réseau Solana s\'appliquent (généralement < 0.001 SOL). Tous les frais sont affichés avant confirmation.', en: 'Yes, Solana network fees apply (typically < 0.001 SOL). All fees are displayed before confirmation.' },
  'faq.q3': { fr: 'Est-ce sécurisé ?', en: 'Is it secure?' },
  'faq.a3': { fr: 'Nos smart contracts sont open-source et seront audités. Vos clés privées restent toujours dans votre wallet.', en: 'Our smart contracts are open-source and will be audited. Your private keys always stay in your wallet.' },
  'faq.q4': { fr: 'Combien de temps prend une transaction ?', en: 'How long does a transaction take?' },
  'faq.a4': { fr: 'Les transactions sont généralement traitées en moins de 30 secondes, selon la congestion du réseau Solana.', en: 'Transactions are typically processed in less than 30 seconds, depending on Solana network congestion.' },
  'faq.q5': { fr: 'Puis-je annuler une transaction ?', en: 'Can I cancel a transaction?' },
  'faq.a5': { fr: 'Une fois confirmée sur la blockchain, une transaction ne peut pas être annulée. Vérifiez toujours les détails avant de signer.', en: 'Once confirmed on the blockchain, a transaction cannot be cancelled. Always verify details before signing.' },

  // Security
  'security.title': { fr: 'Sécurité &', en: 'Security &' },
  'security.title2': { fr: 'Conformité', en: 'Compliance' },
  'security.subtitle': { fr: 'Votre sécurité est notre priorité absolue.', en: 'Your security is our absolute priority.' },
  'security.opensource.title': { fr: 'Open-source', en: 'Open-source' },
  'security.opensource.desc': { fr: 'Tous nos smart contracts sont open-source et vérifiables publiquement.', en: 'All our smart contracts are open-source and publicly verifiable.' },
  'security.audit.title': { fr: 'Audits à venir', en: 'Audits Coming' },
  'security.audit.desc': { fr: 'Nos contrats seront audités par des firmes de sécurité reconnues.', en: 'Our contracts will be audited by recognized security firms.' },
  'security.local.title': { fr: 'Signature locale', en: 'Local Signing' },
  'security.local.desc': { fr: 'Vos clés privées restent dans votre wallet. Nous ne les voyons jamais.', en: 'Your private keys stay in your wallet. We never see them.' },
  'security.phishing.title': { fr: 'Anti-phishing', en: 'Anti-phishing' },
  'security.phishing.desc': { fr: 'Vérifiez toujours l\'URL et ne partagez jamais votre seed phrase.', en: 'Always verify the URL and never share your seed phrase.' },

  // Footer
  'footer.desc': { fr: 'Claimez et brûlez vos tokens SOL en toute sécurité sur Solana Mainnet. Rapide, transparent, open-source.', en: 'Claim and burn your SOL tokens securely on Solana Mainnet. Fast, transparent, open-source.' },
  'footer.nav': { fr: 'Navigation', en: 'Navigation' },
  'footer.community': { fr: 'Communauté', en: 'Community' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal Notice' },
  'footer.privacy': { fr: 'Politique de confidentialité', en: 'Privacy Policy' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[key];
    if (!translation) return key;
    
    let text = translation[language];
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
