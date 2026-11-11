"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Bot, CheckCircle2, ChevronRight, FileJson, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The exported steps file, one JSON object per line — shortened from the real
// format (see Anecole's support-journal), field names kept. Code, not copy, so
// it stays untranslated like any other code sample on the site.
const FILE_LINES = [
  `{"seq":1,"src":"impersonation","actor":{"role":"admin"},"user":{"role":"student"},"sessionId":"imp-41c9"}`,
  `{"seq":2,"src":"route","url":"/homework/unit-4"}`,
  `{"seq":3,"src":"click","target":"button[Translate]"}`,
  `{"seq":4,"src":"input","target":"answer","value":"3,5"}`,
  `{"seq":5,"src":"click","target":"button[Submit]"}`,
  `{"seq":6,"src":"fetch","method":"POST","url":"/api/answers","status":500,"ms":184,"requestId":"7f3c9a2e"}`,
  `{"seq":7,"src":"toast","level":"error","text":"Couldn't save your answer"}`,
  `{"seq":8,"src":"snapshot","appVersion":"2.41.0","onLine":true,"viewport":[390,844]}`,
];

/** Which file lines each agent step reads. */
const STEP_LINES: number[][] = [[0, 7], [5, 6], [5], [1, 2, 3, 4], [3]];

const SERVER_LOG = `course-service ERROR [req=7f3c9a2e] NumberFormatException:
  For input string: "3,5"  at AnswerService.parseScore(AnswerService.java:88)`;

const FIX_DIFF = `- BigDecimal score = new BigDecimal(raw);
+ BigDecimal score = new BigDecimal(raw.trim().replace(',', '.'));

+ @Test void acceptsDecimalComma() { … }`;

const STEP_MS = 1800;

/** Interactive explainer: the steps file a user/admin exports from Anecole is
 * handed to an AI coding agent, which reads it top to bottom, follows the
 * request ID into server logs, replays the steps and proposes a fix. */
export function AiJournalDemo() {
  const t = useTranslations("Projects.anecoleAi");
  const steps = t.raw("steps") as { title: string; body: string }[];
  const principles = t.raw("principles") as { title: string; body: string }[];

  // -1 = file not handed over yet
  const [step, setStep] = useState(-1);
  const [autoplay, setAutoplay] = useState(false);
  const done = step >= steps.length - 1;

  useEffect(() => {
    if (!autoplay) return;
    if (done) {
      setAutoplay(false);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), step < 0 ? 300 : STEP_MS);
    return () => clearTimeout(timer);
  }, [autoplay, step, done]);

  const highlighted = step >= 0 ? STEP_LINES[step] : [];

  function reset() {
    setAutoplay(false);
    setStep(-1);
  }

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* The exported file */}
        <div className="min-w-0 self-start rounded-lg border bg-muted/30">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <FileJson className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate font-mono text-xs">anecole-steps-student-2026-10-26.jsonl</span>
          </div>
          <ol className="overflow-x-auto p-2 font-mono text-[11px] leading-relaxed">
            {FILE_LINES.map((line, i) => (
              <li
                key={i}
                className={cn(
                  "flex gap-2 whitespace-pre rounded px-1.5 transition-colors duration-300",
                  highlighted.includes(i)
                    ? "bg-primary/15 text-foreground"
                    : step >= 0
                      ? "text-muted-foreground/70"
                      : "text-muted-foreground",
                )}
              >
                <span className="w-3 shrink-0 select-none text-right text-muted-foreground/60">{i + 1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* The agent's trace */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Bot className="h-4 w-4 text-primary" />
            {t("agentLabel")}
          </div>
          <ol className="space-y-1.5">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => {
                    setAutoplay(false);
                    setStep(i);
                  }}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-left transition-colors",
                    i === step
                      ? "border-primary bg-primary/10"
                      : i < step
                        ? "border-primary/30"
                        : "opacity-60 hover:opacity-100",
                  )}
                >
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    {i < step || (i === step && done) ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    {i + 1}. {s.title}
                  </span>
                  <AnimatePresence initial={false}>
                    {i === step && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="block overflow-hidden"
                      >
                        <span className="block pt-1.5 text-xs leading-relaxed text-muted-foreground">{s.body}</span>
                        {i === 2 && (
                          <pre className="mt-2 overflow-x-auto rounded border bg-background p-2 font-mono text-[10.5px] text-red-600 dark:text-red-400">
                            {SERVER_LOG}
                          </pre>
                        )}
                        {i === 4 && (
                          <pre className="mt-2 overflow-x-auto rounded border bg-background p-2 font-mono text-[10.5px]">
                            {FIX_DIFF.split("\n").map((l, j) => (
                              <span
                                key={j}
                                className={cn(
                                  "block",
                                  l.startsWith("+") && "text-emerald-600 dark:text-emerald-400",
                                  l.startsWith("-") && "text-red-600 dark:text-red-400",
                                )}
                              >
                                {l || " "}
                              </span>
                            ))}
                          </pre>
                        )}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-2">
            {step < 0 || done ? (
              <Button
                size="sm"
                onClick={() => {
                  setStep(-1);
                  setAutoplay(true);
                }}
              >
                <Play className="h-4 w-4 mr-1.5" />
                {t("run")}
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  setAutoplay(false);
                  setStep((s) => Math.min(s + 1, steps.length - 1));
                }}
              >
                <ChevronRight className="h-4 w-4 mr-1.5" />
                {t("next")}
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={reset} disabled={step < 0}>
              <RotateCcw className="h-4 w-4 mr-1.5" />
              {t("reset")}
            </Button>
          </div>
        </div>
      </div>

      {/* Why the file is shaped this way */}
      <h4 className="mt-6 mb-3 text-sm font-semibold">{t("principlesTitle")}</h4>
      <ul className="grid gap-3 sm:grid-cols-2">
        {principles.map((p) => (
          <li key={p.title} className="rounded-lg border bg-muted/20 p-3">
            <p className="text-xs font-semibold mb-1">{p.title}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{p.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </div>
  );
}
