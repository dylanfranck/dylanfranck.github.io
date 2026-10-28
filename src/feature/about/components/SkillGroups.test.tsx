// MODULE: About
// LAYER: test
// ROLE: Skill groups render as label/value pairs
// DEPENDENCIES: @testing-library/react, @/feature/about/components/SkillGroups
// OWNER: Dylan / Claude

import { render, screen } from "@testing-library/react";
import { SkillGroups } from "@/feature/about/components/SkillGroups";

describe("SkillGroups", () => {
  it("renders each group label with its items joined", () => {
    render(<SkillGroups groups={[{ label: "Languages", items: ["Java", "Python"] }]} />);
    expect(screen.getByRole("term")).toHaveTextContent("Languages");
    expect(screen.getByRole("definition")).toHaveTextContent("Java · Python");
  });
});
