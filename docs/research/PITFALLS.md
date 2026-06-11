# Domain Pitfalls

**Domain:** Personal portfolio / CV site for a senior engineer (Next.js App Router + MDX + next-intl + Vercel)
**Researched:** 2026-06-08
**Confidence:** HIGH for stack-specific pitfalls (Context7/official docs); MEDIUM for conversion/UX pitfalls (reasoning from known engineering + portfolio domain knowledge)

---

## Critical Pitfalls

Mistakes that cause rewrites, kill conversions, or permanently damage first impressions.

---

### Pitfall 1: The Demo Graveyard — Interactive Features That Never Load

**What goes wrong:** The project lists 7+ interactive features (Skills Explorer, Career RPG, Architecture Gallery, "How I Would Solve Your Problem" wizard, live Playground, animated counters, tri-mode switcher). Each one uses browser-only APIs, third-party libraries, or heavy JS. When built naively as Client Components in Next.js App Router, they cause: (a) large JS bundles that delay hydration, (b) hydration errors from SSR/client mismatch, (c) blank panels on slow connections, and (d) CLS (layout shift) while loading.

**Why it happens:** Developers treat "interactive" as "entire component is a Client Component." The result is shipping 200-500 KB of JavaScript before any interactivity is available. `<Link>` prefetching requires hydration to complete first — large bundles mean prefetching never fires on initial visits.

**Consequences:**
- A recruiter on mobile or slow WiFi sees broken/empty panels
- Google PageSpeed score tanks, hurting SEO
- The "impression of engineering quality" is destroyed by the product's own unreliability
- Hard to fix after-the-fact because the architecture is baked in

**Prevention:**
- Keep Server Components for all non-interactive wrappers; add `'use client'` only to the specific interactive leaf nodes
- Use `next/dynamic` with `ssr: false` for anything using browser APIs (Mermaid diagrams, canvas, React Flow, WebGL)
- Always provide a meaningful `loading` fallback — not a spinner, but skeleton content with the same layout dimensions to prevent CLS
- For animated counters: render static numbers server-side, animate only after hydration
- Target: initial JS bundle under 80 KB compressed; measure with `@next/bundle-analyzer`

**Detection:** Run `next build` and check `First Load JS` in the output table. Any route over 200 KB is a red flag. Use Lighthouse on a simulated 3G connection.

**Business impact:** First impression is everything for a hiring decision. A broken or slow interactive panel signals poor engineering judgment — the opposite of the intended message.

**Phase to address:** Every phase that introduces interactive components. Establish the pattern in Phase 1 before building any feature.

---

### Pitfall 2: Dynamic Rendering Inflation from next-intl — Static Site Becomes Slow SSR Site

**What goes wrong:** By default, when `useTranslations` or `getTranslations` is called in a Server Component, next-intl opts the route into **dynamic rendering** (it internally calls `headers()` to read the locale header set by middleware). A portfolio site that should be 100% static-first becomes a slow SSR site with Vercel cold starts on every request.

**Why it happens:** next-intl's middleware sets an `x-next-intl-locale` header. Reading `headers()` in any Server Component forces dynamic rendering for the entire route tree. If `setRequestLocale(locale)` is not called in every layout and page before any `next-intl` function, every page is server-rendered on request rather than prebuilt at deploy time.

**Consequences:**
- Vercel serverless cold starts (50-300ms added latency) on every visit
- Build-time static generation benefits lost
- Possible `getStaticParams` mismatches causing 404s on valid locale+slug routes

**Prevention (confirmed from official next-intl docs):**
```tsx
// In EVERY layout and page that uses next-intl:
import {setRequestLocale} from 'next-intl/server';
import {hasLocale} from 'next-intl';

export default async function LocaleLayout({children, params}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale); // MUST be before any useTranslations call
  // ...
}
```
Also required: `generateStaticParams` returning all locale combinations for every dynamic route.

**Detection:** After build, check `.next/server/app/` — routes that are `.html` files are static; routes that are `.js` files are dynamic. All portfolio pages should be `.html`.

**Business impact:** A portfolio site with 300ms cold start latency sends a measurable signal to a technical evaluator that the author doesn't understand SSR vs SSG tradeoffs.

**Phase to address:** i18n infrastructure phase (must be correct from the start; retrofitting is error-prone).

