"use client";

import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useViewMode } from "@/store/viewMode";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Badge } from "@/components/ui/badge";
import { SKILLS, CATEGORY_COLORS, LEVEL_LABELS, type Skill } from "@/data/skills";

// ─── Shared node renderer ───────────────────────────────────────────────────

function TechNode({ data, selected }: NodeProps) {
  const d = data as { label: string; category: string; level?: string; years?: number; handles?: string[] };
  const color = CATEGORY_COLORS[d.category as keyof typeof CATEGORY_COLORS] ?? "#888";
  const handles = d.handles ?? ["left", "right"];
  const levelDot = d.level === "expert" ? "●●●" : d.level === "proficient" ? "●●○" : d.level ? "●○○" : undefined;

  return (
    <div
      className="px-3 py-2 rounded-lg border-2 bg-background text-foreground text-xs cursor-pointer min-w-[90px] text-center transition-all select-none"
      style={{
        borderColor: selected ? color : "var(--border)",
        boxShadow: selected ? `0 0 0 3px ${color}33` : undefined,
      }}
    >
      {handles.includes("left") && <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />}
      <div className="font-semibold">{d.label}</div>
      {levelDot && (
        <div style={{ color }} className="text-[10px] mt-0.5">
          {levelDot} {d.years}y
        </div>
      )}
      {handles.includes("right") && <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />}
      {handles.includes("bottom") && <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />}
      {handles.includes("top") && <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />}
    </div>
  );
}

function GroupLabelNode({ data }: NodeProps) {
  const d = data as { label: string };
  return (
    <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground pointer-events-none">
      {d.label}
    </div>
  );
}

const nodeTypes = { techNode: TechNode, groupLabel: GroupLabelNode };

// ─── Graph definitions ───────────────────────────────────────────────────────

function getSkill(id: string): Skill | undefined {
  return SKILLS.find((s) => s.id === id);
}

function skillNode(id: string, x: number, y: number, overrideLabel?: string): Node {
  const s = getSkill(id);
  return {
    id,
    type: "techNode",
    position: { x, y },
    data: {
      label: overrideLabel ?? s?.name ?? id,
      category: s?.category ?? "backend",
      level: s?.level,
      years: s?.years,
      handles: ["left", "right", "top", "bottom"],
    },
  };
}

function labelNode(id: string, label: string, x: number, y: number): Node {
  return { id, type: "groupLabel", position: { x, y }, data: { label }, selectable: false };
}

function edge(source: string, target: string, color = "#88888844"): Edge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    style: { stroke: color, strokeWidth: 1.5 },
    animated: false,
  };
}

// ── ARCHITECTURE graph ────────────────────────────────────────────────────

const ARCH_NODES: Node[] = [
  labelNode("lbl-client",  "Client",          10,  10),
  skillNode("react",                           10,  40),

  labelNode("lbl-api",     "API / Services",  200, 10),
  skillNode("go",                              200, 40),
  skillNode("python",                          200, 140),
  skillNode("csharp",                          200, 240),
  skillNode("nodejs",                          200, 340),

  labelNode("lbl-bus",     "Messaging",        400, 10),
  skillNode("kafka",                           400, 40),

  labelNode("lbl-data",    "Data Layer",       590, 10),
  skillNode("postgresql",                      590, 40),
  skillNode("redis",                           590, 140),
  skillNode("elasticsearch",                   590, 240),

  labelNode("lbl-embed",   "Embedded",         -10, 260),
  { id: "c", type: "techNode", position: { x: -10, y: 290 },
    data: { label: "C", category: "backend", level: "proficient", years: 2, handles: ["right", "bottom"] } },
  skillNode("computer-vision",                 200, 430),
];

const ARCH_EDGES: Edge[] = [
  edge("react", "go"),
  edge("react", "nodejs"),
  edge("go", "kafka"),
  edge("go", "redis"),
  edge("go", "postgresql"),
  edge("go", "elasticsearch"),
  edge("python", "kafka"),
  edge("python", "redis"),
  edge("csharp", "postgresql"),
  edge("kafka", "postgresql"),
  edge("kafka", "redis"),
  edge("c", "computer-vision"),
  edge("computer-vision", "python"),
];

