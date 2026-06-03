---
name: write-plan
description: Turn an issue (Linear, Jira, GitHub, etc.) into a two-section HTML plan — a human-readable section with current/proposed diagrams and side-by-side screenshots, plus a 100% technical implementation section for the AI agent. After writing, an Opus subagent reviews the plan for gaps. Use when the user says "write a plan", "plan this issue", "/write-plan <url>", or pastes an issue URL and asks to plan it.
argument-hint: <issue-url>
---

# write-plan

Given an issue URL (the argument), produce a single self-contained HTML plan at
`.claude/plans/<issue-id>-<slug>.html`, then have a subagent review it for gaps.

The argument is the issue URL. If no argument is given, ask the user for the URL
or for the pasted issue text before proceeding.

The HTML has **two sections**, and they have different audiences:

- **Section 1 — The Plan (human-readable).** The user spends ~90% of their time
  here. Plain language, light on jargon. MUST contain a current-state diagram, a
  proposed-state diagram, and — when the issue touches UI — a side-by-side
  screenshot comparison (current real screenshot vs. proposed).
- **Section 2 — Implementation (technical).** The AI agent focuses here; the user
  only skims. 100% technical: ordered tasks, exact files, code snippets,
  acceptance criteria, test plan.

Use the bundled `template.html` in this skill directory as the starting structure.

---

## Procedure

### 1. Resolve the issue

Parse the URL argument and detect the provider. **Prefer MCP** — WebFetch fails on
Linear/Jira because they render client-side (returns "Loading…"). Fall through the
column in order; use the first available:

| URL pattern                     | Fetch order (first available)                                                                                                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `linear.app/.../issue/<ID>/...` | 1. `mcp__linear__get_issue` with the issue id (e.g. `RIV-5`) + `mcp__linear__list_comments`. 2. If the `linear` MCP server isn't connected, tell the user to run `/mcp` to authenticate (config is in `.mcp.json`). 3. Last resort: ask the user to paste title + description. |
| `github.com/<o>/<r>/issues/<n>` | 1. `gh issue view <n> --repo <o>/<r> --json title,body,labels,number,url`. 2. `mcp__github__*` if present.                                                                                                                                                                     |
| `*.atlassian.net` (Jira)        | 1. `mcp__atlassian__getJiraIssue` if the `atlassian` MCP server is connected. 2. Tell the user to add/auth it (`https://mcp.atlassian.com/v1/sse` via `/mcp`). 3. Ask the user to paste title + description.                                                                   |
| anything else / no arg          | Ask the user to paste the issue title + description.                                                                                                                                                                                                                           |

Note: MCP issue tools are deferred — load the schema first with
`ToolSearch` (e.g. `select:mcp__linear__get_issue`) before calling. If a needed MCP
server is configured but not authenticated, calling it fails; instruct the user to
run `/mcp` rather than silently falling back.

From the issue derive:

- **issue-id** — e.g. `ENG-123`, `PROJ-45`, `gh-128`. Fallback: short hash of the URL.
- **slug** — 3-6 kebab-case words from the title.
- Filename: `.claude/plans/<issue-id>-<slug>.html`.

### 2. Understand the current state

Explore the codebase for everything the issue touches: routes, components,
stores, data flow, storage keys. Use Grep/Glob/Read. Note exact file paths — you
will cite them in Section 2 and the reviewer will verify them.

### 3. Capture the current UI (only if the issue touches UI)

If the change affects a visible screen AND the app can run:

1. Identify the affected route/page.
2. Ensure the dev server is up (`vp dev`; reuse it if already running).
3. Use the **playwright** MCP: `browser_navigate` to the route, then
   `browser_take_screenshot` saving to
   `.claude/plans/assets/<issue-id>-current-<n>.png`.
4. Reference those files in Section 1's comparison.

If there is no UI, or the app can't run, skip and write
"No current screenshot — <reason>" in the comparison block. Don't fake screenshots.

For the **proposed** side of the comparison, you can't screenshot something that
doesn't exist yet. Use ONE of, in order of preference: (a) an annotated copy of
the current screenshot with callouts, (b) a simple wireframe/mockup, (c) a clearly
labelled description box. Never present a mockup as a real screenshot.

### 4. Design the solution and build diagrams

Decide the approach. Produce two **Mermaid** diagrams (rendered client-side via
CDN in the template):

- **Current state** — how it works today (flowchart / sequence / component as fits).
- **Proposed state** — how it works after this plan.

### 5. Write the HTML

Copy `template.html`'s structure and fill it in. Requirements:

- Self-contained single file (inline CSS; Mermaid + any libs via CDN).
- Screenshots referenced by relative path into `assets/`.
- **Section 1 (Plan):** title + issue link, one-paragraph summary, problem
  statement, current vs proposed diagrams, side-by-side screenshot comparison,
  user-facing impact, risks/open questions.
- **Section 2 (Implementation):** ordered task list. Each task: title, files to
  touch (exact paths), the change, code snippets where useful, acceptance
  criteria, dependencies on other tasks. Include a task for **e2e tests** of the
  affected module (specs under `e2e/`, behavioral assertions tied to the acceptance
  criteria). End with a test/verification plan (mention `vp check`, `vp test`, and
  the e2e run).
- Visually separate the two sections (the template uses a hard divider + sticky
  section nav) so the user knows where the skimmable technical part begins.
- Mark Section 2 as the machine-consumed region so a later `/implement-plan` run can
  find it: keep the `<!-- IMPLEMENT-PLAN:BEGIN -->` / `<!-- IMPLEMENT-PLAN:END -->`
  comment markers around it, the `data-implement-plan="tasks"` attr on the
  `<h2 id="implementation">`, and the 🤖 "consumed by `/implement-plan`" banner from
  the template. `/implement-plan` reads the tasks between those markers.

### 6. Review for gaps (subagent)

Spawn ONE `plan-reviewer` subagent (defined in `.claude/agents/plan-reviewer.md` —
pinned to Opus, read-only tools, adversarial gap-finding system prompt). Pass it
only the inputs it needs:

> Plan file: `.claude/plans/<file>.html`
> Issue summary: <one paragraph + the acceptance checklist>

The agent verifies every file path / code reference / dependency against the real
codebase and returns gaps by severity ending in `VERDICT: ship | fix-first`. Do not
restate its job here — it lives in the agent definition.

### 7. Report to the user

- Print the plan path and an open hint: `open .claude/plans/<file>.html`.
- Summarize the reviewer's gaps (bulleted) and the verdict.
- Offer to apply fixes to the plan or to start implementing Section 2.

---

## Notes

- Keep Section 1 jargon-free; keep Section 2 exhaustive and exact.
- The diagrams are mandatory; the screenshot comparison is mandatory only when a UI exists.
- Prefer reusing a running dev server over spawning a new one.
