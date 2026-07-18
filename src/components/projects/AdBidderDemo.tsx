"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MousePointerClick } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const PRICE = 100;
const MIN_BID = 0.1;
const MAX_BID = 3;
const STEP = 0.05;
const DEFAULT_BID = 0.75;
// Below this bid the card barely surfaces in search results at all — the ad
// spend produces no payoff even though the campaign technically stays "cheap".
const INVISIBLE_THRESHOLD = 0.2;

type Status = "healthy" | "loss" | "invisible";

const STATUS_STYLES: Record<Status, string> = {
  healthy: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  loss: "text-red-600 dark:text-red-400 border-red-500/30 bg-red-500/10",
  invisible: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10",
};

/** Interactive demo for the E-Commerce Ad Bidder project: dragging the bid
 * slider shows why both too-high and too-low a price-per-view bid burn the
 * ad budget without a payoff, for a $100 product. */
export function AdBidderDemo() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [bid, setBid] = useState(DEFAULT_BID);

  const cost100 = bid * 100;
  const payout100 = PRICE - cost100;
  const status: Status = payout100 <= 0 ? "loss" : bid < INVISIBLE_THRESHOLD ? "invisible" : "healthy";
  const rankPct = Math.min(100, Math.max(0, ((bid - MIN_BID) / (MAX_BID - MIN_BID)) * 100));

  const currency = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("adBidder.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("adBidder.description")}</p>

      <div className="mb-6 flex items-center gap-1.5 rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        {t("adBidder.hint")}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{t("adBidder.rankTop")}</span>
          <span>{t("adBidder.rankLabel")}</span>
          <span>{t("adBidder.rankBottom")}</span>
        </div>
        <div className="relative h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/40 to-primary transition-[width]"
            style={{ width: `${rankPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-center">
        <div>
          <div className="text-lg font-bold">{currency(PRICE)}</div>
          <div className="text-xs text-muted-foreground">{t("adBidder.priceLabel")}</div>
        </div>
        <div>
          <div className="text-lg font-bold text-primary">{currency(bid)}</div>
          <div className="text-xs text-muted-foreground">{t("adBidder.bidLabel")}</div>
        </div>
        <div>
          <div className="text-lg font-bold">{currency(cost100)}</div>
          <div className="text-xs text-muted-foreground">{t("adBidder.costLabel")}</div>
        </div>
        <div>
          <div className={cn("text-lg font-bold", payout100 <= 0 ? "text-red-500" : "text-emerald-500")}>
            {currency(payout100)}
          </div>
          <div className="text-xs text-muted-foreground">{t("adBidder.payoutLabel")}</div>
        </div>
      </div>

      <Slider
        min={MIN_BID}
        max={MAX_BID}
        step={STEP}
        value={bid}
        onValueChange={(value) => setBid(value)}
        aria-label={t("adBidder.bidLabel")}
      />

      <div className={cn("mt-4 rounded-lg border px-4 py-3 text-sm", STATUS_STYLES[status])}>
        {status === "healthy" && t("adBidder.statusHealthy")}
        {status === "loss" && t("adBidder.statusLoss")}
        {status === "invisible" && t("adBidder.statusInvisible")}
      </div>
    </div>
  );
}
