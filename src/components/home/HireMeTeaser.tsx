"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { HireMeLinks } from "@/components/hire-me/HireMeLinks";
import { cn } from "@/lib/utils";

export function HireMeTeaser() {
  const t = useTranslations("HireMe");
  const tTeaser = useTranslations("HireMeTeaser");

  return (
    <section className="py-20 px-4 border-t">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="mt-2 text-muted-foreground text-lg">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 text-left"
        >
          <HireMeLinks />
        </motion.div>

        <Link
          href="/hire-me"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-6")}
        >
          {tTeaser("cta")}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </section>
  );
}
