# Research notes

Background research behind open questions in [`../RADAR.md`](../RADAR.md) and future ADRs.
Notes record what was found, when, and how well each fact is sourced, so a later decision
can re-check the numbers instead of trusting memory. They are not decisions: decisions
live in [`../adr/`](../adr/README.md).

| Note | Feeds | Researched |
|---|---|---|
| [Web analytics landscape](analytics.md) | RADAR R-003 | 2026-10-28 |
| [AWS hosting costs for a personal site and small apps](aws-hosting-costs.md) | RADAR R-002 | 2026-10-28 |
| [Moving DNS from Namecheap to Route 53](dns-to-route53.md) | RADAR R-002 | 2026-10-28 |
| [Auth for private spokes (`me.dylanfranck.com`)](private-spoke-auth.md) | RADAR R-001 | 2026-10-28 |

## Conventions

- One topic per file. Put the research date at the top, and re-date sections when you
  re-check them.
- Mark how well each number is sourced: **official** (the vendor's own pricing or docs
  page) or **3rd-party** (blogs, aggregators; often stale or contradictory). Prices drift,
  so re-verify official pages before deciding.
- Prices are USD, AWS figures are us-east-1, and "month" means 730 hours, unless stated.
- Public repo: no client names, account IDs, billing exports, or personal data.
