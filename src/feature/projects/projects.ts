// MODULE: Projects
// LAYER: 2
// ROLE: Load published projects from content/projects at build time
// DEPENDENCIES: @/lib/load-mdx, @/lib/content-meta, @/feature/projects/project-meta
// OWNER: Dylan / Claude

import { isVisible } from "@/lib/content-meta";
import { importMdx, listSlugs } from "@/lib/load-mdx";
import { parseProjectMeta, sortByOrder, type ProjectMeta } from "@/feature/projects/project-meta";

export async function loadProject(slug: string) {
  const mod = await importMdx("projects", slug);
  return { meta: parseProjectMeta(slug, mod.metadata), Content: mod.default };
}

export async function getProjects(): Promise<ProjectMeta[]> {
  const slugs = await listSlugs("projects");
  const projects = await Promise.all(slugs.map(async (slug) => (await loadProject(slug)).meta));
  return sortByOrder(projects.filter((p) => isVisible(p.draft)));
}
