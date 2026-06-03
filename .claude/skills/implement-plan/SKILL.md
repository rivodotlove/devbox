---
name: implement-plan
description: Execute the implementation section of a plan produced by /write-plan. Reads the tasks inside the IMPLEMENT-PLAN markers of a plan HTML, folds in the reviewer's BLOCKER/MAJOR gaps, applies the changes on the current branch, then runs vp check + vp test. Use when the user says "implement the plan", "/implement-plan <path|issue-id>", or wants a write-plan plan built.
argument-hint: <plan-path | issue-id>
---

# implement-plan

Executes Section 2 (Implementation) of a `/write-plan` HTML plan. Edits happen on
the **current branch** — do not create a branch.

The argument is a plan file path or an issue id. Resolve it:

- A path → use it.
- An issue id (e.g. `RIV-5`) → `.claude/plans/<id>-*.html` (glob; if multiple, pick
  the newest and tell the user which).
- Nothing → use the newest file in `.claude/plans/`; print which one and confirm
  before editing if more than one exists.

---

## Procedure

### 1. Parse the plan

Read the plan file. Extract the implementation tasks from the region between the
`<!-- IMPLEMENT-PLAN:BEGIN -->` and `<!-- IMPLEMENT-PLAN:END -->` markers (the
`<h2 data-implement-plan="tasks">` section). For each task capture: title,
dependencies, files to touch (exact paths), code snippets, acceptance criteria.

Also read the **reviewer gaps** block (`#review-notes`) and its `VERDICT:` line.

### 2. Fold in reviewer gaps (before coding)

The plan's code snippets are _illustrative_, and the reviewer already found problems
with them. Before writing code, reconcile each `[BLOCKER]` and `[MAJOR]` gap into the
task it affects — e.g. add a missing dependency to the install step, change an import
that violates layering, promote a "deferred" item that's actually core scope. List
the folded-in changes to the user up front. `[MINOR]` gaps: apply if cheap, otherwise
note them as follow-ups. If the verdict was `fix-first`, the majors are not optional.

### 3. Build the task list

Create tracked tasks (TaskCreate) in dependency order, one per plan task plus any the
folded gaps add. Mark `in_progress`/`completed` as you go.

### 4. Implement, on the current branch

Work the tasks in order. Treat the plan as intent, not literal text: adapt snippets
to the **real** code (read the target files first; match surrounding style, imports,
and conventions). Respect repo architecture rules (e.g. `domain/` stays pure;
module-internal imports relative; shared code must not import from `@/app`). Do not
touch files the plan didn't scope without saying why.

### 5. Write / update e2e tests for the module

Cover the module's user-facing behavior end-to-end (driving the real route, not just
the pure domain). Specs live under `e2e/` (repo convention dir), named per module,
e.g. `e2e/base64.e2e.ts`.

- **This repo uses Playwright** (`playwright.config.ts`, `testDir: "./e2e"`, `test:e2e`
  script). Add a new `e2e/<module>.e2e.ts` spec, or extend the existing one for changed
  behavior, following the precedent in `e2e/base64.e2e.ts`. Assert what the plan's
  acceptance criteria call out (e.g. encode→decode round-trip, error state shows,
  persistence across reload). Run with `pnpm exec playwright test` (or `vp run test:e2e`).
- **Only if a future repo has no e2e harness at all**: do NOT silently invent config.
  Set up a minimal harness (Playwright, or Vitest browser mode — match the project),
  write the module spec, and call out in the report that you added the harness. If setup
  is non-trivial or ambiguous, stop and ask before adding dependencies.
- Keep e2e assertions behavioral and stable (roles/text/labels), not brittle DOM
  snapshots. Re-use existing unit tests for pure logic; e2e is for the wired-up flow.

### 6. Verify

Run `vp check` (format, lint, type), `vp test` (unit), and the e2e suite
(`pnpm exec playwright test` / `vp run test:e2e`). Fix failures your changes
caused. If a failure is pre-existing/unrelated, say so rather than chasing it. Quote
real output — never claim green without running it.

### 7. Simplify

Once the implementation is green, **always run `/simplify`** over the changed code.
It reviews the diff for reuse, simplification, efficiency, and altitude cleanups and
applies the fixes (quality only — it does not hunt for bugs). After it applies
changes, re-run `vp check` + `vp test` + the e2e task to confirm the cleanups didn't
break anything. If `/simplify` proposes nothing, say so.

### 8. Report

- Files changed, grouped by task.
- Which reviewer gaps were folded in, which `[MINOR]` ones remain as follow-ups.
- e2e tests added/updated (and whether an e2e harness had to be set up).
- What `/simplify` changed (or that it found nothing).
- `vp check` / `vp test` / e2e results (real output).
- Any plan open-questions still unresolved that need the user's call.
- Offer next steps (commit / open PR / address remaining follow-ups). Do not commit
  or push unless asked.

---

## Notes

- Current branch only — no branching, no commits unless the user asks.
- The plan is a guide; the codebase is the truth. When they conflict, follow the
  code and flag the divergence.
- If the plan has no `IMPLEMENT-PLAN` markers (older/hand-written), fall back to the
  Section 2 / "Implementation" heading and tell the user the markers were missing.
