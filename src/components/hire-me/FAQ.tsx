"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useViewMode } from "@/store/viewMode";
import { cn } from "@/lib/utils";

interface FaqItem {
  q: string;
  a: string;
}

const SECTIONS = [
  { key: "faqHr", headingKey: "faqHrHeading", mode: "hr" },
  { key: "faqBusiness", headingKey: "faqBusinessHeading", mode: "business" },
  { key: "faqTech", headingKey: "faqTechHeading", mode: "tech" },
] as const;

export function FAQ() {
  const t = useTranslations("HireMe");
  const { mode } = useViewMode();
  const [query, setQuery] = useState("");

  const sections = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const mapped = SECTIONS.map((section) => {
      const items = t.raw(section.key) as FaqItem[];
      const filtered = needle
        ? items.filter((item) => item.q.toLowerCase().includes(needle))
        : items;
      return { ...section, items: filtered };
    });
    // The lens matching the current audience mode leads.
    return [...mapped].sort((a, b) => Number(b.mode === mode) - Number(a.mode === mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, mode]);

  const hasAnyResults = sections.some((section) => section.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("faqSearchPlaceholder")}
          className="h-10 pl-9"
        />
      </div>

      {!hasAnyResults && (
        <p className="text-sm text-muted-foreground">{t("faqNoResults")}</p>
      )}

      {sections.map((section) => {
        const isActive = section.mode === mode;
        return section.items.length > 0 ? (
          <div
            key={section.key}
            className={cn(
              "rounded-xl border bg-card p-6 transition-colors",
              isActive && "border-primary/50 ring-1 ring-primary/20"
            )}
          >
            <h3
              className={cn(
                "text-xs font-semibold uppercase tracking-wider mb-3",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t(section.headingKey)}
            </h3>
            <Accordion className="w-full">
              {section.items.map((item, i) => (
                <AccordionItem key={i} value={`${section.key}-${i}`}>
                  <AccordionTrigger className="text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : null;
      })}
    </div>
  );
}
