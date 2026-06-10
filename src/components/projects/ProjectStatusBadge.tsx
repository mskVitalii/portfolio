import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/data/projects";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  active: { label: "Active", variant: "default" },
  archived: { label: "Archived", variant: "secondary" },
  deprecated: { label: "Deprecated", variant: "destructive" },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, variant } = STATUS_CONFIG[status];
  return <Badge variant={variant} className="text-xs">{label}</Badge>;
}
