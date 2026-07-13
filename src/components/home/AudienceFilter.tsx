"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useViewMode, type ViewMode } from "@/store/viewMode";
import { cn } from "@/lib/utils";

const MODES: {
  id: ViewMode;
  color: string;
  activeBg: string;
  activeBorder: string;
  tagKey: "hrTag" | "businessTag" | "techTag";
  titleKey: "hrTitle" | "businessTitle" | "techTitle";
  descKey: "hrDesc" | "businessDesc" | "techDesc";
}[] = [
  {
    id: "hr",
    color: "text-violet-500",
    activeBg: "bg-violet-500/10",
    activeBorder: "border-violet-500",
    tagKey: "hrTag",
    titleKey: "hrTitle",
    descKey: "hrDesc",
  },
  {
    id: "business",
    color: "text-emerald-500",
    activeBg: "bg-emerald-500/10",
    activeBorder: "border-emerald-500",
    tagKey: "businessTag",
    titleKey: "businessTitle",
    descKey: "businessDesc",
  },
  {
    id: "tech",
    color: "text-blue-500",
    activeBg: "bg-blue-500/10",
    activeBorder: "border-blue-500",
    tagKey: "techTag",
    titleKey: "techTitle",
    descKey: "techDesc",
  },
];

export function AudienceFilter() {
  const t = useTranslations("AudienceFilter");
  const { mode, setMode } = useViewMode();

  return (
    <section className="py-20 px-4 border-t">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
          <p className="hidden sm:block mt-3 text-xs text-muted-foreground/70">
            {t.rich("keyboardHint", {
              kbd: (chunks) => (
                <kbd className="mx-0.5 inline-block rounded border border-border bg-muted px-1.5 py-0.5 align-middle font-mono text-[10px] font-semibold text-foreground shadow-[0_1px_0_var(--border)]">
                  {chunks}
                </kbd>
              ),
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODES.map((m, i) => {
            const isActive = mode === m.id;
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setMode(m.id)}
                className={cn(
                  "text-left rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer w-full",
                  isActive
                    ? cn(m.activeBg, m.activeBorder, "shadow-lg")
                    : "border-border bg-card hover:border-muted-foreground/40 opacity-60 hover:opacity-80"
                )}
              >
                <span
                  className={cn(
                    "inline-block text-xs font-semibold tracking-widest uppercase mb-3 px-2 py-0.5 rounded-full",
                    isActive ? cn(m.color, "bg-current/10") : "text-muted-foreground bg-muted"
                  )}
                >
                  {t(m.tagKey)}
                </span>
                <h3 className={cn("text-lg font-bold mb-2", isActive ? m.color : "text-foreground")}>
                  {t(m.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(m.descKey)}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
