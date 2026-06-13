"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Mail, Send, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SITE_URL = "https://vitalii-popov.dev";

const INFO = {
  name: "Vitalii Popov",
  title: "Full-Stack Engineer",
  subtitle: "Distributed Systems · AI",
  email: "msk.vitaly@gmail.com",
  linkedin: "linkedin.com/in/mskvitalii",
  github: "github.com/mskvitalii",
  telegram: "t.me/mskvitalii",
  location: "Chemnitz / Dresden, Germany",
};

function ContactList({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-1 text-xs", className)}>
      <div className="flex items-center gap-1.5">
        <Mail className="w-3 h-3 shrink-0" />
        <span>{INFO.email}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <LinkedinIcon className="w-3 h-3 shrink-0" />
        <span>{INFO.linkedin}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <GithubIcon className="w-3 h-3 shrink-0" />
        <span>{INFO.github}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Send className="w-3 h-3 shrink-0" />
        <span>{INFO.telegram}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <MapPin className="w-3 h-3 shrink-0" />
        <span>{INFO.location}</span>
      </div>
    </div>
  );
}

function QRWhite({ size = 68 }: { size?: number }) {
  return (
    <div className="bg-white p-1.5 rounded-lg">
      <QRCodeSVG value={SITE_URL} size={size} level="M" fgColor="#09090b" />
    </div>
  );
}

// ── Design 1: Classic ─────────────────────────────────────────────────────────

function ClassicFront() {
  return (
    <div className="relative w-full h-full flex overflow-hidden bg-white">
      <div className="w-1.5 bg-slate-800 shrink-0" />
      <div className="flex flex-1 p-5 gap-4">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-slate-900">{INFO.name}</h1>
            <p className="text-xs text-slate-400 mt-1">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-slate-500" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <QRWhite />
          <p className="text-[9px] text-slate-400 text-center">portfolio</p>
        </div>
      </div>
    </div>
  );
}

function ClassicBack() {
  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute text-white font-mono text-xs" style={{ top: `${i * 27}px`, left: "-10px", whiteSpace: "nowrap" }}>
            func main() {"{"} go build() {"}"} · docker run · kubectl apply ·
          </div>
        ))}
      </div>
      <div className="text-center text-white relative z-10">
        <p className="text-2xl font-bold">VP</p>
        <p className="text-xs opacity-50 mt-1">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 2: Neon ────────────────────────────────────────────────────────────

function NeonFront() {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-400" />
      <div className="flex flex-1 p-5 gap-4">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest mb-0.5">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-white">{INFO.name}</h1>
            <p className="text-xs text-zinc-400 mt-1">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-zinc-300" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5 rounded-lg border border-emerald-400/30 bg-zinc-900">
            <QRCodeSVG value={SITE_URL} size={68} level="M" fgColor="#34d399" bgColor="#18181b" />
          </div>
          <p className="text-[9px] text-emerald-400/60 text-center">portfolio</p>
        </div>
      </div>
    </div>
  );
}

function NeonBack() {
  return (
    <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>
      <div className="text-center relative z-10">
        <p className="text-3xl font-bold text-emerald-400">VP</p>
        <div className="w-12 h-px bg-emerald-400/40 mx-auto my-2" />
        <p className="text-[10px] text-zinc-400 tracking-widest">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 3: Split ───────────────────────────────────────────────────────────

function SplitFront() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 bg-amber-500 flex items-center px-5 gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-bold text-lg">VP</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">{INFO.name}</h1>
          <p className="text-[11px] text-amber-100">{INFO.title}</p>
        </div>
      </div>
      <div className="flex-1 bg-white flex items-center px-5 gap-4">
        <ContactList className="text-zinc-500 flex-1" />
        <QRWhite size={60} />
      </div>
    </div>
  );
}

