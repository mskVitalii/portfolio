# Architecture Patterns

**Domain:** Personal portfolio / interactive CV site
**Stack:** Next.js 14+ App Router, TypeScript, Tailwind, shadcn/ui, MDX, next-intl, Vercel
**Researched:** 2026-06-08
**Overall confidence:** HIGH (all patterns verified against Context7 + official Next.js / next-intl docs)

---

## Recommended Architecture

Static-first, content-driven site. MDX files are the single source of truth for all project and blog content. next-intl handles URL-based i18n via a `[locale]` dynamic segment. All pages render statically at build time (`generateStaticParams` + `setRequestLocale`). The tri-mode switcher is the only persistent cross-page client state; it lives in a Zustand store with `localStorage` persistence.

---

## App Router Folder Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/                        # Root locale segment — wraps ALL pages
│   │   │   ├── layout.tsx                   # Root layout: NextIntlClientProvider + fonts + global shell
│   │   │   ├── page.tsx                     # Home / hero
│   │   │   ├── not-found.tsx                # Locale-aware 404
│   │   │   │
│   │   │   ├── (marketing)/                 # Route group — no extra URL segment
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx             # Inquiry form (client component)
│   │   │   │   ├── recommendations/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── roadmap/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── (content)/                   # Route group — MDX-backed pages
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx             # Project listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       ├── page.tsx         # Individual project page
│   │   │   │   │       └── loading.tsx      # Suspense fallback
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       ├── page.tsx         # Individual blog post
│   │   │   │   │       └── loading.tsx
│   │   │   │   ├── adr/                     # Engineering Decisions Database
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── failure-stories/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── (interactive)/               # Route group — heavy client components
│   │   │   │   ├── skills/
│   │   │   │   │   └── page.tsx             # Skills Explorer
│   │   │   │   ├── career/
│   │   │   │   │   └── page.tsx             # Career RPG
│   │   │   │   ├── metrics/
│   │   │   │   │   └── page.tsx             # Metrics / stats
│   │   │   │   ├── playground/
│   │   │   │   │   └── page.tsx             # Live demos (dynamic, no static export)
│   │   │   │   └── architecture/
│   │   │   │       └── page.tsx             # Architecture Gallery (Mermaid / React Flow)
│   │   │   │
│   │   │   └── (tools)/                     # Route group — utility pages
│   │   │       ├── open-source/
│   │   │       │   └── page.tsx
│   │   │       └── faq/
│   │   │           └── page.tsx
│   │   │
│   │   └── sitemap.ts                       # Auto-generated locale-aware sitemap
│   │
│   ├── content/                             # MDX content files (locale-organized)
│   │   ├── projects/
│   │   │   ├── en/
│   │   │   │   ├── my-project.mdx
│   │   │   │   └── another-project.mdx
│   │   │   ├── de/
│   │   │   │   └── my-project.mdx
│   │   │   └── ru/
│   │   │       └── my-project.mdx
│   │   ├── blog/
│   │   │   ├── en/
│   │   │   ├── de/
│   │   │   └── ru/
│   │   ├── adr/
│   │   │   └── en/                          # ADRs are English-only initially; add locales later
│   │   └── failure-stories/
│   │       └── en/
│   │
│   ├── messages/                            # next-intl translation files
│   │   ├── en.json
│   │   ├── de.json
│   │   └── ru.json
│   │
│   ├── i18n/
│   │   ├── routing.ts                       # defineRouting({ locales, defaultLocale })
│   │   ├── request.ts                       # getRequestConfig — reads [locale] param
│   │   └── navigation.ts                    # Re-export Link, useRouter, usePathname scoped to routing
│   │
│   ├── components/
│   │   ├── ui/                              # shadcn/ui primitives (auto-generated; do not hand-edit)
│   │   ├── layout/
│   │   │   ├── Header.tsx                   # Nav + locale switcher + tri-mode toggle
│   │   │   ├── Footer.tsx
│   │   │   └── ViewModeProvider.tsx         # Client provider — injects Zustand store
│   │   ├── tri-mode/
│   │   │   ├── ViewModeSwitcher.tsx         # The 3-button toggle UI
│   │   │   ├── useViewMode.ts               # Hook: reads mode from Zustand
│   │   │   ├── ModeAware.tsx                # Utility wrapper: renders children only for given modes
│   │   │   └── ModeSection.tsx              # Content block that adapts via mode prop
│   │   ├── mdx/
│   │   │   ├── MDXComponents.tsx            # Global component map (mdx-components.tsx root file)
│   │   │   ├── ProjectCard.tsx              # Reusable card with tri-mode slots
│   │   │   └── ImpactMetric.tsx             # Animated counter component
│   │   ├── projects/
│   │   │   ├── ProjectLayout.tsx            # Shared chrome for project detail pages
│   │   │   ├── ArchitectureDiagram.tsx      # Mermaid / React Flow wrapper (lazy-loaded)
│   │   │   └── PerspectiveTabs.tsx          # HR / Business / Tech tab switcher for project pages
│   │   ├── interactive/
│   │   │   ├── SkillsExplorer.tsx           # Force-graph or grid skill map
│   │   │   ├── CareerRPG.tsx                # Level progression visual
│   │   │   ├── ImpactDashboard.tsx          # Animated counter dashboard
│   │   │   └── SolverWizard.tsx             # "How I Would Solve Your Problem" wizard
│   │   └── seo/
│   │       └── JsonLd.tsx                   # Reusable JSON-LD script injector
│   │
│   ├── lib/
│   │   ├── content.ts                       # MDX file reading utilities (fs + gray-matter)
│   │   ├── projects.ts                      # getProjects(), getProject(slug, locale) helpers
│   │   ├── blog.ts                          # getPosts(), getPost(slug, locale) helpers
│   │   └── metadata.ts                      # buildMetadata() factory with OG defaults
│   │
│   └── store/
│       └── viewMode.ts                      # Zustand store: ViewMode ('hr' | 'business' | 'tech')
│
├── public/
│   ├── cv/
│   │   └── vitalii-popov-cv.pdf
│   └── og/                                  # Pre-generated OG images per project
│
├── middleware.ts                            # next-intl createMiddleware — locale redirect logic
├── mdx-components.tsx                       # Next.js MDX component map (must be at root)
└── next.config.mjs                          # withMDX() wrapper + pageExtensions config
```

---

## next-intl i18n Routing Setup

### Routing configuration (`src/i18n/routing.ts`)

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'ru'],
  defaultLocale: 'en',
  // localePrefix defaults to 'always' → /en/, /de/, /ru/ always present
});
```

