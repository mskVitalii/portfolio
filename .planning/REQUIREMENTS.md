# Requirements: Personal Website — Vitalii Popov

**Defined:** 2026-06-09
**Core Value:** Visitors can instantly understand the business value Vitalii creates and leave convinced enough to reach out — measured by qualified opportunities generated per month.

---

## v1 Requirements

### Foundation (FOUND)

- [ ] **FOUND-01**: Site runs on Next.js 16.x App Router with TypeScript strict mode, Tailwind v4, shadcn/ui, deployed on Vercel
- [ ] **FOUND-02**: next-intl i18n routing configured with URL-based locale segments (/en/, /de/, /ru/) and correct middleware matcher (excludes dotted paths)
- [ ] **FOUND-03**: All pages statically pre-rendered at build time (setRequestLocale pattern enforced; no dynamic SSR on portfolio routes)
- [ ] **FOUND-04**: Dark/light mode toggle with system-aware default via next-themes
- [ ] **FOUND-05**: Mobile-responsive layout across all pages (≥360px viewport)
- [ ] **FOUND-06**: MDX content pipeline configured (next-mdx-remote/rsc for filesystem content, rehype-pretty-code for code highlighting)
- [ ] **FOUND-07**: MDX localization strategy established (single English MDX with locale fallback, not per-locale file proliferation)
- [ ] **FOUND-08**: ViewMode context (HR/Business/Tech) implemented as Zustand store with localStorage persistence, accessible across all pages

### Home & Identity (HOME)

- [ ] **HOME-01**: Hero section displays name, role, current location, spoken languages, and contact buttons above the fold
- [ ] **HOME-02**: Hero headline communicates primary value proposition ("Full-stack engineer focused on building systems that create measurable business value")
- [ ] **HOME-03**: Impact Dashboard shows 5 animated counter metrics: €480K saved, 8K users, 3K MAU, 200M items indexed, 11.63% uplift — each linking to its source project
- [ ] **HOME-04**: Impact Dashboard includes a project-attribution timeline breakdown (bar-chart style showing which project contributes to each metric)
- [ ] **HOME-05**: About page with short story (background, current focus, interests) and career timeline presented as progression (not job list)
- [ ] **HOME-06**: CV download link accessible from navigation and/or about page

### Projects (PROJ)

- [ ] **PROJ-01**: Projects listing page shows all projects with category filter (academic / work / hackathon)
- [ ] **PROJ-02**: Each project has a dedicated page with: Overview (problem), Solution (what was built), Impact (metrics), HR view, Business view, Tech view, Lessons Learned
- [ ] **PROJ-03**: Each project displays alive/dead status with reason if dead
- [ ] **PROJ-04**: Tri-mode switcher (HR/Business/Tech toggle) is visible and functional on every page with project content
- [ ] **PROJ-05**: Tri-mode content contract defined — each mode surfaces genuinely different information (HR: keywords/timeline/role; Business: ROI/metrics/domain impact; Tech: architecture/decisions/stack)
- [ ] **PROJ-06**: Architecture Gallery section on each project page displays system diagram (Mermaid or React Flow, lazy-loaded, ssr: false)
- [ ] **PROJ-07**: Projects section infrastructure built first with 2–3 real project case studies fully written across all three modes before interactive layers are added

### Depth Content (DEPTH)

- [ ] **DEPTH-01**: Failure Stories section with at least 2 entries structured as: Problem → Mistake → Consequence → Fix → Lesson
- [ ] **DEPTH-02**: Engineering Decisions Database (ADR) with at least 3 entries in format: Problem / Options / Decision / Reasoning / Tradeoffs / Outcome
- [ ] **DEPTH-03**: Technical Deep Dives section — case-study articles (not tutorials) covering architecture, performance, AI, Go, or Kubernetes; at least 1 entry for v1
- [ ] **DEPTH-04**: Architecture Gallery standalone page linking to all project architecture diagrams

### Skills Explorer (SKILL)

- [ ] **SKILL-01**: Interactive skills graph displays technologies grouped by domain (Backend, Frontend, Infrastructure, AI)
- [ ] **SKILL-02**: Clicking a skill reveals: projects that used it, approximate years of experience, type of problems solved
- [ ] **SKILL-03**: Skills are linked to project pages (not just labels)

### Open Source & Presence (OS)

- [ ] **OS-01**: Open Source section shows GitHub repositories, stars, and notable contributions via GitHub API
- [ ] **OS-02**: Public Roadmap page lists current learning goals and active projects (3–5 items, kept current)
- [ ] **OS-03**: Recommendations page shows testimonials with: person name, role, company, feedback text, and LinkedIn URL

### Lead Generation & Contact (LEAD)

- [ ] **LEAD-01**: Contact page provides email, LinkedIn, Telegram, and GitHub links
- [ ] **LEAD-02**: Simple inquiry form on contact page with name, email, subject, message fields and validation
- [ ] **LEAD-03**: FAQ section answers common questions (visa/relocation/rates/availability) either on contact page or accessible from it