// ── FRONTEND graph ────────────────────────────────────────────────────────

const FE_NODES: Node[] = [
  labelNode("lbl-fw",    "Framework",        10, 10),
  skillNode("nextjs",                        10, 40),
  skillNode("react",                         10, 140),

  labelNode("lbl-state", "State",           220, 10),
  { id: "zustand", type: "techNode", position: { x: 220, y: 40 },
    data: { label: "Zustand", category: "frontend", level: "proficient", years: 2, handles: ["left", "right"] } },
  { id: "redux", type: "techNode", position: { x: 220, y: 130 },
    data: { label: "Redux", category: "frontend", level: "proficient", years: 2, handles: ["left", "right"] } },
  { id: "jotai", type: "techNode", position: { x: 220, y: 220 },
    data: { label: "Jotai", category: "frontend", level: "familiar", years: 1, handles: ["left", "right"] } },

  labelNode("lbl-ui",    "UI / Style",      420, 10),
  skillNode("typescript",                    420, 40),
  skillNode("tailwind",                      420, 140),
  { id: "shadcn", type: "techNode", position: { x: 420, y: 230 },
    data: { label: "shadcn/ui", category: "frontend", level: "proficient", years: 1, handles: ["left", "right"] } },

  labelNode("lbl-build", "Build / Deploy",  620, 10),
  {
    id: "nextjs-deploy",
    type: "techNode",
    position: { x: 620, y: 40 },
    data: { label: "Vercel / Next.js", category: "frontend", level: "expert", years: 3, handles: ["left"] },
  },
];

const FE_EDGES: Edge[] = [
  edge("nextjs", "react"),
  edge("react", "zustand"),
  edge("react", "redux"),
  edge("react", "jotai"),
  edge("react", "typescript"),
  edge("react", "tailwind"),
  edge("tailwind", "shadcn"),
  edge("typescript", "nextjs-deploy"),
  edge("nextjs", "nextjs-deploy"),
];

// ── OBSERVABILITY graph ───────────────────────────────────────────────────

const OBS_NODES: Node[] = [
  labelNode("lbl-code",  "Code",            10, 10),
  skillNode("go",                            10, 40),
  skillNode("python",                        10, 130),

  labelNode("lbl-cont",  "Containers",      200, 10),
  skillNode("docker",                        200, 40),

  labelNode("lbl-orch",  "Orchestration",   390, 10),
  skillNode("kubernetes",                    390, 40),

  labelNode("lbl-obs",   "Observability",   580, 10),
  { id: "prometheus", type: "techNode", position: { x: 580, y: 40 },
    data: { label: "Prometheus", category: "infrastructure", level: "proficient", years: 2, handles: ["left", "right"] } },
  { id: "grafana", type: "techNode", position: { x: 580, y: 130 },
    data: { label: "Grafana", category: "infrastructure", level: "proficient", years: 2, handles: ["left"] } },

  labelNode("lbl-cache", "Data / Cache",    200, 230),
  skillNode("redis",                         200, 260),
  skillNode("postgresql",                    200, 360),
  skillNode("kafka",                         390, 260),
];

const OBS_EDGES: Edge[] = [
  edge("go", "docker"),
  edge("python", "docker"),
  edge("docker", "kubernetes"),
  edge("kubernetes", "prometheus"),
  edge("prometheus", "grafana"),
  edge("go", "redis"),
  edge("go", "kafka"),
  edge("kafka", "postgresql"),
  edge("kubernetes", "redis"),
];

// ── DEPLOY graph ─────────────────────────────────────────────────────────────

