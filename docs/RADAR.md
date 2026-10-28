# RADAR

Concrete-but-undecided ideas. Each entry is a question with named options; when one is
decided, it becomes an ADR and the entry links to it. (Method carried over from CLM ADR-005.)

---

## R-001: Private spokes, personal tools behind auth

- **Raised:** 2026-10-28
- **Question:** how do single-owner tools that hold sensitive personal data (PTO planner,
  finance dashboard, Memories) become reachable from anywhere without exposing that data?
- **Constraint:** the hub stays static and public (ADR-001, ADR-002). The tools' data never
  enters this repo, not even encrypted.
- **Options:**
  1. **Edge auth in front of static pages** (e.g. Cloudflare Access, or CloudFront + Cognito):
     the tools stay simple static apps on a subdomain, and an identity check runs before any
     byte is served. Little app code changes, but data still lives client-side or needs storage.
  2. **App-level auth + hosted DB** (Supabase, as in the Japanese app): real per-user rows
     with row-level security, and sync across devices. More code per tool.
  3. **One "personal" spoke** (`me.dylanfranck.com`) hosting all three behind a single login
     with shared storage, versus a spoke per tool.
- **Cross-cutting either way:** encryption at rest that I control (client-side for the
  journal?), backups/export, and MFA.
- **Revisit when:** the AWS hosting move (S3 + CloudFront + OpenTofu) is planned, since
  option 1 would ride on the same infrastructure.
- **Research:** [research/private-spoke-auth.md](research/private-spoke-auth.md)

---

## R-002: Hosting and DNS on AWS

- **Raised:** 2026-10-28
- **Question:** move DNS (Namecheap → Route 53) and the static hub (GitHub Pages → S3 +
  CloudFront), managed in OpenTofu, mainly to learn IaaS and networking?
- **Options:**
  1. **Stay as-is:** GitHub Pages + Namecheap DNS. $0, no learning.
  2. **DNS only:** a Route 53 zone in OpenTofu (~$0.50/mo). Needs an email-forwarding
     replacement first.
  3. **DNS + static hub on AWS:** Route 53 + S3 + CloudFront (Free plan) + ACM, deployed
     through GitHub OIDC. ~$1/mo; adds security headers.
  4. **Plus one Compose box** (EC2 or Lightsail, ~$12–17/mo) for app spokes. No ALB,
     NAT, or RDS at this scale; high-availability patterns stay as apply/destroy labs.
- **Revisit when:** a personal AWS account exists with a budget alert, or a spoke needs a
  server.
- **Research:** [research/aws-hosting-costs.md](research/aws-hosting-costs.md),
  [research/dns-to-route53.md](research/dns-to-route53.md)

---

## R-003: Visitor analytics for the hub

- **Decided 2026-10-28 → [ADR-003](adr/ADR-003-goatcounter-analytics.md) (GoatCounter).**

- **Raised:** 2026-10-28
- **Question:** which cookieless analytics tool gives a private view of who visits the
  hub and from where? (Google Search Console, set up 2026-10-28, already covers search.)
- **Options:** GoatCounter (free, open source, API), Umami Cloud Hobby (free, 100K
  events/mo, 6-month retention), Cloudflare Web Analytics (free), Plausible ($9/mo,
  email reports). Full landscape in the research note.
- **Revisit when:** Dylan picks one. Adding it is an ADR (new third-party service).
- **Research:** [research/analytics.md](research/analytics.md)
