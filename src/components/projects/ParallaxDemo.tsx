"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Layers, Smartphone, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Layer {
  key: "sky" | "mountains" | "hills" | "foreground";
  depth: number;
  art: React.ReactNode;
}

// Fixed artwork colors: the scene is a picture, not UI chrome, so it looks
// the same in light and dark theme.
const LAYERS: Layer[] = [
  {
    key: "sky",
    depth: 0.1,
    art: (
      <>
        <defs>
          <linearGradient id="parallax-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#parallax-sky)" />
        <circle cx="290" cy="120" r="30" fill="#fde68a" />
      </>
    ),
  },
  {
    key: "mountains",
    depth: 0.35,
    art: <path d="M0 170 L70 95 L130 150 L200 70 L280 155 L340 110 L400 160 L400 240 L0 240 Z" fill="#4c1d95" opacity="0.9" />,
  },
  {
    key: "hills",
    depth: 0.65,
    art: <path d="M0 190 Q80 150 160 185 T320 180 T400 175 L400 240 L0 240 Z" fill="#7c2d12" />,
  },
  {
    key: "foreground",
    depth: 1,
    art: (
      <>
        <path d="M0 215 Q100 195 200 212 T400 208 L400 240 L0 240 Z" fill="#14532d" />
        <rect x="78" y="150" width="8" height="60" fill="#3f2a14" />
        <circle cx="82" cy="140" r="26" fill="#166534" />
        <circle cx="66" cy="156" r="16" fill="#15803d" />
        <circle cx="99" cy="154" r="18" fill="#15803d" />
      </>
    ),
  },
];

const MAX_SHIFT = 26;

function clamp(v: number) {
  return Math.max(-1, Math.min(1, v));
}

/** Explains the Effects editor's 2.5D trick: a flat illustration is split
 * into layers, each given a depth, and tilting the device (or moving the
 * pointer) shifts every layer in proportion to its depth. */
export function ParallaxDemo() {
  const t = useTranslations("Projects.parallax");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [exploded, setExploded] = useState(false);
  const [gyro, setGyro] = useState(false);
  const [gyroAvailable, setGyroAvailable] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGyroAvailable(typeof window !== "undefined" && "DeviceOrientationEvent" in window && "ontouchstart" in window);
  }, []);

  useEffect(() => {
    if (!gyro) return;
    function onOrientation(e: DeviceOrientationEvent) {
      setTilt({ x: clamp((e.gamma ?? 0) / 30), y: clamp(((e.beta ?? 45) - 45) / 30) });
    }
    window.addEventListener("deviceorientation", onOrientation);
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [gyro]);

  async function enableGyro() {
    // iOS gates motion sensors behind an explicit permission prompt.
    const Orientation = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (Orientation.requestPermission) {
      try {
        if ((await Orientation.requestPermission()) !== "granted") return;
      } catch {
        return;
      }
    }
    setGyro(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (gyro || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    setTilt({
      x: clamp(((e.clientX - rect.left) / rect.width) * 2 - 1),
      y: clamp(((e.clientY - rect.top) / rect.height) * 2 - 1),
    });
  }

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" variant={exploded ? "outline" : "default"} onClick={() => setExploded(false)}>
          <Square className="h-4 w-4 mr-1.5" />
          {t("flatView")}
        </Button>
        <Button size="sm" variant={exploded ? "default" : "outline"} onClick={() => setExploded(true)}>
          <Layers className="h-4 w-4 mr-1.5" />
          {t("layersView")}
        </Button>
        {gyroAvailable && !gyro && (
          <Button size="sm" variant="outline" onClick={enableGyro}>
            <Smartphone className="h-4 w-4 mr-1.5" />
            {t("useTilt")}
          </Button>
        )}
      </div>

      <div
        ref={stageRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => !gyro && setTilt({ x: 0, y: 0 })}
        className="relative h-56 touch-pan-y select-none overflow-hidden rounded-lg border bg-muted/30 sm:h-64"
        style={{ perspective: 900 }}
        role="img"
        aria-label={t("stageAria")}
      >
        <div
          className="absolute inset-0 transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: exploded ? "translateX(8%) scale(0.55) rotateX(18deg) rotateY(-38deg)" : "none",
          }}
        >
          {LAYERS.map((layer, i) => {
            const dx = -tilt.x * layer.depth * MAX_SHIFT;
            const dy = -tilt.y * layer.depth * MAX_SHIFT * 0.6;
            return (
              <div
                key={layer.key}
                className={cn(
                  "absolute -inset-[8%] transition-transform duration-150 ease-out",
                  exploded && "rounded-md outline outline-1 outline-white/60"
                )}
                style={{
                  transform: `translate3d(${dx}px, ${dy}px, ${exploded ? i * 70 : 0}px)`,
                }}
              >
                <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
                  {layer.art}
                </svg>
                {exploded && (
                  <span className="absolute left-[10%] top-[10%] rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    {t(`layers.${layer.key}`)} · {t("depth", { depth: layer.depth })}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{gyro ? t("hintTilt") : t("hintPointer")}</p>

      <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </div>
  );
}
