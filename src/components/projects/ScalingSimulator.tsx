"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Server, Boxes, MousePointerClick, TriangleAlert } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// One commodity node's capacity and monthly cost — also the horizontal
// scaling unit. Deliberately identical to the smallest vertical tier below,
// so at low load neither strategy has an advantage; the gap only opens up
// as load grows.
const NODE_CAPACITY = 300;
const NODE_COST = 40;

type TierKey = "small" | "medium" | "large" | "xl" | "super";

interface VerticalTier {
  key: TierKey;
  maxUsers: number;
  cost: number;
}

// Cost per unit of capacity climbs tier over tier — a single machine gets
// disproportionately more expensive long before it gets proportionately
// more capacity, until there's no bigger machine to buy at all.
const VERTICAL_TIERS: VerticalTier[] = [
  { key: "small", maxUsers: 300, cost: 40 },
  { key: "medium", maxUsers: 1_500, cost: 220 },
  { key: "large", maxUsers: 6_000, cost: 1_600 },
  { key: "xl", maxUsers: 20_000, cost: 11_000 },
  { key: "super", maxUsers: 60_000, cost: 180_000 },
];

// The single vertical box's on-screen footprint per tier — it physically
// grows tier over tier, the same way a "just buy a bigger box" strategy
// does in real infrastructure.
const TIER_SIZE: Record<TierKey, number> = {
  small: 28,
  medium: 44,
  large: 68,
  xl: 104,
  super: 152,
};

const TIER_STYLE: Record<TierKey, string> = {
  small: "border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  medium: "border-sky-500/60 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  large: "border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  xl: "border-orange-500/60 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  super: "border-red-500/60 bg-red-500/10 text-red-600 dark:text-red-400",
};

const EXP_MIN = 2; // 10^2 = 100 users
const EXP_MAX = 5; // 10^5 = 100,000 users
const EXP_STEP = 0.01;
const DEFAULT_EXPONENT = 4; // 10,000 users

function verticalTierFor(users: number): VerticalTier | null {
  return VERTICAL_TIERS.find((t) => users <= t.maxUsers) ?? null;
}

/** Interactive demo for the OZON barcode-scanner project's real strategic
 * payoff: routing scanners through a shared point-update service — instead
 * of wiring each one to a single app — let the warehouse scale out with
 * commodity nodes instead of scaling up a single server. Dragging the
 * (log-scale) users slider physically grows a single box (vertical) or
 * tiles more identical small ones (horizontal), instead of just plotting
 * the cost as an abstract curve. */
export function ScalingSimulator() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [exponent, setExponent] = useState(DEFAULT_EXPONENT);

  const users = Math.round(10 ** exponent);
  const verticalTier = verticalTierFor(users);
  const horizontalNodes = Math.ceil(users / NODE_CAPACITY);
  const horizontalCost = horizontalNodes * NODE_COST;

  const currency = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const number = (n: number) => new Intl.NumberFormat(locale).format(n);

  const ratio = verticalTier ? verticalTier.cost / horizontalCost : null;

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("scalingSim.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("scalingSim.description")}</p>

      <div className="mb-6 flex items-center gap-1.5 rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        {t("scalingSim.hint")}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{t("scalingSim.usersLabel")}</span>
          <span className="font-semibold text-foreground">{number(users)}</span>
        </div>
        <Slider
          min={EXP_MIN}
          max={EXP_MAX}
          step={EXP_STEP}
          value={exponent}
          onValueChange={(value) => setExponent(value)}
          aria-label={t("scalingSim.usersLabel")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Vertical: one box that physically grows, tier over tier, until no
            bigger machine exists to buy. */}
        <div className="rounded-lg border bg-muted/20 p-4">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium">
            <Server className="h-3.5 w-3.5" />
            {t("scalingSim.verticalLabel")}
          </div>
          <div className="flex h-[170px] items-center justify-center">
            {verticalTier ? (
              <div
                className={cn(
                  "flex items-center justify-center rounded-md border-2 transition-all duration-300",
                  TIER_STYLE[verticalTier.key]
                )}
                style={{ width: TIER_SIZE[verticalTier.key], height: TIER_SIZE[verticalTier.key] }}
              >
                <Server className="h-1/3 w-1/3" />
              </div>
            ) : (
              <div className="flex h-[152px] w-[152px] items-center justify-center rounded-md border-2 border-dashed border-red-500/60 bg-red-500/5">
                <TriangleAlert className="h-10 w-10 text-red-500" />
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            {verticalTier ? (
              <>
                <div className="text-lg font-bold">{currency(verticalTier.cost)}</div>
                <div className="text-[11px] text-muted-foreground">
                  {t(`scalingSim.tier.${verticalTier.key}` as "scalingSim.tier.small")}
                </div>
              </>
            ) : (
              <div className="text-sm font-semibold text-red-600 dark:text-red-400">
                {t("scalingSim.verticalImpossible")}
              </div>
            )}
          </div>
        </div>

        {/* Horizontal: identical small boxes tiling in, one per commodity
            node — the same box repeated is the entire strategy. */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="mb-3 flex items-center gap-1.5 text-xs font-medium">
            <Boxes className="h-3.5 w-3.5" />
            {t("scalingSim.horizontalLabel")}
          </div>
          <div className="flex h-[170px] flex-wrap content-center justify-center gap-0.75 overflow-hidden">
            {Array.from({ length: horizontalNodes }).map((_, i) => (
              <div key={i} className="h-[9px] w-[9px] shrink-0 rounded-[1px] bg-emerald-500/70" />
            ))}
          </div>
          <div className="mt-3 text-center">
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{currency(horizontalCost)}</div>
            <div className="text-[11px] text-muted-foreground">
              {t("scalingSim.nodesTemplate", { count: horizontalNodes })}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 mb-4 text-sm text-muted-foreground">
        {ratio === null
          ? t("scalingSim.ratioImpossible")
          : ratio < 1.05
            ? t("scalingSim.ratioNone")
            : t("scalingSim.ratioTemplate", { ratio: ratio < 10 ? ratio.toFixed(1) : Math.round(ratio) })}
      </p>

      <p className="text-xs leading-relaxed text-muted-foreground border-t pt-4">
        {t("scalingSim.strategicNote")}
      </p>
    </div>
  );
}
