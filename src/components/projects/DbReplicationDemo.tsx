"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Database, Play, RotateCcw, ServerCrash, Skull, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Setup = "managed" | "self";
type Scenario = "primaryDown" | "badQuery" | "reads";
type NodeState = "ok" | "down" | "bad" | "promoted" | "hot" | "idle" | "restoring";
type NodeId = "P" | "R1" | "R2" | "R3" | "B";

interface Phase {
  nodes: Partial<Record<NodeId, NodeState>>;
  /** Which node the services talk to; null = nothing answers. */
  appTarget: "P" | "R1" | null;
  /** Whether WAL is visibly streaming to the replicas in this phase. */
  wal: boolean;
}

const R_ALL = (s: NodeState) => ({ R1: s, R2: s, R3: s });

const PHASES: Record<Scenario, Record<Setup, Phase[]>> = {
  primaryDown: {
    managed: [
      { nodes: { P: "down" }, appTarget: null, wal: false },
      { nodes: { P: "down", R1: "promoted" }, appTarget: null, wal: false },
      { nodes: { P: "down", R1: "promoted" }, appTarget: "R1", wal: false },
    ],
    self: [
      { nodes: { P: "down" }, appTarget: null, wal: false },
      { nodes: { P: "down" }, appTarget: null, wal: false },
      { nodes: { P: "restoring", B: "restoring" }, appTarget: null, wal: false },
    ],
  },
  badQuery: {
    managed: [
      { nodes: { P: "bad" }, appTarget: "P", wal: true },
      { nodes: { P: "bad", ...R_ALL("bad") }, appTarget: "P", wal: true },
      { nodes: { P: "restoring", ...R_ALL("bad"), B: "restoring" }, appTarget: null, wal: false },
    ],
    self: [
      { nodes: { P: "bad" }, appTarget: "P", wal: false },
      { nodes: { P: "bad" }, appTarget: "P", wal: false },
      { nodes: { P: "restoring", B: "restoring" }, appTarget: null, wal: false },
    ],
  },
  reads: {
    managed: [
      { nodes: { P: "hot" }, appTarget: "P", wal: true },
      { nodes: { P: "hot", ...R_ALL("idle") }, appTarget: "P", wal: true },
      { nodes: { P: "hot", ...R_ALL("idle") }, appTarget: "P", wal: true },
    ],
    self: [
      { nodes: { P: "hot" }, appTarget: "P", wal: false },
      { nodes: { P: "hot" }, appTarget: "P", wal: false },
      { nodes: { P: "hot" }, appTarget: "P", wal: false },
    ],
  },
};

const IDLE_PHASE: Phase = { nodes: {}, appTarget: "P", wal: true };

const SCENARIOS: { id: Scenario; Icon: typeof ServerCrash }[] = [
  { id: "primaryDown", Icon: ServerCrash },
  { id: "badQuery", Icon: Skull },
  { id: "reads", Icon: TrendingUp },
];

/** Outcome tone per scenario/setup — drives the colour of the verdict line. */
const TONE: Record<Scenario, Record<Setup, "good" | "bad" | "neutral">> = {
  primaryDown: { managed: "good", self: "bad" },
  badQuery: { managed: "bad", self: "bad" },
  reads: { managed: "neutral", self: "neutral" },
};

const NODE_STYLE: Record<NodeState, string> = {
  ok: "fill-emerald-500/10 stroke-emerald-500",
  promoted: "fill-primary/15 stroke-primary",
  down: "fill-muted stroke-muted-foreground/50",
  bad: "fill-red-500/15 stroke-red-500",
  hot: "fill-amber-500/15 stroke-amber-500",
  idle: "fill-muted/40 stroke-muted-foreground/40",
  restoring: "fill-sky-500/10 stroke-sky-500",
};

// Diagram geometry (viewBox 640×250)
const POS: Record<NodeId | "APP", { x: number; y: number; w: number; h: number }> = {
  APP: { x: 16, y: 30, w: 132, h: 54 },
  B: { x: 16, y: 170, w: 132, h: 54 },
  P: { x: 240, y: 98, w: 140, h: 58 },
  R1: { x: 478, y: 14, w: 146, h: 50 },
  R2: { x: 478, y: 100, w: 146, h: 50 },
  R3: { x: 478, y: 186, w: 146, h: 50 },
};