---

### Pitfall 3: Content Architecture Mismatch — Per-Locale MDX Files vs Flat MDX + JSON Strings

**What goes wrong:** The project uses MDX as the content layer for long-form project pages. There are two conflicting approaches to localization of MDX content that developers accidentally mix: (a) separate per-locale files (`project-name.en.mdx`, `project-name.de.mdx`, `project-name.ru.mdx`) and (b) a single MDX file with all prose in one language, while UI strings come from `messages/[locale].json`. Mixing these creates a maintenance nightmare and inconsistent behavior.

**Why it happens:** next-intl's own RFC explicitly recommends per-locale MDX files for "long-form content like imprint pages" and notes that `t.raw` (the hack to put HTML in JSON messages) is deprecated and unsupported when messages are precompiled.

**Consequences:**
- Project pages have 3x the files to maintain (one per language)
- If a German translation is missing, there is no fallback — the page 404s or shows raw translation keys
- `generateStaticParams` must enumerate `{locale, slug}` combinations; if locale-specific MDX files don't exist for all locales, the build breaks or serves wrong content
- MDX components (Mermaid diagrams, interactive elements) cannot be JSX-translated — only prose changes between locales

**Prevention:**
- Decide the strategy once and enforce it consistently: recommend **single MDX with English prose** + translated UI strings in JSON for non-prose elements (labels, titles, CTAs). Full per-locale MDX is only needed if the actual prose content differs meaningfully in German/Russian (rarely true for technical case studies)
- Configure `getMessageFallback` in `i18n/request.ts` to fall back to the English key path rather than crashing
- Never use `t.raw` for long-form content

**Detection:** If you find yourself writing `messages/de.json` entries with multi-paragraph HTML strings, you've hit this pitfall.

**Business impact:** Incomplete German/Russian translations that show raw key paths destroy credibility in the localized market. A recruiter reading `projects.impact.description is not yet translated` will not reach out.

**Phase to address:** Content architecture phase. The strategy must be decided before writing any MDX content.

---

### Pitfall 4: Middleware Matcher Misconfiguration — Static Assets Getting Locale-Redirected

**What goes wrong:** The next-intl middleware intercepts requests and redirects them to add a locale prefix. If the middleware matcher is too broad (e.g., `matcher: '/(.*)'`), it will intercept requests to `/favicon.ico`, `/_next/static/`, `/public/cv.pdf`, and similar static assets, causing redirect loops, 404s, or broken asset loading.

**Why it happens:** Developers copy a simple matcher from examples without understanding what it excludes.

**Consequences:**
- CSS and JavaScript files fail to load (broken layout)
- Images and fonts redirect to `/en/image.png` (404)
- The CV PDF download link gets locale-prefixed and breaks
- OpenGraph images served by `/opengraph-image.tsx` route need special exclusion

**Prevention (confirmed from official next-intl docs):**
```ts
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  // The .*\\..* pattern excludes any path containing a dot
  // (file extensions like .ico, .png, .pdf, .js, .css)
};
```
For `opengraph-image.tsx` routes, add explicit exclusion:
```ts
matcher: '/((?!api|_next|_vercel|.*/opengraph-image|.*\\..*).*)'
```

**Detection:** After setup, check that `/favicon.ico`, `/_next/static/chunks/main.js`, and `/public/any-file.pdf` return 200, not 307.

**Business impact:** A broken CV download link on the CV site is a catastrophic first impression failure.

**Phase to address:** i18n infrastructure phase (before any content is wired up).

---

### Pitfall 5: The "Impressive But Empty" Anti-Pattern — Building the Shell Before the Story

**What goes wrong:** The site is built with skeleton layouts, placeholder text, and "Coming soon" sections. The animated Impact Dashboard shows `€0` while the counters load. The Skills Explorer renders an empty graph. Project pages say "Project details coming soon." A recruiter visits, sees a technically slick but contentless site, and leaves. They don't come back.

**Why it happens:** Engineers optimize for code quality and architecture first, content second. This is exactly backward for a portfolio.

**Consequences:**
- A site with 10% of its content live generates zero leads
- Recruiters and hiring managers make their decision in the first 30 seconds; empty sections mean "no decision = no reach out"
- The business value (€480K saved, etc.) — the entire core value proposition — never gets seen

