// MODULE: App
// LAYER: 3
// ROLE: 404 page (exported as 404.html, which GitHub Pages serves for unknown paths)
// DEPENDENCIES: next/link, @/shared-component
// OWNER: Dylan / Claude

import Link from "next/link";
import { PageContainer } from "@/shared-component";

export default function NotFound() {
  return (
    <PageContainer>
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Nothing here.</h1>
      <p className="mt-3 text-muted-foreground">
        That page moved or never existed. <Link href="/" className="text-primary underline underline-offset-4">Head home</Link>.
      </p>
    </PageContainer>
  );
}
