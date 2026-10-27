// MODULE: Blog
// LAYER: 2
// ROLE: Post metadata shape, validation, and ordering (pure — no file access)
// DEPENDENCIES: @/lib/content-meta
// OWNER: Dylan / Claude

import {
  asRecord,
  optionalBoolean,
  optionalStringArray,
  requireIsoDate,
  requireString,
} from "@/lib/content-meta";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
};

export function parsePostMeta(slug: string, raw: unknown): PostMeta {
  const file = `content/posts/${slug}.mdx`;
  const meta = asRecord(file, raw);
  return {
    slug,
    title: requireString(file, meta, "title"),
    date: requireIsoDate(file, meta, "date"),
    summary: requireString(file, meta, "summary"),
    tags: optionalStringArray(file, meta, "tags"),
    draft: optionalBoolean(file, meta, "draft"),
  };
}

export function sortNewestFirst(posts: PostMeta[]): PostMeta[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