const DEPLOY_NODES: Node[] = [
  // Source
  labelNode("lbl-src",   "Source",             0,   10),
  { id: "github",   type: "techNode", position: { x: 0,   y: 40  }, data: { label: "GitHub",   category: "infrastructure", handles: ["right"] } },
  { id: "gitlab",   type: "techNode", position: { x: 0,   y: 130 }, data: { label: "GitLab",   category: "infrastructure", handles: ["right"] } },

  // CI / Tests
  labelNode("lbl-ci",    "CI Pipeline",       200,  10),
  skillNode("github-actions",                  200,  40),
  { id: "gitlab-ci", type: "techNode", position: { x: 200, y: 130 }, data: { label: "GitLab CI", category: "infrastructure", handles: ["left", "right"] } },
  { id: "tests",    type: "techNode", position: { x: 200, y: 230 }, data: { label: "Tests ✓",  category: "infrastructure", handles: ["left", "right", "bottom"] } },

  // Build + Registry
  labelNode("lbl-build-d", "Build",           420,  10),
  skillNode("docker",                          420,  40),
  skillNode("docker-registry",                 420, 140),

  // Kubernetes + Helm
  labelNode("lbl-k8s",  "Cluster",            640,  10),
  skillNode("kubernetes",                      640,  40),
  skillNode("helm",                            640, 140),

  // Ingress
  labelNode("lbl-ing",  "Ingress",            860,  10),
  { id: "ingress", type: "techNode", position: { x: 860, y: 40 }, data: { label: "Ingress / LB", category: "infrastructure", handles: ["left", "bottom"] } },

  // Stage — 3 pods
  labelNode("lbl-stage", "Stage (3 pods)",    720, 240),
  { id: "pod-s1", type: "techNode", position: { x: 660, y: 270 }, data: { label: "Pod 1", category: "infrastructure", handles: ["top"] } },
  { id: "pod-s2", type: "techNode", position: { x: 780, y: 270 }, data: { label: "Pod 2", category: "infrastructure", handles: ["top"] } },
  { id: "pod-s3", type: "techNode", position: { x: 900, y: 270 }, data: { label: "Pod 3", category: "infrastructure", handles: ["top"] } },

  // Production — Blue / Green
  labelNode("lbl-prod",  "Production",        720, 390),
  { id: "traffic-router", type: "techNode", position: { x: 800, y: 420 }, data: { label: "Traffic Router\n100% / 0%", category: "infrastructure", handles: ["top", "bottom"] } },
  { id: "pod-blue",  type: "techNode", position: { x: 680, y: 510 }, data: { label: "🔵 Blue\nlive · 100%", category: "infrastructure", handles: ["top"] } },
  { id: "pod-green", type: "techNode", position: { x: 940, y: 510 }, data: { label: "🟢 Green\nnext · 0%",  category: "infrastructure", handles: ["top"] } },
];

const DEPLOY_EDGES: Edge[] = [
  edge("github", "github-actions"),
  edge("gitlab", "gitlab-ci"),
  edge("github-actions", "tests"),
  edge("gitlab-ci", "tests"),
  edge("tests", "docker"),
  edge("docker", "docker-registry"),
  edge("docker-registry", "kubernetes"),
  edge("helm", "kubernetes"),
  edge("kubernetes", "ingress"),
  edge("ingress", "pod-s1"),
  edge("ingress", "pod-s2"),
  edge("ingress", "pod-s3"),
  edge("ingress", "traffic-router"),
  edge("traffic-router", "pod-blue"),
  edge("traffic-router", "pod-green"),
];

// ── AI graph ──────────────────────────────────────────────────────────────────

const AI_NODES: Node[] = [
  // User
  labelNode("lbl-user",   "User",              0,   10),
  { id: "user", type: "techNode", position: { x: 0, y: 40 }, data: { label: "User / App", category: "frontend", handles: ["right"] } },

  // Context & MCP
  labelNode("lbl-ctx",    "Context Layer",     200, 10),
  skillNode("context-engineering",               200, 40),
  skillNode("mcp-server",                        200, 140),

  // LLM Layer
  labelNode("lbl-llm",    "LLM",               420, 10),
  skillNode("claude-code",                       420, 40),
  skillNode("copilot",                           420, 130),
  skillNode("ollama",                            420, 220),
  skillNode("huggingface",                       420, 310),

  // RAG pipeline
  labelNode("lbl-rag",    "RAG Pipeline",      650, 10),
  skillNode("rag",                               650, 40),
  skillNode("langchain",                         650, 140),
  skillNode("embedding-models",                  650, 240),
  skillNode("qdrant",                            650, 340),
];

