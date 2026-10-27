// MODULE: Projects
// LAYER: test
// ROLE: Project metadata parsing (kind-specific requirements) and ordering
// DEPENDENCIES: @/feature/projects/project-meta
// OWNER: Dylan / Claude

import { parseProjectMeta, sortByOrder } from "@/feature/projects/project-meta";

const base = { title: "T", summary: "S", status: "live", kind: "writeup" };

describe("parseProjectMeta", () => {
  it("defaults order to 100 and draft to false", () => {
    const p = parseProjectMeta("x", base);
    expect(p.order).toBe(100);
    expect(p.draft).toBe(false);
  });
  it("requires url for external projects", () => {
    expect(() => parseProjectMeta("x", { ...base, kind: "external" })).toThrow('needs metadata.url');
    expect(parseProjectMeta("x", { ...base, kind: "external", url: "https://jp.dylanfranck.com" }).url).toBe(
      "https://jp.dylanfranck.com",
    );
  });
  it("requires embedUrl for embed projects", () => {
    expect(() => parseProjectMeta("x", { ...base, kind: "embed" })).toThrow("needs metadata.embedUrl");
  });
  it("rejects an unknown status", () => {
    expect(() => parseProjectMeta("x", { ...base, status: "done" })).toThrow("one of: live");
  });
  it("rejects a non-numeric order", () => {
    expect(() => parseProjectMeta("x", { ...base, order: "1" })).toThrow("order must be a number");
  });
});

describe("sortByOrder", () => {
  it("orders by order, then title", () => {
    const list = [
      parseProjectMeta("a", { ...base, title: "Zed", order: 2 }),
      parseProjectMeta("b", { ...base, title: "Beta", order: 1 }),
      parseProjectMeta("c", { ...base, title: "Alpha", order: 2 }),
    ];
    expect(sortByOrder(list).map((p) => p.title)).toEqual(["Beta", "Alpha", "Zed"]);
  });
});
