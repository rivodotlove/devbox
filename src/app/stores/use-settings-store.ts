import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_FONT, type FontId } from "@/shared/lib/fonts";
import { DEFAULT_THEME, type ThemeId } from "@/shared/lib/themes";

interface SettingsState {
  theme: ThemeId;
  font: FontId;
  fontSize: number;
  tabSize: number;
  setTheme: (theme: ThemeId) => void;
  setFont: (font: FontId) => void;
  setFontSize: (fontSize: number) => void;
  setTabSize: (tabSize: number) => void;
  reset: () => void;
}

export const SETTINGS_DEFAULTS = {
  theme: DEFAULT_THEME,
  font: DEFAULT_FONT,
  fontSize: 14,
  tabSize: 2,
} as const satisfies Pick<SettingsState, "theme" | "font" | "fontSize" | "tabSize">;

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...SETTINGS_DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setFont: (font) => set({ font }),
      setFontSize: (fontSize) => set({ fontSize }),
      setTabSize: (tabSize) => set({ tabSize }),
      reset: () => set({ ...SETTINGS_DEFAULTS }),
    }),
    {
      name: "devbox:settings",
      partialize: ({ theme, font, fontSize, tabSize }) => ({ theme, font, fontSize, tabSize }),
    },
  ),
);