const AI_EDGES: Edge[] = [
  edge("user", "context-engineering"),
  edge("user", "mcp-server"),
  edge("context-engineering", "claude-code"),
  edge("context-engineering", "rag"),
  edge("mcp-server", "claude-code"),
  edge("mcp-server", "ollama"),
  edge("claude-code", "rag"),
  edge("langchain", "claude-code"),
  edge("langchain", "ollama"),
  edge("langchain", "huggingface"),
  edge("rag", "langchain"),
  edge("rag", "embedding-models"),
  edge("embedding-models", "qdrant"),
  edge("qdrant", "langchain"),
];

// ─── Graph sections config ────────────────────────────────────────────────────

const GRAPHS = [
  {
    id: "architecture",
    label: "System Architecture",
    subtitle: "How services connect",
    description: "A typical backend I'd build: React talks to Go / Python / C# microservices, Kafka brokers async events, and the data layer is PostgreSQL + Redis + ElasticSearch. Embedded C handles the hardware layer.",
    businessDescription: "Splitting the backend into independent services means one failing part doesn't take the whole product down, and new features ship without rewriting the core. This same pattern replaced a paid vendor system and saved €480K/year.",
    nodes: ARCH_NODES,
    edges: ARCH_EDGES,
  },
  {
    id: "frontend",
    label: "Frontend Stack",
    subtitle: "UI engineering",
    description: "React + Next.js as the framework core. Zustand / Redux / Jotai depending on project complexity. TypeScript everywhere, Tailwind + shadcn/ui for styling. Deployed on Vercel with ISR.",
    businessDescription: "A fast-loading, type-safe frontend protects revenue directly — every 100ms of load time affects conversion, and TypeScript catches bugs before they reach paying users. Static generation keeps hosting costs low even as traffic grows.",
    nodes: FE_NODES,
    edges: FE_EDGES,
  },
  {
    id: "observability",
    label: "Infrastructure & Monitoring",
    subtitle: "Running things reliably",
    description: "Go / Python services containerized with Docker, orchestrated on Kubernetes. Prometheus scrapes metrics, Grafana visualizes them. Redis for hot-path caching, Kafka for durable event streaming.",
    businessDescription: "Monitoring catches problems before customers notice them, cutting downtime and support costs. Containerized services scale automatically with demand, so the product stays fast during traffic spikes without paying for idle servers the rest of the time.",
    nodes: OBS_NODES,
    edges: OBS_EDGES,
  },
  {
    id: "deploy",
    label: "Deployment Pipeline",
    subtitle: "From commit to production",
    description: "GitHub and GitLab trigger parallel CI pipelines. Tests run first (unit + integration) — no deploy without green. Docker builds the image, publishes to registry. Helm charts deploy to Kubernetes: three pods in Stage for QA, then a Traffic Router in Production shifts 100% load between Blue (live) and Green (next) for zero-downtime rollout.",
    businessDescription: "Automated tests and zero-downtime rollouts mean new features ship several times a week without risking an outage — deployment moves from a rare, risky event to a routine one, so the business reacts to customer feedback faster.",
    nodes: DEPLOY_NODES,
    edges: DEPLOY_EDGES,
  },
  {
    id: "ai",
    label: "AI Engineering Stack",
    subtitle: "RAG · LLM · MCP",
    description: "Context Engineering shapes what the model sees. MCP Servers expose tools and APIs to LLMs. The RAG pipeline chunks data, embeds with text-embedding models, stores vectors in Qdrant, and orchestrates retrieval via LangChain. LLM layer: Claude (certified), Copilot, Ollama for private inference, Hugging Face for fine-tuning.",
    businessDescription: "AI tooling automates repetitive engineering work, shortening the time from idea to shipped feature. The same pipeline powers customer-facing capabilities — intelligent search, automation, assistants — that create new product value.",
    nodes: AI_NODES,
    edges: AI_EDGES,
  },
] as const;

// ─── Graph view ───────────────────────────────────────────────────────────────

