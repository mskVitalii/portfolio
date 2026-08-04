"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { QRCodeSVG } from "qrcode.react";
import { Mail, Send, MapPin, Printer, Lock, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CardWheel, type WheelCard, type Rarity, RARITY_COLORS, CARD_W, CARD_H } from "./CardWheel";
import { Card3DViewer } from "./Card3DViewer";
import { useAchievementsStore } from "@/store/achievements";
import confetti from "canvas-confetti";

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
            <p className="text-xl font-bold leading-tight text-slate-900">{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight text-white">{INFO.name}</p>
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
          <p className="text-lg font-bold text-white leading-tight">{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight text-stone-900" style={{ fontFamily: "Georgia, serif" }}>
              {INFO.name}
            </p>
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
            <p className="text-xl font-bold leading-tight text-white">{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight text-zinc-800">{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight text-white font-mono">{INFO.name}</p>
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
            <p className="text-2xl font-black leading-tight text-zinc-900 tracking-tight">{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight" style={{ color: "#2c1810", fontFamily: "Georgia, serif" }}>{INFO.name}</p>
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
            <p className="text-xl font-bold leading-tight text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>{INFO.name}</p>
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

// ── Design 11: Terminal ───────────────────────────────────────────────────────

function TerminalFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col" style={{ background: "#0d1117" }}>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/10" style={{ background: "#161b22" }}>
        <div className="w-2 h-2 rounded-full bg-red-500/80" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        <div className="w-2 h-2 rounded-full bg-green-500/80" />
        <span className="text-[9px] text-white/30 ml-1 font-mono">vitalii@popov ~ %</span>
      </div>
      <div className="flex flex-1 p-3 gap-3">
        <div className="flex-1 font-mono text-[9px] space-y-0.5">
          <p><span className="text-green-400">$ </span><span className="text-white/70">whoami</span></p>
          <p className="text-green-300">{INFO.name}</p>
          <p className="mt-1"><span className="text-green-400">$ </span><span className="text-white/70">cat role.txt</span></p>
          <p className="text-cyan-300">{INFO.title}</p>
          <p className="text-cyan-300/70">{INFO.subtitle}</p>
          <p className="mt-1"><span className="text-green-400">$ </span><span className="text-white/70">cat contact.json</span></p>
          <p className="text-yellow-300/80">{"{"}</p>
          <p className="pl-2 text-white/60">"email": <span className="text-green-300">"{INFO.email}"</span></p>
          <p className="pl-2 text-white/60">"tg": <span className="text-green-300">"{INFO.telegram}"</span></p>
          <p className="text-yellow-300/80">{"}"}</p>
        </div>
        <div className="flex flex-col items-end justify-end shrink-0">
          <div className="border border-green-400/30 p-1">
            <QRCodeSVG value={SITE_URL} size={52} level="M" fgColor="#4ade80" bgColor="#0d1117" />
          </div>
          <p className="text-[8px] text-green-400/40 mt-0.5 font-mono">portfolio</p>
        </div>
      </div>
      <div className="px-3 pb-1.5 flex items-center gap-1 font-mono">
        <span className="text-green-400 text-[9px]">$</span>
        <span className="w-1.5 h-3 bg-green-400/70 animate-pulse" />
      </div>
    </div>
  );
}

function TerminalBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#0d1117" }}>
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute font-mono text-[8px] text-green-400 whitespace-nowrap" style={{ top: `${i * 17}px`, left: "-8px" }}>
            01001010 10110100 01100001 11010010 00111001 10010100
          </div>
        ))}
      </div>
      <div className="text-center relative z-10 font-mono">
        <p className="text-[10px] text-green-400/60">~ %</p>
        <p className="text-3xl font-bold text-green-400">VP</p>
        <p className="text-[8px] text-green-400/40 mt-1">{SITE_URL}</p>
        <span className="inline-block w-2 h-4 bg-green-400/60 mt-1 animate-pulse" />
      </div>
    </div>
  );
}

// ── Design 12: Retro ─────────────────────────────────────────────────────────

function RetroFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: "#1a0533" }}>
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)" }} />
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: "linear-gradient(180deg, #ff00ff, #00ffff)" }} />
      <div className="flex flex-1 pl-5 pr-4 py-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] mb-1" style={{ color: "#ff00ff", fontFamily: "monospace" }}>◆ {INFO.title} ◆</p>
            <p className="text-xl font-black leading-tight" style={{ color: "#ffffff", textShadow: "2px 2px 0 #ff00ff, -1px -1px 0 #00ffff", fontFamily: "monospace" }}>{INFO.name}</p>
            <p className="text-[10px] mt-1" style={{ color: "#00ffff", fontFamily: "monospace" }}>{INFO.subtitle}</p>
          </div>
          <div className="space-y-0.5 font-mono text-[8px]" style={{ color: "#ff00ff99" }}>
            <p>✉ {INFO.email}</p>
            <p>✈ {INFO.telegram}</p>
            <p>◉ {INFO.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1" style={{ border: "2px solid #ff00ff" }}>
            <QRCodeSVG value={SITE_URL} size={58} level="M" fgColor="#00ffff" bgColor="#1a0533" />
          </div>
          <p className="text-[8px] font-mono" style={{ color: "#ff00ff60" }}>PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function RetroBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#1a0533" }}>
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #00ffff, #ff00ff, #00ffff)" }} />
      <div className="text-center relative z-10 font-mono">
        <p className="text-[10px]" style={{ color: "#ff00ff80" }}>◆ ◆ ◆</p>
        <p className="text-4xl font-black mt-1" style={{ color: "#ffffff", textShadow: "3px 3px 0 #ff00ff, -2px -2px 0 #00ffff" }}>VP</p>
        <p className="text-[10px] mt-2" style={{ color: "#00ffff" }}>◆ ◆ ◆</p>
        <p className="text-[8px] mt-2" style={{ color: "#ff00ff50" }}>{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 13: Aurora ─────────────────────────────────────────────────────────

function AuroraFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: "#020818" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, #0d9488aa 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #7c3aedaa 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #0891b2aa 0%, transparent 45%)" }} />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      <div className="flex flex-1 p-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#5eead4" }}>{INFO.title}</p>
            <p className="text-xl font-bold leading-tight text-white" style={{ textShadow: "0 0 20px rgba(94,234,212,0.3)" }}>{INFO.name}</p>
            <p className="text-xs mt-1" style={{ color: "#a78bfa" }}>{INFO.subtitle}</p>
          </div>
          <ContactList className="text-teal-100/70" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5 rounded-lg" style={{ background: "rgba(94,234,212,0.08)", border: "1px solid rgba(94,234,212,0.25)" }}>
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="#5eead4" bgColor="transparent" />
          </div>
          <p className="text-[9px]" style={{ color: "#5eead450" }}>portfolio</p>
        </div>
      </div>
    </div>
  );
}

function AuroraBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#020818" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, #0d948899 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, #7c3aed88 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, #0891b288 0%, transparent 45%)" }} />
      <div className="text-center relative z-10">
        <p className="text-4xl font-bold text-white" style={{ textShadow: "0 0 30px rgba(94,234,212,0.6)" }}>VP</p>
        <div className="w-12 h-px mx-auto my-2" style={{ background: "linear-gradient(90deg, transparent, #5eead4, transparent)" }} />
        <p className="text-[10px]" style={{ color: "#5eead470" }} >{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 14: Crimson ────────────────────────────────────────────────────────

function CrimsonFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: "#0c0205" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-700" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(220,38,38,0.12) 0%, transparent 60%)" }} />
      <div className="flex flex-1 pl-5 pr-4 py-4 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: "#ef4444", letterSpacing: "0.2em" }}>{INFO.title}</p>
            <p className="text-xl font-bold leading-tight text-white">{INFO.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#7f1d1d" }}>{INFO.subtitle}</p>
          </div>
          <ContactList className="text-red-100/50" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5" style={{ border: "1px solid #7f1d1d" }}>
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="#ef4444" bgColor="#0c0205" />
          </div>
          <p className="text-[8px]" style={{ color: "#7f1d1d" }}>PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function CrimsonBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#0c0205" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #dc2626, transparent)" }} />
      <div className="text-center relative z-10">
        <p className="text-5xl font-bold" style={{ color: "#dc2626", textShadow: "0 0 20px rgba(220,38,38,0.4)" }}>VP</p>
        <div className="w-8 h-px mx-auto my-2 bg-red-800" />
        <p className="text-[9px] uppercase tracking-widest" style={{ color: "#7f1d1d" }}>Full-Stack Engineer</p>
        <p className="text-[8px] mt-1" style={{ color: "#450a0a" }}>{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 15: Carbon ─────────────────────────────────────────────────────────

function CarbonFront() {
  return (
    <div className="relative w-full h-full overflow-hidden flex" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ffffff08 0px, #ffffff08 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, #ffffff05 0px, #ffffff05 1px, transparent 1px, transparent 8px)`,
          backgroundSize: "8px 8px",
        }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(180deg, #d4af37, #f5d060, #b8960c, #f5d060, #d4af37)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, #d4af37, transparent)" }} />
      <div className="flex flex-1 pl-4 pr-4 py-4 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] mb-0.5" style={{ color: "#d4af37" }}>{INFO.title}</p>
            <p className="text-xl font-bold leading-tight text-white">{INFO.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#d4af3780" }}>{INFO.subtitle}</p>
          </div>
          <ContactList className="text-zinc-400" />
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5" style={{ border: "1px solid #d4af37", background: "rgba(212,175,55,0.05)" }}>
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="#d4af37" bgColor="transparent" />
          </div>
          <p className="text-[8px]" style={{ color: "#d4af3760" }}>PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
}

function CarbonBack() {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ffffff08 0px, #ffffff08 1px, transparent 1px, transparent 8px), repeating-linear-gradient(-45deg, #ffffff05 0px, #ffffff05 1px, transparent 1px, transparent 8px)`,
          backgroundSize: "8px 8px",
        }}
      />
      <div className="text-center relative z-10">
        <p className="text-4xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(212,175,55,0.4)" }}>VP</p>
        <div className="w-10 h-px mx-auto my-2" style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />
        <p className="text-[9px] uppercase tracking-widest" style={{ color: "#d4af37" }}>Full-Stack Engineer</p>
        <p className="text-[8px] mt-1" style={{ color: "#d4af3740" }}>{SITE_URL}</p>
      </div>
    </div>
  );
}

// ── Design 16: Ghost (legendary — matte transparent glass) ───────────────────

function GhostFront() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex"
      style={{ background: "linear-gradient(135deg, rgba(220,230,255,0.08) 0%, rgba(160,180,220,0.04) 100%)" }}
    >
      {/* Frost highlight strip at top */}
      <div className="absolute top-0 left-0 right-0 h-12" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.07), transparent)" }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "14px 14px", opacity: 0.5 }} />
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(200,220,255,0.5), rgba(200,220,255,0.2), transparent)" }} />
      {/* Corner brackets */}
      {[["top-2.5 left-2.5", "border-t border-l"], ["top-2.5 right-2.5", "border-t border-r"], ["bottom-2.5 left-2.5", "border-b border-l"], ["bottom-2.5 right-2.5", "border-b border-r"]].map(([pos, border]) => (
        <div key={pos} className={`absolute ${pos} w-3.5 h-3.5 ${border}`} style={{ borderColor: "rgba(200,220,255,0.35)" }} />
      ))}
      <div className="flex flex-1 pl-5 pr-4 py-5 gap-4 relative z-10">
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] mb-0.5" style={{ color: "rgba(180,200,255,0.5)" }}>{INFO.title}</p>
            <p className="text-xl font-bold leading-tight" style={{ color: "rgba(230,240,255,0.92)" }}>{INFO.name}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(180,200,255,0.35)" }}>{INFO.subtitle}</p>
          </div>
          <div className="space-y-1 text-xs" style={{ color: "rgba(200,215,255,0.55)" }}>
            <div className="flex items-center gap-1.5"><Mail className="w-3 h-3 shrink-0" /><span>{INFO.email}</span></div>
            <div className="flex items-center gap-1.5"><LinkedinIcon className="w-3 h-3 shrink-0" /><span>{INFO.linkedin}</span></div>
            <div className="flex items-center gap-1.5"><GithubIcon className="w-3 h-3 shrink-0" /><span>{INFO.github}</span></div>
            <div className="flex items-center gap-1.5"><Send className="w-3 h-3 shrink-0" /><span>{INFO.telegram}</span></div>
            <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3 shrink-0" /><span>{INFO.location}</span></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end gap-1 shrink-0">
          <div className="p-1.5" style={{ border: "1px solid rgba(200,215,255,0.18)", background: "rgba(200,215,255,0.04)" }}>
            <QRCodeSVG value={SITE_URL} size={64} level="M" fgColor="rgba(200,220,255,0.65)" bgColor="transparent" />
          </div>
          <p className="text-[8px] uppercase tracking-widest" style={{ color: "rgba(180,200,255,0.25)" }}>portfolio</p>
        </div>
      </div>
    </div>
  );
}

