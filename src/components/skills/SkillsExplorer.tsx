"use client";

import { useState, useCallback } from "react";
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

// ── ARCHITECTURE graph (Backend System Design) ────────────────────────────

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
  skillNode("nextjs-deploy", 620, 40),
];

// override nextjs-deploy
FE_NODES[FE_NODES.length - 1] = {
  id: "nextjs-deploy",
  type: "techNode",
  position: { x: 620, y: 40 },
  data: { label: "Vercel / Next.js", category: "frontend", level: "expert", years: 3, handles: ["left"] },
};

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

// ─── Tabs config ─────────────────────────────────────────────────────────────

const GRAPHS = [
  { id: "architecture", label: "System Architecture", nodes: ARCH_NODES, edges: ARCH_EDGES },
  { id: "frontend",     label: "Frontend Stack",      nodes: FE_NODES,   edges: FE_EDGES },
  { id: "observability",label: "Infrastructure & Monitoring", nodes: OBS_NODES, edges: OBS_EDGES },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

function GraphView({
  nodes: initialNodes,
  edges: initialEdges,
  onSelect,
  selectedId,
}: {
  nodes: Node[];
  edges: Edge[];
  onSelect: (id: string | null) => void;
  selectedId: string | null;
}) {
  const [nodes, , onNodesChange] = useNodesState(
    initialNodes.map((n) => ({
      ...n,
      selected: n.id === selectedId,
    }))
  );
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type !== "techNode") return;
    onSelect(node.id === selectedId ? null : node.id);
  }, [selectedId, onSelect]);

  return (
    <div className="w-full rounded-xl border overflow-hidden" style={{ height: 480 }}>
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
        colorMode="system"
      >
        <Background gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export function SkillsExplorer() {
  const [activeGraph, setActiveGraph] = useState<string>("architecture");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const graph = GRAPHS.find((g) => g.id === activeGraph) ?? GRAPHS[0];
  const selectedSkill = selectedId ? getSkill(selectedId) : null;
  const selectedProjects = selectedSkill
    ? PROJECTS.filter((p) => selectedSkill.projects.includes(p.slug))
    : [];

  function handleSelect(id: string | null) {
    setSelectedId(id);
  }

  function handleTabChange(id: string) {
    setActiveGraph(id);
    setSelectedId(null);
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {GRAPHS.map((g) => (
          <button
            key={g.id}
            onClick={() => handleTabChange(g.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              g.id === activeGraph
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <GraphView
        key={activeGraph}
        nodes={graph.nodes}
        edges={graph.edges}
        onSelect={handleSelect}
        selectedId={selectedId}
      />

      {/* Skill detail panel */}
      {selectedSkill ? (
        <div className="rounded-xl border p-5 bg-card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{selectedSkill.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedSkill.years} years · {LEVEL_LABELS[selectedSkill.level]}
              </p>
            </div>
            <Badge
              className="text-xs text-white"
              style={{ background: CATEGORY_COLORS[selectedSkill.category] }}
            >
              {selectedSkill.category}
            </Badge>
          </div>
          {selectedSkill.description && (
            <p className="text-sm text-muted-foreground mb-4">{selectedSkill.description}</p>
          )}
          {selectedProjects.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Used in
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProjects.map((p) => (
                  <Badge key={p.slug} variant="secondary">{p.title}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-2">
          Click any node to see details and related projects
        </p>
      )}
    </div>
  );
}
