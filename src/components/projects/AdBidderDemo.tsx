"use client";

import { useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "motion/react";
import {
  MousePointerClick,
  Search,
  ShoppingCart,
  Headphones,
  Speaker,
  Watch,
  Camera,
  BatteryCharging,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

type ProductNameKey = "productEarbuds" | "productSpeaker" | "productWatch" | "productCamera" | "productCharger";

interface Competitor {
  id: string;
  nameKey: ProductNameKey;
  icon: LucideIcon;
  price: number;
  bid: number;
}

type ListingItem = (Competitor & { isOurs: false }) | { id: "ours"; icon: LucideIcon; price: number; bid: number; isOurs: true };

// Fixed competitor listings the visitor's bid is ranked against. Bids span
// the same 0.1–3 range as the slider, so "your product" can land anywhere
// from the very front of results to the very back.
const COMPETITORS: Competitor[] = [
  { id: "speaker", nameKey: "productSpeaker", icon: Speaker, price: 199, bid: 2.2 },
  { id: "watch", nameKey: "productWatch", icon: Watch, price: 129, bid: 1.5 },
  { id: "camera", nameKey: "productCamera", icon: Camera, price: 259, bid: 0.9 },
  { id: "charger", nameKey: "productCharger", icon: BatteryCharging, price: 79, bid: 0.55 },
  { id: "earbuds", nameKey: "productEarbuds", icon: Headphones, price: 49, bid: 0.3 },
];

const FILTER_ROW_WIDTHS = ["70%", "45%", "60%"];

/** Interactive demo for the E-Commerce Ad Bidder project: a small marketplace
 * search-results mockup where dragging the bid slider re-ranks "your product"
 * card against fixed competitor bids, walking it from the front of results
 * to the back (or vice versa) exactly the way the real ranking mechanic does. */
export function AdBidderDemo() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [bid, setBid] = useState(DEFAULT_BID);

  const cost100 = bid * 100;
  const payout100 = PRICE - cost100;
  const status: Status = payout100 <= 0 ? "loss" : bid < INVISIBLE_THRESHOLD ? "invisible" : "healthy";

  const currency = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

  // Rank by bid, highest first — re-sorting "ours" back in on every drag is
  // what visibly walks the card from the front of the grid to the back.
  const listing = useMemo<ListingItem[]>(() => {
    const ours: ListingItem = { id: "ours", icon: ShoppingCart, price: PRICE, bid, isOurs: true };
    const items: ListingItem[] = [...COMPETITORS.map((c): ListingItem => ({ ...c, isOurs: false })), ours];
    return items.sort((a, b) => b.bid - a.bid);
  }, [bid]);

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("adBidder.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("adBidder.description")}</p>

      <div className="mb-6 flex items-center gap-1.5 rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        {t("adBidder.hint")}
      </div>

      {/* Decorative marketplace search bar — sets the scene, carries no real information */}
      <div
        className="mb-3 flex items-center gap-2 rounded-lg border bg-muted/20 px-3 py-2 text-sm text-muted-foreground select-none"
        aria-hidden="true"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span>{t("adBidder.searchQuery")}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 mb-6">
        {/* Decorative filters sidebar — wireframe rows, just for marketplace flavor */}
        <div className="hidden sm:block space-y-4" aria-hidden="true">
          {[
            t("adBidder.filterPrice"),
            t("adBidder.filterBrand"),
            t("adBidder.filterRating"),
          ].map((label) => (
            <div key={label}>
              <div className="text-xs font-medium text-foreground/80 mb-1.5">{label}</div>
              <div className="space-y-1.5">
                {FILTER_ROW_WIDTHS.map((w, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] border border-muted-foreground/30" />
                    <span className="h-2 rounded-full bg-muted-foreground/15" style={{ width: w }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product grid — reorders live as the bid slider moves */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {listing.map((item) => (
            <motion.div
              key={item.id}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "rounded-lg border p-3 flex flex-col gap-2",
                item.isOurs ? "border-primary ring-2 ring-primary/40 bg-primary/5" : "bg-background"
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md",
                  item.isOurs ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <div className="text-xs font-medium leading-tight">
                {item.isOurs
                  ? t("adBidder.yourProduct")
                  : t(`adBidder.${item.nameKey}` as "adBidder.productEarbuds")}
              </div>
              <div className="mt-auto flex items-center justify-between text-[11px]">
                <span className="font-semibold">{currency(item.price)}</span>
                <span className={item.isOurs ? "font-semibold text-primary" : "text-muted-foreground"}>
                  {t("adBidder.cardBidTemplate", { amount: currency(item.bid) })}
                </span>
              </div>
            </motion.div>
          ))}
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
