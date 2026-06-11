<!-- GSD:project-start source:PROJECT.md -->

## Project

**Personal Website — Vitalii Popov**

A personal website that functions simultaneously as a portfolio, interactive CV, technical blog, business case showcase, and lead generation platform. Built for Vitalii Popov — a full-stack engineer specialized in distributed systems and AI — targeting recruiters, engineering managers, CTOs, founders, and potential freelance clients who need to quickly assess his technical depth, business impact, and engineering thinking.

**Core Value:** Visitors can instantly understand the business value Vitalii creates (not just his tech stack), and leave convinced enough to reach out — measured by qualified opportunities generated per month.

### Constraints

- **Tech Stack**: Next.js + TypeScript + Tailwind + shadcn/ui + MDX + next-intl — pre-decided, do not change
- **Hosting**: Vercel — serverless deployment, static-first approach preferred
- **Content**: MDX as content layer — no database, no CMS backend for v1
- **Localization**: URL-based i18n via next-intl — /en/, /de/, /ru/ routes required
- **SEO**: Every page needs dedicated metadata and OpenGraph support

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2.7 (latest stable) | Full-stack React framework | App Router is mature, RSC enables hybrid static/dynamic rendering, `next/image`, `next/font`, `next/og` are all first-class; Vercel deploys it with zero config |
| React | 19.x (bundled with Next 16) | UI runtime | RSC + Suspense streaming; no separate install needed |
| TypeScript | 5.x (bundled) | Type safety | `strict: true` mode required; Next.js ships a `next` TS plugin for App Router type inference |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.3.0 | Utility-first CSS | v4 drops `tailwind.config.js` — configuration moves entirely into CSS via `@theme inline`. Massive DX improvement; shadcn/ui v4+ requires it |
| shadcn/ui (CLI) | 4.8.2 | Component library | Not a package — components are copied into your repo via `npx shadcn@latest add`. You own the code. Ships Tailwind v4 + OKLCH color variables out of the box |
| tailwind-merge | 3.6.0 | Class conflict resolution | Required companion for shadcn/ui; resolves `cn()` utility conflicts (e.g., `text-red-500` + `text-blue-500`) |
| next-themes | 0.4.6 | Dark/light mode | Integrates with shadcn/ui's class-based dark mode; `suppressHydrationWarning` on `<html>` is mandatory in App Router |

### Content Layer (MDX)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/mdx` | 16.2.7 | MDX compiler | Official Next.js integration; uses the fast Rust-based MDX compiler (opt-in via `experimental.mdxRs`); correct choice when MDX files live in the repo and are imported directly |
| `next-mdx-remote` | 6.0.0 | Remote/dynamic MDX | Use this when MDX content is read from the filesystem at runtime (e.g., blog posts from `content/` directory) rather than statically imported. Supports App Router RSC via `next-mdx-remote/rsc` |
| rehype-pretty-code | 0.14.3 | Code block syntax highlighting | Wraps Shiki; dual-theme (dark+light) support via CSS custom properties; correct choice over `@shikijs/rehype` for MDX pipelines because it handles line numbers, line highlighting, and word highlighting out of the box |

