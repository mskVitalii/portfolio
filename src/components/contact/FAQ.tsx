import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Are you open to relocation?",
    answer:
      "I am based in Berlin and open to on-site or hybrid roles in Germany. Relocation within the EU is possible for the right opportunity. Remote-first is also fine.",
  },
  {
    question: "Do you need visa sponsorship?",
    answer:
      "For Germany, no — I hold a valid residence permit covering employment. For other countries, visa support would be appreciated but is not always a blocker.",
  },
  {
    question: "Are you available for freelance or contract work?",
    answer:
      "Yes, for interesting projects. I am open to short-term consulting engagements and technical leadership roles. Contact me to discuss scope and rates.",
  },
  {
    question: "When are you available?",
    answer:
      "I am currently open to new opportunities. My Master's program at Chemnitz University ends in September 2025, but I can start earlier depending on the arrangement.",
  },
  {
    question: "What types of projects do you prefer?",
    answer:
      "Systems with non-trivial engineering challenges — distributed data pipelines, AI-powered search, high-throughput backends. I enjoy working close to the business problem, not just executing tickets.",
  },
];

export function FAQ() {
  return (
    <Accordion className="w-full">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
