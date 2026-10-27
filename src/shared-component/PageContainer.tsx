// MODULE: SharedComponent
// LAYER: 2
// ROLE: Owns page padding, max-width, and vertical rhythm — pages never set their own outer padding
// DEPENDENCIES: @/lib/utils
// OWNER: Dylan / Claude

import { cn } from "@/lib/utils";

export function PageContainer({ className, ...props }: React.ComponentProps<"main">) {
  return <main className={cn("mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:py-16", className)} {...props} />;
}
