# ADR-002 — Hub and spoke: projects live on their own subdomains

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The site should showcase an open-ended set of projects (Japanese study app, photo journal,
indie game, music, experiments, possibly FastAPI services). Each has its own stack, release
cadence, and hosting needs; some need auth and storage.

## Decision

This repo is the **hub**: home, blog, and one `content/projects/<slug>.mdx` per project.
Each project page is one of three kinds:

- `external` — the project runs elsewhere (usually `<name>.dylanfranck.com`); the page
  describes it and links out. Example: `jp.dylanfranck.com` on Vercel.
- `embed` — a self-contained build or player shown in a sandboxed iframe.
- `writeup` — the MDX body is the whole thing.

Projects with servers, secrets, auth, or databases are **spokes**: their own repo and
deployment, attached by a DNS record. Shared code between hub and spokes would be the
trigger to consider a monorepo — not before.

## Consequences

- The hub stays a static site; its build and security surface stay small.
- Each spoke picks its own host (Vercel, a VPS, Fly/Railway for FastAPI) and owns its own
  hardening (container, secrets, IaC).
- DNS for `dylanfranck.com` becomes the integration point; manage it carefully (and
  eventually as code).
