import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quels wallets sont supportés ?",
      answer: "Nous supportons actuellement Phantom et Solflare. D'autres wallets seront ajoutés prochainement.",
    },
    {
      question: "Y a-t-il des frais ?",
      answer: "Oui, des frais de réseau Solana s'appliquent (généralement < 0.001 SOL). Tous les frais sont affichés avant confirmation.",
    },
    {
      question: "Est-ce sécurisé ?",
      answer: "Nos smart contracts sont open-source et seront audités. Vos clés privées restent toujours dans votre wallet.",
    },
    {
      question: "Combien de temps prend une transaction ?",
      answer: "Les transactions sont généralement traitées en moins de 30 secondes, selon la congestion du réseau Solana.",
    },
    {
      question: "Puis-je annuler une transaction ?",
      answer: "Une fois confirmée sur la blockchain, une transaction ne peut pas être annulée. Vérifiez toujours les détails avant de signer.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-display-sm md:text-display-md mb-6 text-balance">
            Questions <span className="text-gradient">fréquentes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour commencer.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-0 data-[state=open]:shadow-glow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;