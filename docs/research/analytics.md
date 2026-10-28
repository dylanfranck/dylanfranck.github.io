# Web analytics landscape

Researched: 2026-10-28 · Feeds: RADAR R-003

## The question

Which visitors does dylanfranck.com get, where do they come from, and what do they read?
I need a private view of this. Constraints:

- **Static site on GitHub Pages:** no server logs, so any data has to come from a
  client-side script or a separate service.
- **No consent banner:** prefer cookieless, aggregate-only tools.
- **Low maintenance:** an earlier Google Analytics setup on a WordPress site was rarely
  checked. A tool that gets checked beats a powerful one that doesn't.
- **Free or near-free** at personal-site traffic, which is well under 10k pageviews/month.

## Two different questions, two different tools

| Question | Tool |
|---|---|
| How does Google see me (search queries, impressions, clicks, position, indexing errors)? | **Google Search Console** (already set up as a Domain property, so it covers every subdomain). Free, needs no script, sends a monthly email. |
| Who visits from *anywhere* (LinkedIn, GitHub, shared links, other search engines, direct), and which pages do they read? | A **web analytics counter** (below). Search Console can't see non-search traffic. |

## Landscape

Pricing is shown at the entry tier.

### Free hosted, cookieless (the shortlist)

| Tool | Free tier | Open source | Notes | Sourcing |
|---|---|---|---|---|
| **GoatCounter** | Free for "reasonable public usage", including personal sites; donation-funded | Yes (self-host "for any purpose") | No cookies, no persistent personal data, says no GDPR notice needed. Very simple dashboard. Has JSON export and API links in its nav. Run by a single maintainer. | official ([home](https://www.goatcounter.com/), [FAQ](https://www.goatcounter.com/help/faq)); 3rd-party claims of a 100k/mo cap or $5 tier conflict and aren't on the official pages |
| **Umami Cloud (Hobby)** | $0: 100K events/mo, 1 site, 6-month retention | Yes (MIT); self-host is free | Polished UI with custom events. Pro is $20/mo (1M events, 20 sites, 2 years). | official ([pricing](https://umami.is/pricing)) |
| **Cloudflare Web Analytics** | Free, no published event cap; up to 10 sites that aren't proxied through Cloudflare | No | Snippet works without moving DNS to Cloudflare. Less detail. 3rd-party sources claim data is sampled, unverified. | official ([limits](https://developers.cloudflare.com/web-analytics/limits/)) |
| **Ahrefs Web Analytics** | Free up to 1M events per project/mo | No | Cookieless, no stored IPs, "unlimited" retention. Needs an Ahrefs account. A marketing company's product; SEO-adjacent upsell. | official ([product page](https://ahrefs.com/web-analytics)) |
| **Vercel Web Analytics (Hobby)** | 50K events/mo, 1-month reporting window; collection pauses at the cap | No | Only for Vercel-hosted projects, so it fits `jp`/`me`, not the hub on Pages. | official ([limits](https://vercel.com/docs/analytics/limits-and-pricing)) |

### Paid hosted, cookieless

| Tool | Entry price | Notes | Sourcing |
|---|---|---|---|
| **Pirsch** | ~$6/mo (10K pageviews) | German-hosted, API and server-side tracking | 3rd-party |
| **Plausible** | $9/mo Starter (10K pageviews, 1 site); 30-day trial; self-host free (AGPL) | The best-known option. Weekly email reports. Stats API on the Business tier. | 3rd-party ([seline](https://seline.com/blog/plausible-analytics-pricing)), consistent across sources |
| **Simple Analytics** | ~$9–29/mo (sources conflict) | No free tier | 3rd-party, conflicting |
| **Fathom** | $15/mo (100K pageviews, 50 sites); 7-day trial, card required | Mature, simple | official ([pricing](https://usefathom.com/pricing)) |
| **Rybbit** | Cloud from ~$19/mo (100K pageviews); self-host free (AGPL-3.0) | New (about 1 year old), popular on GitHub | 3rd-party |
| **Swetrix** | Cloud with 14-day trial; self-host free | Open source, hosted in the EU | 3rd-party |

### Self-host only, or heavier tools (not a fit now)

- **Self-hosting Umami, Plausible CE, GoatCounter, Rybbit, Swetrix, Matomo:** needs a
  server and a database. A possible later spoke once there's an app box (see
  [aws-hosting-costs.md](aws-hosting-costs.md)), but more to maintain than this needs.
- **PostHog:** product analytics, session replay, feature flags. Far more than a personal
  site needs.
- **Google Analytics 4:** free and powerful, but uses cookies, needs a consent banner, and
  collects more data than I need. The earlier experience suggests it wouldn't be checked.
- **Microsoft Clarity:** free heatmaps and session replay. Uses cookies; overkill here.

## Implementation notes (whichever tool wins)

- Load the script from the root layout in production builds only (`next dev` doesn't count).
- Block the beacon in Playwright so e2e runs don't send fake pageviews.
- The site code/token is public by design (it's in the page HTML), so it isn't a secret.
  Allowlist it in `.gitleaks.toml` if gitleaks flags it.
- Add a one-line privacy note (footer or About page): which tool, and that it's cookieless
  and aggregate.
- Hub → spoke traffic: with the default referrer policy, browsers send
  `https://dylanfranck.com/` as the referrer, so a counter on a spoke sees the hub without
  extra work. Add UTM parameters only if per-link detail matters.
- Choosing a tool adds a third-party service, which is an ADR trigger (CLAUDE.md).

## Leaning

**Outcome (2026-10-28):** GoatCounter chosen, see [ADR-003](../adr/ADR-003-goatcounter-analytics.md).
The reasoning at the time:

- **GoatCounter:** free, cookieless, open source, and has an API that a private dashboard
  on `me` could read later.
- **Umami Cloud Hobby:** the runner-up if GoatCounter's dashboard feels too bare. It has
  documented free limits but only 6-month retention.
- **Plausible:** the pick if weekly email reports (the "actually gets checked" feature) are
  worth $9/mo.
