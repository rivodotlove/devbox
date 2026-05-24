import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TabsState {
  tabs: string[];
  open: (toolId: string) => void;
  close: (toolId: string) => string | null;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (set, get) => ({
      tabs: [],
      open: (toolId) =>
        set((state) => (state.tabs.includes(toolId) ? state : { tabs: [...state.tabs, toolId] })),
      close: (toolId) => {
        const { tabs } = get();
        const index = tabs.indexOf(toolId);
        if (index === -1) return null;
        const nextTabs = tabs.filter((id) => id !== toolId);
        set({ tabs: nextTabs });
        return nextTabs[index] ?? nextTabs[index - 1] ?? null;
      },
    }),
    {
      name: "devbox:tabs",
      partialize: (state) => ({ tabs: state.tabs }),
    },
  ),
);
