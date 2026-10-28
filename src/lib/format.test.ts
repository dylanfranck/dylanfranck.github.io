// MODULE: Format
// LAYER: test
// ROLE: formatDate behavior
// DEPENDENCIES: @/lib/format
// OWNER: Dylan / Claude

import { formatDate, formatMonth, formatMonthRange } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO calendar date in long US form", () => {
    expect(formatDate("2026-10-27")).toBe("October 27, 2026");
  });

  // GUARDS: a negative-offset build machine rendering Jan 1 as Dec 31.
  it("does not shift the day across time zones", () => {
    expect(formatDate("2026-01-01")).toBe("January 1, 2026");
  });
});

describe("formatMonth", () => {
  it("formats a year-month as short month and year", () => {
    expect(formatMonth("2025-10")).toBe("Oct 2025");
  });
  it("does not shift January into the previous year", () => {
    expect(formatMonth("2024-01")).toBe("Jan 2024");
  });
});

describe("formatMonthRange", () => {
  it("shows Present for ongoing work", () => {
    expect(formatMonthRange("2022-06")).toBe("Jun 2022 – Present");
  });
  it("shows both ends for finished work", () => {
    expect(formatMonthRange("2024-01", "2025-01")).toBe("Jan 2024 – Jan 2025");
  });
});
