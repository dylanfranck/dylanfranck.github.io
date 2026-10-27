// MODULE: SharedComponent
// LAYER: 2
// ROLE: Persistent top bar — logo/name and primary nav
// DEPENDENCIES: next/link, @/lib/site
// OWNER: Dylan / Claude

import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-semibold tracking-tight hover:text-primary">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex gap-5 text-sm text-muted-foreground">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
