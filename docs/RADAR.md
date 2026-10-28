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