function SplitBack() {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 bg-amber-500 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-[10px] uppercase tracking-widest opacity-80">Full-Stack Engineer</p>
          <p className="text-4xl font-black mt-1">VP</p>
        </div>
      </div>
      <div className="flex-1 bg-zinc-900 flex items-center justify-center">
        <p className="text-[10px] text-zinc-400 tracking-wider">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 4: Paper ───────────────────────────────────────────────────────────

function PaperFront() {
  return (
    <div className="relative w-full h-full bg-stone-50 flex overflow-hidden border border-stone-200">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, #000 20px, #000 21px)" }}
      />
      <div className="flex flex-1 p-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-3 h-px bg-stone-800" />
              <p className="text-[9px] text-stone-500 uppercase tracking-[0.2em]">{INFO.title}</p>
            </div>
            <h1 className="text-xl font-bold leading-tight text-stone-900" style={{ fontFamily: "Georgia, serif" }}>
              {INFO.name}
            </h1>
            <p className="text-[11px] text-stone-500 mt-0.5 italic">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-stone-500" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="border border-stone-300 p-1">
            <QRCodeSVG value={SITE_URL} size={66} level="M" fgColor="#1c1917" bgColor="#fafaf9" />
          </div>
          <p className="text-[8px] text-stone-400 tracking-wider">PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function PaperBack() {
  return (
    <div className="relative w-full h-full bg-stone-800 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 11px)" }}
      />
      <div className="text-center relative z-10">
        <p className="text-3xl font-bold text-stone-50" style={{ fontFamily: "Georgia, serif" }}>VP</p>
        <div className="w-8 h-px bg-stone-400 mx-auto my-2" />
        <p className="text-[9px] text-stone-400 tracking-widest uppercase">Full-Stack Engineer</p>
        <p className="text-[9px] text-stone-500 mt-1">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 5: Gradient ────────────────────────────────────────────────────────

function GradientFront() {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)" }}>
      <div className="absolute top-2 right-2 w-20 h-20 rounded-full border border-white/10" />
      <div className="absolute bottom-2 left-8 w-12 h-12 rounded-full border border-white/5" />
      <div className="flex flex-1 p-5 gap-4 relative z-10 h-full">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] text-indigo-300 uppercase tracking-widest mb-0.5">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-white">{INFO.name}</h1>
            <p className="text-xs text-indigo-200 mt-1 opacity-70">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-indigo-100 opacity-80" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="bg-white/10 backdrop-blur p-1.5 rounded-lg border border-white/20">
            <QRCodeSVG value={SITE_URL} size={66} level="M" fgColor="#e0e7ff" bgColor="transparent" />
          </div>
          <p className="text-[9px] text-indigo-300/60 text-center">portfolio</p>
        </div>
      </div>
    </div>
  );
}

function GradientBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)" }}>
      <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-indigo-400/10 blur-2xl" />
      <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-blue-400/10 blur-2xl" />
      <div className="text-center text-white relative z-10">
        <p className="text-3xl font-bold">VP</p>
        <div className="flex gap-1 justify-center mt-2 mb-1">
          {["·", "·", "·"].map((d, i) => <span key={i} className="text-indigo-300">{d}</span>)}
        </div>
        <p className="text-[10px] text-indigo-300 tracking-widest uppercase">Go · TypeScript · AI</p>
        <p className="text-[9px] text-indigo-400/60 mt-2">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 6: Metal ───────────────────────────────────────────────────────────

function MetalFront() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex"
      style={{ background: "linear-gradient(160deg, #d4d4d4 0%, #f0f0f0 25%, #b8b8b8 50%, #e0e0e0 75%, #c4c4c4 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/90" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/15" />
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: "linear-gradient(180deg, #888 0%, #ccc 40%, #777 60%, #bbb 100%)" }} />
      <div className="flex flex-1 pl-4 pr-4 py-4 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-zinc-800">{INFO.name}</h1>
            <p className="text-xs text-zinc-500 mt-1">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-zinc-600" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="border border-zinc-400/60 p-1.5 rounded bg-white/40 backdrop-blur-sm">
            <QRCodeSVG value={SITE_URL} size={66} level="M" fgColor="#27272a" bgColor="transparent" />
          </div>
          <p className="text-[9px] text-zinc-500 text-center">portfolio</p>
        </div>
      </div>
    </div>
  );
}

