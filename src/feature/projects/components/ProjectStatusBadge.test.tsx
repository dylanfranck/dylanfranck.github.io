// MODULE: Projects
// LAYER: test
// ROLE: Status → label/color-role mapping
// DEPENDENCIES: @testing-library/react, @/feature/projects/components/ProjectStatusBadge
// OWNER: Dylan / Claude

import { render, screen } from "@testing-library/react";
import { ProjectStatusBadge } from "@/feature/projects/components/ProjectStatusBadge";
import { PROJECT_STATUSES } from "@/feature/projects/project-meta";

describe("ProjectStatusBadge", () => {
  it.each([
    ["live", "Live", "text-status-live"],
    ["in-progress", "In progress", "text-status-progress"],
    ["planned", "Planned", "text-status-planned"],
    ["archived", "Archived", "text-status-archived"],
  ] as const)("renders %s as a text label with its color role", (status, label, roleClass) => {
    render(<ProjectStatusBadge status={status} />);
    expect(screen.getByText(label)).toHaveClass(roleClass);
  });

  it("covers every status", () => {
    expect(PROJECT_STATUSES).toHaveLength(4);
  });
});