function GhostBack() {
  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, rgba(220,230,255,0.06) 0%, rgba(160,180,220,0.03) 100%)" }}
    >
      {/* Radial glow from center */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(140,170,255,0.1), transparent 70%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "14px 14px", opacity: 0.6 }} />
      {/* Corner brackets */}
      {[["top-2.5 left-2.5", "border-t border-l"], ["top-2.5 right-2.5", "border-t border-r"], ["bottom-2.5 left-2.5", "border-b border-l"], ["bottom-2.5 right-2.5", "border-b border-r"]].map(([pos, border]) => (
        <div key={pos} className={`absolute ${pos} w-3.5 h-3.5 ${border}`} style={{ borderColor: "rgba(200,220,255,0.3)" }} />
      ))}
      <div className="text-center relative z-10">
        <p className="text-4xl font-bold tracking-wider" style={{ color: "rgba(220,235,255,0.85)", textShadow: "0 0 24px rgba(140,170,255,0.35)" }}>VP</p>
        <div className="w-10 h-px mx-auto my-2.5" style={{ background: "linear-gradient(90deg, transparent, rgba(180,200,255,0.45), transparent)" }} />
        <p className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "rgba(160,185,255,0.35)" }}>{SITE_URL}</p>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type CardFace = { id: string; label: string; Component: React.FC; rarity?: Rarity; weight?: number };

const FRONTS: CardFace[] = [
  { id: "classic",    label: "Classic",    Component: ClassicFront,    rarity: "common",    weight: 40 },
  { id: "neon",       label: "Neon",       Component: NeonFront,       rarity: "rare",      weight: 20 },
  { id: "split",      label: "Split",      Component: SplitFront,      rarity: "common",    weight: 40 },
  { id: "paper",      label: "Paper",      Component: PaperFront,      rarity: "rare",      weight: 20 },
  { id: "gradient",   label: "Gradient",   Component: GradientFront,   rarity: "epic",      weight: 8 },
  { id: "metal",      label: "Metal",      Component: MetalFront,      rarity: "rare",      weight: 20 },
  { id: "blueprint",  label: "Blueprint",  Component: BlueprintFront,  rarity: "epic",      weight: 8 },
  { id: "ink",        label: "Ink",        Component: InkFront,        rarity: "common",    weight: 40 },
  { id: "linen",      label: "Linen",      Component: LinenFront,      rarity: "rare",      weight: 20 },
  { id: "holo",       label: "Holo",       Component: HoloFront,       rarity: "legendary", weight: 2 },
  { id: "terminal",   label: "Terminal",   Component: TerminalFront,   rarity: "common",    weight: 40 },
  { id: "retro",      label: "Retro",      Component: RetroFront,      rarity: "rare",      weight: 20 },
  { id: "aurora",     label: "Aurora",     Component: AuroraFront,     rarity: "epic",      weight: 8 },
  { id: "crimson",    label: "Crimson",    Component: CrimsonFront,    rarity: "rare",      weight: 20 },
  { id: "carbon",     label: "Carbon",     Component: CarbonFront,     rarity: "legendary", weight: 2 },
  { id: "ghost",      label: "Ghost",      Component: GhostFront,      rarity: "legendary", weight: 2 },
];

const BACKS: CardFace[] = [
  { id: "classic",    label: "Classic",    Component: ClassicBack,    rarity: "common",    weight: 40 },
  { id: "neon",       label: "Neon",       Component: NeonBack,       rarity: "rare",      weight: 20 },
  { id: "split",      label: "Split",      Component: SplitBack,      rarity: "common",    weight: 40 },
  { id: "paper",      label: "Paper",      Component: PaperBack,      rarity: "rare",      weight: 20 },
  { id: "gradient",   label: "Gradient",   Component: GradientBack,   rarity: "epic",      weight: 8 },
  { id: "metal",      label: "Metal",      Component: MetalBack,      rarity: "rare",      weight: 20 },
  { id: "blueprint",  label: "Blueprint",  Component: BlueprintBack,  rarity: "epic",      weight: 8 },
  { id: "ink",        label: "Ink",        Component: InkBack,        rarity: "common",    weight: 40 },
  { id: "linen",      label: "Linen",      Component: LinenBack,      rarity: "rare",      weight: 20 },
  { id: "holo",       label: "Holo",       Component: HoloBack,       rarity: "legendary", weight: 2 },
  { id: "terminal",   label: "Terminal",   Component: TerminalBack,   rarity: "common",    weight: 40 },
  { id: "retro",      label: "Retro",      Component: RetroBack,      rarity: "rare",      weight: 20 },
  { id: "aurora",     label: "Aurora",     Component: AuroraBack,     rarity: "epic",      weight: 8 },
  { id: "crimson",    label: "Crimson",    Component: CrimsonBack,    rarity: "rare",      weight: 20 },
  { id: "carbon",     label: "Carbon",     Component: CarbonBack,     rarity: "legendary", weight: 2 },
  { id: "ghost",      label: "Ghost",      Component: GhostBack,      rarity: "legendary", weight: 2 },
];

