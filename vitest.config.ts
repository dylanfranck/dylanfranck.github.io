import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@content": path.resolve(import.meta.dirname, "content"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      // WHY: Layer 1 primitives and route files are not unit-tested (see CLAUDE.md coverage table).
      exclude: ["src/element/**", "src/app/**", "src/test/**", "**/*.test.*"],
    },
  },
});
