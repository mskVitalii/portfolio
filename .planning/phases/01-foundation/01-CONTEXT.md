# Phase 1: Foundation - Context

**Gathered:** 2026-06-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a correctly-configured Next.js 16.x project on Vercel with: Tailwind v4 + shadcn/ui, next-intl i18n routing (/en/, /de/, /ru/), MDX content pipeline, dark/light mode, ViewMode (HR/Business/Tech) Zustand store, and verified static rendering for all routes. This is the technical skeleton that every subsequent phase builds on. No user-facing features — only infrastructure, patterns, and verifiable correctness.

</domain>

<decisions>
## Implementation Decisions

### Bootstrap & Project Structure

- **D-01:** Bootstrap with `npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir`. Use the official CLI to avoid manual wiring mistakes.
- **D-02:** Use `src/` directory layout per STACK.md recommendation. Route groups `(marketing)`, `(content)`, `(interactive)`, `(tools)` under `app/[locale]/` for organization without URL segments.
- **D-03:** `next.config.mjs` plugin order is load-bearing — `withNextIntl` must wrap `withMDX` (outermost). This is a hard rule from STACK.md; reversing it silently breaks locale routing.

### MDX Localization Strategy

- **D-04:** Use **single English MDX files** as the primary content layer. Prose lives in `content/{type}/en/` directories. German and Russian translations are added as separate locale files only when prose genuinely differs — not by default.
- **D-05:** UI strings (navigation, labels, CTAs, headings) live in `messages/en.json`, `messages/de.json`, `messages/ru.json`. These are the only strings managed through next-intl's message system.
- **D-06:** Configure `getMessageFallback` in `i18n/request.ts` to fall back to English key path rather than crashing on missing translations. This prevents raw translation keys from showing in DE/RU UI.
- **D-07:** Never use `t.raw()` for long-form content — it's deprecated in next-intl compiled mode. Long prose = MDX files. Short strings = messages JSON.

### ViewMode Store Design

- **D-08:** ViewMode state lives in a Zustand store with `localStorage` persistence (not URL params — URL params would pollute canonical URLs and break SEO hreflang alternates).
- **D-09:** Default mode on first visit: **"Business"** — broadest appeal, Impact Dashboard numbers resonate most with the widest audience (recruiters, EMs, CTOs all respond to ROI).
- **D-10:** Mode persists indefinitely across page reloads and navigation. No auto-reset. Visitor's selection is their preference for the session and beyond.
- **D-11:** Export a `useViewMode()` hook from the store. Components use `useViewMode()` to read and set mode. The `ViewModeSwitcher` component lives in `components/layout/` and is rendered in the root layout.
- **D-12:** Mode options: `"hr" | "business" | "tech"` (lowercase enum values).

### CSS & Theming Foundation