**Prevention:**
- Content-first development: write one complete project case study in English before building any interactive component
- The Impact Dashboard numbers must be hardcoded/static in the HTML from day one (animate on load, but never show zeros)
- Deploy a minimal but complete version — Hero + About + 1 project + Contact — before adding any advanced interactive feature
- Every interactive feature must degrade gracefully to static content (the wizard shows a static architecture recommendation if the API fails)

**Detection:** If `git log` shows 10 commits of UI work but zero commits of MDX content, you've hit this pitfall.

**Business impact:** Direct 1:1 correlation with zero leads generated. The site's entire purpose is defeated.

**Phase to address:** Phase 1. Non-negotiable: real content ships before interactive features.

---

### Pitfall 6: The Tri-Mode Switcher Becoming a Label-Changer

**What goes wrong:** The HR/Business/Tech mode switcher is implemented as a filter that changes CSS classes or hides/shows divs. Switching from "HR" to "Tech" mode reveals bullet points with the same information but different wording. Visitors notice immediately that it's cosmetic. The feature that was supposed to be a differentiator becomes evidence of feature bloat.

**Why it happens:** The concept is architecturally harder than it looks. Truly different content per mode requires separate content authored per mode, not content tagged for filtering.

**Consequences:**
- The feature that was supposed to demonstrate "engineering thinking about audience" demonstrates the opposite
- Adds JavaScript complexity and bundle weight for zero conversion lift
- May cause hydration issues if mode state is stored in localStorage and differs from SSR output

**Prevention:**
- Define a concrete content contract before building: what information does the HR view contain that the Tech view does NOT, and vice versa? Write it out for one project page
- Use URL state (`?view=hr`) rather than localStorage to keep SSR and client in sync (avoids hydration flash)
- If the content difference cannot be articulated concretely, descope the feature to a static "structured" layout that works for all audiences
- The animated counters (€480K, etc.) should be the primary "business impact" signal visible to all modes

**Detection:** Write out the HR version and Tech version of the same project summary. If they differ by fewer than 3 substantial facts, the feature is cosmetic.

**Business impact:** A cosmetic feature disguised as a differentiator is worse than no feature — it signals prioritizing appearance over substance, which is the opposite of what a senior engineer wants to project.

**Phase to address:** Feature planning phase, before any implementation. If scoped correctly, can be built cleanly; if scoped vaguely, should be deferred.

---

## Moderate Pitfalls

---

### Pitfall 7: MDX + next-intl generateStaticParams Must Include All Locale+Slug Combinations

**What goes wrong:** When project pages live at `/[locale]/projects/[slug]`, `generateStaticParams` must return all combinations: `[{locale: 'en', slug: 'project-a'}, {locale: 'de', slug: 'project-a'}, {locale: 'ru', slug: 'project-a'}, ...]`. If only slugs are returned (forgetting the locale dimension), the build generates routes for the default locale only. All other locale routes return 404 in production.

**Prevention:**
```tsx
export function generateStaticParams() {
  return routing.locales.flatMap(locale =>
    projectSlugs.map(slug => ({locale, slug}))
  );
}
export const dynamicParams = false;
```

**Detection:** After `next build`, attempt to access `/de/projects/[slug]` — it should be a static HTML file, not a 404.

**Phase to address:** Project pages phase.

---

### Pitfall 8: hreflang / Alternate Links Missing or Wrong — SEO Penalty

**What goes wrong:** A trilingual site without correct `hreflang` alternate link tags gets penalized by Google for duplicate content. next-intl's middleware auto-generates `link` response headers with `hreflang` entries, but only if `alternateLinks` is not disabled. Additionally, `metadataBase` must be set in the root layout for Next.js to generate correct absolute URLs in `alternates.languages`.

**Prevention:**
- Keep `alternateLinks: true` (the default) in `defineRouting`
- Set `metadataBase: new URL('https://yourdomain.com')` in the root layout's `metadata` export
- For project pages, use `generateMetadata` with `getTranslations` to produce localized `<title>` and `description` per locale

**Detection:** Use Google Search Console or `curl -I` against the site root to verify `link` headers include `hreflang="en"`, `hreflang="de"`, `hreflang="ru"`, `hreflang="x-default"`.

**Phase to address:** i18n infrastructure + SEO phase.