function GraphView({
  nodes: initialNodes,
  edges: initialEdges,
  onSelect,
  selectedId,
  colorMode,
}: {
  nodes: Node[];
  edges: Edge[];
  onSelect: (id: string | null) => void;
  selectedId: string | null;
  colorMode: "light" | "dark";
}) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type !== "techNode") return;
    onSelect(node.id === selectedId ? null : node.id);
  }, [selectedId, onSelect]);

  return (
    <ReactFlow
      nodes={nodes.map((n) => ({ ...n, selected: n.id === selectedId }))}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.18 }}
      minZoom={0.3}
      maxZoom={2}
      colorMode={colorMode}
      preventScrolling={false}
    >
      <Background gap={24} size={1} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

interface Cert {
  name: string;
  issuer: string;
  url: string;
}

// ─── Single graph section ─────────────────────────────────────────────────────

function GraphSection({ graph, certs }: { graph: (typeof GRAPHS)[number]; certs?: Cert[] }) {
  const { mode } = useViewMode();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [certsOpen, setCertsOpen] = useState(true);
  const { resolvedTheme } = useTheme();
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setColorMode(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  const selectedSkill = selectedId ? getSkill(selectedId) : null;

  return (
    <div className="rounded-xl border overflow-hidden bg-card shadow-sm">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-xl font-bold">{graph.label}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
          {mode === "business" ? graph.businessDescription : graph.description}
        </p>
      </div>

      {/* Graph */}
      <div style={{ height: 420 }} className="border-y">
        <GraphView
          nodes={graph.nodes as Node[]}
          edges={graph.edges as Edge[]}
          onSelect={setSelectedId}
          selectedId={selectedId}
          colorMode={colorMode}
        />
      </div>

      {/* Selected skill detail */}
      {selectedSkill && (
        <div className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="font-semibold">{selectedSkill.name}</span>
              <span className="text-sm text-muted-foreground ml-2">
                {selectedSkill.years}y · {LEVEL_LABELS[selectedSkill.level]}
              </span>
            </div>
            <Badge
              className="text-xs text-white"
              style={{ background: CATEGORY_COLORS[selectedSkill.category] }}
            >
              {selectedSkill.category}
            </Badge>
          </div>
          {selectedSkill.description && (
            <p className="text-sm text-muted-foreground">{selectedSkill.description}</p>
          )}
        </div>
      )}

      {/* Optional certifications */}
      {certs && certs.length > 0 && (
        <div className="px-6 py-4">
          <button
            onClick={() => setCertsOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
          >
            <span className="text-base">★</span>
            Certifications ({certs.length})
            <span className="text-xs opacity-60">{certsOpen ? "▲" : "▼"}</span>
          </button>
          {certsOpen && (
            <div className="mt-3 flex flex-wrap gap-3">
              {certs.map((cert) => (
                <a
                  key={cert.url}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all group text-sm"
                >
                  <span className="text-amber-500 text-xs">★</span>
                  <div>
                    <div className="font-medium text-foreground text-xs">{cert.name}</div>
                    <div className="text-[11px] text-muted-foreground">{cert.issuer}</div>
                  </div>
                  <svg className="w-3 h-3 text-muted-foreground group-hover:text-amber-500 shrink-0 ml-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const AI_CERTS: Cert[] = [
  { name: "Claude API & SDK Fundamentals",  issuer: "Anthropic (Skilljar)", url: "https://verify.skilljar.com/c/arhv5wtraues" },
  { name: "Anthropic API Essentials",        issuer: "Anthropic (Skilljar)", url: "https://verify.skilljar.com/c/zxjoevsgqx84" },
  { name: "Claude Code Practitioner",        issuer: "Anthropic (Skilljar)", url: "https://verify.skilljar.com/c/7msxhy7wnwq3" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function SkillsExplorer() {
  return (
    <div className="space-y-8">
      {GRAPHS.map((graph) => (
        <GraphSection
          key={graph.id}
          graph={graph}
          certs={graph.id === "ai" ? AI_CERTS : undefined}
        />
      ))}
    </div>
  );
}
