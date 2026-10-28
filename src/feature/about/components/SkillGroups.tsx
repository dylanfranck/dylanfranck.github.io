// MODULE: About
// LAYER: 2
// ROLE: Grouped list of the tools and practices I actually use
// DEPENDENCIES: @/feature/about/types
// OWNER: Dylan / Claude

import type { SkillGroup } from "@/feature/about/types";

export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-[10rem_1fr]">
      {groups.map((group) => (
        <div key={group.label} className="contents">
          <dt className="text-sm font-medium text-muted-foreground">{group.label}</dt>
          <dd className="text-sm">{group.items.join(" · ")}</dd>
        </div>
      ))}
    </dl>
  );
}
