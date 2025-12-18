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
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Questions fréquentes
        </h2>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
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
