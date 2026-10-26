"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import {
  Bug,
  CheckCircle2,
  Circle,
  Download,
  FileText,
  Languages,
  Paperclip,
  Play,
  RotateCcw,
  Send,
  TriangleAlert,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action =
  | { kind: "open" }
  | { kind: "translate" }
  | { kind: "listen" }
  | { kind: "select"; option: number }
  | { kind: "submit" };

interface ScreenState {
  open: boolean;
  translated: boolean;
  selected: number | null;
  status: "idle" | "saved" | "error";
}

interface RecordedStep {
  action: Action;
  /** Seconds since the first recorded step — what a real recording would timestamp. */
  at: number;
  /** Screen state right after the step, so the log can show its outcome. */
  after: ScreenState;
  /** Whether "translate" showed or hid the translation — for the log label. */
  shownTranslation?: boolean;
}

const INITIAL: ScreenState = { open: false, translated: false, selected: null, status: "idle" };

// The staged bug: submitting while the translation is shown fails. Pure, so
// replaying the recorded actions on a fresh screen always lands in the same
// state — the whole point of the feature.
function apply(state: ScreenState, action: Action): ScreenState {
  switch (action.kind) {
    case "open":
      return { ...state, open: true };
    case "translate":
      return { ...state, translated: !state.translated };
    case "listen":
      return state;
    case "select":
      return { ...state, selected: action.option, status: "idle" };
    case "submit":
      return { ...state, status: state.translated ? "error" : "saved" };
  }
}

function targetOf(action: Action): string {
  return action.kind === "select" ? `opt-${action.option}` : action.kind;
}

const SAMPLE_SESSION: Action[] = [
  { kind: "open" },
  { kind: "listen" },
  { kind: "translate" },
  { kind: "select", option: 0 },
  { kind: "submit" },
];

const STAGE_ICONS = [Circle, Download, Paperclip, Bug];
const SAMPLE_MS = 900;
const REPLAY_MS = 1000;

/** Interactive explainer for Anecole's step recordings: the visitor uses a
 * mock homework screen while every action is logged, downloads the log,
 * attaches it to a bug ticket, and watches a developer's screen replay it
 * to the same bug. */
