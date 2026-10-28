// MODULE: SharedComponent
// LAYER: test
// ROLE: GoatCounter loads only when configured and counts every page, including client-side navigations
// DEPENDENCIES: @testing-library/react, next/navigation (mocked), @/shared-component/Analytics
// OWNER: Dylan / Claude
// ADR: ADR-003

import { render } from "@testing-library/react";
import { Analytics, GOATCOUNTER_SCRIPT, goatcounterEndpoint } from "@/shared-component/Analytics";

const pathname = vi.hoisted(() => ({ value: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.value }));

const script = () => document.querySelector<HTMLScriptElement>("script[data-goatcounter]");

describe("Analytics", () => {
  beforeEach(() => {
    pathname.value = "/";
    delete window.goatcounter;
  });
  afterEach(() => {
    vi.useRealTimers();
    script()?.remove();
  });

  it("renders nothing when no code is configured", () => {
    render(<Analytics code={null} />);
    expect(script()).toBeNull();
  });

  it("loads the vendored script pointed at the site's endpoint, with automatic counting off", () => {
    render(<Analytics code="dylanfranck" />);
    const el = script();
    expect(el).toHaveAttribute("src", GOATCOUNTER_SCRIPT);
    expect(el).toHaveAttribute("data-goatcounter", "https://dylanfranck.goatcounter.com/count");
    expect(JSON.parse(el?.dataset.goatcounterSettings ?? "{}")).toEqual({ no_onload: true });
  });

  // GUARDS: client-side navigation going uncounted (count.js only sees full page loads).
  it("counts the first page and every client-side route change", () => {
    const count = vi.fn();
    window.goatcounter = { count };
    const { rerender } = render(<Analytics code="dylanfranck" />);
    expect(count).toHaveBeenCalledTimes(1);

    pathname.value = "/blog/";
    rerender(<Analytics code="dylanfranck" />);
    expect(count).toHaveBeenCalledTimes(2);
  });

  it("waits for the async script before counting", () => {
    vi.useFakeTimers();
    const count = vi.fn();
    render(<Analytics code="dylanfranck" />);
    expect(count).not.toHaveBeenCalled();

    window.goatcounter = { count };
    vi.advanceTimersByTime(200);
    expect(count).toHaveBeenCalledTimes(1);
  });

  it("rejects a code that isn't a plain subdomain label", () => {
    expect(() => goatcounterEndpoint("evil.com/x")).toThrow(/GoatCounter code/);
  });
});
