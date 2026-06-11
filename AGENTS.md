<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->
# Project-specific agent rules

## Route structure
- All pages are under `src/app/[locale]/(marketing)/` — the `(marketing)` is a route group with no URL segment.
- Internal links must use `Link` from `@/i18n/navigation`, never `next/link` directly.
- Every page needs `setRequestLocale(locale)` at the top and `generateStaticParams` for static export.

## Data layer
- Structured content (projects, career, skills, metrics, recommendations) lives in `src/data/*.ts` — **never** reach for a CMS, database, or external fetch for this data.
- Tri-mode content is shaped as `{ hr: string; business: string; tech: string }` — see `src/data/projects.ts`.

## Tri-mode system
- The view mode (`"hr" | "business" | "tech"`) is stored in Zustand at `src/store/viewMode.ts`.
- Use `ModeAware` from `src/components/tri-mode/ModeAware.tsx` to render conditionally per mode.
- Never use `useViewModeStore` directly in a Server Component — Zustand is client-only.

## Tailwind v4
- There is no `tailwind.config.js`. All theme config is in CSS (`src/app/globals.css`) via `@theme inline`.
- Do not add `tailwind.config.js` or `tailwind.config.ts` — it will break shadcn/ui.

## shadcn/ui
- Primitives are in `src/components/ui/` — you own this code, edit directly.
- Add new primitives via `npx shadcn@latest add <component>`, not by hand.

## Internationalization
- `messages/{en,de,ru}.json` must always have identical key structure.
- Use `useTranslations()` in components. Never hard-code English strings in JSX — always use translation keys.
- Do not put translated strings in MDX frontmatter.

## Client vs Server Components
- Default to Server Components. Add `"use client"` only for: Motion animations, Zustand hooks, event handlers, browser APIs, React Flow.
- React Flow (`@xyflow/react`) **requires** `'use client'` and an explicit pixel height on its container.

## OG images
- OG routes run on the Edge Runtime (`src/app/[locale]/og/route.tsx`). Do not use Node.js-only APIs there.
<!-- END:project-agent-rules -->
