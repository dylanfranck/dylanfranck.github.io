# dylanfranck.com

Personal site and project drawer. Next.js (App Router) exported to static HTML and served
by GitHub Pages.

## Develop

```sh
npm install
npm run dev        # http://localhost:3000 — drafts are visible here
npm run check      # typecheck, lint, tests, production build (what CI runs)
```

## Write

- **Post:** add `content/posts/<slug>.mdx`:
  ```mdx
  export const metadata = {
    title: "Post title",
    date: "2026-10-27",
    summary: "One line for lists and link previews.",
    tags: ["optional"],
    draft: true, // remove to publish
  };

  Body in Markdown/MDX.
  ```
- **Project:** add `content/projects/<slug>.mdx` with `title`, `summary`,
  `status` (`live` | `in-progress` | `planned` | `archived`), `kind`
  (`external` + `url` | `embed` + `embedUrl` | `writeup`), optional `order`, `tags`, `draft`.
- **Images/files:** put them in `public/` and size images before adding them (no runtime
  optimization on a static host).

## Deploy

Push to `main`. `.github/workflows/ci.yml` runs the secret scan, checks, and build, then
deploys `out/` to GitHub Pages. Repo settings → Pages → Source must be **GitHub Actions**.

## Decisions

See [`docs/adr/`](docs/adr/README.md).