function MetalBack() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(160deg, #2a2a2a 0%, #404040 30%, #1a1a1a 50%, #363636 75%, #222 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/25" />
      <div className="text-center relative z-10">
        <p className="text-4xl font-bold text-zinc-200" style={{ letterSpacing: "-0.02em" }}>VP</p>
        <div className="w-10 h-px bg-zinc-500 mx-auto my-2" />
        <p className="text-[9px] text-zinc-400 tracking-widest uppercase">Full-Stack Engineer</p>
        <p className="text-[9px] text-zinc-500 mt-1">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 7: Blueprint ───────────────────────────────────────────────────────

function BlueprintFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: "#003580" }}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/50" />
      <div className="flex flex-1 p-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] text-blue-200 uppercase tracking-[0.15em] mb-0.5 font-mono">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-white font-mono">{INFO.name}</h1>
            <p className="text-xs text-blue-200 mt-1 font-mono opacity-80">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-blue-100 font-mono" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="border border-white/30 p-1.5" style={{ background: "rgba(0,30,80,0.5)" }}>
            <QRCodeSVG value={SITE_URL} size={66} level="M" fgColor="#93c5fd" bgColor="transparent" />
          </div>
          <p className="text-[9px] text-blue-300/60 font-mono">v1.0.0</p>
        </div>
      </div>
    </div>
  );
}

function BlueprintBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#003580" }}>
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/50" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/50" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/50" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/50" />
      <div className="text-center relative z-10 font-mono">
        <div className="border border-white/40 w-14 h-14 flex items-center justify-center mx-auto mb-2">
          <p className="text-2xl font-bold text-white">VP</p>
        </div>
        <p className="text-[9px] text-blue-200 tracking-widest">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 8: Ink ─────────────────────────────────────────────────────────────

