// MODULE: SharedComponent
// LAYER: 2
// ROLE: Footer with outbound profile links and the analytics disclosure
// DEPENDENCIES: @/lib/site
// OWNER: Dylan / Claude

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground">
        <div className="flex flex-col gap-1">
          <p>© {new Date().getFullYear()} {site.name}</p>
          {site.analytics.goatcounter && (
            <p className="text-xs">
              Cookieless, aggregate page counts by{" "}
              <a href="https://www.goatcounter.com" className="underline hover:text-foreground">
                GoatCounter
              </a>
              .
            </p>
          )}
        </div>
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
