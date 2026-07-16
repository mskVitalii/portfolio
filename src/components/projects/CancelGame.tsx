"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Bot, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const TRACK_HOURS = 24;
const HOUR_DURATION_MS = 600;
const TRACK_DURATION_MS = TRACK_HOURS * HOUR_DURATION_MS;
const SPAWN_INTERVAL_MS = 1400;
// Rolled once per hour-segment a box travels through, so cancellation can
// land anywhere along the journey — including right before the wall, where
// no human has a real chance to react in time.
const CANCEL_CHANCE_PER_HOUR = 0.04;
const HOLD_DURATION_MS = 1000;
const AI_REACTION_MS = 200;
const REMOVE_DELAY_MS = 400;
const SHIPPING_COST = 8;
const GOODS_COST = 35;
const LOSS_PER_MISS = SHIPPING_COST + GOODS_COST;
const BOX_SIZE = 32;
const LANE_GAP = 16;
const TRACK_HEIGHT = 104;

type BoxStatus = "normal" | "cancelled" | "caught-manual" | "caught-ai" | "lost" | "shipped";

interface GameBox {
  id: number;
  lane: 0 | 1;
  progress: number;
  status: BoxStatus;
  lastHourChecked: number;
  holdStart: number | null;
  heldBy: "player" | "ai" | null;
  aiReactAt: number | null;
  removeAt: number | null;
}

interface Stats {
  manualCatches: number;
  aiCatches: number;
  lostCount: number;
  totalLoss: number;
  aiSaved: number;
}

const ZERO_STATS: Stats = { manualCatches: 0, aiCatches: 0, lostCount: 0, totalLoss: 0, aiSaved: 0 };

const HOURS = Array.from({ length: TRACK_HOURS }, (_, h) => h);

/** Interactive demo for the dunlimited "AI Support for Shopify Stores"
 * project — physically re-enacts the everleakproof edge case: a lingerie
 * order can only be cancelled before it ships, and once it's flagged, only
 * a fast reaction saves the shipping + goods cost. Two lanes of boxes cross
 * a 24-hour pre-shipping window; press-and-hold a flagged one for a second
 * to catch it, or deploy the AI to catch every one automatically. */
