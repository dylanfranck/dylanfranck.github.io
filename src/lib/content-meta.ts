// MODULE: ContentMeta
// ROLE: Shared field readers for validating `export const metadata` in MDX content
// DEPENDENCIES: none
// OWNER: Dylan / Claude

// WHY: MDX metadata is untyped JS. Validating at build time turns a typo in a
// post into a clear build error instead of a silently broken page.

export class ContentError extends Error {
  constructor(file: string, message: string) {
    super(`${file}: ${message}`);
    this.name = "ContentError";
  }
}

export function asRecord(file: string, raw: unknown): Record<string, unknown> {
  if (typeof raw !== "object" || raw === null) {
    throw new ContentError(file, "missing `export const metadata = { ... }`");
  }
  return raw as Record<string, unknown>;
}

export function requireString(file: string, meta: Record<string, unknown>, key: string): string {
  const value = meta[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new ContentError(file, `metadata.${key} must be a non-empty string`);
  }
  return value;
}

export function optionalString(file: string, meta: Record<string, unknown>, key: string): string | undefined {
  const value = meta[key];
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new ContentError(file, `metadata.${key} must be a string`);
  return value;
}

export function optionalStringArray(file: string, meta: Record<string, unknown>, key: string): string[] {
  const value = meta[key];
  if (value === undefined) return [];
  if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) {
    throw new ContentError(file, `metadata.${key} must be an array of strings`);
  }
  return value;
}

export function optionalBoolean(file: string, meta: Record<string, unknown>, key: string): boolean {
  const value = meta[key];
  if (value === undefined) return false;
  if (typeof value !== "boolean") throw new ContentError(file, `metadata.${key} must be true or false`);
  return value;
}

export function requireOneOf<T extends string>(
  file: string,
  meta: Record<string, unknown>,
  key: string,
  allowed: readonly T[],
): T {
  const value = meta[key];
  if (typeof value !== "string" || !allowed.includes(value as T)) {
    throw new ContentError(file, `metadata.${key} must be one of: ${allowed.join(", ")}`);
  }
  return value as T;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function requireIsoDate(file: string, meta: Record<string, unknown>, key: string): string {
  const value = requireString(file, meta, key);
  if (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value))) {
    throw new ContentError(file, `metadata.${key} must be a date like 2026-10-27`);
  }
  return value;
}

// WHY: `output: "export"` fails the build when a dynamic route generates zero
// pages (e.g. every post is still a draft). Routes emit this placeholder slug
// instead and render the 404 page for it; it never appears in lists or the sitemap.
export const EMPTY_COLLECTION_SLUG = "_empty";

export function withPlaceholder<T extends { slug: string }>(items: T[]): { slug: string }[] {
  const params = items.map((item) => ({ slug: item.slug }));
  return params.length > 0 ? params : [{ slug: EMPTY_COLLECTION_SLUG }];
}

// WHY: drafts render under `next dev` so you can preview them, and are left
// out of `next build`, so a draft can never reach the live site.
export function isVisible(draft: boolean, env: string | undefined = process.env.NODE_ENV): boolean {
  return !draft || env === "development";
}
