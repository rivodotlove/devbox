export type FontId =
  | "jetbrains-mono"
  | "fira-code"
  | "cascadia-code"
  | "ibm-plex-mono"
  | "geist-mono";

export interface Font {
  id: FontId;
  label: string;
  cssFamily: string;
}

export const FONTS: Font[] = [
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    cssFamily: "'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace",
  },
  {
    id: "fira-code",
    label: "Fira Code",
    cssFamily: "'Fira Code', ui-monospace, Menlo, Consolas, monospace",
  },
  {
    id: "cascadia-code",
    label: "Cascadia Code",
    cssFamily: "'Cascadia Code', ui-monospace, Menlo, Consolas, monospace",
  },
  {
    id: "ibm-plex-mono",
    label: "IBM Plex Mono",
    cssFamily: "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace",
  },
  {
    id: "geist-mono",
    label: "Geist Mono",
    cssFamily: "'Geist Mono', ui-monospace, Menlo, Consolas, monospace",
  },
];

export const DEFAULT_FONT: FontId = "jetbrains-mono";

/**
 * Lazy font loaders. JetBrains Mono is eagerly bundled in `main.tsx`; the rest
 * are dynamically imported on first selection so their woff payloads stay out of
 * the initial bundle. Each loader pulls weights 400/500/700 to match the UI.
 */
const FONT_LOADERS: Record<FontId, () => Promise<unknown>> = {
  "jetbrains-mono": () => Promise.resolve(),
  "fira-code": () =>
    Promise.all([
      import("@fontsource/fira-code/400.css"),
      import("@fontsource/fira-code/500.css"),
      import("@fontsource/fira-code/700.css"),
    ]),
  "cascadia-code": () =>
    Promise.all([
      import("@fontsource/cascadia-code/400.css"),
      import("@fontsource/cascadia-code/500.css"),
      import("@fontsource/cascadia-code/700.css"),
    ]),
  "ibm-plex-mono": () =>
    Promise.all([
      import("@fontsource/ibm-plex-mono/400.css"),
      import("@fontsource/ibm-plex-mono/500.css"),
      import("@fontsource/ibm-plex-mono/700.css"),
    ]),
  "geist-mono": () =>
    Promise.all([
      import("@fontsource/geist-mono/400.css"),
      import("@fontsource/geist-mono/500.css"),
      import("@fontsource/geist-mono/700.css"),
    ]),
};

const loaded = new Set<FontId>(["jetbrains-mono"]);

/** Dynamically loads a font's stylesheet once. Idempotent. */
export async function loadFont(id: FontId): Promise<void> {
  if (loaded.has(id)) return;
  await FONT_LOADERS[id]();
  loaded.add(id);
}

/** Looks up a registered font by id, falling back to the default. */
export function getFont(id: FontId): Font {
  return FONTS.find((f) => f.id === id) ?? FONTS[0];
}
