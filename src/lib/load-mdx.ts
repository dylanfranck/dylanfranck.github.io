// MODULE: LoadMdx
// ROLE: Build-time access to MDX files under content/ (slug discovery + module import)
// DEPENDENCIES: node:fs/promises, node:path, mdx/types
// OWNER: Dylan / Claude

import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type MdxModule = { default: MDXContent; metadata?: unknown };

export type ContentCollection = "posts" | "projects";

export async function listSlugs(collection: ContentCollection): Promise<string[]> {
  const dir = path.join(process.cwd(), "content", collection);
  const files = await fs.readdir(dir);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.slice(0, -".mdx".length));
}

export async function importMdx(collection: ContentCollection, slug: string): Promise<MdxModule> {
  // WHY: the template literal keeps the import statically analyzable — the
  // bundler includes every .mdx file under content/<collection>/ at build time.
  return (await import(`@content/${collection}/${slug}.mdx`)) as MdxModule;
}
