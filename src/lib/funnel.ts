/** Primary conversion path: skim the case for hire, then get in touch. Nav
 * components use this to highlight the next stop instead of tracking (and
 * showing) where the visitor has already been. */
export const FUNNEL_ORDER = ["/", "/projects", "/about", "/hire-me"] as const;

export type FunnelHref = (typeof FUNNEL_ORDER)[number];

/** Given the current pathname, returns the next href in the funnel to
 * recommend, or null if the current page isn't on the funnel, is already
 * its last step, or already recommends a specific next step of its own. */
export function getRecommendedHref(pathname: string): FunnelHref | null {
  // Individual project/company pages end with their own NextProjectLink
  // ("next project ->"); layering the funnel's recommendation on top would
  // compete with it instead of reinforcing it.
  if (pathname.startsWith("/projects/")) return null;

  const index = FUNNEL_ORDER.findIndex((href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)
  );
  if (index === -1 || index === FUNNEL_ORDER.length - 1) return null;
  return FUNNEL_ORDER[index + 1];
}
