"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Play, Pause, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

type Severity = "warn" | "crit";
type ZoneKey = "seamTear" | "surfaceWear" | "foreignObject";

interface FaultZone {
  id: string;
  start: number;
  end: number;
  zoneKey: ZoneKey;
  severity: Severity;
  peak: number;
}

// Three fixed faults seeded along the belt — matches the real project's
// story of catching a seam tear, gradual wear, and a foreign object.
const ZONES: FaultZone[] = [
  { id: "Z1", start: 0.17, end: 0.245, zoneKey: "seamTear", severity: "crit", peak: 9.2 },
  { id: "Z2", start: 0.46, end: 0.535, zoneKey: "surfaceWear", severity: "warn", peak: 5.4 },
  { id: "Z3", start: 0.75, end: 0.825, zoneKey: "foreignObject", severity: "crit", peak: 9.0 },
];

const TRAVEL_MIN = 0.06;
const TRAVEL_MAX = 0.94;
const HALF_FRAC = 0.028;
const BASE_SPEED_FRAC = 0.16; // fraction of travel per second at 1x
const TRACK_LENGTH_M = 6.4;
const FLUX_DECAY_TAU = 0.55;
const FLUX_THRESHOLD = 6;

// Chamfered-pod carriage outline (matches the hand-sketched shape: flat
// top/bottom, cut corners, straight sides) drawn once via clip-path.
const POD_W = 62;
const POD_H = 38;
const CHAMFER = 10;
const POD_CLIP = `polygon(${CHAMFER}px 0, ${POD_W - CHAMFER}px 0, ${POD_W}px ${CHAMFER}px, ${POD_W}px ${POD_H - CHAMFER}px, ${POD_W - CHAMFER}px ${POD_H}px, ${CHAMFER}px ${POD_H}px, 0 ${POD_H - CHAMFER}px, 0 ${CHAMFER}px)`;

const SEVERITY_STYLES: Record<Severity, string> = {
  warn: "border-amber-500 text-amber-600 dark:text-amber-400",
  crit: "border-red-500 text-red-600 dark:text-red-400",
};

/** Interactive demo for the Infineon Thin[gk]athon project: a rail-guided
 * inspection pod rides back and forth above a conveyor belt, flagging three
 * seeded faults the same way the real PSoC Edge device flags anomalies in
 * sound and vibration on-device, without shipping raw sensor data anywhere. */
