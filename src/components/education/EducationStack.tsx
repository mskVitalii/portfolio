"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FileDown, Award, ChevronRight, CheckCircle2 } from "lucide-react";
import type { Project } from "@/data/projects";

// ─── HSE Logo SVG ──────────────────────────────────────────────────────────────

function HseLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="18" width="21" height="21" rx="2" transform="rotate(-45 3 18)" fill="#1658DA"/>
      <rect x="7" y="18" width="13" height="13" rx="1" transform="rotate(-45 7 18)" fill="rgba(255,255,255,0.15)"/>
      <text x="8.5" y="21" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="9" fill="white">ВШЭ</text>
    </svg>
  );
}

// ─── Color themes ──────────────────────────────────────────────────────────────

const HSE_LIGHT = {
  navBg: "#0F2D69",
  navText: "rgba(255,255,255,0.85)",
  primary: "#1658DA",
  headingColor: "#0F0F14",
  bodyColor: "#454545",
  muted: "#6B7A99",
  chipBg: "#E8F0FD",
  chipText: "#1658DA",
  chipBorder: "transparent",
  bg: "#FFFFFF",
  sideBg: "#F5F6FA",
  breadcrumbBg: "#F5F6FA",
  borderColor: "#E3E1DE",
  accentLine: "#1658DA",
  infoBg: "#EDF3FF",
  infoBorder: "#C5D6F8",
  projectCardBg: "#FFFFFF",
  projectCardBorder: "#E3E1DE",
  moduleBg: "white",
  moduleStripe: "#FAFAFA",
};

const HSE_DARK = {
  navBg: "#07163A",
  navText: "rgba(255,255,255,0.9)",
  primary: "#5B8EFF",
  headingColor: "#FFFFFF",
  bodyColor: "rgba(255,255,255,0.72)",
  muted: "rgba(255,255,255,0.45)",
  chipBg: "rgba(91,142,255,0.15)",
  chipText: "#93B7FF",
  chipBorder: "rgba(91,142,255,0.3)",
  bg: "#0A1E4A",
  sideBg: "#081540",
  breadcrumbBg: "#091840",
  borderColor: "rgba(255,255,255,0.1)",
  accentLine: "#5B8EFF",
  infoBg: "rgba(91,142,255,0.08)",
  infoBorder: "rgba(91,142,255,0.25)",
  projectCardBg: "rgba(255,255,255,0.04)",
  projectCardBorder: "rgba(255,255,255,0.1)",
  moduleBg: "rgba(255,255,255,0.03)",
  moduleStripe: "rgba(255,255,255,0.06)",
};

const TUC_LIGHT = {
  navBg: "#FFFFFF",
  navText: "#1A1A1A",
  navBorder: "#005F50",
  primary: "#005F50",
  informatikColor: "#4A8246",
  headingColor: "#1A1A1A",
  bodyColor: "#3A3A3A",
  muted: "#6F7070",
  chipBg: "#E6F2EF",
  chipText: "#005F50",
  chipBorder: "transparent",
  bg: "#FFFFFF",
  sideBg: "#F8FAF9",
  breadcrumbBg: "#F4F4F4",
  borderColor: "#DDDDDD",
  moduleHeaderBg: "#005F50",
  moduleHeaderText: "#FFFFFF",
  moduleBg: "white",
  moduleStripe: "#FAFAFA",
  projectBg: "#F8FAF9",
};

const TUC_DARK = {
  navBg: "#0D1F1C",
  navText: "rgba(255,255,255,0.9)",
  navBorder: "#00A878",
  primary: "#00A878",
  informatikColor: "#6DBF65",
  headingColor: "#FFFFFF",
  bodyColor: "rgba(255,255,255,0.72)",
  muted: "rgba(255,255,255,0.45)",
  chipBg: "rgba(0,168,120,0.15)",
  chipText: "#7EEACE",
  chipBorder: "rgba(0,168,120,0.3)",
  bg: "#0A1A17",
  sideBg: "#071210",
  breadcrumbBg: "#0C1E1A",
  borderColor: "rgba(0,168,120,0.2)",
  moduleHeaderBg: "#005F50",
  moduleHeaderText: "#FFFFFF",
  moduleBg: "rgba(255,255,255,0.03)",
  moduleStripe: "rgba(255,255,255,0.06)",
  projectBg: "rgba(0,168,120,0.06)",
};

