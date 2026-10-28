// MODULE: SharedComponent
// LAYER: 2
// ROLE: Labeled list of small mono chips (tech stacks, tags)
// DEPENDENCIES: @/lib/utils
// OWNER: Dylan / Claude

import { cn } from "@/lib/utils";

export function TagList({ items, label, className }: { items: readonly string[]; label: string; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground">
          {item}
        </li>
      ))}
    </ul>
  );
}
