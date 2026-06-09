# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-09
**Phase:** 1-Foundation
**Mode:** --auto (all areas auto-selected; recommended options chosen autonomously)
**Areas discussed:** Bootstrap & Project Structure, MDX Localization Strategy, ViewMode Store Design, CSS & Theming Foundation, Static Rendering Verification

---

## Bootstrap & Project Structure

| Option | Description | Selected |
|--------|-------------|----------|
| `create-next-app` CLI | Official bootstrap with `--typescript --tailwind --app --src-dir` flags | ✓ |
| Manual setup | Bootstrap Next.js manually for more control | |

**Auto-selected:** `create-next-app` (recommended default — reduces wiring mistakes)
**Notes:** Plugin order in `next.config.mjs` is load-bearing (withNextIntl outermost). Route groups for organization only.

---

## MDX Localization Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Single English MDX + JSON strings | English prose in MDX, UI strings in messages/*.json; locale files added only when prose truly differs | ✓ |
| Per-locale MDX files | Separate .mdx per locale for all content | |

**Auto-selected:** Single English MDX (recommended — avoids 3x file maintenance; DE/RU prose added progressively)
**Notes:** `getMessageFallback` configured to prevent raw keys showing on incomplete translations. `t.raw()` explicitly banned.

---

## ViewMode Store Design

| Option | Description | Selected |
|--------|-------------|----------|
| localStorage persistence | Mode survives page reload; user's choice is sticky | ✓ |
| URL search param | Mode in URL for shareability | |
| Session-only | Resets on page reload | |

**Auto-selected:** localStorage persistence (recommended — URL params pollute canonical URLs and SEO hreflang)
**Default mode:** "Business" — broadest appeal; Impact Dashboard ROI numbers are the strongest opening
**Notes:** Enum values: `"hr" | "business" | "tech"`. `useViewMode()` hook exported for all consumers.

---

## CSS & Theming Foundation

| Option | Description | Selected |
|--------|-------------|----------|
| Tailwind v4 CSS-only config | `@theme inline {}` in globals.css; OKLCH tokens; no tailwind.config.js | ✓ |
| Tailwind v3 config-file | Traditional `tailwind.config.js`; fewer gotchas | |

**Auto-selected:** Tailwind v4 (required — shadcn/ui 4.x targets v4; v3 is stale for this stack)
**Notes:** Dark mode class-based via next-themes. Both `latin` and `cyrillic` font subsets required. Per-project styling via component overrides, not global tokens.

---

## Static Rendering Verification

| Option | Description | Selected |
|--------|-------------|----------|
| Build output inspection | Check `.next/server/app/` for `.html` vs `.js` files after `next build` | ✓ |
| Lighthouse audit | Test via browser performance audit | |

**Auto-selected:** Build output inspection (recommended — direct evidence, not inferred; catches SSR leaks definitively)
**Notes:** `setRequestLocale(locale)` must be called before any next-intl function in EVERY layout/page — this is the most critical convention established in Phase 1.

---

## Claude's Discretion

- Exact OKLCH color values for primary palette (use shadcn/ui defaults)
- shadcn/ui components beyond baseline (button, card, badge, separator, nav-menu)
- Whether to add `@next/bundle-analyzer` as dev dep
- Mermaid, React Flow, react-countup NOT installed in Phase 1

## Deferred Ideas

- Per-project unique page designs → Phase 3
- GitHub API integration → Phase 4
- OG image generation → Phase 5
- Full multilingual prose (DE/RU) → v2
