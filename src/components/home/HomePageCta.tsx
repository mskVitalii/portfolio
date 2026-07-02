"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomePageCta() {
  const t = useTranslations("HomePageCta");

  return (
    <section className="py-24 px-4 border-t text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-2xl"
      >
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="mt-3 text-muted-foreground text-lg">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/projects" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
            {t("projects")}
          </Link>
          <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            {t("about")}
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            {t("contact")}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
