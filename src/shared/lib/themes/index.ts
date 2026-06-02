export type ThemeId = "dark" | "light" | "dracula" | "tokyo-night" | "catppuccin" | "nord";

export interface Theme {
  id: ThemeId;
  label: string;
}

export const THEMES: Theme[] = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "dracula", label: "Dracula" },
  { id: "tokyo-night", label: "Tokyo Night" },
  { id: "catppuccin", label: "Catppuccin" },
  { id: "nord", label: "Nord" },
];

export const DEFAULT_THEME: ThemeId = "dark";