---

### Pitfall 9: Hydration Mismatch from Theme / Mode State in localStorage

**What goes wrong:** The tri-mode switcher state (HR/Business/Tech) or a dark/light theme stored in `localStorage` causes React hydration warnings or visible flicker (FOUC — Flash of Unstyled Content). The server renders with a default state; the client reads `localStorage` and renders a different state; React sees a mismatch.

**Prevention (confirmed from official Next.js docs):**
- For theme: use an inline `<script>` in the root layout that sets a `data-theme` attribute before React hydrates, combined with `suppressHydrationWarning` on `<html>`
- For tri-mode state: store in URL query params (`?view=hr`) so SSR and client always agree; fall back to cookie-based approach if URL params are undesirable

**Detection:** Open the browser console — React hydration warnings are explicit. Also check for a visible "flash" on first load.

**Phase to address:** Any phase that introduces client state tied to visual presentation.

---

### Pitfall 10: Mermaid / React Flow Diagrams Crashing SSR

**What goes wrong:** The Architecture Gallery uses Mermaid or React Flow for system diagrams. Both libraries access `window`, `document`, or `ResizeObserver` on import, which crashes during Next.js server-side rendering.

**Prevention:**
```tsx
// Use dynamic import with ssr: false for any diagram library
const ArchitectureDiagram = dynamic(
  () => import('@/components/ArchitectureDiagram'),
  { ssr: false, loading: () => <DiagramSkeleton /> }
);
```

**Detection:** If `next build` throws `ReferenceError: window is not defined` in a diagram-related component, this is the cause.

**Phase to address:** Architecture Gallery phase.

---

### Pitfall 11: Contact Form / Inquiry Form Without Real Delivery

**What goes wrong:** The inquiry form is built as a visual component but the submission either goes nowhere (no API route), lands in a Vercel serverless function that silently fails, or sends to an email that isn't monitored. The lead generation purpose of the site is completely defeated.

**Prevention:**
- Wire the form to a real delivery mechanism before launch: Resend, EmailJS, or Formspree as the simplest options on Vercel
- Test with a real submission before declaring the form "done"
- Add a visible success/error state to the form — not just a toast that disappears

**Detection:** Submit the form yourself and verify you receive the email within 2 minutes.

**Phase to address:** Contact / lead generation phase. Must be verified end-to-end.

---

### Pitfall 12: OpenGraph Images Missing or Generic Across All Pages

**What goes wrong:** Every project page, blog post, and case study shares the same generic OpenGraph image (the default Next.js OG or a plain logo). When a recruiter shares a project link on LinkedIn, it shows a blank or generic card. This is a missed opportunity and signals low attention to detail.

**Prevention:**
- Next.js App Router supports per-route `opengraph-image.tsx` files using the `ImageResponse` API — use this to generate OG images that include the project title and key metric at build time
- For the opengraph-image route to work with next-intl middleware, the matcher must explicitly exclude `opengraph-image` paths (see Pitfall 4)

**Detection:** Use the LinkedIn Post Inspector or Twitter Card Validator on each project URL.

**Phase to address:** SEO + project pages phase.

---

### Pitfall 13: Font Subsets Missing for Cyrillic (Russian locale)

**What goes wrong:** `next/font/google` is configured with `subsets: ['latin']` only. The Russian locale (`/ru/`) renders in a browser-default fallback font because the Cyrillic character set was never loaded. This looks broken and unprofessional.

**Prevention:**
```tsx
const font = Inter({
  subsets: ['latin', 'cyrillic'], // Russian requires cyrillic subset
});
```

**Detection:** Visit any `/ru/` page — if the font looks different from `/en/` pages, Cyrillic subset is missing.

**Phase to address:** i18n infrastructure phase / typography setup.

---

## Minor Pitfalls

---

### Pitfall 14: GA4 Script Blocking Interactivity

**What goes wrong:** Google Analytics script is loaded with `strategy="beforeInteractive"` or placed in `<head>` manually. This blocks page hydration and adds 50-150ms to Time to Interactive.

**Prevention:** Use `@next/third-parties/google`'s `<GoogleAnalytics>` component, which defaults to `afterInteractive` strategy — it loads after hydration and does not block anything.

**Phase to address:** Analytics setup.

---