### Middleware (`middleware.ts`)

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|cv).*)'],
};
```

### Root layout (`src/app/[locale]/layout.tsx`)

```typescript
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ViewModeProvider } from '@/components/layout/ViewModeProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ViewModeProvider>
            {children}
          </ViewModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Static rendering requirement

Every page and layout that uses next-intl must call `setRequestLocale(locale)` before any hook call. This is what enables static generation (ISR/SSG) instead of dynamic rendering. Without it, `headers()` is invoked internally and forces dynamic mode.

### Localized metadata

```typescript
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return {
    title: t('meta.title', { name: project.title }),
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        en: `/en/projects/${slug}`,
        de: `/de/projects/${slug}`,
        ru: `/ru/projects/${slug}`,
      },
    },
  };
}
```

---

## MDX Content Organization

### Content strategy: locale-per-file

Each locale gets its own MDX file. English is the source language. German and Russian files can be added per-project as translation work progresses — missing locales fall back to English via the content helper, not next-intl.

```
content/projects/
  en/semantic-search.mdx
  de/semantic-search.mdx   ← add when translated
  ru/semantic-search.mdx   ← add when translated
```

### Frontmatter schema — projects

```yaml
---
title: "Semantic Search Platform"
slug: "semantic-search"
status: "alive"           # alive | dead | archived
category: "work"          # work | academic | hackathon
date: "2023-04"
endDate: "2024-01"        # omit if ongoing
summary: "200M products indexed in 5s with semantic relevance."
metrics:
  - value: "200M"
    label: "products indexed"
    mode: "tech"          # hr | business | tech | all
  - value: "€480K"
    label: "annual savings"
    mode: "business"
tech: ["Go", "Elasticsearch", "Kubernetes", "React"]
coverImage: "/og/semantic-search.png"
featured: true
---
```

### Frontmatter schema — blog / technical deep dives

```yaml
---
title: "Building Semantic Search at Scale"
slug: "semantic-search-deep-dive"
date: "2024-03-15"
summary: "Architecture and tradeoffs in building a 200M-product semantic index."
tags: ["Go", "Elasticsearch", "AI", "Performance"]
readingTime: 12           # minutes, auto-calculated is fine too
featured: false
---
```

### Frontmatter schema — ADRs

```yaml
---
id: "ADR-007"
title: "Use Elasticsearch over pgvector for semantic search"
date: "2023-06-01"
status: "accepted"        # proposed | accepted | deprecated | superseded
supersededBy: null
context: "Single sentence context."
---
```

### MDX loading pattern (App Router, Server Component)

