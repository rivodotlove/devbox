# devbox

Browser-based developer toolbox with a VS Code-style shell. Everything runs locally in the browser — no server, no backend

## Commands

Scripts in `package.json` wrap the Vite+ CLI (`vp`). Use `pnpm`, not raw `vp`.

```
pnpm dev          # vp dev — dev server on port 15036
pnpm build        # tsr generate (route tree) + tsc -b + vp build
pnpm check        # vp check — format + lint + type-check (run before commit)
pnpm lint         # vp lint . (type-aware oxlint)
pnpm typecheck    # tsc -b
pnpm test         # vp test — Vitest, colocated *.test.ts
pnpm test:e2e     # playwright test
```

Single unit test: `pnpm test src/modules/base64/domain/base64.test.ts` (append `-t "name"` to filter).

E2E (`e2e/*.e2e.ts`, Chromium only, `baseURL: http://localhost:15036`): the dev server must already be running — `playwright.config.ts` deliberately has no `webServer`. Start `pnpm dev` first, then `pnpm test:e2e`.

A pre-commit hook (`.vite-hooks/pre-commit`) runs `vp staged`, which runs `vp check --fix` on staged files (configured in `vite.config.ts`).

## Architecture

### Shell + tool registry

The app is a single VS Code-style shell (`src/app/shell/app-shell.tsx`): resizable sidebar, tab bar, content area, status bar, command palette, settings dialog, shortcuts cheatsheet.

Tools are declared in one place — the registry `src/shared/kernel/registry.ts` (`TOOLS` array). Each `ToolDefinition` has an `id`, `category`, `icon`, `description`, and an optional `loader` (lazy `import()` of the module barrel). A tool with no `loader` renders a placeholder — that's how unbuilt tools are stubbed in the sidebar.

Routing is TanStack Router file-based (`src/routes/`) with `autoCodeSplitting`. `tool.$toolId.tsx` looks the tool up by id, opens a tab, and `lazy()`-loads `tool.loader`. **`src/routeTree.gen.ts` is generated** (`tsr generate` / the Vite plugin) — never edit it by hand.

### Module layering (DDD-lite) — the core constraint

Each tool lives in `src/modules/<tool>/` with three layers:

- `domain/` — **pure**. No React, no app state, no storage, no other modules. Total functions that return `Result<T>` (`src/shared/kernel/result.ts`) instead of throwing. Unit-tested here.
- `ui/` — React components, a Zustand store, and a `use-<tool>` view-model hook that reads the store and runs the domain to derive output/error. Components stay presentational.
- `index.ts` — the **barrel**. Exports only the default entry component: `export { default } from "./ui/<tool>-tool";`.

Import boundaries are **lint-enforced** (`no-restricted-imports` in `vite.config.ts`):

- Outside code reaches a tool **only** through `@/modules/<tool>` (the barrel). Importing `@/modules/*/ui` or `@/modules/*/domain` is banned — including a module importing its own barrel; within a module use relative paths (`./ui`, `../domain`).
- `**/domain/**` may not import React, `@/app`, storage, or other modules — keeps it pure and testable.

### State & persistence

Zustand stores with the `persist` middleware. Two storage backends, by intent:

- **Tool input/output → IndexedDB**, via the `idbStorage` adapter (`src/shared/lib/storage/idb-zustand.ts`). The persist `name` **must be the tool id** (it's the IDB key). See `src/modules/base64/ui/store.ts`.
- **Shell/UI state → localStorage** (default persist storage): tabs (`devbox:tabs`), settings (`devbox:settings`), favourites, shell. Always `partialize` to persist data only, never action functions.

### Theming & editor

- Themes (`dark`/`light`) and monospace fonts are settings-store values. `settings-effects.ts` syncs them to the DOM: `data-theme` attribute + `--font-mono` CSS var, lazy-loading fonts on demand. Call once at startup; it's idempotent (StrictMode-safe).
- `src/shared/ui/code-editor.tsx` wraps CodeMirror 6. Editor colours come from CSS vars (`--cm-*`, `--color-*`) per `[data-theme]` in `src/index.css`, so highlighting follows the theme without reconfiguring the editor. `shared/ui` must not read app state — `fontSize`/`tabSize` are passed in by the caller.

## Conventions

- Path alias `@/*` → `src/*` (set in `vite.config.ts` and `tsconfig.app.json`).
- shadcn/ui (`components.json`, style `radix-nova`); shared primitives in `src/shared/ui/`, `cn()` helper in `src/shared/utils.ts`, icons from `lucide-react`. Tailwind CSS v4 (`@tailwindcss/vite`, config in `src/index.css`).
- `verbatimModuleSyntax` + `moduleDetection: force` — use `import type` for type-only imports.
- Keyboard shortcuts are centralized in `src/shared/lib/hotkeys.ts` (`HOTKEYS`); wired via `react-hotkeys-hook`.

### Adding a tool

1. Add (or fill in the `loader` of) the entry in `TOOLS` (`src/shared/kernel/registry.ts`).
2. Create `src/modules/<tool>/` with `domain/` (pure, `Result`-returning), `ui/` (store + `use-<tool>` hook + component), and `index.ts` barrel.
3. Persist tool IO via `idbStorage` with persist `name === <tool id>`.
