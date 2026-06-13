"use client";

import { useState, useCallback, useEffect } from "react";
import { useTheme } from "next-themes";
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
import { PROJECTS } from "@/data/projects";

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

// ─── Graph sections config ────────────────────────────────────────────────────

const GRAPHS = [
  {
    id: "architecture",
    label: "System Architecture",
    subtitle: "How services connect",
    description: "A typical backend I'd build: React talks to Go / Python / C# microservices, Kafka brokers async events, and the data layer is PostgreSQL + Redis + ElasticSearch. Embedded C handles the hardware layer.",
    nodes: ARCH_NODES,
    edges: ARCH_EDGES,
  },
  {
    id: "frontend",
    label: "Frontend Stack",
    subtitle: "UI engineering",
    description: "React + Next.js as the framework core. Zustand / Redux / Jotai depending on project complexity. TypeScript everywhere, Tailwind + shadcn/ui for styling. Deployed on Vercel with ISR.",
    nodes: FE_NODES,
    edges: FE_EDGES,
  },
  {
    id: "observability",
    label: "Infrastructure & Monitoring",
    subtitle: "Running things reliably",
    description: "Go / Python services containerized with Docker, orchestrated on Kubernetes. Prometheus scrapes metrics, Grafana visualizes them. Redis for hot-path caching, Kafka for durable event streaming.",
    nodes: OBS_NODES,
    edges: OBS_EDGES,
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
    >
      <Background gap={24} size={1} />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

// ─── Single graph section ─────────────────────────────────────────────────────

function GraphSection({ graph }: { graph: (typeof GRAPHS)[number] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setColorMode(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  const selectedSkill = selectedId ? getSkill(selectedId) : null;

  const skillIds = (graph.nodes as Node[])
    .filter((n) => n.type === "techNode")
    .map((n) => n.id);
  const projectSlugs = [
    ...new Set(
      skillIds.flatMap((id) => getSkill(id)?.projects ?? [])
    ),
  ];
  const relatedProjects = PROJECTS.filter((p) => projectSlugs.includes(p.slug));

  return (
    <div className="rounded-xl border overflow-hidden bg-card shadow-sm">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-xl font-bold">{graph.label}</h3>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-2xl">
          {graph.description}
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
      {selectedSkill ? (
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
      ) : (
        <div className="px-6 py-3 border-b">
          <p className="text-xs text-muted-foreground">Click any node to see details</p>
        </div>
      )}

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div className="px-6 py-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Used in
          </p>
          <div className="flex flex-wrap gap-2">
            {relatedProjects.map((p) => (
              <Badge key={p.slug} variant="secondary">
                {p.title}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SkillsExplorer() {
  return (
    <div className="space-y-8">
      {GRAPHS.map((graph) => (
        <GraphSection key={graph.id} graph={graph} />
      ))}
    </div>
  );
}