// ─── Collection localStorage hook ─────────────────────────────────────────────

const COLLECTION_KEY = "vp-card-collection";
const OWNER_PASSWORD = "0451";
const FULL_W = 340;
const FULL_H = 213;

const RARITY_ORDER: Record<Rarity, number> = {
  legendary: 0,
  epic: 1,
  rare: 2,
  common: 3,
};

interface CardCollection {
  unlocked: string[];
  counts: Record<string, number>;
  spinCount: number;
}

function loadCollection(): CardCollection {
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        unlocked: parsed.unlocked ?? [],
        counts: parsed.counts ?? {},
        spinCount: parsed.spinCount ?? 0,
      };
    }
  } catch { /* ignore */ }
  return { unlocked: [], counts: {}, spinCount: 0 };
}

function saveCollection(col: CardCollection) {
  try { localStorage.setItem(COLLECTION_KEY, JSON.stringify(col)); } catch { /* ignore */ }
}

// ─── Card item in collection grid ─────────────────────────────────────────────

function CollectionItem({
  face,
  unlocked,
  count,
  selected,
  ownerMode,
  onClick,
}: {
  face: CardFace;
  unlocked: boolean;
  count: number;
  selected: boolean;
  ownerMode: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("CardPage");
  const accessible = unlocked || ownerMode;
  const rc = RARITY_COLORS[(face.rarity ?? "common") as Rarity];
  const scale = CARD_W / FULL_W;

  return (
    <button
      onClick={accessible ? onClick : undefined}
      disabled={!accessible}
      className={cn(
        "relative flex flex-col items-center gap-1.5 group focus:outline-none",
        !accessible && "cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border-2 transition-all duration-200",
          rc.border,
          selected && "ring-2 ring-primary ring-offset-2 shadow-xl scale-[1.04]",
          accessible && !selected && "hover:scale-[1.02] hover:shadow-lg",
          !accessible && "opacity-40 grayscale"
        )}
        style={{ width: CARD_W, height: CARD_H }}
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

        {/* Lock overlay */}
        {!accessible && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Lock className="w-6 h-6 text-muted-foreground" />
          </div>
        )}

        {/* Count badge */}
        {count > 0 && (
          <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </div>
        )}

        {/* Rarity stripe */}
        <div className={cn("absolute bottom-0 left-0 right-0 text-center py-0.5 text-[9px] font-bold uppercase tracking-widest", rc.badge)}>
          {t(`rarity${(face.rarity ?? "common").charAt(0).toUpperCase() + (face.rarity ?? "common").slice(1)}` as "rarityCommon")}
        </div>
      </div>
      <span className={cn(
        "text-xs transition-colors",
        selected ? "text-primary font-semibold" : accessible ? "text-foreground group-hover:text-primary" : "text-muted-foreground"
      )}>
        {t(`skin${face.id.charAt(0).toUpperCase() + face.id.slice(1)}` as "skinClassic")}
      </span>
    </button>
  );
}

// ─── Reset confirmation modal ──────────────────────────────────────────────────

