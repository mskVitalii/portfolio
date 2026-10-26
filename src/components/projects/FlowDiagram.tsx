"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FlowNode {
  id: string;
  icon: LucideIcon;
  /** Third-party system the project talks to but didn't build — drawn dashed. */
  external?: boolean;
}

export interface FlowScenario {
  id: string;
  /** Node ids in the order a request/event travels through them. */
  path: string[];
}

interface NodeText {
  label: string;
  detail: string;
}

const STEP_MS = 2200;

/** Step-through diagram shared by the project pages: one or more scenarios,
 * each a path through the system's nodes. Visitors click a node, step with
 * prev/next, or press play to watch the request travel. All copy lives under
 * `Projects.flows.<messageKey>` so each project only declares its node icons
 * and paths here. */
export function FlowDiagram({
  messageKey,
  nodes,
  scenarios,
}: {
  messageKey: string;
  nodes: FlowNode[];
  scenarios: FlowScenario[];
}) {
  const t = useTranslations(`Projects.flows.${messageKey}`);
  const tUi = useTranslations("Projects.flowUi");
  const uid = useId();

  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scenario = scenarios[scenarioIdx];
  const path = scenario.path.map((id) => nodes.find((n) => n.id === id)!);
  const captions = t.raw(`scenarios.${scenario.id}.steps`) as string[];
  const last = path.length - 1;
  const atEnd = step === last;

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, step, last]);

  function selectScenario(i: number) {
    setScenarioIdx(i);
    setStep(0);
    setPlaying(false);
  }

  function jumpTo(i: number) {
    setStep(i);
    setPlaying(false);
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (atEnd) setStep(0);
    setPlaying(true);
  }

  const activeNode = path[step];
  const activeText = t.raw(`nodes.${activeNode.id}`) as NodeText;

  function circle(node: FlowNode, i: number, layoutId: string) {
    const Icon = node.icon;
    const done = i < step;
    const active = i === step;
    return (
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
        {active && (
          <motion.span
            layoutId={layoutId}
            className="absolute -inset-1 rounded-full border-2 border-primary/40"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
            node.external && "border-dashed",
            active
              ? "border-primary bg-primary text-primary-foreground"
              : done
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </span>
    );
  }

  function label(node: FlowNode, i: number) {
    return (
      <span
        className={cn(
          "text-xs font-medium leading-tight transition-colors",
          i === step ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {(t.raw(`nodes.${node.id}`) as NodeText).label}
      </span>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      {scenarios.length > 1 && (
        <div role="tablist" aria-label={tUi("scenarioLabel")} className="mb-5 flex flex-wrap gap-2">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === scenarioIdx}
              onClick={() => selectScenario(i)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                i === scenarioIdx
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`scenarios.${s.id}.label`)}
            </button>
          ))}
        </div>
      )}

      {/* Horizontal track (sm and up) */}
      <ol className="mb-5 hidden sm:flex" aria-label={tUi("diagramAria")}>
        {path.map((node, i) => (
          <li key={`${scenario.id}-${node.id}-${i}`} className="relative flex flex-1 flex-col items-center px-1">
            {i > 0 && (
              <span aria-hidden className="absolute top-5 right-1/2 h-0.5 w-full -translate-y-1/2 bg-border">
                <span
                  className="block h-full bg-primary transition-[width] duration-500"
                  style={{ width: i <= step ? "100%" : "0%" }}
                />
              </span>
            )}
            <button
              type="button"
              onClick={() => jumpTo(i)}
              aria-current={i === step ? "step" : undefined}
              className="relative z-10 flex flex-col items-center gap-2 text-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {circle(node, i, `${uid}-h`)}
              {label(node, i)}
            </button>
          </li>
        ))}
      </ol>

      {/* Vertical track (mobile) */}
      <ol className="mb-5 sm:hidden" aria-label={tUi("diagramAria")}>
        {path.map((node, i) => (
          <li key={`${scenario.id}-${node.id}-${i}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-current={i === step ? "step" : undefined}
                aria-label={(t.raw(`nodes.${node.id}`) as NodeText).label}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {circle(node, i, `${uid}-v`)}
              </button>
              {i < last && (
                <span aria-hidden className="my-1 w-0.5 flex-1 min-h-3 bg-border">
                  <span
                    className="block w-full bg-primary transition-[height] duration-500"
                    style={{ height: i < step ? "100%" : "0%" }}
                  />
                </span>
              )}
            </div>
            <button type="button" onClick={() => jumpTo(i)} className="pt-3 pb-3 text-left">
              {label(node, i)}
            </button>
          </li>
        ))}
      </ol>

      {/* Caption for the current step */}
      <div className="rounded-lg border bg-muted/30 p-4 min-h-[7.5rem]" aria-live="polite">
        <motion.div
          key={`${scenario.id}-${step}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-mono text-[11px] text-muted-foreground">
              {tUi("stepOf", { current: step + 1, total: path.length })}
            </span>
            <span className="text-sm font-semibold">{activeText.label}</span>
            {activeNode.external && (
              <span className="rounded-full border border-dashed px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                {tUi("external")}
              </span>
            )}
          </div>
          <p className="mb-2 font-mono text-[11px] text-muted-foreground">{activeText.detail}</p>
          <p className="text-sm leading-relaxed">{captions[step]}</p>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => jumpTo(Math.max(0, step - 1))} disabled={step === 0} aria-label={tUi("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button size="sm" onClick={togglePlay} className="min-w-24">
          {playing ? (
            <Pause className="h-4 w-4 mr-1.5" />
          ) : atEnd ? (
            <RotateCcw className="h-4 w-4 mr-1.5" />
          ) : (
            <Play className="h-4 w-4 mr-1.5" />
          )}
          {playing ? tUi("pause") : atEnd ? tUi("replay") : tUi("play")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => jumpTo(Math.min(last, step + 1))} disabled={atEnd} aria-label={tUi("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {t.has("note") && (
        <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
      )}
    </div>
  );
}
