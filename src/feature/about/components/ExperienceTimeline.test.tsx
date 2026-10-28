// MODULE: About
// LAYER: test
// ROLE: Timeline renders employers, engagements, date ranges, and tech
// DEPENDENCIES: @testing-library/react, @/feature/about/components/ExperienceTimeline
// OWNER: Dylan / Claude

import { render, screen, within } from "@testing-library/react";
import { ExperienceTimeline } from "@/feature/about/components/ExperienceTimeline";
import type { Employer } from "@/feature/about/types";

const employers: Employer[] = [
  {
    org: "Acme",
    location: "Remote",
    start: "2020-01",
    title: "Engineer",
    engagements: [
      { name: "Current", role: "Dev", start: "2024-03", summary: "S1", highlights: ["H1"], tech: ["Java"] },
      { name: "Past", role: "Dev", start: "2021-01", end: "2023-12", summary: "S2", highlights: [], tech: [] },
    ],
  },
];

describe("ExperienceTimeline", () => {
  it("shows the employer with its open-ended range", () => {
    render(<ExperienceTimeline employers={employers} />);
    const section = screen.getByRole("region", { name: "Acme" });
    expect(within(section).getByText(/Jan 2020 – Present/)).toBeInTheDocument();
  });

  it("shows Present for current engagements and both ends for finished ones", () => {
    render(<ExperienceTimeline employers={employers} />);
    expect(screen.getByText("Mar 2024 – Present")).toBeInTheDocument();
    expect(screen.getByText("Jan 2021 – Dec 2023")).toBeInTheDocument();
  });

  it("lists highlights and tech for each engagement", () => {
    render(<ExperienceTimeline employers={employers} />);
    expect(screen.getByText("H1")).toBeInTheDocument();
    expect(within(screen.getAllByRole("list", { name: "Technologies" })[0]).getByText("Java")).toBeInTheDocument();
  });
});
