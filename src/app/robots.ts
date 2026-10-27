// MODULE: App
// LAYER: 3
// ROLE: robots.txt — allow all crawlers, point at the sitemap
// DEPENDENCIES: @/lib/site
// OWNER: Dylan / Claude

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
