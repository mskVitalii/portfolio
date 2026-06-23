"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface WheelCard {
  id: string;
  label: string;
  rarity: Rarity;
  weight: number;
  Component: React.FC;
}

export const RARITY_COLORS: Record<Rarity, { border: string; badge: string; text: string; glow: string }> = {
  common:    { border: "border-slate-400",  badge: "bg-slate-500 text-white",   text: "text-slate-400",   glow: "" },
  rare:      { border: "border-blue-500",   badge: "bg-blue-600 text-white",    text: "text-blue-400",    glow: "shadow-blue-500/40" },
  epic:      { border: "border-purple-500", badge: "bg-purple-600 text-white",  text: "text-purple-400",  glow: "shadow-purple-500/50" },
  legendary: { border: "border-amber-400",  badge: "bg-amber-500 text-black",   text: "text-amber-400",   glow: "shadow-amber-400/60" },
};

export const CARD_W = 180;
export const CARD_H = 113;

// Weight-based random pick
function pickByWeight(cards: WheelCard[]): WheelCard {
  const total = cards.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  for (const card of cards) {
    r -= card.weight;
    if (r <= 0) return card;
  }
  return cards[cards.length - 1];
}

// Build a long shuffled strip with the winner inserted at a fixed position near the end.
// Returns both the strip and the exact index of the winner card.
function buildStrip(cards: WheelCard[], winner: WheelCard, repeatCount = 4): { strip: WheelCard[]; winnerIndex: number } {
  const pool: WheelCard[] = [];
  for (let i = 0; i < repeatCount; i++) {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    pool.push(...shuffled);
  }
  const winnerIndex = pool.length - 4;
  pool.splice(winnerIndex, 0, winner);
  return { strip: pool, winnerIndex };
}

interface Props {
  cards: WheelCard[];
  onResult: (card: WheelCard) => void;
}

export function CardWheel({ cards, onResult }: Props) {
  const t = useTranslations("CardPage");
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const spinKeyRef = useRef(0);
  const [spinKey, setSpinKey] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [strip, setStrip] = useState<WheelCard[]>(() => cards);
  const [result, setResult] = useState<WheelCard | null>(null);

  // After strip/spinKey update, kick off the CSS transition in the next frame
  const pendingAnimRef = useRef<{ targetX: number; winner: WheelCard } | null>(null);

  useEffect(() => {
    const pending = pendingAnimRef.current;
    if (!pending || !trackRef.current) return;
    pendingAnimRef.current = null;

    const track = trackRef.current;
    // Ensure we start from 0 (no transition)
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";

    // Force a reflow so the browser registers the starting position
    void track.offsetWidth;

    // Now animate to target
    track.style.transition = "transform 4.5s cubic-bezier(0.25, 1, 0.5, 1)";
    track.style.transform = `translateX(${pending.targetX}px)`;

    const timer = setTimeout(() => {
      setSpinning(false);
      setResult(pending.winner);
      onResult(pending.winner);
    }, 4700);

    return () => clearTimeout(timer);
  }, [spinKey, onResult]); // Re-runs when spinKey increments (new strip mounted)

  const spin = useCallback(() => {
    if (spinning) return;

    const winner = pickByWeight(cards);
    const { strip: newStrip, winnerIndex } = buildStrip(cards, winner);

    // Center the winner card under the amber indicator:
    // tx = viewportCenter - (paddingLeft + cardIndex * (CARD_W + gap) + CARD_W/2)
    const containerWidth = viewportRef.current?.clientWidth ?? 640;
    const tx = containerWidth / 2 - 16 - winnerIndex * (CARD_W + 8) - CARD_W / 2;

    // Store pending animation info BEFORE state updates
    pendingAnimRef.current = { targetX: tx, winner };
    spinKeyRef.current += 1;

    setResult(null);
    setSpinning(true);
    setStrip(newStrip);
    setSpinKey(spinKeyRef.current);
  }, [spinning, cards]);

  const isLegendary = result?.rarity === "legendary";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t("wheelTitle")}</h2>
        <p className="text-sm text-muted-foreground mt-1">{t("wheelSubtitle")}</p>
      </div>

      {/* Rarity legend */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(["common", "rare", "epic", "legendary"] as Rarity[]).map((r) => (
          <div key={r} className="flex items-center gap-1.5">
            <span className={cn("w-2.5 h-2.5 rounded-sm inline-block shrink-0 border", RARITY_COLORS[r].border)} />
            <span className={cn("text-xs", RARITY_COLORS[r].text)}>
              {t(`rarity${r.charAt(0).toUpperCase() + r.slice(1)}` as "rarityCommon")}
            </span>
          </div>
        ))}
      </div>

      {/* Wheel viewport */}
      <div ref={viewportRef} className="relative w-full max-w-2xl overflow-hidden rounded-xl border bg-muted">
        {/* Center indicator */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-amber-400 z-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-10 border-l-transparent border-r-transparent border-t-amber-400 z-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-10 border-l-transparent border-r-transparent border-b-amber-400 z-20" />
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-muted to-transparent z-10 pointer-events-none" />

        <div className="py-4 flex items-center" style={{ height: CARD_H + 32 }}>
          {/* key forces remount on each spin → fresh DOM element, transform starts at 0 */}
          <div
            key={spinKey}
            ref={trackRef}
            className="flex gap-2 shrink-0 pl-4"
            style={{ willChange: "transform" }}
          >
            {strip.map((card, i) => {
              const rc = RARITY_COLORS[card.rarity];
              return (
                <div
                  key={i}
                  className={cn(
                    "relative shrink-0 rounded-lg border-2 overflow-hidden",
                    rc.border,
                    rc.glow && `shadow-lg ${rc.glow}`
                  )}
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  <div
                    style={{
                      transform: `scale(${CARD_W / 340})`,
                      transformOrigin: "top left",
                      width: 340,
                      height: 213,
                      pointerEvents: "none",
                    }}
                  >
                    <card.Component />
                  </div>
                  <div className={cn("absolute bottom-0 left-0 right-0 text-center py-0.5 text-[9px] font-bold uppercase tracking-widest", rc.badge)}>
                    {t(`rarity${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}` as "rarityCommon")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className={cn(
          "text-center py-3 px-6 rounded-xl border-2 transition-all",
          isLegendary
            ? "border-amber-400 bg-amber-400/10 text-amber-400"
            : result.rarity === "epic"
            ? "border-purple-500 bg-purple-500/10 text-purple-400"
            : "border-border bg-card text-foreground"
        )}>
          <p className={cn("font-bold text-lg", isLegendary && "animate-pulse")}>
            {isLegendary ? t("wheelResultLegendary") : t("wheelResultCommon")}
          </p>
          <p className="text-sm mt-0.5 opacity-80">
            {t(`skin${result.id.charAt(0).toUpperCase() + result.id.slice(1)}` as "skinClassic")}{" "}
            <span className={cn("font-semibold", RARITY_COLORS[result.rarity].text)}>
              · {t(`rarity${result.rarity.charAt(0).toUpperCase() + result.rarity.slice(1)}` as "rarityCommon")}
            </span>
          </p>
        </div>
      )}

      <button
        onClick={spin}
        disabled={spinning}
        className={cn(
          "px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all",
          spinning
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-400 text-black shadow-lg hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
        )}
      >
        {spinning ? t("wheelSpinning") : t("wheelSpin")}
      </button>
    </div>
  );
}
