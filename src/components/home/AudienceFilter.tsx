"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { useViewMode, type ViewMode } from "@/store/viewMode";
import { cn } from "@/lib/utils";

const MODES: {
  id: ViewMode;
  color: string;
  activeBg: string;
  activeBorder: string;
  checkColor: string;
  tagKey: "hrTag" | "businessTag" | "techTag";
  titleKey: "hrTitle" | "businessTitle" | "techTitle";
  descKey: "hrDesc" | "businessDesc" | "techDesc";
  features: ["hrFeature1" | "businessFeature1" | "techFeature1", "hrFeature2" | "businessFeature2" | "techFeature2", "hrFeature3" | "businessFeature3" | "techFeature3"];
}[] = [
  {
    id: "hr",
    color: "text-violet-500",
    activeBg: "bg-violet-500/10",
    activeBorder: "border-violet-500",
    checkColor: "text-violet-500",
    tagKey: "hrTag",
    titleKey: "hrTitle",
    descKey: "hrDesc",
    features: ["hrFeature1", "hrFeature2", "hrFeature3"],
  },
  {
    id: "business",
    color: "text-emerald-500",
    activeBg: "bg-emerald-500/10",
    activeBorder: "border-emerald-500",
    checkColor: "text-emerald-500",
    tagKey: "businessTag",
    titleKey: "businessTitle",
    descKey: "businessDesc",
    features: ["businessFeature1", "businessFeature2", "businessFeature3"],
  },
  {
    id: "tech",
    color: "text-blue-500",
    activeBg: "bg-blue-500/10",
    activeBorder: "border-blue-500",
    checkColor: "text-blue-500",
    tagKey: "techTag",
    titleKey: "techTitle",
    descKey: "techDesc",
    features: ["techFeature1", "techFeature2", "techFeature3"],
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
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(m.descKey)}</p>
                <ul className="space-y-1.5">
                  {m.features.map((fk) => (
                    <li key={fk} className="flex items-center gap-2 text-sm">
                      <Check className={cn("h-3.5 w-3.5 shrink-0", isActive ? m.checkColor : "text-muted-foreground")} />
                      <span className={isActive ? "text-foreground" : "text-muted-foreground"}>{t(fk)}</span>
                    </li>
                  ))}
                </ul>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
