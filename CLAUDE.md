# CLAUDE.md
# dylanfranck.com — Claude Code Instruction File
# Static. Update by hand when standards change. Last updated: 2026-10-27

## What this is

Dylan's personal site: home, blog, and a "junk drawer" of projects. It is the front door
of a hub-and-spoke setup (ADR-002): this repo is the hub; bigger projects (Japanese app at
`jp.dylanfranck.com`, a photo journal, an indie game, music, any FastAPI service) are
separate deployments on subdomains, linked from `content/projects/`.

Keep it light. No database, auth, API routes, monorepo tooling, or CMS until a concrete
project needs one — and then usually in that project's own repo, not here.

## Environment — read before running anything

- **Git is intentionally not installed.** Dylan stages, commits, and pushes from the host.
  Never run git, never try to install it, never work around it. Prepare changes and end
  with a short summary of what changed so it can be committed.
- `node_modules/` is a container volume; the repo itself is a Windows mount, so
  `next build` is slow here (minutes). Prefer `tsc`, `eslint`, and `vitest` for quick
  checks and leave full builds to Dylan or CI unless asked.
- `reference/` holds private material from other projects (including client documents).
  It is gitignored. Read only what a task needs; never copy names, emails, or client
  details from it into this repo. `legacy/` is the retired 2022 Nicepage site, kept for
  reference until Dylan deletes it.

## Scope check (light pre-flight)

Before creating or modifying files, state in a few lines: what you'll touch, which files
are NEW vs MODIFY (check they exist), and any ADR in play. Then proceed unless the change
is cross-cutting or matches an ADR trigger, in which case wait for a go-ahead.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), `output: "export"` → static HTML in `out/` |
| Language | TypeScript, strict |
| Content | MDX via `@next/mdx`; metadata as `export const metadata = { ... }` |
| Styling | Tailwind CSS v4 (no config file), shadcn/ui primitives, Lucide icons |
| Tests | Vitest + Testing Library (jsdom) |
| Hosting | GitHub Pages via Actions (`.github/workflows/ci.yml`), custom domain `dylanfranck.com` |

Versions are pinned exactly in `package.json`. Prefer releases at least two weeks old,
except security fixes.

## Layout and the three-layer rule

```
content/posts/*.mdx            blog posts
content/projects/*.mdx         one file per project (kind: external | embed | writeup)
content/about.mdx              home page bio
src/app/**                     Layer 3 — routes: composition only, no color decisions
src/feature/<domain>/          Layer 2 — domain logic + components (blog, projects)
src/shared-component/          Layer 2 — domain-free shared pieces (PageContainer, Prose, chrome)
src/element/                   Layer 1 — shadcn primitives; never hand-edited, never tested
src/lib/                       utilities (cn, formatting, content loading/validation)
src/styles/globals.css         the ONLY place color values live
```

- Color, status, and threshold decisions belong in Layer 2 only. `ProjectStatusBadge` is
  the single place a project status maps to a color role.
- `PageContainer` owns page padding and width. A page never sets its own outer padding.
- Promote-on-second-consumer: a domain-free component used by a second feature moves to
  `shared-component/`.

## Content rules

- Adding a post or project = adding one `.mdx` file. Metadata is validated at build time
  (`src/feature/*/*-meta.ts`); a bad field fails the build with the file name.
- `draft: true` shows the item under `npm run dev` only; it never reaches the live site.
- Dates are calendar dates `YYYY-MM-DD`.

## Code rules

- `@/` (and `@content/`) imports only — no relative paths (ESLint enforces).
- No `any` (use `unknown` and narrow). No `// @ts-ignore` without a `// WHY:`.
- No hex literals or `style={{ color }}` outside `globals.css`; use token utilities.
- Icon-only controls need an `aria-label`. Status is always text, never color alone.
- Static export constraints: no API routes, server actions, middleware, cookies/headers,
  or runtime image optimization. Needing one of these is an ADR-001 trigger.

### File header — every new non-primitive TS/TSX file

```tsx
// MODULE: <ModuleName>
// LAYER: 1 | 2 | 3 | test     (omit for config/lib files)
// ROLE: <one line>
// DEPENDENCIES: <@/ paths>
// OWNER: Dylan / Claude
// ADR: <ADR-NNN>              (omit if none)
```

`// WHY:` on non-obvious decisions. `// GUARDS:` on regression-critical tests.

## Security

- **No secrets in the repo, ever** — this repo is public. CI runs gitleaks over the full
  git history on every push and PR (`.gitleaks.toml`). A secret that reaches a pushed
  commit must be treated as leaked and rotated, even if a later commit removes it.
- Anything that needs a secret (API keys, tokens) does not belong in a static site; it
  belongs in a spoke with a server (ADR-002).
- Third-party GitHub Actions are pinned to full commit SHAs with the tag in a comment.
  Workflows default to `permissions: contents: read`; widen per job only.
- Embeds run in a sandboxed iframe (`ProjectEmbed`). Host untrusted builds off-origin.

## Testing

Spec-first for new logic: propose the tests, then implement. When a test fails because the
code is wrong, stop and flag it ("expected X, got Y — is the test right or the code?");
never bend a test to match wrong behavior. Run once, read all failures, fix in one pass.

| What | Coverage |
|---|---|
| `src/element/` primitives | none |
| Layer 2 components and content validation | ~80%+ |
| `src/lib/` formatting/validation utilities | ~90% |
| Routes (`src/app/`) | covered by `next build` in CI |

## Commands

| Task | Command |
|---|---|
| Dev server (shows drafts) | `npm run dev` → http://localhost:3000 |
| Quick checks | `npx tsc --noEmit && npx eslint . && npx vitest run` |
| Everything CI runs | `npm run check` (includes the slow `next build`) |
| Preview the export | `npm run build && npm start` |

## Commit format (for Dylan's host-side commits)

```
<type>(<scope>): <short description>

Types:  feat | fix | test | refactor | docs | chore | style | ci
Scopes: blog | projects | home | shared | content | ci | deps | site
```

## ADRs

Recorded in `docs/adr/` (index: `docs/adr/README.md`). Flag `[PENDING ADR]` when a
decision evaluates named alternatives, changes hosting/deploy, adds a framework or
service, creates a constraint future work must know, or is expensive to roll back.
Never rewrite an accepted ADR's decision — supersede it.

## Memory vs source

Anything another session must inherit lives in this repo (`CLAUDE.md`, `.claude/`, ADRs).
Memory holds only personal preferences and pointers into source.
