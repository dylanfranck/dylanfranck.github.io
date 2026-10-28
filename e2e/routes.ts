// MODULE: E2E
// LAYER: test
// ROLE: Every published route, read from the built sitemap so new pages are covered automatically
// DEPENDENCIES: node:fs, node:path
// OWNER: Dylan / Claude

import fs from "node:fs";
import path from "node:path";

export function sitemapPaths(): string[] {
  const xml = fs.readFileSync(path.join(process.cwd(), "out", "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (urls.length === 0) throw new Error("out/sitemap.xml has no <loc> entries — run `npm run build` first.");
  return urls;
}
