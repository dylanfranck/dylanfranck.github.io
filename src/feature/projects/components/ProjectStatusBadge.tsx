// MODULE: Projects
// LAYER: 2
// ROLE: The single place a project status maps to a color role and label
// DEPENDENCIES: @/element/badge, @/lib/utils, @/feature/projects/project-meta
// OWNER: Dylan / Claude

import { Badge } from "@/element/badge";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/feature/projects/project-meta";

const STATUS_STYLE: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-status-live-bg text-status-live" },
  "in-progress": { label: "In progress", className: "bg-status-progress-bg text-status-progress" },
  planned: { label: "Planned", className: "bg-status-planned-bg text-status-planned" },
  archived: { label: "Archived", className: "bg-status-archived-bg text-status-archived" },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const style = STATUS_STYLE[status];
  // WHY: the label is always shown as text, so status never relies on color alone.
  return <Badge className={cn("font-mono", style.className)}>{style.label}</Badge>;
}
