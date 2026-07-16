import type { ReactNode } from "react";
import { StarCard } from "./StarCard";

/** MDX-authorable equivalent of StarFormat, for project write-ups that live
 * in .mdx files rather than the `project.star` data field. Usage:
 *
 *   <StarStory>
 *     <StarSituation>...</StarSituation>
 *     <StarTask>...</StarTask>
 *     <StarAction>...</StarAction>
 *     <StarResult>...</StarResult>
 *   </StarStory>
 *
 * Renders as the same card grid as StarFormat instead of bold-prefixed prose. */
export function StarStory({ children }: { children: ReactNode }) {
  return <div className="not-prose grid gap-3 sm:grid-cols-2 mb-8">{children}</div>;
}

export function StarSituation({ children }: { children: ReactNode }) {
  return <StarCard kind="situation">{children}</StarCard>;
}

export function StarTask({ children }: { children: ReactNode }) {
  return <StarCard kind="task">{children}</StarCard>;
}

export function StarAction({ children }: { children: ReactNode }) {
  return <StarCard kind="action">{children}</StarCard>;
}

export function StarResult({ children }: { children: ReactNode }) {
  return <StarCard kind="result">{children}</StarCard>;
}
