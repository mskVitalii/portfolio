"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Layers, Sparkles, Building2, Globe2, type LucideIcon } from "lucide-react";

const ITEMS: {
  id: string;
  icon: LucideIcon;
  titleKey: "fullStackTitle" | "aiNativeTitle" | "scaleRangeTitle" | "readyNowTitle";
  descKey: "fullStackDesc" | "aiNativeDesc" | "scaleRangeDesc" | "readyNowDesc";
}[] = [
  { id: "fullStack", icon: Layers, titleKey: "fullStackTitle", descKey: "fullStackDesc" },
  { id: "aiNative", icon: Sparkles, titleKey: "aiNativeTitle", descKey: "aiNativeDesc" },
  { id: "scaleRange", icon: Building2, titleKey: "scaleRangeTitle", descKey: "scaleRangeDesc" },
  { id: "readyNow", icon: Globe2, titleKey: "readyNowTitle", descKey: "readyNowDesc" },
];

export function Uniques() {
  const t = useTranslations("Uniques");

  return (
    <section className="py-20 px-4 border-t bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">{t("title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ITEMS.map(({ id, icon: Icon, titleKey, descKey }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-6"
            >
              <Icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{t(titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
