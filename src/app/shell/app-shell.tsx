import { Box, Flex } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { useCallback, useRef, type ReactNode } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";

import { useShellStore } from "../stores/use-shell-store";

import { CommandPalette } from "./command-palette";
import { ShortcutsCheatsheet } from "./shortcuts-cheatsheet";
import { Sidebar } from "./sidebar";
import { StatusBar } from "./status-bar";
import { TabBar } from "./tab-bar";
import { useShellShortcuts } from "./use-shell-shortcuts";

interface AppShellProps {
  children: ReactNode;
}

/** VS Code-style shell: resizable sidebar, tab bar, content area, status bar. */
export function AppShell({ children }: AppShellProps) {
  const paletteOpen = useShellStore((s) => s.paletteOpen);
  const cheatsheetOpen = useShellStore((s) => s.cheatsheetOpen);
  const sidebarCollapsed = useShellStore((s) => s.sidebarCollapsed);
  const closePalette = useShellStore((s) => s.closePalette);
  const openCheatsheet = useShellStore((s) => s.openCheatsheet);
  const closeCheatsheet = useShellStore((s) => s.closeCheatsheet);
  const setSidebarCollapsed = useShellStore((s) => s.setSidebarCollapsed);

  const sidebarRef = useRef<ImperativePanelHandle>(null);
  const toggleSidebar = useCallback(() => {
    const panel = sidebarRef.current;
    if (!panel) return;
    if (panel.isCollapsed()) panel.expand();
    else panel.collapse();
  }, []);

  useShellShortcuts({ toggleSidebar });

  return (
    <Flex direction="col" className="h-screen w-screen overflow-hidden">
      <Flex className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" autoSaveId="devbox:shell-h">
          <Panel
            ref={sidebarRef}
            defaultSize={20}
            minSize={12}
            maxSize={40}
            collapsible
            collapsedSize={0}
            onCollapse={() => setSidebarCollapsed(true)}
            onExpand={() => setSidebarCollapsed(false)}
            className="border-r border-(--border) bg-(--sidebar-bg)"
          >
            <Sidebar />
          </Panel>
          <PanelResizeHandle
            className={cn(
              "w-px bg-(--border) data-[resize-handle-state=hover]:bg-(--accent)",
              sidebarCollapsed && "hidden",
            )}
          />
          <Panel defaultSize={80}>
            <Flex direction="col" className="h-full">
              <TabBar sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
              <Box className="flex-1 overflow-auto">{children}</Box>
            </Flex>
          </Panel>
        </PanelGroup>
      </Flex>
      <StatusBar onShortcuts={openCheatsheet} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <ShortcutsCheatsheet open={cheatsheetOpen} onClose={closeCheatsheet} />
    </Flex>
  );
}