- **D-13:** Tailwind v4 — no `tailwind.config.js`. All configuration in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline {}` with OKLCH color tokens per STACK.md.
- **D-14:** Dark mode: class-based via next-themes, `attribute="class"`. `suppressHydrationWarning` on `<html>`. System preference as default.
- **D-15:** Run `npx shadcn@latest init` and select Tailwind v4 mode when prompted. Add standard components: button, card, badge, separator, navigation-menu.
- **D-16:** Font setup: `Inter({ subsets: ['latin', 'cyrillic'] })` for body text (cyrillic required for Russian locale), `JetBrains_Mono` as `--font-mono` CSS variable for code blocks.
- **D-17:** Per-project unique styling (future phases): handled via component-level CSS overrides or route-group-specific layouts — NOT global theme token changes.

### Static Rendering Verification

- **D-18:** After `next build`, verify static rendering by checking `.next/server/app/[locale]/` — all portfolio pages must be `.html` files, not `.js`. A `.js` file means dynamic SSR leakage.
- **D-19:** `setRequestLocale(locale)` from `next-intl/server` must be called at the top of EVERY layout and page that touches next-intl, before any `useTranslations` call. This is the single most important convention to establish in Phase 1.
- **D-20:** `generateStaticParams` must return `routing.locales.map(locale => ({ locale }))` for the `[locale]` root layout, and `routing.locales.flatMap(locale => slugs.map(slug => ({ locale, slug })))` for all nested `[slug]` routes.

### Deployment

- **D-21:** Do NOT use `output: 'export'` — next-intl middleware + dynamic OG images both require server runtime. Standard Vercel Next.js deployment (no `vercel.json` needed).
- **D-22:** No `sharp` install needed on Vercel (only for self-hosted). `next/image` optimization is automatic.

### Claude's Discretion

- Exact shadcn/ui component selection beyond the baseline (button, card, badge, separator, nav) — add what makes sense for the shell
- Whether to add `@next/bundle-analyzer` as a dev dependency for bundle size checking
- Exact OKLCH color values for the primary palette — use shadcn/ui defaults; can be tweaked in later phases when design direction is clearer
- Mermaid and React Flow are NOT installed in Phase 1 — they're lazy-loaded and belong in the phases that use them

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Project vision, constraints, key decisions
- `.planning/REQUIREMENTS.md` — v1 requirements; Phase 1 covers FOUND-01..08
- `.planning/ROADMAP.md` — Phase 1 success criteria (5 criteria, all verifiable)

### Stack & Architecture
- `.planning/research/STACK.md` — Exact versions, integration patterns, code examples for all chosen libraries. Especially: next.config.mjs plugin order, Tailwind v4 setup, next-intl routing, shadcn/ui init, font configuration.
- `.planning/research/ARCHITECTURE.md` — Full App Router folder structure, next-intl file layout, ViewMode store architecture, MDX content organization, build dependency order.

### Critical Pitfalls
- `.planning/research/PITFALLS.md` — Critical sections: Pitfall 1 (demo graveyard / bundle bloat), Pitfall 2 (dynamic rendering inflation from next-intl), Pitfall 3 (MDX content architecture mismatch). Phase 1 must prevent Pitfall 2 and Pitfall 3 from the start.

### Research Summary
- `.planning/research/SUMMARY.md` — Cross-cutting insights and critical risks for Phase 1 (§ "Critical Risks for Phase 1").

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project. Phase 1 establishes all foundational assets.

### Established Patterns
- None yet. Phase 1 defines the patterns all subsequent phases follow:
  - `setRequestLocale` at top of every layout/page (before next-intl calls)
  - `'use client'` only on leaf nodes, not wrappers
  - `dynamic(() => import(...), { ssr: false })` for browser-only components
  - Route group organization under `app/[locale]/`

### Integration Points
- Vercel: zero-config deployment via `vercel.json`-free Next.js detection
- GitHub: no integration in Phase 1 (added in Phase 4)
- GA4: `GoogleAnalytics` component from `@next/third-parties/google` added to root layout in Phase 1 (but no event tracking yet)

</code_context>

<specifics>
## Specific Ideas

- Impact Dashboard animated counters use `react-countup` with `enableScrollSpy` — install the package in Phase 1 even if the Dashboard is Phase 2, to avoid dependency churn
- The ViewMode switcher UI component is built in Phase 1 (even if the actual tri-mode content is Phase 3) — it must be in the layout so all pages have the toggle from the start
- Cyrillic font subset is mandatory — `Inter({ subsets: ['latin', 'cyrillic'] })` — without it Russian locale renders in system fallback font

</specifics>

<deferred>
## Deferred Ideas

- Mermaid, React Flow, react-countup full implementation — these libraries are NOT installed in Phase 1; only the foundation packages
- Per-project unique page styling — handled in Phase 3 when project pages are built
- GitHub API integration — Phase 4
- OG image generation — Phase 5
- Full multilingual prose — v2

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Foundation*
*Context gathered: 2026-06-09*
