// MODULE: Config
// ROLE: Playwright config — end-to-end and accessibility tests against the static export in out/
// DEPENDENCIES: @playwright/test
// OWNER: Dylan / Claude

import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}` },
  // WHY: test the exact files that get deployed. Requires `npm run build` first.
  webServer: {
    command: `node e2e/serve.mjs`,
    env: { PORT: String(PORT) },
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
  // WHY: dark mode has its own palette (its own contrast to fail), and phones have their own
  // layout. Both are where real-use bugs hid in past projects.
  projects: [
    { name: "light", use: { ...devices["Desktop Chrome"], colorScheme: "light" } },
    { name: "dark", use: { ...devices["Desktop Chrome"], colorScheme: "dark" } },
    { name: "mobile", use: { ...devices["Pixel 7"], colorScheme: "light" } },
  ],
});
