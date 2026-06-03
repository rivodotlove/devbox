# devbox

A browser-based developer toolbox with a VS Code-style shell. Run it once, dock it in a tab, and stop hunting for ten different single-purpose tool sites.

All processing happens locally in your browser — no server, no database. Tool input/output persists in IndexedDB; preferences and open tabs persist in localStorage.

## Tools

- **Encoding:** Base64, URL Encoder/Decoder
- **Security:** JWT Decoder, Hash Generator (MD5, SHA-1, SHA-256, SHA-384, SHA-512)
- **Generation:** UUID Generator (v4, v7)
- **Formatting:** JSON Formatter, Markdown Previewer, Timestamp Converter
- **Design:** Color Picker / Converter (HEX, RGB, HSL, HSB)
- **Text:** Lorem Ipsum Generator

## Stack

React 19, TypeScript, Vite+, TanStack Router, Zustand, Tailwind CSS v4, shadcn/ui, CodeMirror 6. Deployed as a static SPA to Cloudflare.

## Develop

Scripts wrap the [Vite+](https://vite.plus/) CLI (`vp`) — use `pnpm`, not raw `vp`.

```bash
pnpm install
pnpm dev          # dev server on http://localhost:15036
pnpm build        # generate route tree + type-check + production build
pnpm check        # format + lint + type-check (run before commit)
pnpm test         # unit tests (Vitest)
pnpm test:e2e     # Playwright e2e — start `pnpm dev` first (no auto-spawned server)
```

See [CLAUDE.md](./CLAUDE.md) for architecture: the tool registry, the pure-`domain`/`ui`/barrel module layering, and the IndexedDB vs. localStorage persistence split.

## License

MIT
