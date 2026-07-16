"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const MIN_SALE_PRICE = 50_000;
const MAX_SALE_PRICE = 500_000;
const SALE_PRICE_STEP = 10_000;
const DEFAULT_SALE_PRICE = 150_000;
// The market's eventual verdict on what the company is really worth — drawn
// fresh on every reshuffle, independent of what the company actually sold
// shares for.
const MARKET_VALUE_MIN = 50_000;
const MARKET_VALUE_MAX = 500_000;
// An audit is an estimate, not a guarantee — it lands within this margin of
// the market's eventual verdict.
const AUDIT_ERROR_MARGIN = 0.15;
// Above this much left on the table, the outcome reads as a clear failure for
// the company regardless of whether its net number is still nominally positive.
const BIG_MISS_THRESHOLD = 100_000;
// Every this much further past the threshold adds one more emoji, up to the cap.
const EMOJI_TIER_STEP = 150_000;
const MAX_EMOJI_TIER = 3;
const CANDLE_COUNT = 12;
// Per-period noise on top of the pull toward the market value below.
const MAX_SWING = 0.08;
// Fraction of the remaining gap to the market value closed each period — this
// is what makes the price series trend toward that value instead of wandering
// off on an unrelated random walk.
const CONVERGENCE_PULL = 0.3;
// Small per-period trading fee the exchange collects regardless of direction —
// the company never sees any of this once shares start trading freely.
const EXCHANGE_FEE_RATE = 0.0015;

const UP_COLOR = "#10b981";
const DOWN_COLOR = "#ef4444";

interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
}

function randomNoise(): number[] {
  return Array.from({ length: CANDLE_COUNT }, () => Math.random() * MAX_SWING * 2 - MAX_SWING);
}

function randomJitter(): number[] {
  return Array.from({ length: CANDLE_COUNT }, () => Math.random() * 0.035);
}

function randomMarketValue(): number {
  return MARKET_VALUE_MIN + Math.random() * (MARKET_VALUE_MAX - MARKET_VALUE_MIN);
}

function randomAuditOffset(): number {
  return Math.random() * AUDIT_ERROR_MARGIN * 2 - AUDIT_ERROR_MARGIN;
}

// How many emoji to show for an amount past the threshold — one at the
// threshold, one more per additional tier step, capped so it can't run away.
function emojiTier(amount: number): number {
  if (amount <= BIG_MISS_THRESHOLD) return 0;
  return Math.min(MAX_EMOJI_TIER, 1 + Math.floor((amount - BIG_MISS_THRESHOLD) / EMOJI_TIER_STEP));
}

/** Interactive demo for the Audioland/Dubbing IPO story. The slider sets the
 * price the company actually sold for to the broker — a fixed, historical
 * fact. "Reshuffle" draws a fresh market value (what the market eventually
 * decides the company is really worth) and, with it, a fresh audit estimate —
 * the price series always trends toward that value regardless of where the
 * company's shares were sold. Sell for a pittance and the market re-rating
 * the company hands the broker a windfall at the company's expense; sell for
 * more than the market ever ends up thinking it's worth, and the broker eats
 * the loss instead. */
