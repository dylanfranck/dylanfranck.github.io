// MODULE: App
// LAYER: 3
// ROLE: sitemap.xml generated at build time from published content
// DEPENDENCIES: @/feature/blog/posts, @/feature/projects/projects, @/lib/site
// OWNER: Dylan / Claude

import type { MetadataRoute } from "next";
import { getPosts } from "@/feature/blog/posts";
import { getProjects } from "@/feature/projects/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  return [
    { url: `${site.url}/` },
    { url: `${site.url}/about/` },
    { url: `${site.url}/blog/` },
    { url: `${site.url}/projects/` },
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.date })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}/` })),
  ];
}
