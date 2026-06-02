import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ShellState {
  paletteOpen: boolean;
  cheatsheetOpen: boolean;
  settingsOpen: boolean;
  sidebarCollapsed: boolean;
  openPalette: () => void;
  closePalette: () => void;
  openCheatsheet: () => void;
  closeCheatsheet: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useShellStore = create<ShellState>()(
  persist(
    (set) => ({
      paletteOpen: false,
      cheatsheetOpen: false,
      settingsOpen: false,
      sidebarCollapsed: false,
      openPalette: () => set({ paletteOpen: true }),
      closePalette: () => set({ paletteOpen: false }),
      openCheatsheet: () => set({ cheatsheetOpen: true }),
      closeCheatsheet: () => set({ cheatsheetOpen: false }),
      openSettings: () => set({ settingsOpen: true }),
      closeSettings: () => set({ settingsOpen: false }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: "devbox:shell",
      // only persist sidebarCollapsed — palette/cheatsheet open state is transient
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    },
  ),
);
