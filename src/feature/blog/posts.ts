// MODULE: Blog
// LAYER: 2
// ROLE: Load published posts from content/posts at build time
// DEPENDENCIES: @/lib/load-mdx, @/lib/content-meta, @/feature/blog/post-meta
// OWNER: Dylan / Claude

import { isVisible } from "@/lib/content-meta";
import { importMdx, listSlugs } from "@/lib/load-mdx";
import { parsePostMeta, sortNewestFirst, type PostMeta } from "@/feature/blog/post-meta";

export async function loadPost(slug: string) {
  const mod = await importMdx("posts", slug);
  return { meta: parsePostMeta(slug, mod.metadata), Content: mod.default };
}

export async function getPosts(): Promise<PostMeta[]> {
  const slugs = await listSlugs("posts");
  const posts = await Promise.all(slugs.map(async (slug) => (await loadPost(slug)).meta));
  return sortNewestFirst(posts.filter((p) => isVisible(p.draft)));
}
