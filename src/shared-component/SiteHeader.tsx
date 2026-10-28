// MODULE: SharedComponent
// LAYER: 2
// ROLE: Sticky top bar — skip link, logo/name, and primary nav
// DEPENDENCIES: next/link, @/lib/site, @/shared-component/NavLinks
// OWNER: Dylan / Claude

import Link from "next/link";
import { site } from "@/lib/site";
import { NavLinks } from "@/shared-component/NavLinks";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      {/* WHY: keyboard and screen-reader users skip the repeated nav on every page. */}
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5">
        <Link href="/" className="font-semibold tracking-tight hover:text-primary">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
