// MODULE: Config
// ROLE: Next.js config — static export for GitHub Pages, MDX page/content support
// DEPENDENCIES: next, @next/mdx
// OWNER: Dylan / Claude
// ADR: ADR-001

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WHY: GitHub Pages serves static files only. Delete this line (and
  // images.unoptimized) when moving to a host with a server — see ADR-001.
  output: "export",
  // WHY: emits blog/index.html instead of blog.html so every route resolves
  // the same way on any static host.
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