export function StepReplayDemo() {
  const t = useTranslations("Projects.anecoleReplay");
  const options = t.raw("screen.options") as string[];
  const stages = t.raw("stages") as string[];

  const [stage, setStage] = useState(0);
  const [steps, setSteps] = useState<RecordedStep[]>([]);
  const [listening, setListening] = useState(false);
  const [sampleRunning, setSampleRunning] = useState(false);
  const [attached, setAttached] = useState(false);
  const [replayIdx, setReplayIdx] = useState(-1);
  const startRef = useRef<number | null>(null);
  const listenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The student's screen is whatever the recorded steps produced.
  const screen = steps.length ? steps[steps.length - 1].after : INITIAL;
  const bugHit = steps.some((s) => s.after.status === "error");

  function record(action: Action) {
    const now = performance.now();
    if (startRef.current === null) startRef.current = now;
    const at = Math.round((now - startRef.current) / 1000);
    setSteps((list) => {
      const next = apply(list.length ? list[list.length - 1].after : INITIAL, action);
      return [...list, { action, at, after: next, shownTranslation: action.kind === "translate" ? next.translated : undefined }];
    });
    if (action.kind === "listen") {
      setListening(true);
      if (listenTimer.current) clearTimeout(listenTimer.current);
      listenTimer.current = setTimeout(() => setListening(false), 1200);
    }
  }

  // Sample session: feeds the scripted actions through the same recorder.
  useEffect(() => {
    if (!sampleRunning) return;
    let i = 0;
    const timer = setInterval(() => {
      record(SAMPLE_SESSION[i]);
      i += 1;
      if (i >= SAMPLE_SESSION.length) {
        clearInterval(timer);
        setSampleRunning(false);
      }
    }, SAMPLE_MS);
    return () => clearInterval(timer);
    // record only touches state setters and refs, so it's safe to leave out.
  }, [sampleRunning]);

  // Developer-side replay: one recorded step per tick.
  useEffect(() => {
    if (stage !== 3 || replayIdx < 0 || replayIdx >= steps.length - 1) return;
    const timer = setTimeout(() => setReplayIdx((i) => i + 1), REPLAY_MS);
    return () => clearTimeout(timer);
  }, [stage, replayIdx, steps.length]);

  useEffect(() => () => {
    if (listenTimer.current) clearTimeout(listenTimer.current);
  }, []);

  function reset() {
    setStage(0);
    setSteps([]);
    setAttached(false);
    setReplayIdx(-1);
    setSampleRunning(false);
    startRef.current = null;
  }

  function playSample() {
    setSteps([]);
    startRef.current = null;
    setSampleRunning(true);
  }

  function saveCopy() {
    const payload = steps.map((s) => ({
      t: s.at,
      action: s.action.kind,
      ...(s.action.kind === "select" ? { value: options[s.action.option] } : {}),
    }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = t("controls.fileName");
    a.click();
    URL.revokeObjectURL(url);
  }

  function stepLabel(s: RecordedStep): string {
    switch (s.action.kind) {
      case "open":
        return t("log.open", { unit: t("screen.unitTitle") });
      case "translate":
        return s.shownTranslation ? t("log.translate") : t("log.hideTranslation");
      case "listen":
        return t("log.listen");
      case "select":
        return t("log.select", { value: options[s.action.option] });
      case "submit":
        return t("log.submit");
    }
  }

  // Developer screen = recorded actions re-applied to a fresh screen.
  const replayScreen = steps.slice(0, replayIdx + 1).reduce((st, s) => apply(st, s.action), INITIAL);
  const replayDone = stage === 3 && replayIdx >= steps.length - 1 && steps.length > 0;
  const replayTarget = stage === 3 && replayIdx >= 0 && !replayDone ? targetOf(steps[replayIdx].action) : undefined;

  const stepLog = (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold">
        <span className={cn("h-2 w-2 rounded-full", stage === 0 ? "bg-red-500 animate-pulse" : "bg-muted-foreground")} />
        {t("log.title")}
      </p>
      {steps.length === 0 ? (
        <p className="text-xs text-muted-foreground">{t("log.empty")}</p>
      ) : (
        <ol className="space-y-1 font-mono text-[11px]">
          {steps.map((s, i) => (
            <li
              key={i}
              className={cn(
                "rounded px-1.5 py-0.5 transition-colors",
                stage === 3 && i === replayIdx && "bg-primary/15 text-foreground"
              )}
            >
              <span className="text-muted-foreground">
                {String(Math.floor(s.at / 60)).padStart(2, "0")}:{String(s.at % 60).padStart(2, "0")}
              </span>{" "}
              {stepLabel(s)}
              {s.action.kind === "submit" && (
                <span
                  className={cn(
                    "block pl-10",
                    s.after.status === "error" ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  → {s.after.status === "error" ? t("log.resultError", { message: t("screen.error") }) : t("log.resultSaved")}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      {/* Stage tracker */}
      <ol className="mb-5 grid grid-cols-4 gap-1.5">
        {stages.map((label, i) => {
          const Icon = STAGE_ICONS[i];
          return (
            <li
              key={label}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center text-[11px] font-medium transition-colors sm:flex-row sm:justify-center sm:gap-1.5 sm:text-xs",
                i === stage
                  ? "border-primary bg-primary/10 text-foreground"
                  : i < stage
                    ? "border-primary/40 text-primary"
                    : "text-muted-foreground"
              )}
            >
              {i < stage ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
              <span className="leading-tight">{label}</span>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {stage === 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <MockScreen
                caption={t("screen.studentView")}
                state={screen}
                listening={listening}
                onAction={sampleRunning ? undefined : record}
              />
              <div className="flex flex-col gap-3">
                {stepLog}
                <p
                  className={cn(
                    "text-xs",
                    bugHit ? "font-medium text-red-600 dark:text-red-400" : "text-muted-foreground"
                  )}
                >
                  {bugHit ? t("controls.bugFound") : t("controls.hint")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setStage(1)} disabled={!bugHit || sampleRunning}>
                    <Download className="h-4 w-4 mr-1.5" />
                    {t("controls.download")}
                  </Button>
                  <Button size="sm" variant="outline" onClick={playSample} disabled={sampleRunning}>
                    <Play className="h-4 w-4 mr-1.5" />
                    {t("controls.sample")}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {stage === 1 && (
            <div className="flex flex-col items-center gap-4 py-2 text-center">
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3 text-left"
              >
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-mono text-sm">{t("controls.fileName")}</p>
                  <p className="text-xs text-muted-foreground">{t("controls.fileMeta", { count: steps.length })}</p>
                </div>
              </motion.div>
              <p className="max-w-md text-sm text-muted-foreground">{t("controls.downloadedText")}</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button size="sm" onClick={() => setStage(2)}>
                  <Paperclip className="h-4 w-4 mr-1.5" />
                  {t("controls.toTicket")}
                </Button>
                <Button size="sm" variant="outline" onClick={saveCopy}>
                  <Download className="h-4 w-4 mr-1.5" />
                  {t("controls.saveCopy")}
                </Button>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="mx-auto max-w-lg">
              <div className="rounded-lg border bg-background p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-red-500/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-red-600 dark:text-red-400">
                    {t("ticket.type")}
                  </span>
                  <span className="text-sm font-semibold">{t("ticket.title")}</span>
                </div>
                <p className="mb-1 text-xs text-muted-foreground">{t("ticket.reporter")}</p>
                <p className="mb-3 text-sm">{t("ticket.body")}</p>
                <AnimatePresence>
                  {attached && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="inline-flex items-center gap-2 rounded-md border bg-muted/40 px-2.5 py-1.5"
                    >
                      <Paperclip className="h-3.5 w-3.5 text-primary" />
                      <span className="font-mono text-xs">{t("controls.fileName")}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {t("controls.fileMeta", { count: steps.length })}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {!attached ? (
                  <Button size="sm" onClick={() => setAttached(true)}>
                    <Paperclip className="h-4 w-4 mr-1.5" />
                    {t("controls.attach")}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      setStage(3);
                      setReplayIdx(-1);
                    }}
                  >
                    <Send className="h-4 w-4 mr-1.5" />
                    {t("controls.handOff")}
                  </Button>
                )}
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="grid gap-4 md:grid-cols-2">
              <MockScreen
                caption={t("screen.developerView")}
                state={replayScreen}
                listening={replayTarget === "listen"}
                highlight={replayTarget}
              />
              <div className="flex flex-col gap-3">
                {stepLog}
                {replayDone ? (
                  <p className="flex items-start gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {t("controls.reproduced")}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">{t("controls.replayHint")}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => setReplayIdx(0)} disabled={replayIdx >= 0 && !replayDone}>
                    <Play className="h-4 w-4 mr-1.5" />
                    {replayIdx >= 0 && !replayDone ? t("controls.replaying") : t("controls.replay")}
                  </Button>
                  <Button size="sm" variant="outline" onClick={reset}>
                    <RotateCcw className="h-4 w-4 mr-1.5" />
                    {t("controls.reset")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </div>
  );
}

/** Minimal homework screen. Interactive when `onAction` is set (recording),
 * read-only with a highlighted target while a developer replays steps. */
function MockScreen({
  caption,
  state,
  listening,
  highlight,
  onAction,
}: {
  caption: string;
  state: ScreenState;
  listening: boolean;
  highlight?: string;
  onAction?: (action: Action) => void;
}) {
  const t = useTranslations("Projects.anecoleReplay.screen");
  const options = t.raw("options") as string[];
  const readOnly = !onAction;

  const ring = (id: string) =>
    highlight === id && "ring-2 ring-primary ring-offset-2 ring-offset-background";

  return (
    <div>
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{caption}</p>
      <div
        className={cn("overflow-hidden rounded-lg border bg-background", readOnly && "pointer-events-none")}
        aria-disabled={readOnly || undefined}
      >
        <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs font-semibold">{t("appName")}</span>
          <span className="text-xs text-muted-foreground">· {t("homework")}</span>
        </div>

        <div className="p-3 md:min-h-[15rem]">
          {!state.open ? (
            <div className="flex items-center justify-between gap-2 rounded-md border p-3">
              <span className="text-sm">{t("unitTitle")}</span>
              <button
                type="button"
                onClick={() => onAction?.({ kind: "open" })}
                className={cn("rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground", ring("open"))}
              >
                {t("open")}
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t("prompt")}</p>
              <p className="mb-1 text-sm font-medium">{t("sentence")}</p>
              <p className={cn("mb-2 min-h-4 text-xs italic text-muted-foreground", !state.translated && "invisible")}>
                {t("translation")}
              </p>

              <div className="mb-3 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => onAction?.({ kind: "translate" })}
                  className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs", ring("translate"))}
                >
                  <Languages className="h-3.5 w-3.5" />
                  {state.translated ? t("hideTranslation") : t("translate")}
                </button>
                <button
                  type="button"
                  onClick={() => onAction?.({ kind: "listen" })}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs",
                    listening && "border-primary text-primary",
                    ring("listen")
                  )}
                >
                  <Volume2 className={cn("h-3.5 w-3.5", listening && "animate-pulse")} />
                  {listening ? t("listening") : t("listen")}
                </button>
              </div>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {options.map((opt, i) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onAction?.({ kind: "select", option: i })}
                    className={cn(
                      "rounded-md border px-3 py-1 font-mono text-sm transition-colors",
                      state.selected === i && "border-primary bg-primary/10 text-primary",
                      ring(`opt-${i}`)
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onAction?.({ kind: "submit" })}
                disabled={state.selected === null}
                className={cn(
                  "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-40",
                  ring("submit")
                )}
              >
                {t("submit")}
              </button>

              {state.status !== "idle" && (
                <p
                  role="status"
                  className={cn(
                    "mt-3 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium",
                    state.status === "error"
                      ? "bg-red-500/10 text-red-600 dark:text-red-400"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  {state.status === "error" ? <TriangleAlert className="h-3.5 w-3.5" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  {state.status === "error" ? t("error") : t("saved")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