/** SVG rect attributes for a node box. */
const box = (id: NodeId | "APP") => ({ x: POS[id].x, y: POS[id].y, width: POS[id].w, height: POS[id].h });

const mid = (id: NodeId | "APP") => ({ x: POS[id].x + POS[id].w / 2, y: POS[id].y + POS[id].h / 2 });

const PHASE_MS = 1700;

/** Interactive explainer for Anecole's PostgreSQL setup: a managed cluster
 * (primary + 3 streaming replicas) vs a single self-hosted VM, and what
 * replication does — and does not — protect against. */
export function DbReplicationDemo() {
  const t = useTranslations("Projects.anecoleDb");
  const rows = t.raw("compare.rows") as { label: string; self: string; managed: string }[];

  const [setup, setSetup] = useState<Setup>("managed");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [phase, setPhase] = useState(0);

  const phases = scenario ? PHASES[scenario][setup] : null;
  const current = phases ? phases[phase] : IDLE_PHASE;
  const finished = phases !== null && phase >= phases.length - 1;
  const captions = scenario ? (t.raw(`scenarios.${scenario}.${setup}`) as string[]) : [];

  useEffect(() => {
    if (!phases || finished) return;
    const timer = setTimeout(() => setPhase((p) => p + 1), PHASE_MS);
    return () => clearTimeout(timer);
  }, [phases, finished, phase]);

  function run(id: Scenario) {
    setScenario(id);
    setPhase(0);
  }

  function switchSetup(next: Setup) {
    setSetup(next);
    if (scenario) setPhase(0);
  }

  const stateOf = (id: NodeId): NodeState => current.nodes[id] ?? (id === "B" ? "idle" : "ok");
  const replicas: NodeId[] = setup === "managed" ? ["R1", "R2", "R3"] : [];
  const nodeLabel = (id: NodeId) => {
    if (id === "P") return setup === "managed" ? t("diagram.primary") : t("diagram.singleVm");
    if (id === "B") return t("diagram.backup");
    return stateOf(id) === "promoted" ? t("diagram.newPrimary") : t("diagram.replica");
  };
  const stateLabel = (s: NodeState) => t(`state.${s}`);

  const target = current.appTarget;
  const appFrom = mid("APP");
  const appTo = target ? mid(target) : null;

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      {/* Setup toggle */}
      <div className="mb-4 inline-flex rounded-lg border p-0.5" role="group" aria-label={t("setupLabel")}>
        {(["managed", "self"] as Setup[]).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={setup === s}
            onClick={() => switchSetup(s)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              setup === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t(`setups.${s}`)}
          </button>
        ))}
      </div>

      {/* Diagram */}
      <div className="rounded-lg border bg-muted/20 p-2">
        <svg viewBox="0 0 640 250" className="h-auto w-full" role="img" aria-label={t("diagram.aria")}>
          <defs>
            <marker
              id="db-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className="fill-muted-foreground" />
            </marker>
          </defs>

          {/* Services → database */}
          {appTo && (
            <line
              x1={appFrom.x + POS.APP.w / 2}
              y1={appFrom.y}
              x2={target === "R1" ? POS.R1.x : POS.P.x}
              y2={appTo.y}
              className={cn("stroke-2", target === "R1" ? "stroke-primary" : "stroke-muted-foreground")}
              markerEnd="url(#db-arrow)"
            />
          )}

          {/* WAL stream primary → replicas */}
          {replicas.map((r) => (
            <motion.line
              key={r}
              x1={POS.P.x + POS.P.w}
              y1={mid("P").y}
              x2={POS[r].x}
              y2={mid(r).y}
              strokeDasharray="6 6"
              className={cn(
                "stroke-[1.5]",
                stateOf(r) === "bad"
                  ? "stroke-red-500"
                  : current.wal
                    ? "stroke-emerald-500"
                    : "stroke-muted-foreground/30",
              )}
              animate={current.wal ? { strokeDashoffset: [12, 0] } : { strokeDashoffset: 0 }}
              transition={current.wal ? { repeat: Infinity, duration: 0.6, ease: "linear" } : { duration: 0 }}
            />
          ))}
          {replicas.length > 0 && (
            <text x={432} y={mid("P").y - 8} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              WAL
            </text>
          )}

          {/* Nightly dump primary → backup */}
          <line
            x1={POS.P.x}
            y1={POS.P.y + POS.P.h - 8}
            x2={POS.B.x + POS.B.w}
            y2={mid("B").y}
            strokeDasharray="3 4"
            className={cn(
              "stroke-[1.5]",
              stateOf("B") === "restoring" ? "stroke-sky-500" : "stroke-muted-foreground/50",
            )}
            markerStart={stateOf("B") === "restoring" ? undefined : "url(#db-arrow)"}
            markerEnd={stateOf("B") === "restoring" ? "url(#db-arrow)" : undefined}
          />
          <text x={196} y={205} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {t("diagram.dumpSchedule")}
          </text>

          {/* Services box */}
          <rect {...box("APP")} rx={8} className="fill-background stroke-border" />
          <text
            x={mid("APP").x}
            y={mid("APP").y - 3}
            textAnchor="middle"
            className="fill-foreground text-[12px] font-semibold"
          >
            {t("diagram.services")}
          </text>
          <text
            x={mid("APP").x}
            y={mid("APP").y + 13}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {target ? t("diagram.servicesOk") : t("diagram.servicesDown")}
          </text>

          {/* Database nodes */}
          {(["P", ...replicas, "B"] as NodeId[]).map((id) => {
            const s = stateOf(id);
            return (
              <g key={id}>
                <motion.rect
                  {...box(id)}
                  rx={8}
                  className={cn("stroke-[1.5] transition-colors duration-500", NODE_STYLE[s])}
                  animate={s === "down" ? { opacity: 0.6 } : { opacity: 1 }}
                />
                <text
                  x={mid(id).x}
                  y={mid(id).y - 3}
                  textAnchor="middle"
                  className="fill-foreground text-[12px] font-semibold"
                >
                  {nodeLabel(id)}
                </text>
                <text
                  x={mid(id).x}
                  y={mid(id).y + 13}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px]"
                >
                  {stateLabel(s)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Scenarios */}
      <p className="mt-4 mb-2 text-xs font-semibold">{t("breakIt")}</p>
      <div className="flex flex-wrap gap-2">
        {SCENARIOS.map(({ id, Icon }) => (
          <Button key={id} size="sm" variant={scenario === id ? "default" : "outline"} onClick={() => run(id)}>
            <Icon className="h-4 w-4 mr-1.5" />
            {t(`scenarioButtons.${id}`)}
          </Button>
        ))}
        {scenario && (
          <Button size="sm" variant="ghost" onClick={() => setScenario(null)}>
            <RotateCcw className="h-4 w-4 mr-1.5" />
            {t("reset")}
          </Button>
        )}
      </div>

      {/* Event log */}
      <div className="mt-3 min-h-[7.5rem] rounded-lg border bg-muted/30 p-3">
        {!scenario ? (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            {t("idleHint")}
          </p>
        ) : (
          <ol className="space-y-1.5 text-xs">
            {captions.slice(0, phase + 1).map((c, i) => (
              <motion.li
                key={`${scenario}-${setup}-${i}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2"
              >
                <span className="font-mono text-muted-foreground">{i + 1}.</span>
                <span>{c}</span>
              </motion.li>
            ))}
            {finished && (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "mt-2 border-t pt-2 font-medium",
                  TONE[scenario][setup] === "good" && "text-emerald-600 dark:text-emerald-400",
                  TONE[scenario][setup] === "bad" && "text-red-600 dark:text-red-400",
                )}
              >
                {t(`outcomes.${scenario}.${setup}`)}
              </motion.li>
            )}
          </ol>
        )}
      </div>

      {/* Managed vs self-hosted */}
      <h4 className="mt-6 mb-3 text-sm font-semibold">{t("compare.title")}</h4>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 font-medium" />
              <th className="px-3 py-2 font-medium">{t("setups.self")}</th>
              <th className="px-3 py-2 font-medium">{t("setups.managed")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t align-top">
                <th scope="row" className="px-3 py-2 font-medium">
                  {r.label}
                </th>
                <td className="px-3 py-2 text-muted-foreground">{r.self}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.managed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </div>
  );
}
