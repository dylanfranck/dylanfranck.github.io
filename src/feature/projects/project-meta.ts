// MODULE: Projects
// LAYER: 2
// ROLE: Project metadata shape, validation, and ordering (pure — no file access)
// DEPENDENCIES: @/lib/content-meta
// OWNER: Dylan / Claude
// ADR: ADR-002

import {
  ContentError,
  asRecord,
  optionalBoolean,
  optionalString,
  optionalStringArray,
  requireOneOf,
  requireString,
} from "@/lib/content-meta";

export const PROJECT_STATUSES = ["live", "in-progress", "planned", "archived"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

// external = lives on its own (sub)domain; embed = rendered in an iframe on the
// project page; writeup = the MDX body is the whole thing.
export const PROJECT_KINDS = ["external", "embed", "writeup"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  kind: ProjectKind;
  url?: string;
  embedUrl?: string;
  tags: string[];
  order: number;
  draft: boolean;
};

export function parseProjectMeta(slug: string, raw: unknown): ProjectMeta {
  const file = `content/projects/${slug}.mdx`;
  const meta = asRecord(file, raw);
  const kind = requireOneOf(file, meta, "kind", PROJECT_KINDS);
  const url = optionalString(file, meta, "url");
  const embedUrl = optionalString(file, meta, "embedUrl");

  if (kind === "external" && !url) throw new ContentError(file, 'kind "external" needs metadata.url');
  if (kind === "embed" && !embedUrl) throw new ContentError(file, 'kind "embed" needs metadata.embedUrl');

  const order = meta.order ?? 100;
  if (typeof order !== "number") throw new ContentError(file, "metadata.order must be a number");

  return {
    slug,
    title: requireString(file, meta, "title"),
    summary: requireString(file, meta, "summary"),
    status: requireOneOf(file, meta, "status", PROJECT_STATUSES),
    kind,
    url,
    embedUrl,
    tags: optionalStringArray(file, meta, "tags"),
    order,
    draft: optionalBoolean(file, meta, "draft"),
  };
}

export function sortByOrder(projects: ProjectMeta[]): ProjectMeta[] {
  return [...projects].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