```typescript
// src/lib/projects.ts
import { readFileSync, readdirSync, existsSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content');

export function getProjectSlugs(locale = 'en'): string[] {
  const dir = path.join(CONTENT_ROOT, 'projects', locale);
  if (!existsSync(dir)) return getProjectSlugs('en'); // fallback
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

export function getProject(slug: string, locale = 'en') {
  const localePath = path.join(CONTENT_ROOT, 'projects', locale, `${slug}.mdx`);
  const enPath = path.join(CONTENT_ROOT, 'projects', 'en', `${slug}.mdx`);
  const filePath = existsSync(localePath) ? localePath : enPath;
  const raw = readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data, content, slug };
}
```

### Dynamic MDX rendering in page

```typescript
// src/app/[locale]/projects/[slug]/page.tsx
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { getProject, getProjectSlugs } from '@/lib/projects';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export const dynamicParams = false;

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const { frontmatter, content } = getProject(slug, locale);

  const { content: rendered } = await compileMDX({
    source: content,
    components: MDXComponents,
    options: { parseFrontmatter: false }, // already parsed via gray-matter
  });

  return <ProjectLayout frontmatter={frontmatter}>{rendered}</ProjectLayout>;
}
```

Use `next-mdx-remote/rsc` (`compileMDX`) for Server Component MDX rendering. Prefer it over `@next/mdx` for content files that live outside `app/` and need frontmatter extraction. `@next/mdx` is appropriate only for MDX files used as route pages directly inside `app/`.

---

## Component Architecture: Tri-Mode Switcher

### State model

The view mode ('hr' | 'business' | 'tech') is global, client-side, persisted across sessions. It must survive locale switches and page navigation. URL-based state was considered but rejected: it would complicate every link generation and polute canonical URLs for SEO.

```typescript
// src/store/viewMode.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ViewMode = 'hr' | 'business' | 'tech';

interface ViewModeStore {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeStore>()(
  persist(
    (set) => ({
      mode: 'hr',                    // default: HR view for first-time visitors
      setMode: (mode) => set({ mode }),
    }),
    { name: 'portfolio-view-mode' }  // localStorage key
  )
);
```

### Provider placement

`ViewModeProvider` wraps children inside `NextIntlClientProvider` in the locale layout. It is a thin client component that ensures the Zustand store hydrates before any consumer renders.

```typescript
// src/components/layout/ViewModeProvider.tsx
'use client';
import { useViewModeStore } from '@/store/viewMode';
// No context needed — Zustand works via module singleton.
// This component exists only to ensure SSR-safe hydration.
export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  useViewModeStore(); // triggers store initialization / hydration
  return <>{children}</>;
}
```

### Switcher UI component

```typescript
// src/components/tri-mode/ViewModeSwitcher.tsx
'use client';
import { useViewModeStore } from '@/store/viewMode';
import { useTranslations } from 'next-intl';

const MODES = ['hr', 'business', 'tech'] as const;

export function ViewModeSwitcher() {
  const { mode, setMode } = useViewModeStore();
  const t = useTranslations('ViewMode');
  return (
    <div role="group" aria-label={t('label')}>
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          aria-pressed={mode === m}
          data-active={mode === m}
        >
          {t(m)}
        </button>
      ))}
    </div>
  );
}
```

### Content adaptation patterns

Two complementary patterns exist for mode-aware content:

**Pattern A — Declarative wrapper** (for content blocks in MDX and page components)

```typescript
// src/components/tri-mode/ModeAware.tsx
'use client';
import { useViewModeStore } from '@/store/viewMode';
type ViewMode = 'hr' | 'business' | 'tech';

export function ModeAware({
  modes,
  children,
}: {
  modes: ViewMode[];
  children: React.ReactNode;
}) {
  const { mode } = useViewModeStore();
  if (!modes.includes(mode)) return null;
  return <>{children}</>;
}
```

Usage in MDX:
```mdx
<ModeAware modes={['business', 'hr']}>
  We reduced infrastructure costs by €480K/year.
</ModeAware>

<ModeAware modes={['tech']}>
  We replaced a polling architecture with Kafka consumer groups to achieve
  sub-200ms p99 latency at 10K events/s.
</ModeAware>
```

**Pattern B — Prop-driven slot** (for components that render all three variants simultaneously but style them differently)

```typescript
// src/components/tri-mode/ModeSection.tsx
'use client';
import { useViewModeStore } from '@/store/viewMode';

export function ModeSection({
  hr,
  business,
  tech,
}: {
  hr: React.ReactNode;
  business: React.ReactNode;
  tech: React.ReactNode;
}) {
  const { mode } = useViewModeStore();
  return (
    <div data-mode={mode}>
      {mode === 'hr' && hr}
      {mode === 'business' && business}
      {mode === 'tech' && tech}
    </div>
  );
}
```

