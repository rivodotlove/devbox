---
description: Prepare working changes and open a PR (sync main, branch, commit, push, create PR with assignees)
argument-hint: "[branch-name] [pr title...]"
allowed-tools: Bash(git status:*), Bash(git branch:*), Bash(git checkout:*), Bash(git switch:*), Bash(git pull:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git log:*), Bash(git diff:*), Bash(git stash:*), Bash(gh pr create:*), Bash(gh pr edit:*), Bash(gh pr view:*), Bash(gh api:*), Bash(gh repo view:*)
---

Open a pull request from the current working changes. Follow these steps in order. **Do not skip the safety checks.** If a step's precondition is already satisfied, say so and move on.

Arguments (optional): `$ARGUMENTS`

- First token = desired branch name. If omitted, derive a short kebab-case branch from the change summary (e.g. `fix/palette-escape`, `feat/uuid-tool`). Prefix by type: `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`.
- Remaining tokens = PR title. If omitted, write a Conventional-Commits title from the diff.

## Steps

1. **Capture current state.** Run `git status --short` and `git branch --show-current`. Note any uncommitted/untracked changes — these are what gets shipped.

2. **Sync main.**
   - If not already on `main`: `git checkout main`. Uncommitted changes carry over to the working tree; that is intended. If the checkout is blocked by a conflict, stop and report — do not force.
   - `git pull --ff-only origin main`. If it can't fast-forward, stop and report rather than merging.

3. **Create the feature branch** off the freshly pulled main: `git checkout -b <branch-name>`. If the branch already exists, switch to it (`git checkout <branch-name>`) and mention it.

4. **Stage + commit.**
   - `git add -A` (stage all working changes), then review with `git diff --cached --stat`.
   - Commit with a Conventional-Commits message (subject ≤50 chars; body only when the "why" isn't obvious).
   - **Claude attribution:** since you (Claude) are producing this commit, append the trailer:
     ```
     Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
     ```
   - If there is nothing to commit, stop and report — there is no PR to open.

5. **Push:** `git push -u origin <branch-name>`.

6. **Create the PR (not draft).**
   - Resolve the GitHub user: `gh api user -q .login`.
   - `gh pr create --base main --title "<title>" --body "<body>" --assignee <login>` where the body summarizes _what_ and _why_, plus a short verification note, ending with:
     ```
     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```
   - **Claude bot assignee (conditional):** Claude contributed if the new branch has any commit whose message contains a `Co-Authored-By: Claude` trailer — check with `git log main..HEAD --format='%b' | grep -i 'Co-Authored-By: Claude'`. If it contributed, attempt `gh pr edit <pr-number> --add-assignee 'claude[bot]'`. GitHub Apps often cannot be assignees — if the call errors (`Bot does not have access` / `Only users and bots can be assigned`) or the assignee doesn't stick, **do not fail**: report that the Claude bot is not assignable and that contribution is recorded via the `Co-Authored-By` trailer instead.
   - Verify final state: `gh pr view <pr-number> --json url,isDraft,assignees`.

## Output

Report: branch name, commit subject, PR URL, draft state (must be false), and the final assignee list. If the Claude bot couldn't be assigned, say so in one line and note the co-author trailer covers attribution.
