# SPEC.md

# Personal Website — Vitalii Popov

## Goal

Create a personal website that functions as:

- Portfolio
- Interactive CV
- Technical blog
- Business case showcase
- Lead generation platform

Target audiences:

1. Recruiters (HR)
2. Engineering Managers
3. CTOs
4. Founders
5. Potential freelance clients

The website should answer:

- Who is this engineer?
- What business value does he create?
- How does he think?
- Can he solve our problems?
- Should we hire him?

---

# Core Principles

## Show outcomes, not technologies

Bad:

> Built a React + Go application

Good:

> Reduced operational costs by €480,000/year

---

## Every project has three perspectives

### HR View

Focus on:

### Business View

Focus on:

- Revenue
- Cost savings
- KPIs
- User growth
- Business impact

### Tech View

Focus on:

- Architecture
- Tradeoffs
- Stack
- Scaling challenges
- Lessons learned

---

# Website Structure

## Home

Hero section:

- Name
- Role
- Current location
- Languages
- Contact buttons

Main statement:

> Full-stack engineer focused on building systems that create measurable business value.

---

## Impact Dashboard

Display major achievements.

Examples:

- €480,000 saved
- 8,000 users served
- 3,000 MAU
- 200M products indexed
- 11.63% metric improvement

Animated counters.

All values link to supporting projects.

---

## About

Short story:

- Background
- Current focus
- Interests

Timeline:

- First programming experience
- Career milestones
- Technologies learned

Presented as progression rather than job list.

---

# Projects

Each project receives its own page.

## Project Structure

### Overview

Problem.

### Solution

What was built.

### Impact

Metrics.

### HR

Role and responsibilities.

### Business

Business value.

### Technical

Architecture.

### Lessons learned

Retrospective.

---

# Project View Modes

Global toggle:

- HR
- Business
- Tech

Switching mode changes descriptions throughout the site.

Example:

Same project displayed differently for each audience.

---

# Architecture Gallery

Dedicated section.

For each project:

- System diagram
- Service interactions
- Data flow
- Infrastructure
- Deployment model

Possible technologies:

- Mermaid
- React Flow

---

# Skills Explorer

Interactive skill graph.

Example:

Backend
├── Go
├── Python
├── C#

Frontend
├── React
├── Next.js

Infrastructure
├── Docker
├── Kubernetes

Clicking a skill reveals:

- Projects using it
- Years of experience
- Problems solved

---

# Career RPG

Visual progression system.

Levels:

Level 1
Frontend Developer

Level 2
Full-Stack Developer

Level 3
Backend Engineer

Level 4
Distributed Systems Engineer

Level 5
AI Engineer

Each level unlocks:

- New technologies
- New responsibilities
- Major projects

---

# How I Would Solve Your Problem

Interactive wizard.

Visitor selects:

- Startup
- SaaS
- AI Product
- Marketplace
- Enterprise System

Site generates:

- Architecture approach
- Recommended stack
- Risks
- Timeline
- Cost considerations

Purpose:

Show engineering thinking.

---

# Failure Stories

Dedicated section.

Structure:

Problem
→ Mistake
→ Consequence
→ Fix
→ Lesson

Examples:

- Overengineered microservice
- Bad Elasticsearch design
- Wrong scaling decision
- Poor feature prioritization

Purpose:

Build trust.

---

# Engineering Decisions Database

Collection of technical decisions.

Format:

Problem:
How to implement semantic search?

Options:

- PostgreSQL
- Elasticsearch
- Qdrant

Decision:
Qdrant

Reasoning:
...

Tradeoffs:
...

Outcome:
...

Acts as a public ADR repository.

---

# Technical Deep Dives

Articles explaining:

- Architecture
- Performance
- AI
- Go
- React
- Kubernetes

Not tutorials.

Case studies.

---

# Interactive Playground

Live demos.

Examples:

- Semantic search demo
- AI chatbot
- Recommendation engine
- Data matching system

Visitors can test solutions directly.

---

# Metrics Page

Personal engineering statistics.

Examples:

- Years of experience
- Projects completed
- Technologies used
- Commits
- Repositories
- Blog posts

Generated automatically.

---

# Open Source

Show:

- Repositories
- Stars
- Contributions
- Experiments

GitHub integration.

---

# Public Roadmap

Current goals.

Examples:

Now learning:

- Advanced AI Systems
- Agent Architectures

Current projects:

- Thesis
- Open-source tools

Purpose:

Shows growth mindset.

---

# Recommendations

Dedicated page.

Testimonials from:

- Colleagues
- Managers
- Clients

Structured format:

Person
Role
Company
Feedback

---

# Multilingual Support

Languages:

- English
- German
- Russian

Requirements:

- URL-based localization
- SEO-friendly routes
- Separate metadata

Examples:

/en/
/de/
/ru/

---

# SEO

For every project:

- Dedicated metadata
- OpenGraph images
- Structured data

Goal:

Rank for:

- Go developer
- Full-stack engineer
- React developer
- Semantic search engineer
- AI engineer

---

# Lead Generation

Contact page.

Options:

- Email
- LinkedIn
- Telegram
- GitHub

Simple inquiry form.

---

# Nice-to-Have Features

## Visitor Mode

Choose audience:

- Recruiter
- Business
- Engineer

Entire site adapts automatically.

---

## Project Comparison

Compare two projects side-by-side.

Metrics:

- Scale
- Stack
- Complexity
- Impact

---

## Build In Public

Timeline of experiments.

Daily/weekly updates.

---

## Interactive World Map

Display:

- Companies
- Projects
- Clients

Grouped geographically.

---

# Technical Stack

Frontend:

- Next.js
- TypeScript
- Tailwind
- shadcn/ui

Content:

- MDX

Localization:

- next-intl

Analytics:

- GA4

Hosting:

- Vercel

---

# Success Metrics

The site succeeds if it increases:

- Interview invitations
- Recruiter response rate
- Freelance leads
- Technical credibility
- Personal brand visibility

Primary KPI:

Qualified opportunities generated per month.


# И ещё немножко фристайла от меня

- Мне нужно, чтобы переключение роли HR/Business/IT работало на каждой странице и давало ей какое-то интересное раскрытие - либо новые данные, либо подсветка данных

- каждый проект будет оформлен в своём стиле и со своей структурой - будет мало чего общего между ними

- Будем добавлять статус проекту — жив он или нет. Если нет, то что пошло не так

- Мы сейчас делаем по сути оболочку всего этого - сами проекты один за другим я буду добавлять позже

- Проекты разделяются на учебные, рабочие и хакатоны

- Карта технологий нужна по-любому

- Интерактивный “impact dashboard” на главной.
Там 3–5 больших цифр: saved money, users, MAU, performance, projects shipped.
У тебя есть что туда поставить: 480,000€ saved, 8,000 users, 3,000 MAU, 11.63% uplift, 200M items searched in 5 seconds. Это будет сильнее любого длинного текста.
Кстати, да, и там делается разбивка по проектам как в банке — линия, которая разбита по проектам

Кстати, прикольно было бы сделать ответы на частые HR вопросы (в рамках проектов тоэе)

- для референса там лежит моя CV. И её также нужно вывести как ссылку