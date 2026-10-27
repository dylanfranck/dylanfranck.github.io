// MODULE: App
// LAYER: 3
// ROLE: Projects index — the junk drawer
// DEPENDENCIES: @/shared-component, @/feature/projects
// OWNER: Dylan / Claude

import type { Metadata } from "next";
import { PageContainer } from "@/shared-component";
import { ProjectCard } from "@/feature/projects/components/ProjectCard";
import { getProjects } from "@/feature/projects/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, am building, or want to build.",
  alternates: { canonical: "/projects/" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-3 mb-8 text-muted-foreground">Things I&apos;ve built, am building, or want to build.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </PageContainer>
  );
}
