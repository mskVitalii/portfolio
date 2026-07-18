"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  MessageCircle,
  ClipboardList,
  ShoppingCart,
  LayoutDashboard,
  Printer,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEP_ICONS: LucideIcon[] = [
  MessageCircle,
  ClipboardList,
  ShoppingCart,
  LayoutDashboard,
  Printer,
  PartyPopper,
];

// Indices of steps actually built as part of this freelance engagement — the
// admin panel (logging gifts, printing packaging labels/notes). The rest of
// the flow (questionnaires, Amazon shopping, delivery) is business context.
const BUILT_STEP_INDICES = new Set([3, 4]);

interface FlowStep {
  label: string;
  description: string;
}

/** Explains the NCahoots gifting flow end to end, so it's clear which slice of
 * it (the admin panel) this project actually shipped. */
export function NCahootsFlowDiagram() {
  const t = useTranslations("Projects.ncahootsFlow");
  const steps = t.raw("steps") as FlowStep[];

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("description")}</p>

      <div>
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i];
          const built = BUILT_STEP_INDICES.has(i);
          const isLast = i === steps.length - 1;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-card",
                    built ? "border-primary text-primary" : "border-border text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {!isLast && <span className="mt-1 w-px flex-1 bg-border" aria-hidden />}
              </div>
              <div className="pt-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{step.label}</p>
                  {built && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                      {t("builtLabel")}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