// ─── HSE Card ──────────────────────────────────────────────────────────────────

const HSE_CONTENT = {
  navLinks: ["Study Programs", "Research", "Campus", "About"],
  breadcrumb: ["HSE University", "Education", "Bachelor's Programme", "Software Engineering"],
  category: "BACHELOR'S PROGRAMME",
  degree: "Software Engineering",
  faculty: "Faculty of Computer Science",
  location: "Moscow, Russia",
  period: "2019 – 2023",
  gpa: "GPA 4.2 / 5.0",
  description:
    "Core computer science fundamentals: algorithms, software architecture, databases, operating systems, quality assurance, project management, and Microsoft Azure Cloud. Built strong foundations in system design and distributed engineering.",
  highlights: [
    "Algorithms & Data Structures",
    "Software Architecture",
    "Databases & SQL",
    "OS & Networks",
    "Microsoft Azure",
    "Project Management",
    "OOP & Design Patterns",
    "QA & Testing",
  ],
  stack: ["Java", "Python", "SQL", "Azure", "Algorithms"],
  certificate: { label: "Download Diploma", href: "/certificates/hse-diploma.pdf" },
  projectFilter: (p: Project) => p.company === "Higher School of Economics",
};

function HseCard({ projects, index, isDark }: { projects: Project[]; index: number; isDark: boolean }) {
  const c = isDark ? HSE_DARK : HSE_LIGHT;
  const d = HSE_CONTENT;

  // HSE uses Roboto Slab for headings (mimicking HSE Slab), Nunito Sans for body (mimicking HSE Sans/Proxima Nova)
  const headingFont = "var(--font-roboto-slab), 'Roboto Slab', Georgia, serif";
  const bodyFont = "var(--font-nunito), 'Nunito Sans', 'Proxima Nova', 'Helvetica Neue', Arial, sans-serif";

  return (
    <div
      className="sticky w-full flex flex-col overflow-hidden"
      style={{
        top: `${index * 64}px`,
        zIndex: 10 + index,
        background: c.bg,
        fontFamily: bodyFont,
        minHeight: "100vh",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.14)",
      }}
    >
      {/* ── Top Nav ── */}
      <nav
        className="shrink-0 flex items-center justify-between px-4 md:px-8"
        style={{ background: c.navBg, height: "64px", borderBottom: `3px solid #1030A0` }}
      >
        <div className="flex items-center gap-3">
          <HseLogo />
          <span style={{ color: "white", fontWeight: 800, fontSize: "14px", letterSpacing: "0.03em", fontFamily: bodyFont }}>
            HSE University
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {d.navLinks.map((link) => (
            <span key={link} style={{ color: c.navText, fontSize: "13px", cursor: "pointer", fontWeight: 500 }}>
              {link}
            </span>
          ))}
        </div>
        <div
          className="text-xs px-3 py-1 rounded"
          style={{ background: c.primary, color: "white", fontWeight: 700, letterSpacing: "0.05em" }}
        >
          EN
        </div>
      </nav>

      {/* ── Breadcrumb ── */}
      <div
        className="shrink-0 flex items-center gap-1 px-4 md:px-8 py-2"
        style={{ background: c.breadcrumbBg, borderBottom: `1px solid ${c.borderColor}` }}
      >
        {d.breadcrumb.map((crumb, i, arr) => (
          <span key={crumb} className="flex items-center gap-1">
            <span
              className="text-xs"
              style={{
                color: i === arr.length - 1 ? c.headingColor : c.primary,
                fontWeight: i === arr.length - 1 ? 600 : 400,
              }}
            >
              {crumb}
            </span>
            {i < arr.length - 1 && (
              <ChevronRight className="w-3 h-3" style={{ color: c.muted }} />
            )}
          </span>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left */}
        <div className="flex-1 px-6 md:px-12 py-8 md:py-12">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: "3px", height: "16px", background: c.primary, borderRadius: "2px" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.primary, fontFamily: bodyFont }}>
              {d.category}
            </span>
          </div>

          <h1
            className="leading-tight mb-2"
            style={{ color: c.headingColor, fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900, fontFamily: headingFont }}
          >
            {d.degree}
          </h1>
          <p className="text-base font-semibold mb-1" style={{ color: c.muted, fontFamily: bodyFont }}>
            {d.faculty}
          </p>

          <div style={{ width: "56px", height: "3px", background: c.accentLine, margin: "16px 0" }} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-6" style={{ color: c.muted }}>
            <span>{d.period}</span>
            <span>|</span>
            <span>{d.location}</span>
            <span>|</span>
            <span className="font-semibold" style={{ color: c.primary }}>{d.gpa}</span>
          </div>

          <p className="text-sm leading-relaxed mb-6" style={{ color: c.bodyColor, maxWidth: "540px" }}>
            {d.description}
          </p>

          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: c.muted }}>Key Coursework</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {d.highlights.map((h) => (
              <span
                key={h}
                className="text-xs font-semibold px-3 py-1.5 rounded"
                style={{ background: c.chipBg, color: c.chipText, border: `1px solid ${c.chipBorder}` }}
              >
                {h}
              </span>
            ))}
          </div>

          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: c.muted }}>Tech Stack</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {d.stack.map((s) => (
              <span
                key={s}
                className="text-xs font-semibold px-3 py-1.5 rounded border"
                style={{ borderColor: c.primary, color: c.primary, background: "transparent" }}
              >
                {s}
              </span>
            ))}
          </div>

          {d.certificate && (
            <a
              href={d.certificate.href}
              download
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded transition-opacity hover:opacity-85"
              style={{ background: c.primary, color: "white", fontFamily: bodyFont }}
            >
              <Award className="w-4 h-4" />
              {d.certificate.label}
              <FileDown className="w-3.5 h-3.5 opacity-80" />
            </a>
          )}
        </div>

        {/* Right */}
        <div
          className="lg:w-96 shrink-0 px-6 md:px-10 py-8 md:py-12"
          style={{ background: c.sideBg, borderLeft: `1px solid ${c.borderColor}` }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: c.primary }}>
            Academic Projects
          </p>
          <div className="space-y-4">
            {projects.length > 0 ? (
              projects.map((p) => (
                <div
                  key={p.slug}
                  className="rounded-lg p-4"
                  style={{ background: c.projectCardBg, border: `1px solid ${c.projectCardBorder}` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="font-bold text-sm leading-snug"
                      style={{ color: c.headingColor, fontFamily: headingFont }}
                    >
                      {p.title}
                    </h3>
                    <span className="text-xs shrink-0 font-medium" style={{ color: c.muted }}>{p.period}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: c.bodyColor }}>{p.tagline}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded"
                        style={{ background: c.chipBg, color: c.chipText }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div
                className="rounded-lg p-6 text-center"
                style={{ background: c.projectCardBg, border: `1px dashed ${c.borderColor}` }}
              >
                <p className="text-sm" style={{ color: c.muted }}>Projects coming soon.</p>
              </div>
            )}
          </div>

          <div
            className="mt-6 rounded-lg p-4"
            style={{ background: c.infoBg, border: `1px solid ${c.infoBorder}` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: c.primary }}>
              Accreditation
            </p>
            <p className="text-xs leading-relaxed" style={{ color: c.bodyColor }}>
              HSE University is the largest research university in Russia and one of the leading economics and social sciences universities in Eastern Europe and Eurasia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TUC Card ─────────────────────────────────────────────────────────────────

const TUC_CONTENT = {
  navLinks: ["University", "Studies", "Research", "International"],
  breadcrumb: ["TU Chemnitz", "Studies", "Master's Programme", "Web Engineering"],
  category: "MASTER'S PROGRAMME",
  degree: "Web Engineering",
  faculty: "Faculty of Computer Science",
  location: "Chemnitz, Germany",
  period: "2023 – 2025",
  gpa: "GPA 2.39 (German scale, 1.0 = best)",
  description:
    "Advanced distributed systems, cloud-native applications, software service engineering, cybersecurity, and model-driven software development. Focus on modern web architectures and scalable engineering solutions.",
  highlights: [
    "Distributed Systems",
    "Cloud Applications",
    "Service Engineering",
    "Cybersecurity",
    "Model-Driven Dev",
    "Web Architectures",
    "gRPC & APIs",
    "NoSQL Databases",
  ],
  stack: ["Go", "gRPC", "Redis", "MongoDB", "Svelte", "Cloud", "Docker"],
  projectFilter: (p: Project) => p.company === "Chemnitz University of Technology",
};

function TucCard({ projects, index, isDark }: { projects: Project[]; index: number; isDark: boolean }) {
  const c = isDark ? TUC_DARK : TUC_LIGHT;
  const d = TUC_CONTENT;

  // TUC uses Roboto (officially) for everything — clean, sans-serif, German functional
  const font = "var(--font-roboto), 'Roboto', Arial, sans-serif";

  return (
    <div
      className="sticky w-full flex flex-col overflow-hidden"
      style={{
        top: `${index * 64}px`,
        zIndex: 10 + index,
        background: c.bg,
        fontFamily: font,
        minHeight: "100vh",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.14)",
      }}
    >
      {/* ── Top Nav ── */}
      <nav
        className="shrink-0 flex items-center justify-between px-4 md:px-8"
        style={{
          background: c.navBg,
          height: "64px",
          borderBottom: `4px solid ${c.navBorder}`,
          boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center gap-3">
          <Image
            src={isDark ? "/brands/tuc-logo-white.png" : "/brands/tuc-logo.png"}
            alt="TU Chemnitz"
            width={160}
            height={44}
            className="object-contain h-9 w-auto"
          />
        </div>
        <div className="hidden lg:flex items-center gap-6">
          {d.navLinks.map((link) => (
            <span key={link} className="text-sm font-medium cursor-pointer" style={{ color: c.navText }}>
              {link}
            </span>
          ))}
        </div>
        <div
          className="text-xs px-3 py-1 rounded border cursor-pointer"
          style={{ borderColor: c.primary, color: c.primary, fontWeight: 600, background: isDark ? "rgba(0,168,120,0.1)" : "transparent" }}
        >
          DE / EN
        </div>
      </nav>

      {/* ── Breadcrumb ── */}
      <div
        className="shrink-0 flex items-center gap-1 px-4 md:px-8 py-2"
        style={{ background: c.breadcrumbBg, borderBottom: `1px solid ${c.borderColor}` }}
      >
        {d.breadcrumb.map((crumb, i, arr) => (
          <span key={crumb} className="flex items-center gap-1">
            <span
              className="text-xs"
              style={{
                color: i === arr.length - 1 ? c.headingColor : c.primary,
                fontWeight: i === arr.length - 1 ? 600 : 400,
              }}
            >
              {crumb}
            </span>
            {i < arr.length - 1 && (
              <ChevronRight className="w-3 h-3" style={{ color: c.muted }} />
            )}
          </span>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left sidebar */}
        <div
          className="lg:w-60 shrink-0 px-6 py-8"
          style={{ background: c.sideBg, borderRight: `1px solid ${c.borderColor}` }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-6 inline-block"
            style={{ background: c.informatikColor, color: "white" }}
          >
            Informatik
          </div>

          <div className="space-y-1 mb-8">
            {["Overview", "Curriculum", "Thesis", "Examination Office", "Student Life"].map((item, i) => (
              <div
                key={item}
                className="text-sm px-3 py-2 rounded cursor-pointer"
                style={{
                  background: i === 0 ? c.primary : "transparent",
                  color: i === 0 ? "white" : c.headingColor,
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <div
            className="p-4 rounded"
            style={{ background: isDark ? "rgba(255,255,255,0.04)" : "white", border: `1px solid ${c.borderColor}` }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: c.primary }}>
              Quick Facts
            </p>
            <div className="space-y-2 text-xs" style={{ color: c.bodyColor }}>
              {[
                ["Degree", "M.Sc."],
                ["Duration", "4 semesters"],
                ["ECTS", "120"],
                ["Language", "DE / EN"],
                ["GPA", "2.39"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold w-16 shrink-0" style={{ color: c.muted }}>{label}</span>
                  <span className="font-medium" style={{ color: label === "GPA" ? c.primary : c.headingColor }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 px-6 md:px-10 py-8 md:py-12">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: "3px", height: "16px", background: c.primary, borderRadius: "2px" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.primary }}>
              {d.category}
            </span>
          </div>

          <h1
            className="leading-tight mb-1"
            style={{ color: c.headingColor, fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, fontFamily: font }}
          >
            {d.degree}
          </h1>
          <p className="text-base font-medium mb-4" style={{ color: c.muted }}>
            {d.faculty} · Technische Universität Chemnitz
          </p>

          <div style={{ width: "48px", height: "3px", background: c.primary, marginBottom: "20px" }} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-6" style={{ color: c.muted }}>
            <span>{d.period}</span>
            <span>|</span>
            <span>{d.location}</span>
            <span>|</span>
            <span className="font-semibold" style={{ color: c.primary }}>{d.gpa}</span>
          </div>

          <p className="text-sm leading-relaxed mb-8" style={{ color: c.bodyColor, maxWidth: "580px" }}>
            {d.description}
          </p>

          {/* Modules table */}
          <div className="rounded overflow-hidden mb-8" style={{ border: `1px solid ${c.borderColor}` }}>
            <div
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: c.moduleHeaderBg, color: c.moduleHeaderText }}
            >
              Key Modules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {d.highlights.map((h, i) => (
                <div
                  key={h}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm"
                  style={{
                    borderBottom: `1px solid ${c.borderColor}`,
                    borderRight: i % 2 === 0 ? `1px solid ${c.borderColor}` : "none",
                    background: i % 4 < 2 ? c.moduleStripe : c.moduleBg,
                    color: c.headingColor,
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: c.informatikColor }} />
                  {h}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: c.muted }}>
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {d.stack.map((s) => (
              <span
                key={s}
                className="text-xs font-medium px-3 py-1.5 rounded border"
                style={{ borderColor: c.primary, color: c.primary, background: c.chipBg }}
              >
                {s}
              </span>
            ))}
          </div>

          {projects.length > 0 && (
            <>
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: c.primary }}>
                Academic Projects
              </p>
              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.slug}
                    className="rounded p-4"
                    style={{ background: c.projectBg, border: `1px solid ${c.borderColor}` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm" style={{ color: c.headingColor }}>{p.title}</h3>
                      <span className="text-xs shrink-0" style={{ color: c.muted }}>{p.period}</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-2" style={{ color: c.bodyColor }}>{p.tagline}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-medium px-2 py-0.5 rounded"
                          style={{ background: c.chipBg, color: c.chipText }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function EducationStack({ projects }: { projects: Project[] }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const hseProjects = projects.filter(HSE_CONTENT.projectFilter);
  const tucProjects = projects.filter(TUC_CONTENT.projectFilter);

  return (
    <div>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Education</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Two universities, two countries, one engineering path — from Moscow to Germany.
          Scroll through to explore each chapter.
        </p>
      </div>

      <div style={{ height: `calc(200vh + ${2 * 64}px)` }} className="relative">
        <HseCard projects={hseProjects} index={0} isDark={isDark} />
        <TucCard projects={tucProjects} index={1} isDark={isDark} />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <h2 className="text-2xl font-bold mb-2">Certificates</h2>
        <p className="text-muted-foreground text-sm mb-8">
          Professional certifications alongside academic degrees.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: 2022 },
            { title: "IELTS Academic — C1", issuer: "British Council", year: 2022 },
            { title: "DSH — German University Admission", issuer: "TU Chemnitz", year: 2023 },
          ].map((cert) => (
            <div key={cert.title} className="rounded-xl border bg-card p-4 flex flex-col gap-2">
              <Award className="w-5 h-5 text-primary" />
              <p className="font-semibold text-sm">{cert.title}</p>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded w-fit">
                {cert.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
