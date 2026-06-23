"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import type { Rarity } from "./CardWheel";
import { RARITY_COLORS } from "./CardWheel";

// ─── Card dimensions (Three.js world units) ───────────────────────────────────
const CW = 3.4;   // width
const CH = 2.13;  // height
const CD = 0.05;  // thickness

// HTML face size (must match actual card component render size)
const HTML_W = 340;
const HTML_H = 213;

// Camera setup
const CAM_Z = 4.5;
const CAM_FOV = 45;
const CANVAS_H = 420;

// distanceFactor: empirically calibrated for current camera + canvas setup
const DF = CW * CANVAS_H / HTML_W;

// ─── Per-rarity scene config ──────────────────────────────────────────────────

interface RarityScene {
  bg: string;
  bgInner: string;
  fog: string;
  ambient: string;
  ambientI: number;
  accent: string;
  accentI: number;
  rim: string;
  rimI: number;
  edgeColor: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  emissiveI: number;
  shadowColor: string;
  bloom: boolean;
  bloomI: number;
}

const SCENE: Record<Rarity, RarityScene> = {
  common: {
    bg: "#111116",        bgInner: "#1c1c26",
    fog: "#111116",
    ambient: "#8899aa",   ambientI: 0.6,
    accent: "#ffffff",    accentI: 1.5,
    rim: "#6b7280",       rimI: 0.8,
    edgeColor: "#94a3b8",
    metalness: 0.2,       roughness: 0.3,   clearcoat: 0.2,
    emissiveI: 0.02,
    shadowColor: "#334155",
    bloom: false, bloomI: 0,
  },
  rare: {
    bg: "#06091a",        bgInner: "#0c1535",
    fog: "#06091a",
    ambient: "#1e3461",   ambientI: 0.8,
    accent: "#3b82f6",    accentI: 5,
    rim: "#1d4ed8",       rimI: 3,
    edgeColor: "#3b82f6",
    metalness: 0.35,      roughness: 0.25,  clearcoat: 0.5,
    emissiveI: 0.12,
    shadowColor: "#1e3a8a",
    bloom: false, bloomI: 0,
  },
  epic: {
    bg: "#0a0414",        bgInner: "#1a0830",
    fog: "#0a0414",
    ambient: "#2d1b4e",   ambientI: 0.9,
    accent: "#a855f7",    accentI: 6,
    rim: "#7c3aed",       rimI: 4,
    edgeColor: "#a855f7",
    metalness: 0.45,      roughness: 0.2,   clearcoat: 0.7,
    emissiveI: 0.28,
    shadowColor: "#4c1d95",
    bloom: true, bloomI: 0.8,
  },
  legendary: {
    bg: "#120900",        bgInner: "#2c1400",
    fog: "#120900",
    ambient: "#3d2200",   ambientI: 1.0,
    accent: "#f59e0b",    accentI: 8,
    rim: "#f97316",       rimI: 6,
    edgeColor: "#d4af37",
    metalness: 0.9,       roughness: 0.12,  clearcoat: 1.0,
    emissiveI: 0.55,
    shadowColor: "#92400e",
    bloom: true, bloomI: 2.0,
  },
};

// CSS glow ring applied outside the WebGL canvas (complements in-scene bloom)
const RARITY_GLOW: Record<Rarity, string> = {
  common: "none",
  rare: "0 0 28px rgba(59,130,246,0.35), 0 0 60px rgba(59,130,246,0.14)",
  epic: "0 0 32px rgba(168,85,247,0.45), 0 0 70px rgba(168,85,247,0.18)",
  legendary: "0 0 40px rgba(245,158,11,0.55), 0 0 80px rgba(245,158,11,0.25), 0 0 140px rgba(249,115,22,0.12)",
};

const RARITY_BORDER: Record<Rarity, string> = {
  common: "border border-slate-700/60",
  rare: "border border-blue-500/50",
  epic: "border border-purple-500/60",
  legendary: "border border-amber-400/70",
};

// ─── Face visibility tracker (avoids double-face render) ──────────────────────

