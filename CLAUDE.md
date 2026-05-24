<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# devbox-specific notes

- **App:** browser-only developer toolbox with a VS Code-style shell. No backend — everything is client-side.
- **Stack:** React 19 + TypeScript + Vite+ + TanStack Router (file-based) + Zustand + Tailwind v4 + shadcn/ui + CodeMirror 6.
- **Storage:** `localStorage` for settings/tabs/favourites (keys are `devbox:*`); IndexedDB via `idb` for per-tool input/output.
- **Routes:** file-based under `src/routes/`. Route tree auto-generated at `src/routeTree.gen.ts` (gitignored).
- **Themes:** swap via `<html data-theme="...">`. Registered themes live in `src/lib/themes/`.
- **Fonts:** registered in `src/lib/fonts/`. Only JetBrains Mono is bundled by default; others lazy-loaded.
- **Deploy:** Cloudflare Workers Static Assets via `wrangler deploy`. SPA fallback is configured by `not_found_handling = "single-page-application"` in `wrangler.toml`.
