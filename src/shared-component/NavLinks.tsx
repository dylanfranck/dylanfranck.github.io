// MODULE: SharedComponent
// LAYER: 2
// ROLE: Primary nav links; marks the current section with aria-current
// DEPENDENCIES: next/link, next/navigation, @/lib/site, @/lib/utils
// OWNER: Dylan / Claude

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex gap-5 text-sm">
      {site.nav.map((item) => {
        // WHY: a section stays current on its child pages (/blog/some-post/ → Blog).
        const current = pathname === item.href || pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "hover:text-foreground",
                current ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
