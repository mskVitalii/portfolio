"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

/** A deliberate quiet beat between the pitch (top projects, uniques, the ask, location)
 * and the detail section below (audience picker, CTA, explore-more, footer) — inverted
 * colors and a single short line instead of another CTA. */
export function DramaticPause() {
  const t = useTranslations("DramaticPause");

  return (
    <section className="bg-foreground text-background flex items-center justify-center text-center px-4 py-28 md:py-36">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold max-w-2xl leading-snug"
      >
        {t("line")}
      </motion.p>
    </section>
  );
}
