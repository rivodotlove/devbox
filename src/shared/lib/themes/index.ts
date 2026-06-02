export type ThemeId = "dark" | "light";

export interface Theme {
  id: ThemeId;
  label: string;
}

export const THEMES: Theme[] = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
];

export const DEFAULT_THEME: ThemeId = "dark";
