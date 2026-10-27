// MODULE: SharedComponent
// LAYER: 2
// ROLE: Typography wrapper for long-form MDX bodies
// DEPENDENCIES: @/lib/utils
// OWNER: Dylan / Claude

import { cn } from "@/lib/utils";

export function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}