export function IpoSimulator() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [salePrice, setSalePrice] = useState(DEFAULT_SALE_PRICE);
  const [marketValue, setMarketValue] = useState<number | null>(null);
  const [auditEstimate, setAuditEstimate] = useState<number | null>(null);
  const [noise, setNoise] = useState<number[] | null>(null);
  const [highJitter, setHighJitter] = useState<number[] | null>(null);
  const [lowJitter, setLowJitter] = useState<number[] | null>(null);

  const reshuffle = () => {
    const nextMarketValue = randomMarketValue();
    setMarketValue(nextMarketValue);
    setAuditEstimate(nextMarketValue * (1 + randomAuditOffset()));
    setNoise(randomNoise());
    setHighJitter(randomJitter());
    setLowJitter(randomJitter());
  };

  useEffect(() => {
    reshuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const candles: Candle[] = useMemo(() => {
    if (marketValue === null || !noise || !highJitter || !lowJitter) return [];
    let price = salePrice;
    return noise.map((pct, i) => {
      const open = price;
      const trend = (marketValue - open) * CONVERGENCE_PULL;
      const close = Math.max(open + trend + open * pct, marketValue * 0.05, salePrice * 0.05);
      const high = Math.max(open, close) * (1 + highJitter[i]);
      const low = Math.min(open, close) * (1 - lowJitter[i]);
      price = close;
      return { open, close, high, low };
    });
  }, [salePrice, marketValue, noise, highJitter, lowJitter]);

  const currency = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  // The chart's actual last print is noisy — the number everything is judged
  // against is the stable market value itself, which only reshuffle redraws.
  const settledValue = marketValue ?? salePrice;
  const auditValue = auditEstimate ?? salePrice;
  // The company's outcome is simply what it got paid minus what the market
  // eventually says it was worth — a straight difference, not clamped, so a
  // company that undersold by a little just misses out on a little. Whatever
  // the company misses out on is exactly what the broker picks up, and vice
  // versa: this is a zero-sum split of the same gap.
  const companyProfit = salePrice - settledValue;
  const brokerProfit = settledValue - salePrice;
  const isCompanyFailure = companyProfit < 0;
  const companyMissTier = isCompanyFailure ? emojiTier(-companyProfit) : 0;
  const brokerLossTier = brokerProfit < 0 ? emojiTier(-brokerProfit) : 0;
  const brokerProfitTier = brokerProfit > 0 ? emojiTier(brokerProfit) : 0;
  const exchangeProfit = candles.reduce((sum, c) => sum + ((c.open + c.close) / 2) * EXCHANGE_FEE_RATE, 0);

  const brokerCaptionKey =
    brokerProfit < 0 ? "brokerCaptionLoss" : settledValue > auditValue ? "brokerCaptionUp" : "brokerCaptionDown";

  const chartWidth = 600;
  const chartHeight = 200;
  const candleSlot = chartWidth / CANDLE_COUNT;
  const bodyWidth = candleSlot * 0.5;

  const allValues = candles.length > 0
    ? candles.flatMap((c) => [c.high, c.low]).concat([salePrice, auditValue])
    : [salePrice, auditValue];
  const yMax = Math.max(...allValues) * 1.05;
  const yMin = Math.min(...allValues) * 0.95;
  const yRange = yMax - yMin || 1;
  const toY = (v: number) => chartHeight - ((v - yMin) / yRange) * chartHeight;

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("ipoSim.title")}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t("ipoSim.description")}</p>

      <ol className="mb-6 space-y-1.5 text-sm text-muted-foreground list-decimal list-inside marker:text-primary marker:font-semibold">
        <li>{t("ipoSim.step1")}</li>
        <li>{t("ipoSim.step2")}</li>
        <li>{t("ipoSim.step3")}</li>
        <li>{t("ipoSim.step4")}</li>
        <li>{t("ipoSim.step5")}</li>
      </ol>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{t("ipoSim.saleLabel")}</span>
          <span className="font-semibold text-foreground">{currency(salePrice)}</span>
        </div>
        <Slider
          min={MIN_SALE_PRICE}
          max={MAX_SALE_PRICE}
          step={SALE_PRICE_STEP}
          value={salePrice}
          onValueChange={(value) => setSalePrice(value)}
          aria-label={t("ipoSim.saleLabel")}
        />
      </div>

      <p className="mb-1 text-sm text-muted-foreground">
        {t.rich("ipoSim.auditEstimateTemplate", {
          value: currency(auditValue),
          b: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
        })}
      </p>
      <p className="mb-4 text-sm text-muted-foreground">
        {t.rich("ipoSim.marketValueTemplate", {
          value: currency(settledValue),
          b: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
        })}
      </p>

      <div className="mb-4 rounded-lg border bg-muted/20 p-3">
        {candles.length > 0 ? (
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-[180px] w-full"
            preserveAspectRatio="none"
          >
            <line
              x1={0} y1={toY(auditValue)} x2={chartWidth} y2={toY(auditValue)}
              stroke="currentColor" className="text-muted-foreground/40" strokeDasharray="4 4" strokeWidth={1.5}
            />
            <line
              x1={0} y1={toY(salePrice)} x2={chartWidth} y2={toY(salePrice)}
              stroke="currentColor" className="text-primary/50" strokeDasharray="4 4" strokeWidth={1.5}
            />
            {candles.map((c, i) => {
              const x = i * candleSlot + candleSlot / 2;
              const up = c.close >= c.open;
              const color = up ? UP_COLOR : DOWN_COLOR;
              const bodyTop = Math.min(toY(c.open), toY(c.close));
              const bodyHeight = Math.max(Math.abs(toY(c.open) - toY(c.close)), 2);
              return (
                <g key={i}>
                  <line x1={x} y1={toY(c.high)} x2={x} y2={toY(c.low)} stroke={color} strokeWidth={1.5} />
                  <rect x={x - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={bodyHeight} rx={1} fill={color} />
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="h-[180px]" />
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: UP_COLOR }} />
            {t("ipoSim.legendUp")}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: DOWN_COLOR }} />
            {t("ipoSim.legendDown")}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-0.5 w-3 bg-muted-foreground/40" />
            {t("ipoSim.referenceAudit")}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-0.5 w-3 bg-primary/50" />
            {t("ipoSim.referenceOffer")}
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          className={cn(
            "rounded-lg border px-4 py-3",
            isCompanyFailure && "border-red-500/30 bg-red-500/5"
          )}
        >
          <div
            className={cn("text-lg font-bold", isCompanyFailure && "text-red-600 dark:text-red-400")}
          >
            {companyMissTier > 0 && `${"💀".repeat(companyMissTier)} `}
            {currency(companyProfit)}
          </div>
          <div className="mb-1 text-xs font-medium">
            {t("ipoSim.companyLabel")}
            <span className="ml-1 font-normal text-muted-foreground">{t("ipoSim.vsMarketValue")}</span>
          </div>
          <div className="mb-1.5 text-[11px] tabular-nums text-muted-foreground/80">
            {currency(salePrice)} − {currency(settledValue)} = {currency(companyProfit)}
          </div>
          <div className="text-[11px] leading-snug text-muted-foreground">
            {isCompanyFailure ? t("ipoSim.companyCaptionLeftOnTable") : t("ipoSim.companyCaption")}
          </div>
        </div>
        <div
          className={cn(
            "rounded-lg border px-4 py-3",
            brokerProfit >= 0 ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"
          )}
        >
          <div
            className={cn(
              "text-lg font-bold",
              brokerProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {brokerLossTier > 0 && `${"💀".repeat(brokerLossTier)} `}
            {brokerProfitTier > 0 && `${"💰".repeat(brokerProfitTier)} `}
            {brokerProfit >= 0 ? "+" : ""}
            {currency(brokerProfit)}
          </div>
          <div className="mb-1 text-xs font-medium">{t("ipoSim.brokerLabel")}</div>
          <div className="mb-1.5 text-[11px] tabular-nums text-muted-foreground/80">
            {currency(settledValue)} − {currency(salePrice)} = {brokerProfit >= 0 ? "+" : ""}
            {currency(brokerProfit)}
          </div>
          <div className="text-[11px] leading-snug text-muted-foreground">
            {t(`ipoSim.${brokerCaptionKey}` as "ipoSim.brokerCaptionUp")}
          </div>
        </div>
        <div className="rounded-lg border px-4 py-3">
          <div className="text-lg font-bold">{currency(exchangeProfit)}</div>
          <div className="mb-1 text-xs font-medium">{t("ipoSim.exchangeLabel")}</div>
          <div className="text-[11px] leading-snug text-muted-foreground">{t("ipoSim.exchangeCaption")}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={reshuffle}
        className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t("ipoSim.restart")}
      </button>
    </div>
  );
}
