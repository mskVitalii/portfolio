# Technology Stack

**Project:** Vitalii Popov — Personal Portfolio / Interactive CV / Technical Blog
**Researched:** 2026-06-08
**Overall confidence:** HIGH (all key claims verified via Context7 official docs or npm registry)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.2.7 (latest stable) | Full-stack React framework | App Router is mature, RSC enables hybrid static/dynamic rendering, `next/image`, `next/font`, `next/og` are all first-class; Vercel deploys it with zero config |
| React | 19.x (bundled with Next 16) | UI runtime | RSC + Suspense streaming; no separate install needed |
| TypeScript | 5.x (bundled) | Type safety | `strict: true` mode required; Next.js ships a `next` TS plugin for App Router type inference |

**tsconfig.json baseline (do not deviate):**
```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  }
}
```

The `next` plugin validates route-segment type exports (`generateMetadata`, `generateStaticParams`, etc.) at IDE level — do not omit it.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.3.0 | Utility-first CSS | v4 drops `tailwind.config.js` — configuration moves entirely into CSS via `@theme inline`. Massive DX improvement; shadcn/ui v4+ requires it |
| shadcn/ui (CLI) | 4.8.2 | Component library | Not a package — components are copied into your repo via `npx shadcn@latest add`. You own the code. Ships Tailwind v4 + OKLCH color variables out of the box |
| tailwind-merge | 3.6.0 | Class conflict resolution | Required companion for shadcn/ui; resolves `cn()` utility conflicts (e.g., `text-red-500` + `text-blue-500`) |
| next-themes | 0.4.6 | Dark/light mode | Integrates with shadcn/ui's class-based dark mode; `suppressHydrationWarning` on `<html>` is mandatory in App Router |

**Critical Tailwind v4 note:** There is no `tailwind.config.js`. All configuration — colors, spacing, custom variants — lives in your CSS entry file via `@theme inline {}`. If you find tutorials using `tailwind.config.js`, they are targeting v3 and are stale.

**shadcn/ui color tokens in v4 use OKLCH:**
```css
@import "tailwindcss";
@plugin "tailwindcss-animate";
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --primary: oklch(0.205 0 0);
}
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
}
```

---

### Content Layer (MDX)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/mdx` | 16.2.7 | MDX compiler | Official Next.js integration; uses the fast Rust-based MDX compiler (opt-in via `experimental.mdxRs`); correct choice when MDX files live in the repo and are imported directly |
| `next-mdx-remote` | 6.0.0 | Remote/dynamic MDX | Use this when MDX content is read from the filesystem at runtime (e.g., blog posts from `content/` directory) rather than statically imported. Supports App Router RSC via `next-mdx-remote/rsc` |
| rehype-pretty-code | 0.14.3 | Code block syntax highlighting | Wraps Shiki; dual-theme (dark+light) support via CSS custom properties; correct choice over `@shikijs/rehype` for MDX pipelines because it handles line numbers, line highlighting, and word highlighting out of the box |

**Use `@next/mdx` for static pages (About, ADR entries that are checked in). Use `next-mdx-remote/rsc` for the blog and any content loaded from `content/` directory at build time.**

**next.config.mjs — canonical plugin composition order:**
```js
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({ requestConfig: './src/i18n/request.ts' });
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: { dark: 'github-dark-dimmed', light: 'github-light' } }]],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withNextIntl(withMDX(nextConfig));
```

`withNextIntl` must be the **outermost** wrapper. `withMDX` is inner. This order is confirmed by next-intl's own example repo.

---

### Internationalization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next-intl | 4.13.0 | i18n routing + translations | Best-in-class for App Router; supports RSC natively (`useTranslations` works in Server Components without extra providers); handles locale routing, hreflang headers, sitemap generation, and `generateMetadata` localization |

