# Research Summary

**Project:** Vitalii Popov — Personal Portfolio / Interactive CV
**Synthesized:** 2026-06-08
**Source files:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

---

## Key Findings

### Stack

- **Next.js is at 16.2.7** (not 14+ as originally noted) — App Router fully stable, use it
- **Tailwind CSS v4 is a breaking change**: no `tailwind.config.js` — all config moves into CSS via `@theme inline {}`. Stale tutorials will mislead.
- **Plugin order in `next.config.mjs` is load-bearing**: `withNextIntl` must wrap `withMDX` (outermost first). Wrong order breaks locale routing.
- **Motion (`motion/react`) replaces `framer-motion`** — new package name, same API, version 12.40.0
- **GA4 via `@next/third-parties/google`** — official, no extra package needed
- **MDX strategy**: use `@next/mdx` for static pages; `next-mdx-remote/rsc` for filesystem blog/project content
- **Mermaid is 3MB** — must always be lazy-loaded with `dynamic({ ssr: false })`
- **React Flow needs explicit height** on container or renders invisible

### Features

- **Tri-mode switcher (HR/Business/Tech) is genuinely novel** — no standout portfolio does this. Risk: theatrical execution (label-swaps only). Must produce genuinely different content per mode to be credible.
- **Impact numbers are the single strongest asset** — €480K, 200M items in 5s, 11.63% uplift are exceptional. Most engineers describe tasks; almost none have verifiable business-scale metrics at this precision.
- **Failure Stories and ADR Database are the rarest trust-builders** for CTOs/EMs — public intellectual honesty about failures is essentially absent from the portfolio landscape.
- **Career RPG is conditional**: tasteful progression diagram = impressive; literal game UI with XP bars = gimmicky for CTO audience.
- **Wizard is highest execution risk** — specific output = impressive; generic boilerplate = actively damages credibility. Build last.
- **Content gates features** — empty Architecture Gallery or ADR with one entry hurts more than not having the feature. Ship when populated.

**Feature priority:**
- P0: Impact Dashboard, Tri-mode switcher (with real content contracts)
- P1: Project case studies (2–3 deep), Architecture Gallery, Failure Stories, ADR Database, SEO + multilingual EN first
- P2: Skills Explorer, Career RPG, Live Playground (with working demos), Technical Deep Dives
- P3: Wizard, Public Roadmap, Metrics Page, LLMs.txt

### Architecture

- **Static-first is the correct default**: every page should be `.html` at build time, not `.js` (server-rendered)
- **`setRequestLocale(locale)` must be called in every layout and page** before any next-intl function — missing it anywhere forces the entire route tree into dynamic SSR
- **MDX localization strategy**: single English MDX files with locale-specific MDX files only for content that genuinely differs (full prose translation). Fallback strategy must be configured in `i18n/request.ts` to avoid raw key paths showing in UI.
- **`generateStaticParams` must enumerate locale × slug combos** for every dynamic route — `routing.locales.flatMap(locale => slugs.map(slug => ({ locale, slug })))`
- **Tri-mode state lives in Zustand with localStorage persistence** — not URL params (would pollute canonical URLs and SEO hreflang alternates)
- **Cyrillic font subset**: `Inter({ subsets: ['latin', 'cyrillic'] })` — Russian locale renders in fallback font without it
- **Do NOT use `output: 'export'`** — next-intl middleware + dynamic OG images both require server runtime; static export breaks them

### Pitfalls (Critical)

1. **Dynamic rendering inflation** — most dangerous. Missing `setRequestLocale` anywhere turns a static site into a slow SSR site. Detect: after build, all portfolio routes should be `.html` in `.next/server/app/`, not `.js`.
2. **Middleware matcher misconfiguration** — must exclude dot-containing paths or `favicon.ico`, JS bundles, and CV PDF download get redirected to locale-prefixed 404s.
3. **`generateStaticParams` missing locale dimension** — all non-default-locale project/blog pages return 404.
4. **Interactive component bundle bloat** — shipping 200–500 KB JS before hydration kills mobile performance. Target: initial JS under 80 KB. Use `'use client'` only on leaf nodes, not wrapper components.
5. **MDX content architecture mismatch** — decide the per-locale-file vs single-file+JSON strategy once and enforce it. Never mix.

---

## Cross-Cutting Insights

1. **Content-first, features-second** — the most common failure mode for ambitious portfolio sites is building interaction infrastructure before content exists. The metrics (€480K etc.) must be in the HTML on day one, not waiting behind a "Coming soon" panel. A populated project case study with no fancy UI beats a polished empty shell.

2. **The static rendering requirement and the tri-mode switcher create a design constraint**: tri-mode state must be client-side only (Zustand), while all page content must be statically rendered. The solution is to pre-render all three versions of content and show/hide via CSS classes driven by the Zustand store — not server-rendering different content per mode.

3. **Tailwind v4 + shadcn/ui v4 + next-intl + MDX is a 2025/2026 stack** with fewer tutorials and more gotchas than the "stable" 2023 stack. Phase 1 must get the configuration exactly right because every downstream phase builds on it. The plugin order, CSS variable setup, and `setRequestLocale` pattern must be established as project conventions before any features are built.

4. **The wizard is both the highest-upside and highest-risk feature**. It should be the last feature built, only after all project case studies are written. The wizard's architecture recommendations should reference Vitalii's real projects and decisions — not generic advice.

---

## Recommended Build Order

| Phase | Focus | Key Deliverable |
|-------|-------|-----------------|
| 1 | Foundation | Next.js + Tailwind v4 + shadcn/ui + next-intl routing + ViewMode store + base layouts |
| 2 | Content Pipeline | MDX infrastructure + project/blog/ADR/failure-story loaders + static params generation |
| 3 | Home + Identity | Hero, Impact Dashboard (animated counters), About, Contact, CV link |
| 4 | Projects Layer | 2–3 full project case studies with tri-mode content (HR/Business/Tech) |
| 5 | Depth Layer | Architecture Gallery, Failure Stories, ADR Database, Skills Explorer |
| 6 | SEO + i18n | OG images per locale, sitemap with hreflang, metadata per page, German content |
| 7 | Interactive | Career RPG, Live Playground (if demos are solid), Wizard (if content is deep enough) |

---

## Critical Risks for Phase 1

1. **next.config.mjs plugin order** — wrong order silently breaks locale routing
2. **`setRequestLocale` pattern** — must be established as a convention before any page is written
3. **Tailwind v4 CSS variable setup** — no `tailwind.config.js`; must configure OKLCH tokens in CSS
4. **MDX localization strategy decision** — must be made before writing any content
5. **Tri-mode content contract** — must define what actually changes per mode before building the switcher UI

---

## Open Questions

- **Inquiry form backend**: Vercel serverless Route Handler vs. Resend API vs. Formspree?
- **Playground isolation**: inline Vercel Edge Functions vs. iframe to a separate service?
- **OG image strategy**: static pre-generated PNGs vs. dynamic `@vercel/og` at build time?
- **German content depth**: full prose translation or abbreviated summaries? (Determines per-locale-file vs. single-file strategy)
- **Wizard output specificity**: how will it produce Vitalii-specific recommendations without a backend? (Static decision tree vs. API call)
- **LLMs.txt format**: basic profile text or structured JSON resume format?
