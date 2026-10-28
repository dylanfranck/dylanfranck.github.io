# ADR-003 — Visitor analytics with GoatCounter

- **Status:** Accepted
- **Date:** 2026-10-28
- **Closes:** RADAR R-003 · **Research:** [`../research/analytics.md`](../research/analytics.md)

## Context

The site replaces LinkedIn as my public front door, so I want a private view of who visits
it, where they come from, and what they read. GitHub Pages provides no server logs. Google
Search Console (set up 2026-10-28) covers search traffic only, not visitors from
LinkedIn, GitHub, shared links, or direct visits.

Constraints: static export (ADR-001); no cookie or consent banner; free at personal scale;
low maintenance (an earlier Google Analytics setup went largely unchecked).

## Options considered

| Option | For | Against |
|---|---|---|
| **GoatCounter** (hosted) | Free for personal use, cookieless, open source (self-host later), has an API, tiny script | Simple dashboard; a single maintainer; donation-funded |
| Umami Cloud Hobby | Nicer UI; documented free limits (100K events/mo) | 6-month retention, 1 site |
| Cloudflare Web Analytics | Free, no published cap | Less detail; possibly sampled; nudges DNS toward Cloudflare |
| Plausible | Polished, weekly email reports | $9/mo |
| Google Analytics 4 | Free, powerful | Cookies + consent banner, more data than I want, won't get checked |

## Decision

Use **GoatCounter**, hosted at goatcounter.com.

- `site.analytics.goatcounter` in `src/lib/site.ts` holds the site code. It is public by
  design (it appears in every page's HTML), not a secret. `null` turns analytics off.
- `src/shared-component/Analytics.tsx` renders the script in production builds only,
  with `no_onload`, and counts each route itself (on the first load and on every
  client-side `<Link>` navigation). By default count.js would only count full page loads.
- **The script is vendored** at `public/vendor/goatcounter-count.v4.js` (ISC license)
  instead of loaded from `gc.zgo.at`, so no third-party JavaScript runs on the site. Only
  the page-view beacon leaves for `<code>.goatcounter.com`.
  - Vendored 2026-10-28 from `https://gc.zgo.at/count.v4.js`, sha384
    `nRw6qfbWyJha9LhsOtSb2YJDyZdKvvCFh0fJYlkquSFjUxp9FVNugbfy8q1jdxI+`.
  - To upgrade: download the new versioned file, review the diff, replace it, and update
    this hash and `GOATCOUNTER_SCRIPT`.
- count.js skips localhost, so `npm start` and the Playwright suite never send hits.
- The footer discloses the analytics whenever it's enabled.

## Consequences

- Visitors see a one-line disclosure in the footer. No banner, no cookies, no tracking of
  individuals.
- Vendoring means upgrades are manual. Acceptable: the script is small, stable, and
  versioned.
- Moving to self-hosted GoatCounter later (for example on a spoke box, RADAR R-002) only
  changes the endpoint; the script and component stay the same.
- A future private dashboard on `me.dylanfranck.com` can read GoatCounter's API (RADAR R-001).
