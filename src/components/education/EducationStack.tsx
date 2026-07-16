"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FileDown, Award, ChevronRight, CheckCircle2, ExternalLink, GraduationCap } from "lucide-react";
import type { Project } from "@/data/projects";
import { localize } from "@/lib/localized";
import { Certificates } from "@/components/education/Certificates";

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
  infoBg: "#E6F2EF",
  infoBorder: "#B9D9D0",
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
  infoBg: "rgba(0,168,120,0.08)",
  infoBorder: "rgba(0,168,120,0.25)",
  moduleHeaderBg: "#005F50",
  moduleHeaderText: "#FFFFFF",
  moduleBg: "rgba(255,255,255,0.03)",
  moduleStripe: "rgba(255,255,255,0.06)",
  projectBg: "rgba(0,168,120,0.06)",
};

type Colors = typeof HSE_LIGHT | typeof TUC_LIGHT;

// ─── HSE Card (hero) ────────────────────────────────────────────────────────────

const HSE_STATIC = {
  navLinks: ["Study Programs", "Research", "Campus", "About"],
  breadcrumb: ["HSE University", "Education", "Bachelor's Programme", "Software Engineering"],
  code: "09.03.04",
  programUrl: "https://www.hse.ru/en/ba/se/",
  location: "Moscow, Russia",
  period: "2019 – 2023",
  gpa: "GPA 4.2 / 5.0",
  certificate: { href: "/certificates/hse-diploma.pdf" },
  projectFilter: (p: Project) => p.company === "Higher School of Economics",
};

