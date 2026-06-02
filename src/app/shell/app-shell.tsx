import { useCallback, useRef, type ReactNode } from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { cn } from "@/shared/utils";
import { useShellStore } from "@/app/stores/use-shell-store";
import { CommandPalette } from "./command-palette";
import { ShortcutsCheatsheet } from "./shortcuts-cheatsheet";
import { Sidebar } from "./sidebar";
import { TabBar } from "./tab-bar";
import { StatusBar } from "./status-bar";
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
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
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
            <div className="flex h-full flex-col">
              <TabBar sidebarCollapsed={sidebarCollapsed} onToggleSidebar={toggleSidebar} />
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar onShortcuts={openCheatsheet} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      <ShortcutsCheatsheet open={cheatsheetOpen} onClose={closeCheatsheet} />
    </div>
  );
}
