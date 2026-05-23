import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Tab {
  toolId: string;
}

interface TabsState {
  tabs: Tab[];
  activeToolId: string | null;
}

export const useTabsStore = create<TabsState>()(
  persist(
    (): TabsState => ({
      tabs: [],
      activeToolId: null,
    }),
    { name: "devbox:tabs" },
  ),
);
