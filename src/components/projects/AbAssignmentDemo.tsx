"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Database, Hash, FileCode2, UserPlus, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = "A" | "B";

interface Visit {
  userId: string;
  variant: Variant;
  hash: number;
  cacheHit: boolean;
}

// FNV-1a — any stable hash works; what matters is that the same user ID
// always lands in the same bucket.
function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

function randomUserId(): string {
  return `u_${Math.floor(1000 + Math.random() * 9000)}`;
}

const VARIANT_STYLE: Record<Variant, string> = {
  A: "border-sky-500/60 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  B: "border-violet-500/60 bg-violet-500/10 text-violet-700 dark:text-violet-300",
};

/** Interactive demo of onlineTours' server-side A/B assignment: a hashed
 * user ID picks the bucket, Redis remembers it, and Rails renders the
 * chosen variant straight into the HTML so there's no flicker. */
export function AbAssignmentDemo() {
  const t = useTranslations("Projects.abAssign");
  const [visits, setVisits] = useState<Visit[]>([]);
  // userId -> variant: stands in for the Redis assignment store.
  const [store, setStore] = useState<Record<string, Variant>>({});

  const current = visits[0];
  const knownIds = Object.keys(store);

  function visit(userId: string) {
    const hash = fnv1a(userId);
    const cached = store[userId];
    const variant: Variant = cached ?? (hash % 2 === 0 ? "A" : "B");
    if (!cached) setStore((s) => ({ ...s, [userId]: variant }));
    setVisits((v) => [{ userId, variant, hash, cacheHit: Boolean(cached) }, ...v].slice(0, 8));
  }

  function newVisitor() {
    let id = randomUserId();
    while (store[id]) id = randomUserId();
    visit(id);
  }

  function returningVisitor() {
    visit(knownIds[Math.floor(Math.random() * knownIds.length)]);
  }

  const counts = Object.values(store).reduce(
    (acc, v) => ({ ...acc, [v]: acc[v] + 1 }),
    { A: 0, B: 0 } as Record<Variant, number>
  );

  const trace = current
    ? [
        { icon: Hash, text: t("trace.hash", { id: current.userId, hash: current.hash % 1000, bucket: current.variant }) },
        {
          icon: Database,
          text: current.cacheHit ? t("trace.redisHit", { bucket: current.variant }) : t("trace.redisMiss", { bucket: current.variant }),
        },
        { icon: FileCode2, text: t("trace.render", { bucket: current.variant }) },
      ]
    : [];

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 mb-10">
      <h3 className="font-semibold mb-1">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mb-5">{t("description")}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={newVisitor}>
          <UserPlus className="h-4 w-4 mr-1.5" />
          {t("newVisitor")}
        </Button>
        <Button size="sm" variant="outline" onClick={returningVisitor} disabled={knownIds.length === 0}>
          <UserCheck className="h-4 w-4 mr-1.5" />
          {t("returningVisitor")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Request trace */}
        <div className="rounded-lg border bg-muted/30 p-3 min-h-[9.5rem]">
          <p className="mb-2 text-xs font-semibold">{t("traceTitle")}</p>
          {current ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.ol
                key={visits.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {trace.map((row, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-2 text-xs"
                  >
                    <row.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="font-mono leading-relaxed">{row.text}</span>
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>
          ) : (
            <p className="text-xs text-muted-foreground">{t("traceEmpty")}</p>
          )}
        </div>

        {/* Rendered listing card */}
        <div>
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {current ? t("pageFor", { id: current.userId, bucket: current.variant }) : t("pagePlaceholder")}
          </p>
          <div className={cn("rounded-lg border bg-background p-3 transition-opacity", !current && "opacity-50")}>
            <p className="text-sm font-medium">{t("listing.name")}</p>
            <p className="mb-2 text-xs text-muted-foreground">{t("listing.meta")}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current?.variant ?? "none"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {current?.variant === "B" ? (
                  <p>
                    <span className="text-lg font-bold">{t("listing.priceB")}</span>{" "}
                    <span className="text-xs text-muted-foreground">{t("listing.priceBNote")}</span>
                  </p>
                ) : (
                  <p>
                    <span className="text-xs text-muted-foreground">{t("listing.priceAPrefix")}</span>{" "}
                    <span className="text-lg font-bold">{t("listing.priceA")}</span>
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="mt-2 text-[11px] text-muted-foreground">
              {current?.variant === "B" ? t("listing.variantB") : t("listing.variantA")}
            </p>
          </div>
        </div>
      </div>

      {/* Visitors + split */}
      {visits.length > 0 && (
        <div className="mt-4">
          <p className="mb-1.5 text-xs text-muted-foreground">
            {t("split", { a: counts.A, b: counts.B })}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visits.map((v, i) => (
              <span
                key={`${v.userId}-${visits.length - i}`}
                className={cn("rounded-full border px-2 py-0.5 font-mono text-[11px]", VARIANT_STYLE[v.variant], i > 0 && "opacity-60")}
              >
                {v.userId} · {v.variant}
                {v.cacheHit && " ↺"}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">{t("note")}</p>
    </div>
  );
}