**Canonical file structure for next-intl with App Router:**
```
src/
  i18n/
    routing.ts          ← defineRouting({ locales: ['en','de','ru'], defaultLocale: 'en' })
    request.ts          ← getRequestConfig — maps [locale] segment to message files
    navigation.ts       ← createNavigation(routing) — exports Link, redirect, useRouter
  middleware.ts         ← createMiddleware(routing) — handles locale redirects
  app/
    [locale]/
      layout.tsx        ← NextIntlClientProvider + hasLocale() validation
      page.tsx
messages/
  en.json
  de.json
  ru.json
```

**Middleware matcher (correct pattern):**
```ts
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**Server Component translation** (no `'use client'` needed):
```tsx
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

**Metadata localization:**
```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: t('title') };
}
```

**Static generation for all locales:**
```tsx
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

**MDX + next-intl for blog posts:** Blog post MDX files live in locale-specific directories (`content/en/blog/`, `content/de/blog/`). The `[locale]/blog/[slug]/page.tsx` reads from the correct directory based on `params.locale`. Translations for UI chrome (navigation, footer) live in `messages/`. Translations for MDX content live in the MDX files themselves, not in message files.

---

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/third-parties` | 16.2.7 | GA4 integration | Official Next.js package; `GoogleAnalytics` component handles script loading with `afterInteractive` strategy automatically; `sendGAEvent` for custom events; no separate `react-ga4` needed |

```tsx
// app/[locale]/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
```

Do NOT use `react-ga4` — it's a third-party wrapper that adds overhead and doesn't understand Next.js's script loading lifecycle.

---

### Deployment

| Technology | Purpose | Config |
|------------|---------|--------|
| Vercel | Hosting | Zero-config; automatically detects Next.js; middleware runs on Edge globally |

**Vercel-specific notes:**
- next-intl middleware runs on Vercel's Edge Network (not serverless functions) — locale detection and redirects are globally distributed, zero cold start
- Image Optimization is automatic via `next/image` — no `sharp` install needed on Vercel (only needed for self-hosting)
- OG image generation via `next/og` (`ImageResponse`) runs on the Edge Runtime — must avoid Node.js-only APIs in OG route handlers
- ISR works correctly on Vercel with global CDN propagation (self-hosted ISR does NOT persist across restarts)
- No `vercel.json` needed for standard Next.js deployments
- Environment variables: use Vercel Dashboard → Settings → Environment Variables; prefix with `NEXT_PUBLIC_` only for client-exposed values

**Do NOT use `output: 'export'` (static export).** This project uses next-intl middleware and dynamic OG images — both require a server runtime. Static export breaks middleware.

---

## Complementary Libraries

### Animations

| Library | Version | Purpose | Why / When |
|---------|---------|---------|-----------|
| Motion (`motion/react`) | 12.40.0 | Page transitions, scroll animations, counter animations, interactive UI | The canonical React animation library (formerly Framer Motion, rebranded to `motion`). Install via `npm install motion`. Use `motion.div` for animated elements. `whileInView` for scroll-triggered entry animations. `AnimatePresence` for exit animations (tri-mode switcher transitions). `useScroll` + `useTransform` for scroll-linked effects (progress bars, parallax). Motion components are **Client Components** — keep animation wrappers thin and push data fetching to Server Components above them |

**Import pattern (not `framer-motion`):**
```tsx
'use client';
import { motion, AnimatePresence } from 'motion/react';
```

Do NOT import from `framer-motion` — the package is now `motion`. The old name still works but is stale.

### Animated Counters (Impact Dashboard)

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-countup | 6.5.3 | Animated number counters | For the Impact Dashboard (€480K, 8K users, etc.). Use `useCountUp` hook with `useInView` from Motion for scroll-triggered starts. Simple API, no dependencies |

```tsx
'use client';
import CountUp from 'react-countup';
// Start animation when element enters viewport via intersection observer prop
<CountUp end={480000} prefix="€" suffix="K" enableScrollSpy scrollSpyOnce />
```