function ResetModal({ onConfirm, onCancel, t }: {
  onConfirm: () => void;
  onCancel: () => void;
  t: ReturnType<typeof useTranslations<"CardPage">>;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border bg-card p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-destructive" />
          </div>
          <h3 className="font-bold text-lg">{t("resetModalTitle")}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{t("resetModalDesc")}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors"
          >
            {t("resetCancel")}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:bg-destructive/90 transition-colors"
          >
            {t("resetConfirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const WHEEL_CARDS: WheelCard[] = FRONTS.map((f) => ({
  id: f.id,
  label: f.label,
  rarity: (f.rarity ?? "common") as Rarity,
  weight: f.weight ?? 20,
  Component: f.Component,
}));

const SORTED_FRONTS = [...FRONTS].sort((a, b) =>
  RARITY_ORDER[(a.rarity ?? "common") as Rarity] - RARITY_ORDER[(b.rarity ?? "common") as Rarity]
);

export function BusinessCard() {
  const t = useTranslations("CardPage");
  const [collection, setCollection] = useState<CardCollection>({ unlocked: [], counts: {}, spinCount: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ownerMode, setOwnerMode] = useState(false);
  const [ownerInput, setOwnerInput] = useState("");
  const [ownerShow, setOwnerShow] = useState(false);
  const [ownerError, setOwnerError] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const unlockAchievement = useAchievementsStore((s) => s.unlock);

  // Load collection from localStorage on mount
  useEffect(() => { setCollection(loadCollection()); }, []);

  const handleWheelResult = useCallback((card: WheelCard) => {
    setCollection((prev) => {
      const next: CardCollection = {
        unlocked: prev.unlocked.includes(card.id) ? prev.unlocked : [...prev.unlocked, card.id],
        counts: { ...prev.counts, [card.id]: (prev.counts[card.id] ?? 0) + 1 },
        spinCount: prev.spinCount + 1,
      };
      saveCollection(next);
      return next;
    });
    setSelectedId(card.id);

    if (collection.spinCount + 1 > 20) unlockAchievement("ludomania");

    const goldenColors = ["#f59e0b", "#fbbf24", "#fcd34d", "#ffffff", "#f97316"];
    if (card.rarity === "legendary") {
      unlockAchievement("legendarySkin");
      // Huge multi-burst
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.4 }, colors: goldenColors, scalar: 1.4, zIndex: 9999 });
      setTimeout(() => confetti({ particleCount: 150, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors: goldenColors, scalar: 1.2, zIndex: 9999 }), 200);
      setTimeout(() => confetti({ particleCount: 150, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors: goldenColors, scalar: 1.2, zIndex: 9999 }), 350);
      setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { y: 0.3 }, colors: goldenColors, gravity: 0.5, scalar: 1.1, zIndex: 9999 }), 600);
      setTimeout(() => confetti({ particleCount: 80, angle: 90, spread: 160, origin: { x: 0.5, y: 0 }, colors: goldenColors, startVelocity: 50, scalar: 1.4, zIndex: 9999 }), 900);
    } else if (card.rarity === "epic") {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#a855f7", "#c084fc", "#e879f9", "#7c3aed"] });
      setTimeout(() => confetti({ particleCount: 50, spread: 50, origin: { y: 0.65 }, colors: ["#7c3aed", "#8b5cf6", "#d946ef"] }), 300);
    } else if (card.rarity === "rare") {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.65 }, colors: ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"] });
    }
    // common: no confetti
  }, [unlockAchievement, collection.spinCount]);

  const handleOwnerSubmit = () => {
    if (ownerInput === OWNER_PASSWORD) {
      setOwnerMode(true);
      setOwnerError(false);
      setOwnerShow(false);
      setOwnerInput("");
    } else {
      setOwnerError(true);
    }
  };

  const handleReset = () => {
    try { localStorage.removeItem(COLLECTION_KEY); } catch { /* ignore */ }
    setCollection({ unlocked: [], counts: {}, spinCount: 0 });
    setSelectedId(null);
    setResetModalOpen(false);
  };

  const selectedFront = FRONTS.find((f) => f.id === selectedId);
  const selectedBack  = BACKS.find((b) => b.id === selectedId);

  const unlockedCount = collection.unlocked.length;
  const totalCount = FRONTS.length;

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-muted/20">
      <style>{`
        @media print {
          html, body { visibility: hidden; background: white !important; }
          .card-print-area { visibility: visible !important; display: flex !important; flex-direction: column; position: absolute; top: 0; left: 0; width: 100%; }
          .card-print-area * { visibility: visible !important; }
          .card-print-page { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; page-break-after: always; break-after: page; background: white !important; }
          .card-print-wrapper { width: 85.6mm; height: 53.98mm; position: relative; overflow: hidden; border-radius: 3mm; outline: 2px dashed #aaa; outline-offset: 5mm; }
          .card-print-wrapper, .card-print-wrapper * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-scheme: light !important; }
        }
      `}</style>

      {/* Reset modal */}
      {resetModalOpen && (
        <ResetModal
          t={t}
          onConfirm={handleReset}
          onCancel={() => setResetModalOpen(false)}
        />
      )}

      {/* Wheel */}
      <div className="print:hidden w-full max-w-3xl mb-16">
        <CardWheel cards={WHEEL_CARDS} onResult={handleWheelResult} />
      </div>

      {/* Collection grid */}
      <div className="print:hidden w-full max-w-5xl mb-12">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("collectionHeader", { unlocked: unlockedCount, total: totalCount })}
            {collection.spinCount > 0 && ` ${t("collectionSpins", { count: collection.spinCount })}`}
          </p>
          <div className="flex items-center gap-3">
            {ownerMode && (
              <span className="text-xs text-amber-500 font-semibold uppercase tracking-widest">{t("ownerModeLabel")}</span>
            )}
            {unlockedCount > 0 && (
              <button
                onClick={() => setResetModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-destructive transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                {t("resetBtn")}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {SORTED_FRONTS.map((face) => (
            <CollectionItem
              key={face.id}
              face={face}
              unlocked={collection.unlocked.includes(face.id)}
              count={collection.counts[face.id] ?? 0}
              selected={face.id === selectedId}
              ownerMode={ownerMode}
              onClick={() => setSelectedId(face.id === selectedId ? null : face.id)}
            />
          ))}
        </div>
      </div>

      {/* 3D Card Viewer */}
      {selectedFront && selectedBack && (
        <div className="print:hidden w-full max-w-3xl mb-12">
          <Card3DViewer
            Front={selectedFront.Component}
            Back={selectedBack.Component}
            rarity={(selectedFront.rarity ?? "common") as Rarity}
            label={t(`skin${selectedFront.id.charAt(0).toUpperCase() + selectedFront.id.slice(1)}` as "skinClassic")}
            rarityLabel={t(`rarity${((selectedFront.rarity ?? "common").charAt(0).toUpperCase() + (selectedFront.rarity ?? "common").slice(1))}` as "rarityCommon")}
            hint={t("viewer3dHint")}
          />
          <div className="flex justify-center mt-5">
            <Button onClick={() => window.print()} variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              {t("printBtn")}
            </Button>
          </div>
        </div>
      )}

      {/* Owner Mode toggle */}
      <div className="print:hidden mt-4 w-full max-w-sm">
        {!ownerMode && !ownerShow && (
          <button
            onClick={() => setOwnerShow(true)}
            className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors mx-auto block"
          >
            Owner Mode
          </button>
        )}
        {ownerShow && !ownerMode && (
          <div className="flex flex-col gap-2 p-4 rounded-xl border bg-card">
            <p className="text-xs font-medium text-muted-foreground">{t("ownerModePasswordPrompt")}</p>
            <div className="flex gap-2">
              <input
                type="password"
                value={ownerInput}
                onChange={(e) => { setOwnerInput(e.target.value); setOwnerError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleOwnerSubmit()}
                placeholder={t("ownerModePasswordPlaceholder")}
                className="flex-1 text-sm px-3 py-1.5 rounded-lg border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="sm" onClick={handleOwnerSubmit}>{t("ownerModeEnter")}</Button>
            </div>
            {ownerError && <p className="text-xs text-destructive">{t("ownerModeError")}</p>}
            <button onClick={() => { setOwnerShow(false); setOwnerInput(""); setOwnerError(false); }} className="text-xs text-muted-foreground hover:text-foreground">{t("ownerModeCancel")}</button>
          </div>
        )}
        {ownerMode && (
          <button
            onClick={() => setOwnerMode(false)}
            className="text-xs text-amber-500/60 hover:text-amber-500 transition-colors mx-auto flex items-center gap-1"
          >
            <EyeOff className="w-3 h-3" /> {t("ownerModeExit")}
          </button>
        )}
      </div>

      {/* Print output */}
      {selectedFront && selectedBack && (
        <div className="hidden card-print-area">
          <div className="card-print-page">
            <div className="card-print-wrapper">
              <selectedFront.Component />
            </div>
          </div>
          <div className="card-print-page">
            <div className="card-print-wrapper">
              <selectedBack.Component />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
