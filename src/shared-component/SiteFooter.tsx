// MODULE: SharedComponent
// LAYER: 2
// ROLE: Footer with outbound profile links
// DEPENDENCIES: @/lib/site
// OWNER: Dylan / Claude

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <ul className="flex gap-5">
          <li>
            <a href={site.links.github} rel="me noopener" className="hover:text-foreground">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} rel="me noopener" className="hover:text-foreground">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
