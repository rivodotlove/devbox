import { HOTKEYS } from "@/shared/lib/hotkeys";
import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";

import { useShellStore } from "../stores/use-shell-store";
import { useTabsStore } from "../stores/use-tabs-store";

import { useActiveToolId } from "./use-active-tool-id";

interface ShellShortcutsOptions {
  toggleSidebar: () => void;
}

/**
 * Registers all global shell hotkeys (palette, sidebar, cheatsheet, tab
 * close/cycle) and owns the routing side effects they trigger. Keeps the shell
 * component free of imperative logic.
 */
export function useShellShortcuts({ toggleSidebar }: ShellShortcutsOptions): void {
  const navigate = useNavigate();
  const { tabs } = useTabsStore();
  const activeToolId = useActiveToolId();
  const { openPalette, openCheatsheet, openSettings } = useShellStore();

  const goToTool = (toolId: string) => navigate({ to: "/tool/$toolId", params: { toolId } });

  useHotkeys(
    HOTKEYS.palette.command,
    (e) => {
      e.preventDefault();
      openPalette();
    },
    { enableOnFormTags: false },
  );

  useHotkeys(HOTKEYS.sidebar.command, (e) => {
    e.preventDefault();
    toggleSidebar();
  });

  useHotkeys(HOTKEYS.cheatsheet.command, () => openCheatsheet());

  useHotkeys(HOTKEYS.settings.command, (e) => {
    e.preventDefault();
    openSettings();
  });

  useHotkeys(HOTKEYS.closeTab.command, (e) => {
    e.preventDefault();
    if (!activeToolId) return;
    const next = useTabsStore.getState().close(activeToolId);
    void (next ? goToTool(next) : navigate({ to: "/" }));
  });

  useHotkeys(HOTKEYS.nextTab.command, (e) => {
    e.preventDefault();
    if (!tabs.length) return;
    const idx = activeToolId ? tabs.indexOf(activeToolId) : -1;
    const next = tabs[(idx + 1) % tabs.length];
    if (next) void goToTool(next);
  });

  useHotkeys(HOTKEYS.prevTab.command, (e) => {
    e.preventDefault();
    if (!tabs.length) return;
    const idx = activeToolId ? tabs.indexOf(activeToolId) : 0;
    const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
    if (prev) void goToTool(prev);
  });
}
