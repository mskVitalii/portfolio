"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// hrefs point straight at each project's merged company case-study page (with anchor) —
// the standalone /projects/[slug] URLs for these three 308-redirect there, so linking
// to the old slug would send visitors through an avoidable redirect hop.
const REVENUE_SEGMENTS = [
  { label: "Infineon", value: 480, color: "#6366f1", href: "/projects/company/infineon#infineon-parking-guidance" },
  { label: "OZON Tech", value: 86, color: "#10b981", href: "/projects/company/ozon#ozon-warehouse-search" },
  { label: "egsha", value: 52, color: "#f59e0b", href: "/projects/company/egsha#wedo-ecommerce-bidder" },
];
const TOTAL_REVENUE = REVENUE_SEGMENTS.reduce((sum, s) => sum + s.value, 0);

/** Total documented savings as one proportional bar — the headline number for the
 * "Work that paid for itself" block, with each segment linking to its case study. */
export function SavingsSummary() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslations("TopProjects");
  return (
    <div ref={ref} className="mb-8 rounded-2xl border bg-card p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-4xl md:text-5xl font-bold tabular-nums">
          €{isInView ? (
            <CountUp end={TOTAL_REVENUE} duration={1.6} separator="," />
          ) : "0"}K
        </span>
        <span className="text-muted-foreground text-sm font-medium">{t("totalSavings")}</span>
      </div>
      <p className="text-xs text-muted-foreground mb-5">{t("documented")}</p>

      {/* Proportional bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-4 gap-px">
        {REVENUE_SEGMENTS.map((seg) => (
          <motion.div
            key={seg.label}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(seg.value / TOTAL_REVENUE) * 100}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            style={{ background: seg.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {REVENUE_SEGMENTS.map((seg) => (
          <Link key={seg.label} href={seg.href} className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {seg.label}
              <span className="ml-1.5 font-semibold text-foreground">€{seg.value}K</span>
              <span className="ml-1 text-xs opacity-60">{Math.round((seg.value / TOTAL_REVENUE) * 100)}%</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
