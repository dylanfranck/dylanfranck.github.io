// MODULE: ContentMeta
// LAYER: test
// ROLE: Metadata field readers and draft visibility
// DEPENDENCIES: @/lib/content-meta
// OWNER: Dylan / Claude

import {
  ContentError,
  asRecord,
  EMPTY_COLLECTION_SLUG,
  isVisible,
  optionalBoolean,
  optionalString,
  optionalStringArray,
  requireIsoDate,
  requireOneOf,
  requireString,
  withPlaceholder,
} from "@/lib/content-meta";

const F = "content/x.mdx";

describe("asRecord", () => {
  it("rejects a missing metadata export", () => {
    expect(() => asRecord(F, undefined)).toThrow(/missing `export const metadata/);
  });
  it("returns an object unchanged", () => {
    expect(asRecord(F, { a: 1 })).toEqual({ a: 1 });
  });
});

describe("field readers", () => {
  it("requireString rejects blanks and names the file and key", () => {
    expect(() => requireString(F, { title: "  " }, "title")).toThrow("content/x.mdx: metadata.title");
  });
  it("optionalString allows absence but rejects wrong types", () => {
    expect(optionalString(F, {}, "url")).toBeUndefined();
    expect(() => optionalString(F, { url: 3 }, "url")).toThrow(ContentError);
  });
  it("optionalStringArray defaults to empty and rejects mixed arrays", () => {
    expect(optionalStringArray(F, {}, "tags")).toEqual([]);
    expect(() => optionalStringArray(F, { tags: ["a", 1] }, "tags")).toThrow(ContentError);
  });
  it("optionalBoolean defaults to false and rejects strings", () => {
    expect(optionalBoolean(F, {}, "draft")).toBe(false);
    expect(() => optionalBoolean(F, { draft: "yes" }, "draft")).toThrow(ContentError);
  });
  it("requireOneOf lists the allowed values on failure", () => {
    expect(requireOneOf(F, { k: "a" }, "k", ["a", "b"])).toBe("a");
    expect(() => requireOneOf(F, { k: "c" }, "k", ["a", "b"])).toThrow("one of: a, b");
  });
  it("requireIsoDate accepts YYYY-MM-DD only", () => {
    expect(requireIsoDate(F, { date: "2026-10-27" }, "date")).toBe("2026-10-27");
    expect(() => requireIsoDate(F, { date: "10/27/2026" }, "date")).toThrow(ContentError);
    expect(() => requireIsoDate(F, { date: "2026-13-45" }, "date")).toThrow(ContentError);
  });
});

describe("isVisible", () => {
  it("always shows published content", () => {
    expect(isVisible(false, "production")).toBe(true);
  });
  // GUARDS: a draft leaking onto the live site.
  it("hides drafts outside development", () => {
    expect(isVisible(true, "production")).toBe(false);
    expect(isVisible(true, "development")).toBe(true);
  });
});

describe("withPlaceholder", () => {
  it("maps items to route params", () => {
    expect(withPlaceholder([{ slug: "a" }, { slug: "b" }])).toEqual([{ slug: "a" }, { slug: "b" }]);
  });
  // GUARDS: static export failing the whole build when every post is a draft.
  it("emits the placeholder slug for an empty collection", () => {
    expect(withPlaceholder([])).toEqual([{ slug: EMPTY_COLLECTION_SLUG }]);
  });
});