**Pattern C — Hook-driven** (for complex components like ImpactDashboard that compute differently per mode)

```typescript
// In any 'use client' component:
const { mode } = useViewModeStore();
const metrics = mode === 'tech' ? techMetrics : mode === 'business' ? businessMetrics : hrMetrics;
```

### Hydration safety note

Zustand's `persist` middleware causes a one-render hydration mismatch if the server renders with the default mode but localStorage has a different value. Mitigate with:

```typescript
// In components that read mode: guard with mounted state
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <DefaultModeFallback />;
```

Alternatively, use Zustand's `useStore` with a selector that returns `undefined` until hydrated, then render a skeleton.

---

## Data Flow

```
Build time:
  MDX files (src/content/) 
    → gray-matter (frontmatter extraction)
    → compileMDX / next-mdx-remote/rsc (Server Component rendering)
    → generateStaticParams (all locale × slug combinations)
    → Static HTML pages

Runtime (client):
  URL param [locale]
    → next-intl middleware (redirect / validate)
    → setRequestLocale() in layout/page
    → getTranslations() / useTranslations() (UI strings)

Runtime (client state):
  ViewMode store (Zustand + localStorage)
    → useViewModeStore() in any 'use client' component
    → ModeAware / ModeSection / direct hook consumers
    → No server round-trips — purely client state
```

---

## Component Boundaries

| Component | Type | Responsibility | Depends On |
|-----------|------|---------------|------------|
| `[locale]/layout.tsx` | Server | Root layout, providers, fonts | next-intl, ViewModeProvider |
| `[locale]/page.tsx` | Server | Hero, Impact Dashboard data | lib/content, next-intl |
| `Header` | Client | Nav, locale switcher, mode toggle | next-intl navigation, useViewModeStore |
| `ViewModeSwitcher` | Client | Mode selection UI | useViewModeStore |
| `ViewModeProvider` | Client | Store hydration wrapper | zustand/persist |
| `ModeAware` | Client | Conditional render by mode | useViewModeStore |
| `ProjectLayout` | Server shell + client slots | Project page chrome | frontmatter, ModeAware |
| `ImpactDashboard` | Client | Animated counters, mode-filtered | useViewModeStore |
| `SkillsExplorer` | Client | Interactive skill graph | internal data constants |
| `CareerRPG` | Client | Level progression vis | internal data constants |
| `ArchitectureDiagram` | Client (lazy) | Mermaid / React Flow render | dynamic import |
| `SolverWizard` | Client | Multi-step form wizard | local useState |
| `JsonLd` | Server | Inline JSON-LD script | structured data props |
| `InquiryForm` | Client | Contact form submission | fetch (Vercel serverless or Resend) |

---

## Build Order (Dependency Chain)

Build these layers in order. Each layer depends on the one above being stable.

### Layer 0: Foundation (must be first)
1. `next.config.mjs` — MDX plugin + pageExtensions
2. `src/i18n/routing.ts` — defineRouting (locales, defaultLocale)
3. `middleware.ts` — createMiddleware(routing)
4. `src/i18n/request.ts` — getRequestConfig
5. `messages/en.json`, `messages/de.json`, `messages/ru.json` — base UI strings
6. `mdx-components.tsx` — empty map initially, grows as components are added

### Layer 1: Shell
7. `src/app/[locale]/layout.tsx` — root locale layout, NextIntlClientProvider, ViewModeProvider
8. `src/store/viewMode.ts` — Zustand store
9. `src/components/layout/Header.tsx` — navigation skeleton
10. `src/components/layout/Footer.tsx`
11. `src/components/tri-mode/ViewModeSwitcher.tsx`
12. `src/components/tri-mode/ModeAware.tsx`

### Layer 2: Content infrastructure
13. `src/lib/content.ts` — MDX reading utilities
14. `src/lib/projects.ts` — getProjects, getProject helpers
15. `src/lib/metadata.ts` — buildMetadata factory
16. `src/components/seo/JsonLd.tsx`

### Layer 3: Static pages
17. `src/app/[locale]/page.tsx` — home / hero
18. `src/app/[locale]/(marketing)/about/page.tsx`
19. `src/app/[locale]/(marketing)/contact/page.tsx`
20. First project MDX file (`content/projects/en/first-project.mdx`)
21. `src/app/[locale]/(content)/projects/page.tsx` — listing
22. `src/app/[locale]/(content)/projects/[slug]/page.tsx` — detail

