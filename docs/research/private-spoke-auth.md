# Auth for private spokes (`me.dylanfranck.com`)

Researched: 2026-10-28 · Feeds: RADAR R-001

## The question

Personal tools (PTO planner, finance dashboard, Memories) need to be reachable from
anywhere, but only by me. Where do they run, and what puts the login in front of them?

## Constraint: GitHub Pages can't do it

Pages has no access control for public sites; private Pages needs GitHub Enterprise. So
`me` is a **separate spoke on another host**, attached with a DNS record, the same way
`jp` points at Vercel (ADR-002). **The hub doesn't have to move** for this.

## Options

| Option | How auth works | Effect on DNS | Monthly | Fit |
|---|---|---|---|---|
| **Cloudflare Pages + Cloudflare Access** | A login screen at the edge (email code, GitHub or Google). No auth code in the apps. | DNS has to move to Cloudflare (as far as I know Access needs Cloudflare-managed DNS). Registrar stays at Namecheap. | ~$0 at personal scale (unverified) | Fastest route to "only me" |
| **Vercel + Supabase Auth** | App-level accounts and row-level security in Postgres, as in the Japanese app | One CNAME at Namecheap; nothing moves | $0 (Hobby is non-commercial; Supabase free pauses after ~1 week idle) | Best for real sync and storage; auth code in each tool |
| **AWS: CloudFront + Cognito (+ API Gateway/Lambda + DynamoDB), in OpenTofu** | Cognito hosted login; JWT checked at the API | DNS probably moves to Route 53 ([dns-to-route53.md](dns-to-route53.md)) | ~$1 within free allowances (Cognito pricing unverified) | Best for learning; most work |
| **One Compose box (EC2/Lightsail) + an auth proxy** (oauth2-proxy, Authelia, or app-level auth) | A reverse proxy enforces login in front of every tool | One A record | ~$12–17 | Self-hosted; also fits an app like a FastAPI service |

## Notes

- Pages behind a login aren't indexed by search engines (and shouldn't be). SEO for `me`
  applies only to any public pages it has.
- A natural first feature for `me`: a private panel showing the hub's traffic, pulled from
  the analytics tool's API (see [analytics.md](analytics.md)).
- Cross-cutting with any option: MFA, backups and export, encryption at rest that I
  control (client-side for the journal?), and no tool data in this repo, not even
  encrypted.
