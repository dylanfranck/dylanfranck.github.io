// MODULE: SharedComponent
// LAYER: 2
// ROLE: Cookieless page-view counting via GoatCounter, including client-side navigations
// DEPENDENCIES: next/navigation, react
// OWNER: Dylan / Claude
// ADR: ADR-003

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    goatcounter?: { count?: (vars?: { path?: string }) => void };
  }
}

// WHY: vendored (pinned, same-origin) instead of loading gc.zgo.at, so no third-party
// JavaScript runs on the site. Upgrade by replacing the file; see ADR-003.
export const GOATCOUNTER_SCRIPT = "/vendor/goatcounter-count.v4.js";

const CODE_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export function goatcounterEndpoint(code: string): string {
  if (!CODE_PATTERN.test(code)) throw new Error(`Invalid GoatCounter code "${code}": expected a subdomain label.`);
  return `https://${code}.goatcounter.com/count`;
}

export function Analytics({ code }: { code: string | null }) {
  const pathname = usePathname();

  // WHY: count.js only counts full page loads, but <Link> navigates client-side. With
  // no_onload set, every count (first page included) happens here, once per route.
  // count.js itself skips localhost, so `npm start` and Playwright never send hits.
  useEffect(() => {
    if (!code) return;
    const send = () => {
      const count = window.goatcounter?.count;
      if (count) count({ path: window.location.pathname });
      return Boolean(count);
    };
    if (send()) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      if (send() || ++tries >= 50) window.clearInterval(timer);
    }, 100);
    return () => window.clearInterval(timer);
  }, [code, pathname]);

  if (!code) return null;
  return (
    <script
      async
      src={GOATCOUNTER_SCRIPT}
      data-goatcounter={goatcounterEndpoint(code)}
      data-goatcounter-settings='{"no_onload":true}'
    />
  );
}