export function CancelGame() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  const [aiActive, setAiActive] = useState(false);
  const [stats, setStats] = useState<Stats>(ZERO_STATS);
  const [, forceRender] = useState(0);

  const boxesRef = useRef<GameBox[]>([]);
  const idRef = useRef(0);
  const nextLaneRef = useRef<0 | 1>(0);
  const lastTimeRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const nowRef = useRef(0);
  const aiActiveRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = performance.now();
    lastTimeRef.current = start;
    lastSpawnRef.current = start;
    nowRef.current = start;

    function tick(now: number) {
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;
      nowRef.current = now;

      if (now - lastSpawnRef.current >= SPAWN_INTERVAL_MS) {
        lastSpawnRef.current = now;
        const lane = nextLaneRef.current;
        nextLaneRef.current = lane === 0 ? 1 : 0;
        boxesRef.current.push({
          id: idRef.current++,
          lane,
          progress: 0,
          status: "normal",
          lastHourChecked: 0,
          holdStart: null,
          heldBy: null,
          aiReactAt: null,
          removeAt: null,
        });
      }

      let newManual = 0;
      let newAI = 0;
      let newLost = 0;

      boxesRef.current = boxesRef.current.filter((box) => {
        if (box.removeAt !== null) return now < box.removeAt;

        box.progress += dt / TRACK_DURATION_MS;

        if (box.status === "normal") {
          const hourIndex = Math.min(TRACK_HOURS - 1, Math.floor(box.progress * TRACK_HOURS));
          if (hourIndex > box.lastHourChecked) {
            for (let h = box.lastHourChecked + 1; h <= hourIndex; h++) {
              if (Math.random() < CANCEL_CHANCE_PER_HOUR) {
                box.status = "cancelled";
                if (aiActiveRef.current) box.aiReactAt = now + AI_REACTION_MS;
                break;
              }
            }
            box.lastHourChecked = hourIndex;
          }
        }

        if (box.status === "cancelled") {
          // The AI "grabs" the box the same way a player does — it just
          // reacts faster. It still has to hold for the full second, so a
          // box cancelled too close to the wall slips past the AI too.
          if (box.heldBy === null && box.aiReactAt !== null && now >= box.aiReactAt) {
            box.holdStart = now;
            box.heldBy = "ai";
          }

          if (box.holdStart !== null && now - box.holdStart >= HOLD_DURATION_MS) {
            box.status = box.heldBy === "ai" ? "caught-ai" : "caught-manual";
            box.removeAt = now + REMOVE_DELAY_MS;
            if (box.heldBy === "ai") newAI++;
            else newManual++;
          }
        }

        if ((box.status === "normal" || box.status === "cancelled") && box.progress >= 1) {
          if (box.status === "cancelled") {
            box.status = "lost";
            newLost++;
          } else {
            box.status = "shipped";
          }
          box.removeAt = now + REMOVE_DELAY_MS;
        }

        return true;
      });

      if (newManual || newAI || newLost) {
        setStats((prev) => ({
          manualCatches: prev.manualCatches + newManual,
          aiCatches: prev.aiCatches + newAI,
          lostCount: prev.lostCount + newLost,
          totalLoss: prev.totalLoss + newLost * LOSS_PER_MISS,
          aiSaved: prev.aiSaved + newAI * LOSS_PER_MISS,
        }));
      }

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleHoldStart = (box: GameBox) => {
    // Don't steal a box the AI already latched onto.
    if (box.heldBy !== null) return;
    box.holdStart = performance.now();
    box.heldBy = "player";
    forceRender((n) => n + 1);
  };

  const handleHoldEnd = (box: GameBox) => {
    if (box.heldBy !== "player") return;
    box.holdStart = null;
    box.heldBy = null;
    forceRender((n) => n + 1);
  };

  const handleDeployAI = () => {
    aiActiveRef.current = true;
    setAiActive(true);
    const now = performance.now();
    for (const box of boxesRef.current) {
      if (box.status === "cancelled" && box.heldBy === null && box.aiReactAt === null) {
        box.aiReactAt = now + AI_REACTION_MS;
      }
    }
  };

  const handleReset = () => {
    boxesRef.current = [];
    aiActiveRef.current = false;
    setAiActive(false);
    setStats(ZERO_STATS);
    lastSpawnRef.current = performance.now();
  };

  const currency = (n: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const now = nowRef.current;

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("cancelGame.title")}</h3>
      <p className="text-sm text-muted-foreground mb-1">{t("cancelGame.description")}</p>
      <p className="text-xs text-muted-foreground mb-4">{t("cancelGame.legend")}</p>

      <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
        <div>
          <div className="text-lg font-bold">{stats.manualCatches}</div>
          <div className="text-[11px] text-muted-foreground">{t("cancelGame.caughtLabel")}</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{currency(stats.totalLoss)}</div>
          <div className="text-[11px] text-muted-foreground">
            {t("cancelGame.lostTemplate", { count: stats.lostCount })}
          </div>
        </div>
        <div>
          <div className="text-lg font-bold">{aiActive ? stats.aiCatches : "—"}</div>
          <div className="text-[11px] text-muted-foreground">{t("cancelGame.aiCatchesLabel")}</div>
        </div>
        <div>
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            {aiActive ? currency(stats.aiSaved) : "—"}
          </div>
          <div className="text-[11px] text-muted-foreground">{t("cancelGame.aiSavedLabel")}</div>
        </div>
      </div>

      <div className="mb-1 flex px-1 text-[10px] leading-none select-none">
        {HOURS.map((h) => (
          <div key={h} className="flex-1 text-center">
            {h >= 6 && h < 20 ? "☀️" : "🌙"}
          </div>
        ))}
      </div>

      <div
        className="relative mb-4 select-none overflow-hidden rounded-lg border bg-muted/20"
        style={{ height: TRACK_HEIGHT }}
      >
        <div className="absolute inset-y-0 right-0 w-1.5 bg-red-500/40" aria-hidden />
        {boxesRef.current.map((box) => {
          const left = `calc(${Math.min(box.progress, 1) * 100}% - ${BOX_SIZE}px)`;
          const top = 10 + box.lane * (BOX_SIZE + LANE_GAP);
          const interactive = box.status === "cancelled";
          const holdPct = box.holdStart !== null ? Math.min(1, (now - box.holdStart) / HOLD_DURATION_MS) : 0;
          const opacity =
            box.removeAt !== null ? Math.max(0, (box.removeAt - now) / REMOVE_DELAY_MS) : 1;

          return (
            <div
              key={box.id}
              role={interactive ? "button" : undefined}
              aria-label={interactive ? t("cancelGame.holdAria") : undefined}
              tabIndex={interactive ? 0 : undefined}
              className={cn(
                "absolute flex items-center justify-center rounded-md border text-base",
                box.status === "normal" && "border-border bg-background",
                box.status === "cancelled" && "cursor-pointer border-red-500 bg-red-500/10",
                box.status === "caught-manual" && "border-emerald-500 bg-emerald-500/20",
                box.status === "caught-ai" && "border-sky-500 bg-sky-500/20",
                box.status === "lost" && "border-red-600 bg-red-600/30",
                box.status === "shipped" && "border-border bg-background"
              )}
              style={{ left, top, width: BOX_SIZE, height: BOX_SIZE, opacity }}
              onPointerDown={interactive ? () => handleHoldStart(box) : undefined}
              onPointerUp={interactive ? () => handleHoldEnd(box) : undefined}
              onPointerLeave={interactive ? () => handleHoldEnd(box) : undefined}
              onPointerCancel={interactive ? () => handleHoldEnd(box) : undefined}
            >
              <span className={cn(box.holdStart !== null && "animate-[shake_0.15s_ease-in-out_infinite]")}>
                {box.status === "lost" ? "💥" : box.status === "caught-manual" || box.status === "caught-ai" ? "✅" : "📦"}
              </span>
              {box.status === "cancelled" && (
                <span className="pointer-events-none absolute -top-1.5 -right-1.5 text-[10px]">⚠️</span>
              )}
              {box.heldBy === "ai" && (
                <span className="pointer-events-none absolute -top-1.5 -left-1.5 text-[10px]">🤖</span>
              )}
              {box.holdStart !== null && (
                <div className="absolute -bottom-1 left-0 h-0.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn("h-full", box.heldBy === "ai" ? "bg-sky-500" : "bg-emerald-500")}
                    style={{ width: `${holdPct * 100}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {!aiActive ? (
          <button
            type="button"
            onClick={handleDeployAI}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            <Bot className="h-3.5 w-3.5" />
            {t("cancelGame.deployLabel")}
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400">
            <Bot className="h-3.5 w-3.5" />
            {t("cancelGame.aiActiveLabel")}
          </span>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t("cancelGame.resetLabel")}
        </button>
      </div>

      <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
        {t("cancelGame.strategicNote")}
      </p>
    </div>
  );
}
