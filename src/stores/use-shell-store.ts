import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShellState {
  paletteOpen: boolean;
  cheatsheetOpen: boolean;
  sidebarCollapsed: boolean;
  openPalette: () => void;
  closePalette: () => void;
  openCheatsheet: () => void;
  closeCheatsheet: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set) => ({
      paletteOpen: false,
      cheatsheetOpen: false,
      sidebarCollapsed: false,
      openPalette: () => set({ paletteOpen: true }),
      closePalette: () => set({ paletteOpen: false }),
      openCheatsheet: () => set({ cheatsheetOpen: true }),
      closeCheatsheet: () => set({ cheatsheetOpen: false }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: "devbox:shell",
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    },
  ),
);