### Diagrams

| Library | Version | Purpose | Why / When |
|---------|---------|---------|-----------|
| React Flow (`@xyflow/react`) | 12.11.0 | Interactive architecture diagrams (Architecture Gallery, Skills Explorer node map) | Fully interactive: drag, zoom, pan, custom nodes. Correct choice when diagrams need to be explorable. Must be `'use client'` — it's entirely DOM-based. Use for: Skills Explorer (tech graph), Architecture Gallery (system diagrams per project), Career RPG visualization |
| Mermaid | 11.15.0 | Static/semi-static diagrams in MDX | Use within MDX blog posts and project pages for architecture diagrams that don't need interactivity. Render server-side via `rehype-mermaid` plugin or client-side via dynamic import. Do NOT bundle Mermaid in the main JS bundle — always lazy-load |

**React Flow requires a height on its container:**
```tsx
'use client';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // or dist/base.css for unstyled

<div style={{ height: 500 }}>
  <ReactFlow nodes={nodes} edges={edges} fitView />
</div>
```

### Code Highlighting

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| rehype-pretty-code + Shiki | 0.14.3 / 4.2.0 | Syntax highlighting in MDX | rehype-pretty-code wraps Shiki and integrates into the remark/rehype MDX pipeline at build time — zero runtime cost. Dual-theme (dark+light) via CSS custom properties that sync with next-themes class toggling. Use `transformerNotationHighlight()` and `transformerNotationWordHighlight()` from `@shikijs/transformers` for line/word callouts in technical blog posts |

**Dual-theme CSS (add to globals.css):**
```css
code[data-theme*=" "],
code[data-theme*=" "] span {
  color: var(--shiki-light);
  background-color: var(--shiki-light-bg);
}
.dark code[data-theme*=" "],
.dark code[data-theme*=" "] span {
  color: var(--shiki-dark);
  background-color: var(--shiki-dark-bg);
}
```

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

Use `next/font/google` (built into Next.js — no extra install). Fonts are self-hosted at build time; no Google DNS requests from browser:

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });
```

Include `cyrillic` subset for Russian locale support.

---

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

---

## Integration Gotchas

### 1. next-intl + next-themes: Locale in `<html lang>` attribute

next-themes needs `suppressHydrationWarning` on `<html>`. next-intl needs the locale in `lang`. Wire them together correctly:

```tsx
// app/[locale]/layout.tsx
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 2. Motion + Server Components boundary

`motion.div` requires `'use client'`. Pattern: keep animation as a thin wrapper, push RSC data above it:

```tsx
// server component (page.tsx)
const posts = await getPosts(locale);
return <BlogListAnimated posts={posts} />;

// 'use client' component
'use client';
import { motion } from 'motion/react';
export function BlogListAnimated({ posts }) {
  return posts.map((post, i) => (
    <motion.div key={post.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
      <PostCard post={post} />
    </motion.div>
  ));
}
```

### 3. MDX + next-intl: Do NOT put translated strings in MDX frontmatter

Frontmatter is not processed by next-intl's message system. For localized blog content: maintain separate MDX files per locale in `content/[locale]/blog/`. For UI strings (labels, buttons, nav), use `messages/*.json`. Mixing the two creates maintenance hell.

### 4. Mermaid in MDX: Always lazy-load

Mermaid's bundle is ~3MB. Never statically import it. Use dynamic import with a custom MDX component:

```tsx
// components/mdx/MermaidDiagram.tsx
'use client';
import dynamic from 'next/dynamic';
const Mermaid = dynamic(() => import('./MermaidRenderer'), { ssr: false });
export { Mermaid };
```

### 5. React Flow: Must set explicit height on container

React Flow uses a `position: absolute` layout internally. Without a fixed height on the parent, it renders invisible. Use Tailwind `h-[500px]` or a CSS custom property.

### 6. OG images + next-intl locale param