### SEO & Multilingual (SEO)

- [ ] **SEO-01**: Every page has dedicated meta title, description, and canonical URL
- [ ] **SEO-02**: Every page has locale-aware OpenGraph images (next/og, locale param)
- [ ] **SEO-03**: Structured data (JSON-LD) on project pages and home page
- [ ] **SEO-04**: Locale-aware sitemap with hreflang alternates for all three languages
- [ ] **SEO-05**: English content complete for v1 launch; German and Russian UI strings translated (nav, footer, CTAs)
- [ ] **SEO-06**: Site targets keywords: "Go developer", "full-stack engineer", "React developer", "semantic search engineer", "AI engineer"

---

## v2 Requirements

### Career Visualization

- **VIZ-01**: Career RPG — visual level progression (Frontend Developer → Full-Stack → Backend → Distributed Systems → AI Engineer) with milestone annotations per level; tasteful, not literal game UI
- **VIZ-02**: Metrics Page — auto-generated personal engineering stats (years, projects, technologies, commits, repos, posts)

### Interactive Wizard

- **WIZ-01**: "How I Would Solve Your Problem" wizard — visitor selects project type (Startup/SaaS/AI Product/Marketplace/Enterprise), site generates: architecture approach, recommended stack, risks, timeline, cost considerations
- **WIZ-02**: Wizard output references Vitalii's real projects and decisions, not generic boilerplate

### Live Playground

- **PLAY-01**: Interactive playground with semantic search demo against a real dataset
- **PLAY-02**: AI chatbot demo
- **PLAY-03**: Playground fallback: video recording if live demos are not stable (slow/unreliable demos are worse than no demo)

### Full Multilingual Content

- **I18N-01**: Full German prose translation for all project case studies (EN content is complete for v1)
- **I18N-02**: Full Russian prose translation for all project case studies
- **I18N-03**: Per-project metadata translated to DE and RU

### Other

- **MISC-01**: LLMs.txt route at /llms.txt — structured plain-text profile for LLM crawlers
- **MISC-02**: Visitor Mode auto-adaptation — entire site adapts automatically to selected audience type without manual toggle

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend CMS / database | MDX files are the content layer; no database needed for portfolio content |
| User accounts / auth | Static site; no authenticated users |
| "Build in Public" daily/weekly updates | Maintenance overhead too high; nice-to-have but not core |
| Project Comparison side-by-side | Can add after multiple projects populated; not critical for v1 |
| Interactive World Map | Low ROI for conversion; deferred indefinitely |
| Mobile app | Web-only; mobile-responsive web covers the need |
| Monetization / e-commerce | Not a commercial product |
| Skill progress bars / percentages | Anti-pattern — signals insecurity; replaced by SKILL-02 (project-linked graph) |
| Typing/typewriter hero animations | Overused, slows reading, reads as junior |
| Auto-playing animations / parallax overdrive | Distracts from content; violates prefers-reduced-motion |

---

## Traceability

*(To be filled during roadmap creation — each requirement maps to exactly one phase)*

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | — | Pending |
| FOUND-02 | — | Pending |
| FOUND-03 | — | Pending |
| FOUND-04 | — | Pending |
| FOUND-05 | — | Pending |
| FOUND-06 | — | Pending |
| FOUND-07 | — | Pending |
| FOUND-08 | — | Pending |
| HOME-01 | — | Pending |
| HOME-02 | — | Pending |
| HOME-03 | — | Pending |
| HOME-04 | — | Pending |
| HOME-05 | — | Pending |
| HOME-06 | — | Pending |
| PROJ-01 | — | Pending |
| PROJ-02 | — | Pending |
| PROJ-03 | — | Pending |
| PROJ-04 | — | Pending |
| PROJ-05 | — | Pending |
| PROJ-06 | — | Pending |
| PROJ-07 | — | Pending |
| DEPTH-01 | — | Pending |
| DEPTH-02 | — | Pending |
| DEPTH-03 | — | Pending |
| DEPTH-04 | — | Pending |
| SKILL-01 | — | Pending |
| SKILL-02 | — | Pending |
| SKILL-03 | — | Pending |
| OS-01 | — | Pending |
| OS-02 | — | Pending |
| OS-03 | — | Pending |
| LEAD-01 | — | Pending |
| LEAD-02 | — | Pending |
| LEAD-03 | — | Pending |
| SEO-01 | — | Pending |
| SEO-02 | — | Pending |
| SEO-03 | — | Pending |
| SEO-04 | — | Pending |
| SEO-05 | — | Pending |
| SEO-06 | — | Pending |

**Coverage:**
- v1 requirements: 39 total
- Mapped to phases: 0 (pending roadmap)
- Unmapped: 39 ⚠️

---
*Requirements defined: 2026-06-09*
*Last updated: 2026-06-09 after initialization*
