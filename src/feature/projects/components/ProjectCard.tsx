// MODULE: Projects
// LAYER: 2
// ROLE: Project summary card linking to its page (or straight out, for external projects)
// DEPENDENCIES: next/link, lucide-react, @/feature/projects/components/ProjectStatusBadge, @/feature/projects/project-meta
// OWNER: Dylan / Claude

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectStatusBadge } from "@/feature/projects/components/ProjectStatusBadge";
import type { ProjectMeta } from "@/feature/projects/project-meta";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <ProjectStatusBadge status={project.status} />
      </div>
      <p className="text-sm text-muted-foreground">{project.summary}</p>
      {project.kind === "external" && project.url && (
        <p className="mt-auto inline-flex items-center gap-1 font-mono text-xs text-primary">
          {new URL(project.url).host}
          <ArrowUpRight aria-hidden className="size-3" />
        </p>
      )}
    </article>
  );
}
