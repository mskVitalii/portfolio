"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const BRANDS = [
  { name: "OZON Tech",    logo: "/brands/ozon.svg" },
  { name: "WeDo.agency",  logo: "/brands/wedo.jpeg" },
  { name: "onlineTours",  logo: "/brands/onlinetours.svg" },
  { name: "Dunlimited",   logo: "/brands/dunlimited.svg" },
  { name: "Egsha",        logo: "/brands/egsha.png" },
] as const;

export function BrandCloud() {
  const t = useTranslations("BrandCloud");

  return (
    <section className="py-16 px-4 border-t">
      <div className="container mx-auto max-w-5xl">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          {t("label")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="opacity-40 hover:opacity-100 transition-all duration-300 flex items-center filter-[brightness(0)] dark:filter-[brightness(0)_invert(1)] hover:filter-none dark:hover:filter-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                style={{ height: "32px", width: "auto", maxWidth: "120px", objectFit: "contain" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