function useFaceVisibility(groupRef: React.RefObject<THREE.Group | null>) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useFrame(({ camera }) => {
    const g = groupRef.current;
    if (!g || !frontRef.current || !backRef.current) return;
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(g.quaternion);
    const toCam = new THREE.Vector3().subVectors(camera.position, g.position).normalize();
    const dot = normal.dot(toCam);
    frontRef.current.style.visibility = dot >= 0 ? "visible" : "hidden";
    backRef.current.style.visibility = dot < 0 ? "visible" : "hidden";
  });

  return { frontRef, backRef };
}

// ─── distanceFactor calibrated to physical canvas height ──────────────────────

function useDynamicDF(): number {
  const { gl } = useThree();
  const [df, setDf] = useState(DF);

  useEffect(() => {
    const size = new THREE.Vector2();
    gl.getSize(size);
    setDf(CW * size.y / HTML_W);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return df;
}

// ─── 3D card mesh with HTML face overlays ────────────────────────────────────

interface CardMeshProps {
  Front: React.FC;
  Back: React.FC;
  rarity: Rarity;
  autoRotate: boolean;
}

function CardMesh({ Front, Back, rarity, autoRotate }: CardMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cfg = SCENE[rarity];
  const df = useDynamicDF();
  const { frontRef, backRef } = useFaceVisibility(groupRef as React.RefObject<THREE.Group>);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  const faceStyle: React.CSSProperties = {
    width: HTML_W,
    height: HTML_H,
    overflow: "hidden",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    // Initial tilt so the card looks 3D immediately (not face-flat)
    <group ref={groupRef} rotation={[0.1, 0.35, 0]}>
      {/* Card body — thin box, emissive edges glow with rarity color */}
      <mesh>
        <boxGeometry args={[CW, CH, CD]} />
        <meshPhysicalMaterial
          color={cfg.edgeColor}
          emissive={cfg.accent}
          emissiveIntensity={cfg.emissiveI}
          metalness={cfg.metalness}
          roughness={cfg.roughness}
          clearcoat={cfg.clearcoat}
          clearcoatRoughness={0.2}
          reflectivity={0.8}
          envMapIntensity={rarity === "legendary" ? 2.5 : 1.2}
        />
      </mesh>

      {/* Front face HTML */}
      <Html
        transform
        position={[0, 0, CD / 2 + 0.001]}
        distanceFactor={df}
        zIndexRange={[1, 0]}
        style={{ overflow: "visible" }}
      >
        <div ref={frontRef} style={faceStyle}>
          <Front />
        </div>
      </Html>

      {/* Back face HTML */}
      <Html
        transform
        position={[0, 0, -(CD / 2 + 0.001)]}
        rotation={[0, Math.PI, 0]}
        distanceFactor={df}
        zIndexRange={[1, 0]}
        style={{ overflow: "visible" }}
      >
        <div ref={backRef} style={faceStyle}>
          <Back />
        </div>
      </Html>
    </group>
  );
}

// ─── Pulsing legendary lights ─────────────────────────────────────────────────

function LegendaryPulse() {
  const ref1 = useRef<THREE.PointLight>(null);
  const ref2 = useRef<THREE.PointLight>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (ref1.current) ref1.current.intensity = 4 + Math.sin(t.current * 1.4) * 2;
    if (ref2.current) ref2.current.intensity = 3.5 + Math.cos(t.current * 1.1) * 1.5;
  });

  return (
    <>
      <pointLight ref={ref1} position={[0, 5, 1]} color="#fcd34d" intensity={4} />
      <pointLight ref={ref2} position={[-4, -3, -2]} color="#f97316" intensity={3.5} />
      <pointLight position={[4, -2, -3]} color="#fb923c" intensity={3} />
      <spotLight position={[0, 6, 0]} angle={0.6} penumbra={0.5} intensity={8} color="#fbbf24" />
    </>
  );
}

// ─── Lighting per rarity ──────────────────────────────────────────────────────