OG images live in `app/[locale]/opengraph-image.tsx`. They receive `params.locale` and should generate locale-aware images:

```tsx
export default async function Image({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'OG' });
  return new ImageResponse(<div>{t('title')}</div>, { width: 1200, height: 630 });
}
```

### 7. Date formatting hydration mismatch with next-intl

`new Date()` in render causes hydration mismatches. Use React's `cache()` to create a singleton `Date` per request:

```tsx
import { cache } from 'react';
export const getNow = cache(() => new Date());
```

### 8. Tailwind v4 + shadcn/ui: No `tailwind.config.js`

When running `npx shadcn@latest init`, select Tailwind CSS v4 mode. The CLI generates CSS variable setup in your CSS file, not a JS config file. Any Tailwind plugins (e.g., `tailwindcss-animate`) are added via `@plugin "tailwindcss-animate"` in CSS.

### 9. next-intl middleware + Vercel Edge

next-intl middleware runs on Vercel's Edge Runtime (globally distributed). Keep middleware thin — no database calls, no heavy computation. Locale negotiation and redirect is the only job.

### 10. Static generation with `generateStaticParams` for all locale+slug combos

For blog posts, you need both locale and slug in `generateStaticParams`:

```tsx
export async function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    const posts = await getPostsByLocale(locale);
    posts.forEach(post => params.push({ locale, slug: post.slug }));
  }
  return params;
}
```

---

## Installation

```bash
# Bootstrap
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir

# Shadcn/ui (interactive setup, select Tailwind v4 when prompted)
npx shadcn@latest init

# Add common components
npx shadcn@latest add button card badge separator navigation-menu

# i18n
npm install next-intl

# MDX
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm rehype-pretty-code
npm install next-mdx-remote  # for filesystem blog posts

# Animation
npm install motion

# Counters
npm install react-countup

# Diagrams
npm install @xyflow/react mermaid

# Forms
npm install react-hook-form zod @hookform/resolvers

# Theme
npm install next-themes

# Dev
npm install -D @next/bundle-analyzer
```

---

## Project Structure (recommended)

```
src/
  app/
    [locale]/
      layout.tsx              ← NextIntlClientProvider, ThemeProvider, next/font
      page.tsx                ← Hero section
      about/page.tsx
      blog/
        page.tsx
        [slug]/page.tsx
      projects/
        [category]/[slug]/page.tsx
      opengraph-image.tsx     ← Per-locale OG images
  components/
    ui/                       ← shadcn/ui components (owned code)
    animations/               ← 'use client' Motion wrappers
    diagrams/                 ← React Flow components ('use client')
    mdx/                      ← Custom MDX component overrides
  i18n/
    routing.ts
    request.ts
    navigation.ts
  lib/
    utils.ts                  ← cn() helper (tailwind-merge + clsx)
  middleware.ts               ← next-intl createMiddleware
content/
  en/
    blog/
    projects/
  de/
    blog/
  ru/
    blog/
messages/
  en.json
  de.json
  ru.json
```

---

## Sources

- Next.js App Router docs (verified via Context7 `/vercel/next.js`, version 16.2.7): https://nextjs.org/docs
- next-intl docs (verified via Context7 `/amannn/next-intl`, version 4.13.0): https://next-intl.dev
- shadcn/ui changelog (verified via Context7 `/shadcn-ui/ui`, CLI version 4.8.2): https://ui.shadcn.com
- Motion docs (verified via Context7 `/websites/motion_dev`, version 12.40.0): https://motion.dev
- rehype-pretty-code docs (verified via Context7 `/rehype-pretty/rehype-pretty-code`, version 0.14.3)
- React Flow docs (verified via Context7 `/websites/reactflow_dev`, version 12.11.0): https://reactflow.dev
- Vercel Next.js deployment docs (verified via WebFetch): https://vercel.com/docs/frameworks/nextjs
- All package versions verified via npm registry (2026-06-08)