function HseCard({ isDark, children }: { isDark: boolean; children?: React.ReactNode }) {
  const t = useTranslations("EducationPage");
  const c = isDark ? HSE_DARK : HSE_LIGHT;
  const d = HSE_STATIC;

  // HSE uses Roboto Slab for headings (mimicking HSE Slab), Nunito Sans for body (mimicking HSE Sans/Proxima Nova)
  const headingFont = "var(--font-roboto-slab), 'Roboto Slab', Georgia, serif";
  const bodyFont = "var(--font-nunito), 'Nunito Sans', 'Proxima Nova', 'Helvetica Neue', Arial, sans-serif";

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={{
        background: c.bg,
        fontFamily: bodyFont,
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
      <div className="flex-1 flex flex-col lg:flex-row lg:justify-center">
        <div className="lg:w-100 lg:shrink-0 px-6 md:px-12 py-8 md:py-12">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: "3px", height: "16px", background: c.primary, borderRadius: "2px" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.primary, fontFamily: bodyFont }}>
              {t("hseCategory")}
            </span>
          </div>

          <h1
            className="leading-tight mb-1"
            style={{ color: c.headingColor, fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 900, fontFamily: headingFont }}
          >
            {t("hseDegreeName")}
          </h1>
          <a
            href={d.programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mb-2 hover:underline"
            style={{ color: c.primary }}
          >
            {t("programCodeLabel")} {d.code}
            <ExternalLink className="w-3 h-3" />
          </a>
          <p className="text-base font-semibold mb-1" style={{ color: c.muted, fontFamily: bodyFont }}>
            {t("hseFaculty")}
          </p>

          <div style={{ width: "56px", height: "3px", background: c.accentLine, margin: "16px 0" }} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-6" style={{ color: c.muted }}>
            <span>{d.period}</span>
            <span>|</span>
            <span>{d.location}</span>
            <span>|</span>
            <span className="font-semibold" style={{ color: c.primary }}>{d.gpa}</span>
          </div>

          <p className="text-sm leading-relaxed mb-8" style={{ color: c.bodyColor }}>
            {t("hseDescription")}
          </p>

          {d.certificate && (
            <a
              href={d.certificate.href}
              download
              className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded transition-opacity hover:opacity-85"
              style={{ background: c.primary, color: "white", fontFamily: bodyFont }}
            >
              <Award className="w-4 h-4" />
              {t("downloadDiploma")}
              <FileDown className="w-3.5 h-3.5 opacity-80" />
            </a>
          )}
        </div>

        {children && (
          <div
            className="flex-1 px-6 md:px-12 py-8 md:py-12 lg:max-w-2xl lg:border-l"
            style={{ borderColor: c.borderColor }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── TUC Card (hero) ────────────────────────────────────────────────────────────

const TUC_STATIC = {
  navLinks: ["University", "Studies", "Research", "International"],
  breadcrumb: ["TU Chemnitz", "Studies", "Master's Programme", "Web Engineering"],
  degree: "Web Engineering",
  programUrl: "https://www.tu-chemnitz.de/informatik/studium/studiengaenge/ma_web_engineering.php.en",
  location: "Chemnitz, Germany",
  period: "2023 – present",
  gpa: "GPA 2.39",
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
  projectFilter: (p: Project) => p.company === "Chemnitz University of Technology",
};

function TucCard({ isDark }: { isDark: boolean }) {
  const t = useTranslations("EducationPage");
  const c = isDark ? TUC_DARK : TUC_LIGHT;
  const d = TUC_STATIC;

  // TUC uses Roboto (officially) for everything — clean, sans-serif, German functional
  const font = "var(--font-roboto), 'Roboto', Arial, sans-serif";

  return (
    <div
      className="w-full flex flex-col overflow-hidden"
      style={{
        background: c.bg,
        fontFamily: font,
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
            {[t("tucSideOverview"), t("tucSideCurriculum"), t("tucSideThesis"), t("tucSideExamOffice"), t("tucSideStudentLife")].map((item, i) => (
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
              {t("quickFacts")}
            </p>
            <div className="space-y-2 text-xs" style={{ color: c.bodyColor }}>
              {[
                [t("factDegree"), "M.Sc."],
                [t("factDuration"), t("factDurationValue")],
                [t("factEctsLabel"), "120"],
                [t("factLanguage"), "DE / EN"],
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
        <div className="flex-1 px-6 md:px-10 py-8 md:py-12 max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <div style={{ width: "3px", height: "16px", background: c.primary, borderRadius: "2px" }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.primary }}>
              {t("tucCategory")}
            </span>
          </div>

          <h1
            className="leading-tight mb-1"
            style={{ color: c.headingColor, fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, fontFamily: font }}
          >
            {d.degree}
          </h1>
          <a
            href={d.programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold mb-4 hover:underline"
            style={{ color: c.primary }}
          >
            {t("viewProgramPage")}
            <ExternalLink className="w-3 h-3" />
          </a>
          <p className="text-base font-medium mb-4" style={{ color: c.muted }}>
            {t("tucFaculty")} · Technische Universität Chemnitz
          </p>

          <div style={{ width: "48px", height: "3px", background: c.primary, marginBottom: "20px" }} />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-6" style={{ color: c.muted }}>
            <span>{d.period}</span>
            <span>|</span>
            <span>{d.location}</span>
            <span>|</span>
            <span className="font-semibold" style={{ color: c.primary }}>{d.gpa} <span className="font-normal opacity-70">({t("tucGpaNote")})</span></span>
          </div>

          <p className="text-sm leading-relaxed mb-8" style={{ color: c.bodyColor, maxWidth: "580px" }}>
            {t("tucDescription")}
          </p>

          {/* Modules table */}
          <div className="rounded overflow-hidden mb-8" style={{ border: `1px solid ${c.borderColor}` }}>
            <div
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: c.moduleHeaderBg, color: c.moduleHeaderText }}
            >
              {t("keyModules")}
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
        </div>
      </div>
    </div>
  );
}

// ─── Academic journey (year / module groups + projects), full-width, normal flow ──

interface JourneyGroup {
  key: string;
  label: string;
  meta?: string;
  subjects: string[];
  projectSlugs: string[];
}

const HSE_YEAR_SUBJECTS: Record<string, string[]> = {
  hseYear1: [
    "Calculus", "Algebra", "Discrete Mathematics", "Programming", "History",
    "Introduction into Software Engineering", "Safe Living Basics",
    "Computer-based Workshop on Algebra (Python)", "Computer-based Workshop on Mathematical Analysis (Python)",
  ],
  hseYear2: [
    "Algorithms and Data Structures", "Operating Systems", "Databases",
    "Computer System Architecture", "Software Design", "Software Quality Assurance and Testing",
    "Development and Analysis of Requirements",
  ],
  hseYear3: [
    "Software Systems Architecture Design", "Distributed Databases and Data Warehouses",
    "Information Systems and Organisations", "Analysis and Modeling of Business Processes",
    "Mathematical Methods for Data Analysis", "IoT Ecosystems",
    "Group Dynamics & Communication in SE Professional Practice",
    "Probability Theory and Mathematical Statistics", "Queuing Theory",
  ],
  hseYear4: [
    "Agile in Enterprise Environment", "Software Project Management", "Software Engineering Economics",
    "Electronic Business", "Modern Information Technologies in Business", "Intellectual Property Law",
    "Philosophy of Science", "Research Seminars", "Graduation Internship",
  ],
};

// Most recent year first, matching the descending order used elsewhere on the site
const HSE_GROUPS: { key: string; projectSlugs: string[] }[] = [
  { key: "hseYear4", projectSlugs: ["react-redux-docs-translation"] },
  { key: "hseYear3", projectSlugs: ["lightning-diagram-editor"] },
  { key: "hseYear2", projectSlugs: ["tango-streaming-coursework", "checkpoint-coursework"] },
  { key: "hseYear1", projectSlugs: ["fassonapi-coursework", "cyberphys-color-robot"] },
];

const HSE_THESIS_SLUG = "news-aggregator-thesis";

// Sourced directly from the official TU Chemnitz transcript (module groups + credits)
const TUC_GROUP_SUBJECTS: Record<string, string[]> = {
  tucGroupSchwerpunkt: [
    "Current Trends in Web Engineering", "Cloud & Web Anwendungen", "Software Service Engineering",
    "Datenbanken und Web-Techniken", "Datenbanken und Objektorientierung",
  ],
  tucGroupVertiefung: ["Entwurf Verteilter Systeme", "XML", "Mediencodierung", "Strategic IT Management"],
  tucGroupSeminare: ["Seminar Web Engineering", "Vorbereitungsseminar Planspiel Web Engineering", "Planspiel Web Engineering"],
  tucGroupSchluessel: ["Deutsch als Fremdsprache I (A1)", "Deutsch als Fremdsprache II (A2)"],
};

const TUC_GROUPS: { key: string; credits: number; projectSlugs: string[] }[] = [
  { key: "tucGroupSchwerpunkt", credits: 20, projectSlugs: ["sse-software-service-engineering"] },
  { key: "tucGroupVertiefung", credits: 20, projectSlugs: ["chemnitz-map-assignment"] },
  { key: "tucGroupSeminare", credits: 37, projectSlugs: ["swe-low-code-sql"] },
  { key: "tucGroupSchluessel", credits: 8, projectSlugs: [] },
];

const TUC_THESIS_SLUG = "master-thesis-semantic-search";

function githubLink(project: Project): string | undefined {
  return project.links?.find((l) => l.labelKey.toLowerCase().includes("github"))?.url;
}

function MiniProjectCard({ project, c, headingFont }: { project: Project; c: Colors; headingFont: string }) {
  const t = useTranslations("EducationPage");
  const locale = useLocale();
  const gh = githubLink(project);
  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-2"
      style={{ background: "projectCardBg" in c ? c.projectCardBg : c.projectBg, border: `1px solid ${c.borderColor}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/projects/${project.slug}`}
          className="font-semibold text-sm leading-snug hover:underline"
          style={{ color: c.headingColor, fontFamily: headingFont }}
        >
          {localize(project.title, locale)}
        </Link>
        {gh && (
          <a
            href={gh}
            target="_blank"
            rel="noopener noreferrer"
            title={t("githubLinkLabel")}
            aria-label={t("githubLinkLabel")}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: c.primary }}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      <p className="text-xs leading-relaxed" style={{ color: c.bodyColor }}>{localize(project.tagline, locale)}</p>
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ background: c.chipBg, color: c.chipText }}>
              {s}
            </span>
          ))}
        </div>
        <span className="text-[10px] shrink-0 font-medium" style={{ color: c.muted }}>{project.period}</span>
      </div>
    </div>
  );
}

function ThesisSpotlight({
  project,
  label,
  c,
  headingFont,
  bodyFont,
}: {
  project: Project;
  label: string;
  c: Colors;
  headingFont: string;
  bodyFont: string;
}) {
  const t = useTranslations("EducationPage");
  const tProjects = useTranslations("Projects");
  const locale = useLocale();
  const inProgress = project.status === "active";
  return (
    <div
      className="rounded-2xl p-6 md:p-8 mb-10"
      style={{
        background: c.infoBg,
        border: `1.5px solid ${c.primary}`,
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <GraduationCap className="w-5 h-5" style={{ color: c.primary }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: c.primary, fontFamily: bodyFont }}>
          {label}
        </span>
        {inProgress && (
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: c.primary, color: "white" }}
          >
            {t("inProgressLabel")}
          </span>
        )}
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: c.headingColor, fontFamily: headingFont }}>
        {localize(project.title, locale)}
      </h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: c.bodyColor, maxWidth: "680px" }}>
        {localize(project.description.business, locale)}
      </p>
      {project.statusNote && (
        <p className="text-xs italic mb-4" style={{ color: c.muted }}>{localize(project.statusNote, locale)}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map((s) => (
          <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded" style={{ background: c.chipBg, color: c.chipText }}>
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-semibold hover:underline"
          style={{ color: c.primary }}
        >
          {t("viewCaseStudy")} →
        </Link>
        {project.links?.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            style={{ borderColor: c.primary, color: c.primary }}
          >
            {tProjects(`linkLabels.${link.labelKey}` as "linkLabels.demo")}
            <ExternalLink className="w-3 h-3" />
          </a>
        ))}
      </div>
    </div>
  );
}

function AcademicJourney({
  groups,
  subjectsByGroup,
  thesisSlug,
  thesisLabel,
  projects,
  c,
  headingFont,
  bodyFont,
  className = "container mx-auto px-4 py-14 max-w-5xl",
}: {
  groups: { key: string; credits?: number; projectSlugs: string[] }[];
  subjectsByGroup: Record<string, string[]>;
  thesisSlug: string;
  thesisLabel: string;
  projects: Project[];
  c: Colors;
  headingFont: string;
  bodyFont: string;
  className?: string;
}) {
  const t = useTranslations("EducationPage");
  const byslug = new Map(projects.map((p) => [p.slug, p]));
  const thesis = byslug.get(thesisSlug);

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: headingFont }}>{t("academicProjects")}</h2>

      {thesis && (
        <ThesisSpotlight project={thesis} label={thesisLabel} c={c} headingFont={headingFont} bodyFont={bodyFont} />
      )}

      <div className="space-y-6">
        {groups.map((g) => {
          const groupProjects = g.projectSlugs.map((s) => byslug.get(s)).filter((p): p is Project => !!p);
          return (
            <div
              key={g.key}
              className="rounded-xl p-5 md:p-6"
              style={{ border: `1px solid ${c.borderColor}`, background: c.sideBg }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
                <h3 className="text-base font-bold" style={{ color: c.headingColor, fontFamily: headingFont }}>
                  {t(g.key)}
                </h3>
                {"credits" in g && g.credits && (
                  <span className="text-xs font-medium" style={{ color: c.muted }}>
                    {g.credits} {t("creditsLabel")}
                  </span>
                )}
              </div>

              <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: c.muted }}>
                {t("subjectsLabel")}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(subjectsByGroup[g.key] ?? []).map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded" style={{ background: c.chipBg, color: c.chipText }}>
                    {s}
                  </span>
                ))}
              </div>

              {groupProjects.length > 0 && (
                <>
                  <p className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: c.muted }}>
                    {t("projectsLabel")}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {groupProjects.map((p) => (
                      <MiniProjectCard key={p.slug} project={p} c={c} headingFont={headingFont} />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function EducationStack({ projects }: { projects: Project[] }) {
  const t = useTranslations("EducationPage");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const hseColors = isDark ? HSE_DARK : HSE_LIGHT;
  const tucColors = isDark ? TUC_DARK : TUC_LIGHT;
  const hseHeadingFont = "var(--font-roboto-slab), 'Roboto Slab', Georgia, serif";
  const hseBodyFont = "var(--font-nunito), 'Nunito Sans', 'Proxima Nova', 'Helvetica Neue', Arial, sans-serif";
  const tucFont = "var(--font-roboto), 'Roboto', Arial, sans-serif";

  const hseProjects = projects.filter(HSE_STATIC.projectFilter);
  const tucProjects = projects.filter(TUC_STATIC.projectFilter);

  return (
    <div>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* ── HSE section: hero + all HSE academic projects, contained together.
             Desktop: two columns (hero left, projects right). Mobile/tablet: stacked. ── */}
      <section style={{ background: hseColors.bg }}>
        <HseCard isDark={isDark}>
          <AcademicJourney
            groups={HSE_GROUPS}
            subjectsByGroup={HSE_YEAR_SUBJECTS}
            thesisSlug={HSE_THESIS_SLUG}
            thesisLabel={t("bachelorThesisLabel")}
            projects={hseProjects}
            c={hseColors}
            headingFont={hseHeadingFont}
            bodyFont={hseBodyFont}
            className=""
          />
        </HseCard>
      </section>

      {/* ── TUC section: hero + all TUC academic projects, contained together ── */}
      <section style={{ background: tucColors.bg }}>
        <TucCard isDark={isDark} />
        <AcademicJourney
          groups={TUC_GROUPS}
          subjectsByGroup={TUC_GROUP_SUBJECTS}
          thesisSlug={TUC_THESIS_SLUG}
          thesisLabel={t("masterThesisLabel")}
          projects={tucProjects}
          c={tucColors}
          headingFont={tucFont}
          bodyFont={tucFont}
        />
      </section>

      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <h2 className="text-2xl font-bold mb-2">{t("certificates")}</h2>
        <p className="text-muted-foreground text-sm mb-8">
          {t("certsSubtitle")}
        </p>
        <Certificates />
      </div>
    </div>
  );
}
