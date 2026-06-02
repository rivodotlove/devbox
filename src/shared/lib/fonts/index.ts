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
