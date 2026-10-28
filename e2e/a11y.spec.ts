// MODULE: E2E
// LAYER: test
// ROLE: axe accessibility scan (WCAG 2.2 AA) of every published page, plus the 404 page
// DEPENDENCIES: @playwright/test, @axe-core/playwright, e2e/routes
// OWNER: Dylan / Claude

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { sitemapPaths } from "./routes";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

// WHY: /404.html is what GitHub Pages serves for unknown paths; the local static server
// returns its own error page instead, so scan the real file directly.
for (const route of [...sitemapPaths(), "/404.html"]) {
  test(`no axe violations: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    // WHY: map to id + selectors so a failure says what broke and where, not just "length 1".
    const violations = results.violations.map((v) => ({
      rule: v.id,
      impact: v.impact,
      help: v.help,
      targets: v.nodes.map((n) => n.target.join(" ")),
    }));
    expect(violations).toEqual([]);
  });
}
