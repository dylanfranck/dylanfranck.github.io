# ADR-001 — Next.js with static export on GitHub Pages

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The 2022 site was a Nicepage builder export (~6 MB of builder CSS/JS around a few KB of
content, mostly "under construction" pages). The goals now: a blog to post to instead of
LinkedIn, a project index that can grow into a "junk drawer," and room to add server
features later.

## Options considered

- **Vite + React (SPA)** — fewest concepts, but ships an empty shell plus JS: weak SEO and
  link previews, and blog routing/Markdown would be hand-built.
- **Astro (+ React islands)** — best fit for a content site (zero JS by default, first-class
  Markdown). Smaller ecosystem for growing into app-like features.
- **Next.js (App Router)** — heavier, but the dominant React framework, pre-renders to HTML,
  and has a direct path to server features by changing hosts.

## Decision

Next.js App Router with `output: "export"`, deployed to GitHub Pages by a GitHub Actions
workflow (built HTML is not committed). Content is MDX in the repo.

## Consequences

- No API routes, server actions, middleware, or runtime image optimization while on Pages.
  Images are pre-sized by hand (`images.unoptimized`).
- GitHub Pages cannot set custom HTTP response headers (CSP, HSTS preload, etc.).
- **Exit path:** when the site itself needs server code, remove `output: "export"` and
  `images.unoptimized` and move hosting to Vercel or Cloudflare (point DNS there). This is
  a config + DNS change, not a rewrite, and will get its own ADR.
