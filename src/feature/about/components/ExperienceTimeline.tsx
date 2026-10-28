// MODULE: About
// LAYER: 2
// ROLE: Employer → engagements timeline with dates, highlights, and tech
// DEPENDENCIES: @/lib/format, @/shared-component, @/feature/about/types
// OWNER: Dylan / Claude

import { formatMonthRange } from "@/lib/format";
import { TagList } from "@/shared-component";
import type { Employer } from "@/feature/about/types";

export function ExperienceTimeline({ employers }: { employers: Employer[] }) {
  return (
    <div className="flex flex-col gap-10">
      {employers.map((employer) => (
        <section key={employer.org} aria-label={employer.org}>
          <header className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {employer.org} <span className="font-normal text-muted-foreground">· {employer.title}</span>
            </h3>
            <p className="font-mono text-xs text-muted-foreground">
              {formatMonthRange(employer.start, employer.end)} · {employer.location}
            </p>
          </header>
          <ol className="flex flex-col gap-8 border-l pl-6">
            {employer.engagements.map((e) => (
              <li key={e.name} className="relative">
                <span aria-hidden className="absolute top-2 -left-[1.6rem] size-2 rounded-full bg-primary" />
                <p className="font-mono text-xs text-muted-foreground">{formatMonthRange(e.start, e.end)}</p>
                <h4 className="mt-1 font-semibold">
                  {e.name} <span className="font-normal text-muted-foreground">— {e.role}</span>
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <TagList items={e.tech} label="Technologies" className="mt-3" />
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
