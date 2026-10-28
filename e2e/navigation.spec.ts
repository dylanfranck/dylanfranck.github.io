// MODULE: E2E
// LAYER: test
// ROLE: Sticky header, skip link, and keyboard navigation behave in a real browser
// DEPENDENCIES: @playwright/test
// OWNER: Dylan / Claude

import { expect, test } from "@playwright/test";

test("header stays visible after scrolling", async ({ page }) => {
  await page.goto("/about/");
  await page.mouse.wheel(0, 3000);
  await expect(page.getByRole("banner")).toBeInViewport();
});

// GUARDS: the skip link being unreachable or pointing nowhere.
test("skip link is the first tab stop and moves focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test("nav marks the current section", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Projects" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("every page has exactly one h1 and a unique title", async ({ page }) => {
  const titles = new Set<string>();
  for (const route of ["/", "/about/", "/blog/", "/projects/"]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    titles.add(await page.title());
  }
  expect(titles.size).toBe(4);
});
