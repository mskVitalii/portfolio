"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useViewMode } from "@/store/viewMode";

interface FaqItem {
  q: string;
  a: string;
}

const MODE_KEY = {
  hr: "faqHr",
  business: "faqBusiness",
  tech: "faqTech",
} as const;

export function FAQ() {
  const t = useTranslations("Contact");
  const { mode } = useViewMode();
  const items = t.raw(MODE_KEY[mode]) as FaqItem[];

  return (
    <Accordion className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
