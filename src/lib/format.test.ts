// MODULE: Format
// LAYER: test
// ROLE: formatDate behavior
// DEPENDENCIES: @/lib/format
// OWNER: Dylan / Claude

import { formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO calendar date in long US form", () => {
    expect(formatDate("2026-10-27")).toBe("October 27, 2026");
  });

  // GUARDS: a negative-offset build machine rendering Jan 1 as Dec 31.
  it("does not shift the day across time zones", () => {
    expect(formatDate("2026-01-01")).toBe("January 1, 2026");
  });
});