function InkFront() {
  return (
    <div className="relative w-full h-full bg-white flex overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
      <div className="flex flex-1 pt-5 pb-4 px-5 gap-4">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h1 className="text-2xl font-black leading-tight text-zinc-900 tracking-tight">{INFO.name}</h1>
            <p className="text-[10px] text-zinc-400 mt-0.5 uppercase tracking-widest">{INFO.title}</p>
            <div className="w-8 h-0.5 bg-red-600 my-2" />
            <p className="text-xs text-zinc-500">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-zinc-500" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="border-2 border-zinc-900 p-1">
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="#09090b" bgColor="#ffffff" />
          </div>
          <p className="text-[9px] text-zinc-400 tracking-wider">PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function InkBack() {
  return (
    <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
      <div className="text-center text-white relative z-10">
        <p className="text-5xl font-black leading-none">VP</p>
        <div className="w-12 h-0.5 bg-red-600 mx-auto my-3" />
        <p className="text-[10px] text-zinc-400 tracking-widest uppercase">Full-Stack Engineer</p>
        <p className="text-[9px] text-zinc-500 mt-1">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 9: Linen ───────────────────────────────────────────────────────────

function LinenFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ backgroundColor: "#f5f0e8" }}>
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, #8b7355 3px, #8b7355 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, #8b7355 3px, #8b7355 4px)`,
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(180deg, #c9a227, #e6c060, #c9a227)" }} />
      <div className="flex flex-1 pl-4 pr-4 py-4 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] mb-0.5" style={{ color: "#c9a227", fontFamily: "Georgia, serif" }}>{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight" style={{ color: "#2c1810", fontFamily: "Georgia, serif" }}>{INFO.name}</h1>
            <p className="text-[11px] italic mt-0.5" style={{ color: "#7a6450", fontFamily: "Georgia, serif" }}>{INFO.subtitle}</p>
          </div>
          <ContactList className="text-stone-500" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5" style={{ border: "1px solid #c9a227" }}>
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="#2c1810" bgColor="#f5f0e8" />
          </div>
          <p className="text-[9px] tracking-widest" style={{ color: "#c9a227" }}>PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function LinenBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: "#2c4a1e" }}>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.6) 3px, rgba(255,255,255,0.6) 4px)`,
        }}
      />
      <div className="text-center relative z-10">
        <p className="text-4xl font-bold" style={{ color: "#f5f0e8", fontFamily: "Georgia, serif" }}>VP</p>
        <div className="w-8 h-px mx-auto my-2" style={{ background: "#c9a227" }} />
        <p className="text-[9px] uppercase tracking-widest" style={{ color: "#c9a227" }}>Full-Stack Engineer</p>
        <p className="text-[9px] mt-1" style={{ color: "#8fa87d" }}>{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 10: Holo ───────────────────────────────────────────────────────────

function HoloFront() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex"
      style={{ background: "linear-gradient(135deg, #ff6ec7 0%, #ff9900 18%, #ffff00 34%, #00ff88 50%, #00cfff 66%, #7f00ff 82%, #ff6ec7 100%)" }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.12) 0%, transparent 60%)" }} />
      <div className="flex flex-1 p-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-widest mb-0.5">{INFO.title}</p>
            <h1 className="text-xl font-bold leading-tight text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>{INFO.name}</h1>
            <p className="text-xs text-white/70 mt-1">{INFO.subtitle}</p>
          </div>
          <ContactList className="text-white/80" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-1.5 rounded-lg">
            <QRWhite size={64} />
          </div>
          <p className="text-[9px] text-white/60 text-center">portfolio</p>
        </div>
      </div>
    </div>
  );
}

function HoloBack() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #7f00ff 0%, #00cfff 25%, #00ff88 50%, #ffff00 70%, #ff9900 85%, #ff6ec7 100%)" }}
    >
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)" }} />
      <div className="text-center relative z-10">
        <p className="text-4xl font-black text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>VP</p>
        <div className="w-12 h-0.5 bg-white/50 mx-auto my-2" />
        <p className="text-[10px] text-white/80 tracking-widest">{SITE_URL}</p>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type CardFace = { id: string; label: string; Component: React.FC };

const FRONTS: CardFace[] = [
  { id: "classic",    label: "Classic",    Component: ClassicFront },
  { id: "neon",       label: "Neon",       Component: NeonFront },
  { id: "split",      label: "Split",      Component: SplitFront },
  { id: "paper",      label: "Paper",      Component: PaperFront },
  { id: "gradient",   label: "Gradient",   Component: GradientFront },
  { id: "metal",      label: "Metal",      Component: MetalFront },
  { id: "blueprint",  label: "Blueprint",  Component: BlueprintFront },
  { id: "ink",        label: "Ink",        Component: InkFront },
  { id: "linen",      label: "Linen",      Component: LinenFront },
  { id: "holo",       label: "Holo",       Component: HoloFront },
];

const BACKS: CardFace[] = [
  { id: "classic",    label: "Classic",    Component: ClassicBack },
  { id: "neon",       label: "Neon",       Component: NeonBack },
  { id: "split",      label: "Split",      Component: SplitBack },
  { id: "paper",      label: "Paper",      Component: PaperBack },
  { id: "gradient",   label: "Gradient",   Component: GradientBack },
  { id: "metal",      label: "Metal",      Component: MetalBack },
  { id: "blueprint",  label: "Blueprint",  Component: BlueprintBack },
  { id: "ink",        label: "Ink",        Component: InkBack },
  { id: "linen",      label: "Linen",      Component: LinenBack },
  { id: "holo",       label: "Holo",       Component: HoloBack },
];

// ─── Mini card preview ────────────────────────────────────────────────────────

const FULL_W = 340;
const FULL_H = 213;
const MINI_W = 160;
const MINI_H = Math.round((MINI_W / FULL_W) * FULL_H); // ~100px

function MiniCard({ face, selected, onClick }: { face: CardFace; selected: boolean; onClick: () => void }) {
  const scale = MINI_W / FULL_W;
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 focus:outline-none group">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg transition-all duration-200",
          selected
            ? "ring-2 ring-primary ring-offset-2 shadow-xl scale-[1.04]"
            : "ring-1 ring-border/60 hover:ring-primary/50 hover:shadow-md hover:scale-[1.02]"
        )}
        style={{ width: MINI_W, height: MINI_H }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: FULL_W,
            height: FULL_H,
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          <face.Component />
        </div>
      </div>
      <span className={cn("text-xs transition-colors", selected ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground")}>
        {face.label}
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BusinessCard() {
  const t = useTranslations("CardPage");
  const [selectedFront, setSelectedFront] = useState("classic");
  const [selectedBack, setSelectedBack] = useState("classic");

  const front = FRONTS.find((f) => f.id === selectedFront) ?? FRONTS[0];
  const back = BACKS.find((b) => b.id === selectedBack) ?? BACKS[0];

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-muted/20">

      {/* Print styles */}
      <style>{`
        @media print {
          html, body { visibility: hidden; }

          .card-print-area {
            visibility: visible !important;
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }

          .card-print-area * {
            visibility: visible !important;
          }

          .card-print-page {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            page-break-after: always;
            break-after: page;
          }

          .card-print-wrapper {
            width: 85.6mm;
            height: 53.98mm;
            position: relative;
            overflow: hidden;
            border-radius: 3mm;
            outline: 2px dashed #aaa;
            outline-offset: 5mm;
          }

          .card-print-wrapper,
          .card-print-wrapper * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-scheme: light !important;
          }
        }
      `}</style>

      {/* Large preview */}
      <div className="print:hidden flex flex-col sm:flex-row gap-8 mb-8 items-start">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("frontLabel")}</p>
          <div className="w-85 h-53.25 rounded-2xl overflow-hidden shadow-2xl border border-border/40">
            <front.Component />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("backLabel")}</p>
          <div className="w-85 h-53.25 rounded-2xl overflow-hidden shadow-2xl border border-border/40">
            <back.Component />
          </div>
        </div>
      </div>

      <Button onClick={() => window.print()} className="gap-2 mb-12 print:hidden">
        <Printer className="w-4 h-4" />
        {t("printBtn")}
      </Button>

      {/* Front gallery */}
      <div className="print:hidden w-full max-w-5xl mb-14">
        <p className="text-xs font-medium text-center mb-6 uppercase tracking-widest text-muted-foreground">
          {t("chooseFront")}
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {FRONTS.map((face) => (
            <MiniCard
              key={face.id}
              face={face}
              selected={face.id === selectedFront}
              onClick={() => setSelectedFront(face.id)}
            />
          ))}
        </div>
      </div>

      {/* Back gallery */}
      <div className="print:hidden w-full max-w-5xl">
        <p className="text-xs font-medium text-center mb-6 uppercase tracking-widest text-muted-foreground">
          {t("chooseBack")}
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {BACKS.map((face) => (
            <MiniCard
              key={face.id}
              face={face}
              selected={face.id === selectedBack}
              onClick={() => setSelectedBack(face.id)}
            />
          ))}
        </div>
      </div>

      {/* Print output — hidden on screen, visible on print */}
      <div className="hidden card-print-area">
        <div className="card-print-page">
          <div className="card-print-wrapper">
            <front.Component />
          </div>
        </div>
        <div className="card-print-page">
          <div className="card-print-wrapper">
            <back.Component />
          </div>
        </div>
      </div>
    </div>
  );
}
