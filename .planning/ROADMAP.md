# Roadmap: Personal Website — Vitalii Popov

## Overview

Five phases deliver a production-ready personal portfolio that converts qualified visitors into opportunities. Phase 1 nails the technical foundation (the most expensive mistakes happen here). Phase 2 builds the identity layer and contact surface. Phase 3 delivers the core credibility content — project case studies with tri-mode views and depth writing. Phase 4 adds the interactive skills graph and public presence pages. Phase 5 closes out SEO and multilingual launch readiness.

## Phases

- [ ] **Phase 1: Foundation** - Next.js + Tailwind v4 + next-intl + MDX pipeline + ViewMode store
- [ ] **Phase 2: Home & Contact** - Hero, Impact Dashboard, About, CV link, Contact, FAQ
- [ ] **Phase 3: Projects & Depth Content** - Project case studies (2-3), tri-mode views, ADR, Failure Stories, Architecture Gallery
- [ ] **Phase 4: Skills & Presence** - Interactive Skills Explorer, Open Source, Recommendations, Public Roadmap
- [ ] **Phase 5: SEO & Launch** - Per-page metadata, OG images, structured data, sitemap, i18n strings

## Phase Details

### Phase 1: Foundation
**Goal**: The technical skeleton runs correctly in production — localized routes, static rendering, and the ViewMode store are verified before any feature is built.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08
**Success Criteria** (what must be TRUE):
  1. Visiting /en/, /de/, and /ru/ each renders a page; the middleware never redirects favicon.ico or JS bundles to locale-prefixed 404s
  2. After `next build`, all portfolio routes appear as `.html` files in `.next/server/app/` — not `.js` (no dynamic SSR leak)
  3. Dark/light mode toggle works; system preference is respected on first load; preference persists across page reloads
  4. Selecting HR, Business, or Tech mode persists in localStorage and survives a full page reload on any route
  5. MDX file renders with syntax-highlighted code blocks at /en/[any-mdx-route] at build time (no client-only rendering)
**Plans**: TBD
**UI hint**: yes

### Phase 2: Home & Contact
**Goal**: A visitor landing on the site immediately understands who Vitalii is, what measurable value he creates, and how to reach him.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, LEAD-01, LEAD-02, LEAD-03
**Success Criteria** (what must be TRUE):
  1. Above the fold: name, role, location, spoken languages, and contact buttons are all visible without scrolling on a 1280px desktop viewport
  2. The Impact Dashboard shows all five animated metric counters (€480K, 8K users, 3K MAU, 200M items, 11.63% uplift) and each counter links to its source project page
  3. The About page presents a career progression timeline — not a flat job list — and the CV is downloadable from either the nav or the About page
  4. The Contact page provides email, LinkedIn, Telegram, and GitHub links; the inquiry form accepts name, email, subject, and message with client-side validation and submits without error
  5. The FAQ answers visa/relocation/rates/availability questions and is reachable from the contact surface
**Plans**: TBD
**UI hint**: yes

### Phase 3: Projects & Depth Content
**Goal**: Visitors can read 2-3 fully written project case studies with genuinely different content per audience mode, supported by architecture diagrams, failure stories, and engineering decisions.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05, PROJ-06, PROJ-07, DEPTH-01, DEPTH-02, DEPTH-03, DEPTH-04
**Success Criteria** (what must be TRUE):
  1. The projects listing page displays all projects with a working category filter (academic / work / hackathon)
  2. Each project page shows the tri-mode switcher; switching from HR to Business to Tech surfaces genuinely different information (HR: keywords/timeline/role; Business: ROI/metrics/domain impact; Tech: architecture/decisions/stack) — not just label changes
  3. Each project page shows an architecture diagram (Mermaid or React Flow) that loads lazily without breaking SSR
  4. Failure Stories section shows at least 2 entries structured as Problem → Mistake → Consequence → Fix → Lesson
  5. The ADR database shows at least 3 entries; the Architecture Gallery standalone page links to all project diagrams
**Plans**: TBD
**UI hint**: yes

### Phase 4: Skills & Presence
**Goal**: Visitors can explore Vitalii's technical capabilities interactively and see his open-source footprint, professional endorsements, and current learning trajectory.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: SKILL-01, SKILL-02, SKILL-03, OS-01, OS-02, OS-03
**Success Criteria** (what must be TRUE):
  1. The Skills Explorer renders a technology graph grouped by domain (Backend, Frontend, Infrastructure, AI); clicking a node shows projects that used it, years of experience, and problem types solved
  2. Skill nodes link directly to the relevant project pages (not dead-ends)
  3. The Open Source section displays GitHub repositories, stars, and notable contributions fetched from the GitHub API
  4. The Public Roadmap page lists 3-5 current learning goals or active projects
  5. The Recommendations page shows at least 2 testimonials with person name, role, company, feedback text, and LinkedIn URL
**Plans**: TBD
**UI hint**: yes

### Phase 5: SEO & Launch
**Goal**: Every page is discoverable by search engines in all three locales; the site is ready to announce publicly with no SEO gaps.
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Every page (home, about, each project, contact, skills, ADR, failure stories) has a unique meta title, description, and canonical URL
  2. OG image previews render correctly when a URL is pasted into Slack/LinkedIn/Twitter for both /en/ and /de/ locale variants
  3. A sitemap.xml is accessible at /sitemap.xml and includes hreflang alternates for all three locales (en/de/ru) for every page
  4. Project pages contain JSON-LD structured data; the home page contains Person structured data
  5. German and Russian UI strings are translated (nav, footer, CTAs); English content is complete for all sections
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/TBD | Not started | - |
| 2. Home & Contact | 0/TBD | Not started | - |
| 3. Projects & Depth Content | 0/TBD | Not started | - |
| 4. Skills & Presence | 0/TBD | Not started | - |
| 5. SEO & Launch | 0/TBD | Not started | - |