export function RailScanDemo() {
  const t = useTranslations("Projects");
  const locale = useLocale();

  const [running, setRunning] = useState(true);
  const [, forceRender] = useState(0);

  const runningRef = useRef(running);
  const posRef = useRef(TRAVEL_MIN);
  const dirRef = useRef<1 | -1>(1);
  const beltOffsetRef = useRef(0);
  const lastZoneIdRef = useRef<string | null>(null);
  const activeZoneRef = useRef<FaultZone | null>(null);
  const defectsRef = useRef(0);
  const distanceRef = useRef(0);
  const fluxSpikeRef = useRef(0);
  const fluxNoiseRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    lastTimeRef.current = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (runningRef.current) {
        const prevPos = posRef.current;
        posRef.current += dirRef.current * BASE_SPEED_FRAC * dt;
        if (posRef.current >= TRAVEL_MAX) {
          posRef.current = TRAVEL_MAX;
          dirRef.current = -1;
        }
        if (posRef.current <= TRAVEL_MIN) {
          posRef.current = TRAVEL_MIN;
          dirRef.current = 1;
        }
        distanceRef.current += Math.abs(posRef.current - prevPos) * TRACK_LENGTH_M;
        beltOffsetRef.current = (beltOffsetRef.current + 30 * dt) % 40;

        let current: FaultZone | null = null;
        for (const z of ZONES) {
          if (posRef.current + HALF_FRAC > z.start && posRef.current - HALF_FRAC < z.end) {
            current = z;
            break;
          }
        }
        if (current && lastZoneIdRef.current !== current.id) {
          defectsRef.current += 1;
          fluxSpikeRef.current = current.peak;
        }
        lastZoneIdRef.current = current ? current.id : null;
        activeZoneRef.current = current;
      }

      fluxSpikeRef.current *= Math.exp(-dt / FLUX_DECAY_TAU);
      fluxNoiseRef.current = (Math.random() - 0.5) * 0.4;

      rafRef.current = requestAnimationFrame(tick);
      forceRender((n) => n + 1);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const number = (n: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n);

  const activeZone = activeZoneRef.current;
  const flux = Math.max(0, Math.min(10, fluxSpikeRef.current + fluxNoiseRef.current));
  const fluxColor = flux >= FLUX_THRESHOLD ? "bg-red-500" : flux >= 3 ? "bg-amber-500" : "bg-teal-500";
  const pos = posRef.current;

  return (
    <div className="rounded-xl border bg-card p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("railScan.title")}</h3>
      <p className="text-sm text-muted-foreground mb-6">{t("railScan.description")}</p>

      <div className="mb-4 flex items-center gap-1.5 rounded-md border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5 shrink-0" />
        {t("railScan.hint")}
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">{defectsRef.current}</div>
          <div className="text-[11px] text-muted-foreground">{t("railScan.defectsLabel")}</div>
        </div>
        <div>
          <div className="text-lg font-bold tabular-nums">{number(distanceRef.current)} m</div>
          <div className="text-[11px] text-muted-foreground">{t("railScan.distanceLabel")}</div>
        </div>
        <div>
          <div
            className={cn(
              "text-lg font-bold truncate",
              activeZone ? SEVERITY_STYLES[activeZone.severity] : "text-teal-600 dark:text-teal-400"
            )}
          >
            {activeZone ? t(`railScan.zone.${activeZone.zoneKey}`) : t("railScan.statusScanning")}
          </div>
          <div className="text-[11px] text-muted-foreground">{t("railScan.statusLabel")}</div>
        </div>
      </div>

      {/* Sensor meter */}
      <div className="mb-4">
        <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full transition-[width]", fluxColor)}
            style={{ width: `${(flux / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Track */}
      <div
        className="relative mb-3 select-none overflow-hidden rounded-lg border bg-muted/20"
        style={{ height: 140 }}
        role="img"
        aria-label={t("railScan.trackAria")}
      >
        {/* rails */}
        <div className="absolute inset-x-0 bg-border" style={{ top: "26%", height: 2 }} />
        <div className="absolute inset-x-0 bg-border" style={{ top: "74%", height: 2 }} />

        {/* belt */}
        <div
          className="absolute inset-x-0 opacity-70"
          style={{
            top: "34%",
            bottom: "34%",
            backgroundColor: "#2b2118",
            backgroundImage: "repeating-linear-gradient(120deg, #3d2f22 0 10px, transparent 10px 20px)",
            backgroundPosition: `${beltOffsetRef.current}px 0`,
          }}
        />

        {/* fault zones */}
        {ZONES.map((z) => {
          const isActive = activeZone?.id === z.id;
          return (
            <div
              key={z.id}
              className={cn(
                "absolute border-2 border-dashed transition-[opacity,box-shadow] duration-150",
                z.severity === "crit" ? "border-red-500" : "border-amber-500",
                isActive ? "opacity-100" : "opacity-45"
              )}
              style={{
                left: `${z.start * 100}%`,
                width: `${(z.end - z.start) * 100}%`,
                top: "34%",
                bottom: "34%",
                backgroundColor: z.severity === "crit" ? "rgba(239,68,68,0.18)" : "rgba(245,158,11,0.18)",
                boxShadow: isActive
                  ? `0 0 12px 2px ${z.severity === "crit" ? "rgba(239,68,68,0.45)" : "rgba(245,158,11,0.45)"}`
                  : "none",
              }}
            >
              <span
                className={cn(
                  "absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-wide",
                  isActive
                    ? z.severity === "crit"
                      ? "text-red-600 dark:text-red-400"
                      : "text-amber-600 dark:text-amber-400"
                    : "text-muted-foreground"
                )}
              >
                {z.id} · {t(`railScan.zone.${z.zoneKey}`)}
              </span>
            </div>
          );
        })}

        {/* carriage — chamfered pod with a scan band across the middle,
            matching the sketch: flat top/bottom, cut corners, two
            rail-guide ticks touching each rail. */}
        <div
          className="absolute"
          style={{
            left: `${pos * 100}%`,
            top: "50%",
            width: POD_W,
            height: POD_H,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* rail-guide ticks */}
          <div className="absolute left-1/2 h-1.5 w-1 -translate-x-1/2 bg-border" style={{ top: -6 }} />
          <div className="absolute left-1/2 h-1.5 w-1 -translate-x-1/2 bg-border" style={{ bottom: -6 }} />

          <div
            className={cn(
              "absolute inset-0 border-2 bg-card transition-colors",
              activeZone ? "border-red-500" : "border-teal-500"
            )}
            style={{
              clipPath: POD_CLIP,
              boxShadow: activeZone
                ? "0 0 14px 2px rgba(239,68,68,0.55)"
                : "0 0 8px 1px rgba(20,184,166,0.35)",
            }}
          >
            {/* side rail-channel hairlines */}
            <div className="absolute top-1 bottom-1 w-px bg-border/70" style={{ left: 8 }} />
            <div className="absolute top-1 bottom-1 w-px bg-border/70" style={{ right: 8 }} />

            {/* scan band */}
            <div
              className={cn("absolute inset-x-0 transition-colors", activeZone ? "bg-red-500" : "bg-teal-500")}
              style={{ top: "38%", height: "24%" }}
            />
          </div>
        </div>
      </div>

      {/* legend */}
      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-500" />
          {t("railScan.legendNominal")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          {t("railScan.legendWear")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          {t("railScan.legendFault")}
        </span>
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? t("railScan.pauseLabel") : t("railScan.playLabel")}
        </button>
      </div>

      <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
        {t("railScan.strategicNote")}
      </p>
    </div>
  );
}
