# Walking Skeleton — Personal Website (Vitalii Popov)

**Phase:** 1
**Generated:** 2026-06-09

## Capability Proven End-to-End

A visitor can navigate to /en/, /de/, and /ru/ locale routes; toggle dark/light mode; switch between HR/Business/Tech view modes (persisted across reload); and view a skeleton MDX-rendered page with syntax-highlighted code — all statically prerendered and served by Vercel.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16.x App Router + React 19 + TypeScript strict | Pre-decided constraint; App Router RSC enables static-first hybrid rendering; `next` TS plugin validates route exports (STACK.md) |
| Styling | Tailwind CSS v4 (no `tailwind.config.js`) + shadcn/ui (New York) + OKLCH tokens in `globals.css` | shadcn v4 requires Tailwind v4; all theme config lives in CSS via `@theme inline` (D-13, Gotcha 8) |
| i18n | next-intl 4.x, URL-based locale segments `/en//de//ru/`, defaultLocale `en`, `localePrefix: 'always'` | Best-in-class App Router i18n; middleware on Vercel Edge; `setRequestLocale` enables static rendering (FOUND-02, D-19) |
| Static rendering | `setRequestLocale(locale)` in EVERY layout + page; `generateStaticParams` over all locales; `dynamicParams = false` on dynamic routes | Prevents dynamic-SSR inflation (Pitfall 2) — the most dangerous Phase 1 mistake; verified in build output (D-18) |
| Middleware matcher | `['/((?!api|_next|_vercel|.*\\..*).*)']` | Excludes dotted/static paths so favicon, bundles, CV PDF are never locale-redirected (Pitfall 4) |
| Theme | next-themes, `attribute="class"`, `defaultTheme="system"`, `suppressHydrationWarning` on `<html>` | System-aware dark mode; mounted-guard prevents FOUC (Pitfall 9, D-14) |
| Cross-page client state | Zustand store + `persist` (localStorage key `portfolio-view-mode`), default `business` | ViewMode (HR/Business/Tech) is a visitor preference, NOT URL state — URL state would pollute canonical URLs / hreflang (D-08, D-09; ARCHITECTURE Anti-Pattern 1) |
| Content layer | MDX files under `src/content/`, rendered build-time via `next-mdx-remote/rsc` `compileMDX` + `gray-matter`; `rehype-pretty-code` for highlighting | No DB/CMS (project constraint); build-time compile = zero runtime cost; static-first (FOUND-06) |
| MDX localization | Single English MDX with locale-directory fallback to `en` (NOT per-locale file proliferation) | Avoids 3x file maintenance and raw-key 404s; `getMessageFallback` to English for UI strings (D-04, D-06, D-07, Pitfall 3) |
| UI strings | next-intl messages `messages/{en,de,ru}.json`, nested namespaces | Short strings only; long prose lives in MDX. Cyrillic font subset mandatory for RU (D-05, D-16, Pitfall 13) |
| next.config plugin order | `withNextIntl(withMDX(nextConfig))` — withNextIntl OUTERMOST | Load-bearing; reversing silently breaks locale routing (D-03) |
| Deployment | Vercel, zero-config, no `vercel.json`, no `output: 'export'`, no `sharp` | Middleware + future dynamic OG need server runtime; static export breaks them (D-21, D-22) |
| Directory layout | `src/app/[locale]/` with route groups `(marketing)/(content)/(interactive)/(tools)`; `src/components/{ui,layout,tri-mode,mdx}`; `src/i18n`; `src/store`; `src/lib`; `src/content`; root `middleware.ts` + `mdx-components.tsx` | Per ARCHITECTURE.md folder structure (D-02) |

## Stack Touched in Phase 1

- [x] Project scaffold (Next.js 16, TS strict, Tailwind v4, shadcn/ui, ESLint via Next) — Plan 01
- [x] Routing — `/en//de//ru/` home + `/[locale]/skeleton` real routes — Plans 01, 03
- [x] "Data layer" (content) — real MDX read at build time with English fallback — Plan 03
- [x] UI interactive elements wired to client state — theme toggle (next-themes) + ViewMode switcher (Zustand/localStorage) — Plan 02
- [x] Deployment — live on Vercel production URL, verified end-to-end — Plan 04

## Out of Scope (Deferred to Later Slices)

Explicitly NOT in the skeleton — do not re-litigate Phase 1's minimalism:

- Real home/hero, Impact Dashboard, About, Contact, FAQ content — Phase 2 (the skeleton home page is a placeholder Card)
- Project case studies, tri-mode CONTENT (the switcher UI exists; genuinely-different per-mode content is Phase 3), ADR, Failure Stories, Architecture Gallery — Phase 3
- Animation libraries (`motion`), animated counters (`react-countup`), diagram libs (`@xyflow/react`, `mermaid`), forms (`react-hook-form`, `zod`) — installed only in the phases that use them
- GitHub API / Open Source / Skills Explorer / Recommendations / Roadmap — Phase 4
- Per-page SEO metadata, OG images (`next/og`), JSON-LD, sitemap with hreflang, full DE/RU prose translations — Phase 5
- GA4 component is wired into the layout (no events) but no analytics tracking is implemented in Phase 1
- Real production domain / `metadataBase` (placeholder URL in Phase 1; real domain in Phase 5)
- Inquiry-form backend, OG image strategy — open questions to resolve before Phases 2/5

## Subsequent Slice Plan

Each later phase adds vertical slices on top of this skeleton WITHOUT altering its architectural decisions:

- Phase 2: Home & Contact — Hero, Impact Dashboard, About + career timeline, CV link, Contact page + inquiry form, FAQ
- Phase 3: Projects & Depth — 2-3 project case studies with genuinely-different tri-mode content, ADR, Failure Stories, Architecture Gallery
- Phase 4: Skills & Presence — interactive Skills Explorer, Open Source (GitHub API), Recommendations, Public Roadmap
- Phase 5: SEO & Launch — per-page metadata, locale-aware OG images, JSON-LD, sitemap with hreflang, DE/RU UI strings complete