### Layer 4: Interactive features (can be built in parallel)
23. `SkillsExplorer` — data-driven, no MDX dependency
24. `CareerRPG` — data-driven, no MDX dependency
25. `ImpactDashboard` — data from project frontmatter metrics
26. `ArchitectureDiagram` — dynamic import, Mermaid or React Flow

### Layer 5: Advanced content sections
27. Blog, ADR, Failure Stories pages (same pattern as Projects)
28. `SolverWizard` interactive wizard
29. Playground / live demos (dynamic, no `generateStaticParams`)
30. `sitemap.ts` — locale-aware sitemap generation

---

## Scalability Considerations

| Concern | Current approach | If content grows |
|---------|-----------------|------------------|
| Build time | `generateStaticParams` over all locale×slug combos | Add `revalidate = 86400` for ISR on rarely-changed pages |
| MDX bundle | `compileMDX` per page at build time | No runtime cost; compiled once |
| Playground (dynamic) | `export const dynamic = 'force-dynamic'` on that route | Move to Vercel Edge Functions if latency matters |
| Images | Vercel Image Optimization + Next.js `<Image>` | Pre-generate OG images with `@vercel/og` at build time |
| Translations | Three JSON files at root `messages/` | Migrate to namespace-per-page if files exceed ~500 keys |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Mode in URL search params
**What:** `?mode=hr` in every URL
**Why bad:** Pollutes canonical URLs, breaks SEO hreflang alternates, complicates every Link generation, loses value on external links
**Instead:** Zustand + localStorage. The mode is a visitor preference, not a content address.

### Anti-Pattern 2: MDX files as App Router pages inside `app/[locale]/`
**What:** Putting `.mdx` files directly at `app/[locale]/projects/my-project/page.mdx`
**Why bad:** next-intl's `setRequestLocale` cannot be called from MDX. Metadata generation is impossible from MDX files. Loses frontmatter typing.
**Instead:** MDX files in `src/content/`, rendered via Server Component pages using `compileMDX`.

### Anti-Pattern 3: Client-side MDX fetching
**What:** Fetching MDX as text in a useEffect and rendering client-side
**Why bad:** Breaks static generation, exposes content to client bundle, kills SEO
**Instead:** All MDX compiled at build time in Server Components via `next-mdx-remote/rsc`.

### Anti-Pattern 4: Single flat messages file
**What:** All three languages' UI strings in one 2000-line file, namespaces mixed
**Why bad:** Merge conflicts as content grows, no namespace isolation, degrades TS type inference
**Instead:** Nested JSON with page-level namespace keys (`{ "HomePage": {}, "Projects": {}, "ViewMode": {} }`).

### Anti-Pattern 5: Skipping `setRequestLocale` in layouts
**What:** Relying on `headers()` for locale resolution in Server Components
**Why bad:** Forces the entire route to dynamic rendering, losing static generation and ISR benefits
**Instead:** Call `setRequestLocale(locale)` in every layout and page that receives `params.locale`.

### Anti-Pattern 6: Heavy clients in root layout
**What:** ArchitectureDiagram, React Flow, or animation libraries imported in `[locale]/layout.tsx`
**Why bad:** Increases initial bundle for every page, even those that never render diagrams
**Instead:** Dynamic imports (`next/dynamic`) with `ssr: false` at the component level.

---

## Sources

- next-intl App Router routing setup: https://github.com/amannn/next-intl/blob/main/docs/src/pages/docs/routing/setup.mdx (Context7, HIGH confidence)
- next-intl static rendering with `setRequestLocale`: https://github.com/amannn/next-intl/blob/main/docs/src/pages/docs/routing/setup.mdx (Context7, HIGH confidence)
- next-intl metadata internationalization: https://github.com/amannn/next-intl/blob/main/docs/src/pages/docs/environments/actions-metadata-route-handlers.mdx (Context7, HIGH confidence)
- Next.js MDX guide (App Router): https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/mdx.mdx (Context7, HIGH confidence)
- Next.js `generateStaticParams`: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-static-params.mdx (Context7, HIGH confidence)
- Next.js `generateMetadata` with OpenGraph: https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/generate-metadata.mdx (Context7, HIGH confidence)
- next-mdx-remote RSC / `compileMDX`: https://github.com/hashicorp/next-mdx-remote/blob/main/README.md (Context7, HIGH confidence)
- Zustand persist middleware: https://github.com/pmndrs/zustand/blob/main/README.md (Context7, HIGH confidence)
- Next.js JSON-LD structured data: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/json-ld.mdx (Context7, HIGH confidence)
