"use client";

import { useLocale } from "next-intl";
import { localize } from "@/lib/localized";
import { StarCard, type StarKind } from "./StarCard";
import type { Project } from "@/data/projects";

const ORDER: StarKind[] = ["situation", "task", "action", "result"];

/** Explicit Situation/Task/Action/Result cards for HR-mode project stories —
 * a scannable alternative to a paragraph of prose. */
export function StarFormat({ star }: { star: NonNullable<Project["star"]> }) {
  const locale = useLocale();

  return (
    <div className="grid gap-3 sm:grid-cols-2 mb-10">
      {ORDER.map((kind) => (
        <StarCard key={kind} kind={kind}>
          <p>{localize(star[kind], locale)}</p>
        </StarCard>
      ))}
    </div>
  );
}
