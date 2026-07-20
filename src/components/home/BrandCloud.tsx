"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getCompanyBundle } from "@/data/companies";

interface Brand {
  name: string;
  logo: string;
  /** Must match a `CompanyBundle.name` in @/data/companies exactly — resolved to that bundle's slug for the /projects#slug deep link. */
  company: string;
  darkBg?: boolean;
}

const BRANDS: Brand[] = [
  {
    name: "Infineon Technologies",
    logo: "/brands/infineon.svg",
    company: "Infineon Technologies AG",
  },
  { name: "OZON Tech",   logo: "/brands/ozon.svg",        company: "OZON Tech" },
  { name: "WeDo.agency", logo: "/brands/wedo.jpeg",       company: "WeDo.agency" },
  { name: "onlineTours", logo: "/brands/onlinetours.svg", company: "onlineTours" },
  { name: "Dunlimited",  logo: "/brands/dunlimited.svg",  company: "dunlimited", darkBg: true },
  { name: "Egsha",       logo: "/brands/egsha.png",       company: "egsha" },
];

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
              whileHover={{ scale: 1.1 }}
              className="transition-all duration-200"
            >
              <Link
                href={`/projects#${getCompanyBundle(brand.company)?.slug ?? "work"}`}
                title={`Projects at ${brand.name}`}
                className="flex items-center"
              >
                {brand.darkBg ? (
                  <span className="inline-flex items-center justify-center rounded-lg bg-zinc-800 px-3 py-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{ height: "28px", width: "auto", maxWidth: "110px", objectFit: "contain" }}
                    />
                  </span>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{ height: "36px", width: "auto", maxWidth: "130px", objectFit: "contain" }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
