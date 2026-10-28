// MODULE: Format
// ROLE: Display formatting helpers
// DEPENDENCIES: none
// OWNER: Dylan / Claude

// WHY: content dates are calendar dates ("2026-10-27"), not instants. Formatting
// in UTC keeps the build machine's time zone from shifting them a day.
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** "2025-10" → "Oct 2025". */
export function formatMonth(yearMonth: string): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(`${yearMonth}-01T00:00:00Z`),
  );
}

/** "2022-06", undefined → "Jun 2022 – Present". */
export function formatMonthRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}
