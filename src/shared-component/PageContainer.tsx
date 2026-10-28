// MODULE: SharedComponent
// LAYER: 2
// ROLE: Owns page padding, max-width, and vertical rhythm — pages never set their own outer padding
// DEPENDENCIES: @/lib/utils
// OWNER: Dylan / Claude

import { cn } from "@/lib/utils";

export function PageContainer({ className, ...props }: React.ComponentProps<"main">) {
  // WHY: id + tabIndex make it the skip link's target; focus lands here without a visible ring.
  return (
    <main
      id="main"
      tabIndex={-1}
      className={cn("mx-auto w-full max-w-3xl flex-1 px-5 py-12 outline-none sm:py-16", className)}
      {...props}
    />
  );
}
