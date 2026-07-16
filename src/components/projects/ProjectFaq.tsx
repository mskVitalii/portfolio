import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** MDX-authorable equivalent of the /hire-me and /projects FAQ accordions,
 * for per-project "Frequently asked" blocks that live in .mdx write-ups.
 * Usage:
 *
 *   <ProjectFaq>
 *     <ProjectFaqItem q="...">...</ProjectFaqItem>
 *   </ProjectFaq>
 *
 * Renders as a collapsible accordion instead of bold-prefixed prose. */
export function ProjectFaq({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose rounded-xl border bg-card p-6 mb-8">
      <Accordion className="w-full">{children}</Accordion>
    </div>
  );
}

export function ProjectFaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <AccordionItem value={q}>
      <AccordionTrigger className="text-left">{q}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground">{children}</AccordionContent>
    </AccordionItem>
  );
}