### Internationalization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-intl | 4.13.0 | i18n routing + translations | Best-in-class for App Router; supports RSC natively (`useTranslations` works in Server Components without extra providers); handles locale routing, hreflang headers, sitemap generation, and `generateMetadata` localization |

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/third-parties` | 16.2.7 | GA4 integration | Official Next.js package; `GoogleAnalytics` component handles script loading with `afterInteractive` strategy automatically; `sendGAEvent` for custom events; no separate `react-ga4` needed |

### Deployment

| Technology | Purpose | Config |
|------------|---------|--------|
| Vercel | Hosting | Zero-config; automatically detects Next.js; middleware runs on Edge globally |

- next-intl middleware runs on Vercel's Edge Network (not serverless functions) — locale detection and redirects are globally distributed, zero cold start
- Image Optimization is automatic via `next/image` — no `sharp` install needed on Vercel (only needed for self-hosting)
- OG image generation via `next/og` (`ImageResponse`) runs on the Edge Runtime — must avoid Node.js-only APIs in OG route handlers
- ISR works correctly on Vercel with global CDN propagation (self-hosted ISR does NOT persist across restarts)
- No `vercel.json` needed for standard Next.js deployments
- Environment variables: use Vercel Dashboard → Settings → Environment Variables; prefix with `NEXT_PUBLIC_` only for client-exposed values

## Complementary Libraries

### Animations

| Library | Version | Purpose | Why / When |
|---------|---------|---------|-----------|
| Motion (`motion/react`) | 12.40.0 | Page transitions, scroll animations, counter animations, interactive UI | The canonical React animation library (formerly Framer Motion, rebranded to `motion`). Install via `npm install motion`. Use `motion.div` for animated elements. `whileInView` for scroll-triggered entry animations. `AnimatePresence` for exit animations (tri-mode switcher transitions). `useScroll` + `useTransform` for scroll-linked effects (progress bars, parallax). Motion components are **Client Components** — keep animation wrappers thin and push data fetching to Server Components above them |

### Animated Counters (Impact Dashboard)

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-countup | 6.5.3 | Animated number counters | For the Impact Dashboard (€480K, 8K users, etc.). Use `useCountUp` hook with `useInView` from Motion for scroll-triggered starts. Simple API, no dependencies |

### Diagrams

| Library | Version | Purpose | Why / When |
|---------|---------|---------|-----------|
| React Flow (`@xyflow/react`) | 12.11.0 | Interactive architecture diagrams (Architecture Gallery, Skills Explorer node map) | Fully interactive: drag, zoom, pan, custom nodes. Correct choice when diagrams need to be explorable. Must be `'use client'` — it's entirely DOM-based. Use for: Skills Explorer (tech graph), Architecture Gallery (system diagrams per project), Career RPG visualization |
| Mermaid | 11.15.0 | Static/semi-static diagrams in MDX | Use within MDX blog posts and project pages for architecture diagrams that don't need interactivity. Render server-side via `rehype-mermaid` plugin or client-side via dynamic import. Do NOT bundle Mermaid in the main JS bundle — always lazy-load |

### Code Highlighting

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| rehype-pretty-code + Shiki | 0.14.3 / 4.2.0 | Syntax highlighting in MDX | rehype-pretty-code wraps Shiki and integrates into the remark/rehype MDX pipeline at build time — zero runtime cost. Dual-theme (dark+light) via CSS custom properties that sync with next-themes class toggling. Use `transformerNotationHighlight()` and `transformerNotationWordHighlight()` from `@shikijs/transformers` for line/word callouts in technical blog posts |

### Icons

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| lucide-react | 1.17.0 | UI icons | Default icon set for shadcn/ui; tree-shakable; consistent stroke-based design; 1500+ icons |

### Forms and Validation

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-hook-form | 7.78.0 | Contact form, inquiry wizard | Shadcn/ui's Form component is built on it; minimal re-renders |
| Zod | 4.4.3 | Schema validation | Pairs with react-hook-form via `@hookform/resolvers/zod`; type-safe form validation; also useful for validating MDX frontmatter structure |

### Fonts

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Content layer | `@next/mdx` + `next-mdx-remote` | Contentlayer | Contentlayer is unmaintained (last commit 2023); `velite` is a viable alternative but adds complexity; `@next/mdx` is simpler for this use case |
| Content layer | `@next/mdx` + `next-mdx-remote` | Velite | Velite is good (Zod-based schemas) but adds a build step and watcher; overkill when content is all local MDX files in a monorepo |
| Animation | Motion (`motion/react`) | GSAP | GSAP has a more complex API and license costs for premium plugins; Motion has better React integration (hooks, layout animations) |
| Animation | Motion (`motion/react`) | CSS-only animations | Insufficient for the interactive features required (counter animations, node graph, page transitions) |
| Diagrams | React Flow | D3.js | D3 requires far more boilerplate for interactive node graphs; React Flow provides the exact primitives needed (Skills Explorer, Architecture Gallery) |
| Code highlighting | rehype-pretty-code | Prism.js | Prism is client-side; rehype-pretty-code runs at build time (zero bundle impact); Shiki has far more accurate VS Code-compatible highlighting |
| i18n | next-intl | `next-i18next` | `next-i18next` targets the Pages Router; deprecated for App Router |
| i18n | next-intl | `react-i18next` | Works but requires extra setup to integrate with App Router RSC; next-intl is purpose-built for App Router |
| Analytics | `@next/third-parties` | `react-ga4` | `react-ga4` is a third-party wrapper; `@next/third-parties` is official Next.js, handles script loading strategy correctly |
| Styling | Tailwind CSS v4 | CSS Modules | CSS Modules don't integrate with shadcn/ui's design token system |
| Component library | shadcn/ui | Radix UI directly | shadcn/ui IS Radix UI, pre-styled; using Radix directly means building all styling from scratch |

## Integration Gotchas

### 1. next-intl + next-themes: Locale in `<html lang>` attribute

### 2. Motion + Server Components boundary

### 3. MDX + next-intl: Do NOT put translated strings in MDX frontmatter

### 4. Mermaid in MDX: Always lazy-load

### 5. React Flow: Must set explicit height on container

### 6. OG images + next-intl locale param

### 7. Date formatting hydration mismatch with next-intl

### 8. Tailwind v4 + shadcn/ui: No `tailwind.config.js`

### 9. next-intl middleware + Vercel Edge

### 10. Static generation with `generateStaticParams` for all locale+slug combos

## Installation

# Bootstrap

# Shadcn/ui (interactive setup, select Tailwind v4 when prompted)

# Add common components

# i18n

# MDX

# Animation

# Counters

# Diagrams

# Forms

# Theme

# Dev

## Project Structure (recommended)

## Sources

- Next.js App Router docs (verified via Context7 `/vercel/next.js`, version 16.2.7): https://nextjs.org/docs
- next-intl docs (verified via Context7 `/amannn/next-intl`, version 4.13.0): https://next-intl.dev
- shadcn/ui changelog (verified via Context7 `/shadcn-ui/ui`, CLI version 4.8.2): https://ui.shadcn.com
- Motion docs (verified via Context7 `/websites/motion_dev`, version 12.40.0): https://motion.dev
- rehype-pretty-code docs (verified via Context7 `/rehype-pretty/rehype-pretty-code`, version 0.14.3)
- React Flow docs (verified via Context7 `/websites/reactflow_dev`, version 12.11.0): https://reactflow.dev
- Vercel Next.js deployment docs (verified via WebFetch): https://vercel.com/docs/frameworks/nextjs
- All package versions verified via npm registry (2026-06-08)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## References

The `references/` folder contains visual references and source documents. Always check it when working on design, content, or CV-related tasks.

Key files:
- `references/Vitalii Popov CV 07.05.26.pdf` — the latest CV. Use this as the authoritative source for dates, job titles, companies, achievements, stack, and any biographical data shown on the site.

## Conventions

### Data layer
- Structured data (projects, career, skills, metrics, recommendations) lives in `src/data/*.ts` as typed TypeScript arrays — **not** MDX or a CMS. MDX is reserved for long-form prose (blog posts, project write-ups) once that content exists.
- Add or modify content by editing the corresponding `src/data/` file. Types are defined in the same file.

### Routing
- All pages live under `src/app/[locale]/(marketing)/` (route group — no URL segment).
- The `[locale]` param drives all i18n. Use `Link` from `@/i18n/navigation` (not `next/link`) for internal links so locale is automatically prepended.
- `generateStaticParams` must be present on every page that needs static export — see `src/app/[locale]/layout.tsx` for the pattern.

### Tri-mode system
- The site has three audience modes: `"hr"`, `"business"`, `"tech"` (Zustand store in `src/store/viewMode.ts`, persisted to `localStorage`).
- Content that varies per mode is shaped as `{ hr: string; business: string; tech: string }` — see `Project.description` in `src/data/projects.ts`.
- Use the `ModeAware` component (`src/components/tri-mode/ModeAware.tsx`) for conditional rendering per mode.
- The switcher UI is `ViewModeSwitcher` in the Header.

### Component conventions
- Server Components by default. Add `"use client"` only when needed: Motion animations, Zustand hooks, event handlers, browser APIs.
- Keep animation wrappers thin (`motion.div`, `whileInView`, etc.) and push data fetching up to Server Components.
- shadcn/ui primitives live in `src/components/ui/`. Project-specific components go in `src/components/<feature>/`.

### Fonts
- `--font-sans`: Inter (latin + cyrillic subsets)
- `--font-mono`: JetBrains Mono
- Both are loaded via `next/font/google` in the root layout and applied via CSS variables.

### Internationalization
- Translation keys live in `messages/{en,de,ru}.json`. All three files must have the same keys.
- **Do not** put translated strings in MDX frontmatter — use `useTranslations` in the component instead.
- The `src/i18n/routing.ts` defines supported locales; update it if adding a new locale.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

```
src/
  app/
    [locale]/
      layout.tsx          ← root layout: fonts, ThemeProvider, ViewModeProvider, Header, Footer, GA
      page.tsx            ← home page (Hero + ImpactDashboard)
      (marketing)/        ← route group, no URL segment
        about/            ← CareerTimeline, hobbies
        projects/         ← project list + [slug]/ detail pages
        skills/           ← SkillsGraph (React Flow)
        contact/          ← ContactForm (react-hook-form + Zod) + ContactLinks + FAQ
        blog/             ← placeholder
        decisions/        ← placeholder
        failures/         ← placeholder
        open-source/      ← placeholder
        recommendations/  ← placeholder
        roadmap/          ← placeholder
      og/route.tsx        ← Edge OG image generation
      skeleton/           ← dev sandbox
    api/contact/route.ts  ← contact form API endpoint
    sitemap.ts

  components/
    layout/               ← Header, Footer, MobileNav, ThemeProvider, ThemeToggle, ViewModeProvider
    home/                 ← Hero, ImpactDashboard
    about/                ← CareerTimeline
    projects/             ← ProjectCard, ProjectsFilter, ProjectStatusBadge
    skills/               ← SkillsGraph
    contact/              ← ContactForm, ContactLinks, FAQ
    tri-mode/             ← ModeAware, ViewModeSwitcher
    ui/                   ← shadcn/ui primitives

  data/
    career.ts             ← CareerEntry[] (work + education history)
    projects.ts           ← Project[] with tri-mode descriptions + impact metrics
    skills.ts             ← Skill[] with category, level, years, linked projects
    metrics.ts            ← impact numbers for ImpactDashboard
    recommendations.ts    ← testimonials

  store/
    viewMode.ts           ← Zustand store (ViewMode: "hr"|"business"|"tech")

  i18n/
    routing.ts            ← locale list (en, de, ru)
    request.ts            ← next-intl server config
    navigation.ts         ← typed Link/useRouter/redirect exports

  lib/
    utils.ts              ← cn() helper
    content.ts            ← MDX file reader utilities

messages/
  en.json / de.json / ru.json   ← translation keys (must stay in sync)

middleware.ts             ← next-intl locale routing middleware
```

**Key architectural decisions:**
- All structured content is TypeScript data files (`src/data/`), not a database or CMS
- Tri-mode (hr/business/tech) content shapes sit inline in data types
- Zustand (with `persist`) for the only piece of client state: view mode
- React Flow used for Skills Graph — requires `'use client'`
- OG images generated at the Edge via `next/og`
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
