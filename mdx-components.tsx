// MODULE: Mdx
// ROLE: Global MDX element overrides (required by @next/mdx in the App Router)
// DEPENDENCIES: mdx/types
// OWNER: Dylan / Claude

import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
