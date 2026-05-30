import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_FONT, type FontId } from "@/shared/lib/fonts";
import { DEFAULT_THEME, type ThemeId } from "@/shared/lib/themes";

interface SettingsState {
  theme: ThemeId;
  font: FontId;
  fontSize: number;
  tabSize: number;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    () => ({
      theme: DEFAULT_THEME,
      font: DEFAULT_FONT,
      fontSize: 14,
      tabSize: 2,
    }),
    { name: "devbox:settings" },
  ),
);
