import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/data/projects";

// "Active" and "Archived" are noise — nearly every project is one or the
// other, so the label carries no signal. "Deprecated" is the one status
// worth flagging, since it tells a reader the project didn't pan out.
export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  if (status !== "deprecated") return null;
  return (
    <Badge variant="destructive" className="text-xs">
      Deprecated
    </Badge>
  );
}
