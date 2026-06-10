"use client";

import { useCallback, useState } from "react";
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

const CATEGORY_POSITIONS: Record<string, { x: number; y: number }> = {
  backend: { x: 100, y: 200 },
  frontend: { x: 520, y: 80 },
  infrastructure: { x: 520, y: 380 },
  ai: { x: 900, y: 250 },
};

const SKILL_OFFSETS: Record<string, { dx: number; dy: number }[]> = {
  backend: [
    { dx: 0, dy: -180 }, { dx: 0, dy: -100 }, { dx: 0, dy: -20 },
    { dx: 0, dy: 60 }, { dx: 0, dy: 140 }, { dx: 0, dy: 220 },
  ],
  frontend: [
    { dx: -80, dy: -80 }, { dx: 80, dy: -80 }, { dx: -80, dy: 40 },
    { dx: 80, dy: 40 },
  ],
  infrastructure: [
    { dx: -80, dy: -100 }, { dx: 80, dy: -100 }, { dx: -80, dy: 0 },
    { dx: 80, dy: 0 }, { dx: -80, dy: 100 }, { dx: 80, dy: 100 },
  ],
  ai: [
    { dx: 0, dy: -60 }, { dx: 0, dy: 60 },
  ],
};

function buildGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Category hub nodes
  const categories = ["backend", "frontend", "infrastructure", "ai"] as const;
  for (const cat of categories) {
    nodes.push({
      id: `cat-${cat}`,
      type: "categoryNode",
      position: CATEGORY_POSITIONS[cat],
      data: { label: cat.charAt(0).toUpperCase() + cat.slice(1), category: cat },
      selectable: false,
    });
  }

  // Skill nodes
  const catCounts: Record<string, number> = {};
  for (const skill of SKILLS) {
    const cat = skill.category === "languages" ? "backend" : skill.category;
    const idx = catCounts[cat] ?? 0;
    catCounts[cat] = idx + 1;

    const base = CATEGORY_POSITIONS[cat] ?? { x: 500, y: 300 };
    const offsets = SKILL_OFFSETS[cat] ?? [];
    const offset = offsets[idx] ?? { dx: idx * 90, dy: 0 };

    nodes.push({
      id: skill.id,
      type: "skillNode",
      position: { x: base.x + offset.dx + 200, y: base.y + offset.dy },
      data: { skill },
    });

    edges.push({
      id: `e-${cat}-${skill.id}`,
      source: `cat-${cat}`,
      target: skill.id,
      style: { stroke: CATEGORY_COLORS[skill.category], strokeWidth: 1.5, opacity: 0.4 },
    });
  }

  return { nodes, edges };
}

function CategoryNode({ data }: NodeProps) {
  const d = data as { label: string; category: string };
  return (
    <div
      className="px-4 py-2 rounded-lg font-bold text-white text-sm"
      style={{ background: CATEGORY_COLORS[d.category as keyof typeof CATEGORY_COLORS] }}
    >
      {d.label}
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
}

function SkillNode({ data, selected }: NodeProps) {
  const d = data as { skill: Skill };
  const { skill } = d;
  const color = CATEGORY_COLORS[skill.category];
  const levelDot = skill.level === "expert" ? "●●●" : skill.level === "proficient" ? "●●○" : "●○○";

  return (
    <div
      className="px-3 py-2 rounded-lg border-2 bg-background text-foreground text-xs cursor-pointer transition-all min-w-[100px] text-center"
      style={{
        borderColor: selected ? color : "var(--border)",
        boxShadow: selected ? `0 0 0 3px ${color}33` : undefined,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div className="font-semibold">{skill.name}</div>
      <div style={{ color }} className="text-[10px] mt-0.5">{levelDot} {skill.years}y</div>
    </div>
  );
}

const nodeTypes = { categoryNode: CategoryNode, skillNode: SkillNode };

const { nodes: initialNodes, edges: initialEdges } = buildGraph();

export function SkillsGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState<Skill | null>(null);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type !== "skillNode") return;
    const skill = (node.data as { skill: Skill }).skill;
    setSelected((prev) => (prev?.id === skill.id ? null : skill));
  }, []);

  const selectedProjects = selected
    ? PROJECTS.filter((p) => selected.projects.includes(p.slug))
    : [];

  return (
    <div className="space-y-4">
      <div className="w-full rounded-xl border overflow-hidden" style={{ height: 520 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
          maxZoom={2}
          colorMode="system"
        >
          <Background gap={24} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {selected ? (
        <div className="rounded-xl border p-5 bg-card">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">{selected.years} years · {LEVEL_LABELS[selected.level]}</p>
            </div>
            <Badge
              className="text-xs text-white"
              style={{ background: CATEGORY_COLORS[selected.category] }}
            >
              {selected.category}
            </Badge>
          </div>
          {selected.description && (
            <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>
          )}
          {selectedProjects.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Used in</p>
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
          Click any skill node to see details and related projects
        </p>
      )}
    </div>
  );
}