### Pitfall 15: Missing `notFound()` for Invalid Locales

**What goes wrong:** A request to `/xx/about` (invalid locale) falls through to the layout, which calls `useTranslations` with `'xx'` as the locale. next-intl throws an error or renders keys, and the error propagates as a 500 rather than a clean 404.

**Prevention:**
```tsx
const {locale} = await params;
if (!hasLocale(routing.locales, locale)) notFound(); // Returns 404 cleanly
```
This is confirmed in next-intl's official setup docs and must be present in the root `[locale]/layout.tsx`.

**Phase to address:** i18n infrastructure phase.

---

### Pitfall 16: `dynamicParams = false` Missing on Project Pages

**What goes wrong:** Without `export const dynamicParams = false` on the `[slug]` project page, a request to a non-existent slug (e.g., `/en/projects/typo-in-url`) triggers a runtime import of a non-existent MDX file, throwing a 500 error instead of returning 404.

**Prevention:**
```tsx
export const dynamicParams = false; // Non-listed slugs → 404 automatically
```

**Phase to address:** Project pages phase.

---

### Pitfall 17: Missing Translation Keys in DE/RU Not Caught Until Runtime

**What goes wrong:** The English `messages/en.json` is complete. German `messages/de.json` has 40% coverage. The build succeeds. German pages silently render raw key paths (`projects.timeline.title is not yet translated`) in production.

**Prevention:**
- Configure `onError` + `getMessageFallback` in `i18n/request.ts` to log missing keys as errors and fall back to the English value (not the key path)
- Add a CI check that counts missing keys per locale and fails if coverage drops below threshold
- Use a type-safe approach: `next-intl` supports TypeScript types derived from the English message file, so using a German key that doesn't exist is a compile-time error

**Phase to address:** i18n infrastructure phase + every content addition phase.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| i18n setup | Dynamic rendering inflation (Pitfall 2) | `setRequestLocale` in every layout/page from day one |
| i18n setup | Middleware matcher too broad (Pitfall 4) | Use the official matcher pattern excluding dots |
| i18n setup | Missing Cyrillic font subset (Pitfall 13) | Add `'cyrillic'` to font subsets config |
| i18n setup | Invalid locale → 500 instead of 404 (Pitfall 15) | `hasLocale` guard in root layout |
| Content architecture | MDX strategy inconsistency (Pitfall 3) | Decide prose-in-MDX vs prose-in-JSON once, enforce globally |
| First deploy | Empty/placeholder content kills conversion (Pitfall 5) | Ship 1 real project case study before any interactive feature |
| Interactive components | Hydration mismatch / SSR crash (Pitfalls 9, 10) | `dynamic({ ssr: false })` for browser-only libs; URL state for persistent UI state |
| Interactive components | Bundle size / slow hydration (Pitfall 1) | `use client` only at leaf nodes; measure bundle after each feature |
| Tri-mode switcher | Cosmetic label-changer (Pitfall 6) | Content contract written before any code |
| Project pages | Locale+slug generateStaticParams incomplete (Pitfall 7) | `routing.locales.flatMap(...)` pattern |
| Project pages | Non-existent slug → 500 (Pitfall 16) | `dynamicParams = false` |
| SEO | Missing hreflang + metadataBase (Pitfall 8) | Set `metadataBase` in root layout; verify Link headers |
| SEO | Generic OG images (Pitfall 12) | Per-route `opengraph-image.tsx` with `ImageResponse` |
| Lead generation | Contact form not delivering (Pitfall 11) | End-to-end test before launch |
| Analytics | GA4 blocking hydration (Pitfall 14) | `@next/third-parties/google` with default `afterInteractive` |

---

## Sources

- next-intl official docs: static rendering, `setRequestLocale`, `generateStaticParams`, middleware matcher, error handling — via Context7 `/amannn/next-intl` (HIGH confidence)
- Next.js official docs: App Router MDX, `dynamic({ ssr: false })`, bundle size, hydration flash prevention, metadata API, `generateStaticParams`, `dynamicParams`, font optimization, `@next/third-parties` — via Context7 `/vercel/next.js` (HIGH confidence)
- Portfolio/conversion pitfalls: derived from project requirements analysis + known engineering domain patterns (MEDIUM confidence — no external source available due to WebSearch restriction)