function RarityLights({ rarity }: { rarity: Rarity }) {
  const cfg = SCENE[rarity];

  return (
    <>
      <ambientLight color={cfg.ambient} intensity={cfg.ambientI} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff8ee" />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#c8d8ff" />
      <pointLight position={[3, 3, 3]} color={cfg.accent} intensity={cfg.accentI} />
      <pointLight position={[-3, 1, -4]} color={cfg.rim} intensity={cfg.rimI} />

      {rarity === "epic" && (
        <>
          <pointLight position={[0, -3, -3]} color="#9333ea" intensity={3} />
          <pointLight position={[-2, 4, 1]} color="#c084fc" intensity={2.5} />
        </>
      )}

      {rarity === "legendary" && <LegendaryPulse />}
    </>
  );
}

// ─── Full scene (inside Canvas) ───────────────────────────────────────────────

interface SceneProps {
  Front: React.FC;
  Back: React.FC;
  rarity: Rarity;
  autoRotate: boolean;
  onInteractionStart: () => void;
  onInteractionEnd: () => void;
}

function CardScene({ Front, Back, rarity, autoRotate, onInteractionStart, onInteractionEnd }: SceneProps) {
  const cfg = SCENE[rarity];

  return (
    <>
      <fog attach="fog" args={[cfg.fog, 8, 25]} />

      {/* PBR environment gives reflections on card edges */}
      <Environment preset="studio" environmentIntensity={rarity === "legendary" ? 0.4 : 0.6} />

      <RarityLights rarity={rarity} />

      <CardMesh Front={Front} Back={Back} rarity={rarity} autoRotate={autoRotate} />

      <ContactShadows
        position={[0, -CH / 2 - 0.05, 0]}
        opacity={0.6}
        scale={8}
        blur={2.5}
        far={4}
        color={cfg.shadowColor}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.4}
        minPolarAngle={Math.PI / 2 - 0.4}
        rotateSpeed={0.8}
        onStart={onInteractionStart}
        onEnd={onInteractionEnd}
      />

      {cfg.bloom && (
        <EffectComposer>
          <Bloom intensity={cfg.bloomI} luminanceThreshold={0.45} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

export interface Card3DViewerProps {
  Front: React.FC;
  Back: React.FC;
  rarity: Rarity;
  label: string;
  rarityLabel: string;
  hint: string;
}

export function Card3DViewer({ Front, Back, rarity, label, rarityLabel, hint }: Card3DViewerProps) {
  const cfg = SCENE[rarity];
  const [mounted, setMounted] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => { setMounted(true); }, []);

  const handleInteractionStart = useCallback(() => {
    setAutoRotate(false);
    clearTimeout(resumeRef.current);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    resumeRef.current = setTimeout(() => setAutoRotate(true), 2500);
  }, []);

  if (!mounted) return (
    <div
      className={cn("w-full rounded-2xl animate-pulse h-52 sm:h-80 lg:h-105", RARITY_BORDER[rarity])}
      style={{
        background: `radial-gradient(ellipse 70% 70% at 50% 45%, ${cfg.bgInner} 0%, ${cfg.bg} 100%)`,
        boxShadow: RARITY_GLOW[rarity],
      }}
    />
  );

  return (
    <div className="relative w-full flex flex-col items-center gap-3">
      {/* Label + rarity badge */}
      <div className="flex items-center gap-3">
        <span className={cn("text-base font-bold", RARITY_COLORS[rarity].text)}>
          {label}
        </span>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
          RARITY_COLORS[rarity].badge
        )}>
          {rarityLabel}
        </span>
      </div>

      {/* Canvas */}
      <div
        className={cn("relative w-full rounded-2xl overflow-hidden h-52 sm:h-80 lg:h-105", RARITY_BORDER[rarity])}
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 45%, ${cfg.bgInner} 0%, ${cfg.bg} 100%)`,
          boxShadow: RARITY_GLOW[rarity],
          contain: "paint layout",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
          dpr={[1, 1]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <CardScene
              Front={Front}
              Back={Back}
              rarity={rarity}
              autoRotate={autoRotate}
              onInteractionStart={handleInteractionStart}
              onInteractionEnd={handleInteractionEnd}
            />
          </Suspense>
        </Canvas>

        {/* Drag hint (translated) */}
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/25 select-none pointer-events-none whitespace-nowrap">
          {hint}
        </p>
      </div>
    </div>
  );
}
