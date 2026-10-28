// MODULE: SharedComponent
// LAYER: test
// ROLE: aria-current marks the active section, including its child pages
// DEPENDENCIES: @testing-library/react, next/navigation (mocked), @/shared-component/NavLinks
// OWNER: Dylan / Claude

import { render, screen } from "@testing-library/react";
import { NavLinks } from "@/shared-component/NavLinks";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

describe("NavLinks", () => {
  it("marks nothing current on the home page", () => {
    pathname.value = "/";
    render(<NavLinks />);
    expect(screen.queryByRole("link", { current: "page" })).toBeNull();
  });

  // GUARDS: the Blog link losing its current state on individual posts.
  it("keeps the section current on its child pages", () => {
    pathname.value = "/blog/some-post/";
    render(<NavLinks />);
    expect(screen.getByRole("link", { current: "page" })).toHaveTextContent("Blog");
  });
});
