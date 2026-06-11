# Personal Website — Vitalii Popov

## What This Is

A personal website that functions simultaneously as a portfolio, interactive CV, technical blog, business case showcase, and lead generation platform. Built for Vitalii Popov — a full-stack engineer specialized in distributed systems and AI — targeting recruiters, engineering managers, CTOs, founders, and potential freelance clients who need to quickly assess his technical depth, business impact, and engineering thinking.

## Core Value

Visitors can instantly understand the business value Vitalii creates (not just his tech stack), and leave convinced enough to reach out — measured by qualified opportunities generated per month.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with name, role, location, languages, contact buttons and main statement
- [ ] Impact Dashboard with animated counters (€480K saved, 8K users, 3K MAU, 200M indexed, 11.63% uplift), broken down by project like a bank timeline
- [ ] About page with background story, current focus, interests, and career timeline as progression (not job list)
- [ ] Projects section — each project on its own page with: Overview, Solution, Impact, HR/Business/Tech perspectives, Lessons Learned, alive/dead status with reason
- [ ] Project categories: academic, work, hackathons
- [ ] Tri-mode view switcher (HR / Business / Tech) that adapts content and highlights data on every page
- [ ] Skills Explorer — interactive tech map, clicking a skill shows projects, years of experience, problems solved
- [ ] Career RPG — visual level progression (Frontend → Full-Stack → Backend → Distributed Systems → AI Engineer)
- [ ] Architecture Gallery — system diagrams per project (Mermaid or React Flow)
- [ ] "How I Would Solve Your Problem" interactive wizard — visitor selects project type, gets tailored architecture/stack/risks/timeline
- [ ] Failure Stories section — structured: Problem → Mistake → Consequence → Fix → Lesson
- [ ] Engineering Decisions Database — public ADR repository with problem/options/decision/reasoning/outcome format
- [ ] Technical Deep Dives — case-study articles (not tutorials) on architecture, performance, AI, Go, React, Kubernetes
- [ ] Interactive Playground — live demos: semantic search, AI chatbot, recommendation engine, data matching
- [ ] Metrics Page — personal engineering stats (years, projects, technologies, commits, repos, posts), auto-generated
- [ ] Open Source section — repos, stars, contributions, GitHub integration
- [ ] Public Roadmap — current learning goals and active projects (shows growth mindset)
- [ ] Recommendations page — testimonials from colleagues, managers, clients with structured format
- [ ] Multilingual support — English, German, Russian with URL-based localization (/en/, /de/, /ru/) and SEO-friendly routes
- [ ] SEO — per-project metadata, OpenGraph images, structured data; rank for Go/React/full-stack/AI/semantic search keywords
- [ ] Lead generation — contact page with email/LinkedIn/Telegram/GitHub + simple inquiry form
- [ ] CV download link
- [ ] FAQ for common HR questions within project context

### Out of Scope

- Backend CMS / database-driven content — MDX files are the content layer; no database needed for v1
- Real-time collaboration or user accounts — static site with no auth
- Monetization / e-commerce — not a commercial product
- Mobile app — web only
- "Build in Public" daily updates — deferred; nice-to-have after core content is live
- Project Comparison feature — deferred; can add after multiple projects are populated
- Interactive World Map — deferred; nice-to-have, low ROI for v1
- Visitor Mode auto-adaptation — the tri-mode switcher covers the core need; full auto-adaptation is v2

## Context

- Stack is pre-decided: Next.js + TypeScript + Tailwind + shadcn/ui + MDX + next-intl + GA4 + Vercel
- Projects are content-first: the site shell is being built first; individual project pages will be added one by one afterward
- Each project page has its own design and structure — minimal shared layout between projects
- The tri-mode switcher (HR/Business/Tech) must work on every page and surface meaningfully different data or highlights, not just label changes
- Vitalii has strong real metrics to showcase: €480K/year cost savings, 8K users, 3K MAU, 200M products indexed in 5s, 11.63% metric uplift
- Reference CV exists in the repo and must be linked from the site

## Constraints

- **Tech Stack**: Next.js + TypeScript + Tailwind + shadcn/ui + MDX + next-intl — pre-decided, do not change
- **Hosting**: Vercel — serverless deployment, static-first approach preferred
- **Content**: MDX as content layer — no database, no CMS backend for v1
- **Localization**: URL-based i18n via next-intl — /en/, /de/, /ru/ routes required
- **SEO**: Every page needs dedicated metadata and OpenGraph support

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| MDX as content layer (no DB) | Keeps deployment simple on Vercel; content lives with code | — Pending |
| next-intl for i18n | Best-in-class Next.js i18n library with App Router support | — Pending |
| shadcn/ui component library | Pre-built accessible components, easy to theme per project | — Pending |
| Tri-mode switcher as primary UX differentiator | Directly addresses multi-audience problem; shows engineering thinking | — Pending |
| Project pages have unique designs | Differentiator — each project tells its own story visually | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-08 after initialization*
