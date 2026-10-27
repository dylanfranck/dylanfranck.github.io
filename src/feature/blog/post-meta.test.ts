// MODULE: Blog
// LAYER: test
// ROLE: Post metadata parsing and ordering
// DEPENDENCIES: @/feature/blog/post-meta
// OWNER: Dylan / Claude

import { parsePostMeta, sortNewestFirst } from "@/feature/blog/post-meta";

const valid = { title: "T", date: "2026-10-27", summary: "S" };

describe("parsePostMeta", () => {
  it("fills defaults for optional fields", () => {
    expect(parsePostMeta("hello", valid)).toEqual({ slug: "hello", ...valid, tags: [], draft: false });
  });
  it("points the error at the post's file", () => {
    expect(() => parsePostMeta("hello", { ...valid, date: "soon" })).toThrow("content/posts/hello.mdx");
  });
});

describe("sortNewestFirst", () => {
  it("orders by date descending, then slug", () => {
    const posts = [
      parsePostMeta("b", { ...valid, date: "2026-01-01" }),
      parsePostMeta("c", { ...valid, date: "2026-05-01" }),
      parsePostMeta("a", { ...valid, date: "2026-01-01" }),
    ];
    expect(sortNewestFirst(posts).map((p) => p.slug)).toEqual(["c", "a", "b"]);
  });
});
