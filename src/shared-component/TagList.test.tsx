// MODULE: SharedComponent
// LAYER: test
// ROLE: TagList renders a labeled list, and nothing when empty
// DEPENDENCIES: @testing-library/react, @/shared-component/TagList
// OWNER: Dylan / Claude

import { render, screen } from "@testing-library/react";
import { TagList } from "@/shared-component/TagList";

describe("TagList", () => {
  it("renders each item inside a labeled list", () => {
    render(<TagList items={["Java", "React"]} label="Stack" />);
    expect(screen.getByRole("list", { name: "Stack" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(["Java", "React"]);
  });

  it("renders nothing for an empty list", () => {
    const { container } = render(<TagList items={[]} label="Stack" />);
    expect(container).toBeEmptyDOMElement();
  });
});
