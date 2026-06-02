import { useState, useCallback, useRef, type MouseEvent, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { useHotkeys } from "react-hotkeys-hook";
import { Keyboard, Info, Settings, ChevronDown, ChevronRight, X, PanelLeft } from "lucide-react";
import { cn } from "@/shared/utils";
import { useTabsStore } from "@/app/stores/use-tabs-store";
import { useShellStore } from "@/app/stores/use-shell-store";
import {
  CATEGORIES,
  getToolById,
  getToolsByCategory,
  type ToolCategory,
  type ToolDefinition,
} from "@/shared/kernel/registry";
import { HOTKEYS } from "@/shared/lib/hotkeys";
import { CommandPalette } from "./command-palette";
import { ShortcutsCheatsheet } from "./shortcuts-cheatsheet";

interface AppShellProps {
  children: ReactNode;
}

const STATUS_BAR_ITEMS = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard },
  { id: "info", label: "Info", Icon: Info },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function AppShell({ children }: AppShellProps) {
  const {
    paletteOpen,
    cheatsheetOpen,
    sidebarCollapsed,
    openPalette,
    closePalette,
    openCheatsheet,
    closeCheatsheet,
    setSidebarCollapsed,
  } = useShellStore();

  const sidebarRef = useRef<ImperativePanelHandle>(null);

  const toggleSidebar = useCallback(() => {
    const panel = sidebarRef.current;
    if (!panel) return;
    if (panel.isCollapsed()) {
      panel.expand();
    } else {
      panel.collapse();
    }
  }, []);

  const tabs = useTabsStore((s) => s.tabs);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeMatch = /^\/tool\/([^/]+)\/?$/.exec(pathname);
  const activeToolId = activeMatch?.[1];

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
  useHotkeys(HOTKEYS.closeTab.command, (e) => {
    e.preventDefault();
    if (!activeToolId) return;
    const next = useTabsStore.getState().close(activeToolId);
    if (next) {
      void navigate({ to: "/tool/$toolId", params: { toolId: next } });
    } else {
      void navigate({ to: "/" });
    }
  });
  useHotkeys(HOTKEYS.nextTab.command, (e) => {
    e.preventDefault();
    if (!tabs.length) return;
    const idx = activeToolId ? tabs.indexOf(activeToolId) : -1;
    const next = tabs[(idx + 1) % tabs.length];
    if (next) void navigate({ to: "/tool/$toolId", params: { toolId: next } });
  });
  useHotkeys(HOTKEYS.prevTab.command, (e) => {
    e.preventDefault();
    if (!tabs.length) return;
    const idx = activeToolId ? tabs.indexOf(activeToolId) : 0;
    const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
    if (prev) void navigate({ to: "/tool/$toolId", params: { toolId: prev } });
  });

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

const TOOL_LINK_BASE =
  "group flex items-center gap-3 px-4 py-1.5 text-[length:13px] text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)";
const TOOL_LINK_ACTIVE = "bg-(--muted) text-(--fg) border-l-2 border-(--accent) pl-[14px]";

function Sidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto py-3">
      <div className="px-4 pb-3 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)">
        Tools
      </div>
      {CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id);
        if (tools.length === 0) return null;
        return <CategorySection key={category.id} category={category} tools={tools} />;
      })}
    </div>
  );
}

function useActiveToolId(): string | undefined {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const match = /^\/tool\/([^/]+)\/?$/.exec(pathname);
  return match?.[1];
}

function CategorySection({ category, tools }: { category: ToolCategory; tools: ToolDefinition[] }) {
  const [isOpen, setIsOpen] = useState(true);
  const activeToolId = useActiveToolId();
  const Chevron = isOpen ? ChevronDown : ChevronRight;
  const visibleTools = isOpen ? tools : tools.filter((t) => t.id === activeToolId);
  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center gap-1 px-3 py-1.5 text-[length:10px] font-medium uppercase tracking-wider text-(--sidebar-fg)/70 hover:text-(--fg)"
      >
        <Chevron size={12} />
        <span>{category.label}</span>
      </button>
      {visibleTools.length > 0 && (
        <ul className="py-0.5">
          {visibleTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.id}>
                <Link
                  to="/tool/$toolId"
                  params={{ toolId: tool.id }}
                  title={tool.description}
                  className={TOOL_LINK_BASE}
                  activeProps={{
                    className: cn(TOOL_LINK_BASE, TOOL_LINK_ACTIVE),
                  }}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-(--accent)/15 text-(--accent)">
                    <Icon size={14} />
                  </span>
                  <span className="truncate">{tool.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function TabBar({
  sidebarCollapsed,
  onToggleSidebar,
}: {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const tabs = useTabsStore((s) => s.tabs);
  const close = useTabsStore((s) => s.close);
  const activeToolId = useActiveToolId();
  const navigate = useNavigate();

  const handleClose = (e: MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const next = close(toolId);
    if (toolId !== activeToolId) return;
    if (next) {
      void navigate({ to: "/tool/$toolId", params: { toolId: next } });
    } else {
      void navigate({ to: "/" });
    }
  };

  return (
    <div className="flex h-11 shrink-0 items-stretch border-b border-(--border) bg-(--sidebar-bg)">
      {sidebarCollapsed && (
        <button
          type="button"
          title="Show sidebar (⌘B)"
          onClick={onToggleSidebar}
          className="flex w-10 shrink-0 items-center justify-center border-r border-(--border) text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
        >
          <PanelLeft size={14} />
        </button>
      )}
      {tabs.length === 0 ? null : (
        <div className="flex flex-1 items-stretch overflow-x-auto">
          {tabs.map((toolId) => {
            const tool = getToolById(toolId);
            if (!tool) return null;
            const Icon = tool.icon;
            const isActive = toolId === activeToolId;
            return (
              <div
                key={toolId}
                className={cn(
                  "group relative flex h-full shrink-0 items-stretch border-r border-(--border)",
                  isActive ? "bg-(--bg)" : "hover:bg-(--muted)/50",
                )}
              >
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-(--accent)" />
                )}
                <Link
                  to="/tool/$toolId"
                  params={{ toolId }}
                  onAuxClick={(e) => {
                    if (e.button === 1) handleClose(e, toolId);
                  }}
                  className={cn(
                    "flex h-full items-center gap-2 pl-3 pr-1 text-[13px]",
                    isActive ? "text-(--fg)" : "text-(--sidebar-fg)",
                  )}
                >
                  <Icon size={13} />
                  <span className="max-w-40 truncate">{tool.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={(e) => handleClose(e, toolId)}
                  aria-label={`Close ${tool.name} tab`}
                  title="Close (or middle-click)"
                  className={cn(
                    "mx-1.5 my-auto flex h-5 w-5 items-center justify-center rounded text-(--sidebar-fg) opacity-0 hover:bg-(--muted) hover:text-(--fg) group-hover:opacity-100",
                    isActive && "opacity-70",
                  )}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusBar({ onShortcuts }: { onShortcuts: () => void }) {
  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-0.5 border-t border-(--border) bg-(--sidebar-bg) px-1.5">
      {STATUS_BAR_ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          title={label}
          aria-label={label}
          onClick={id === "shortcuts" ? onShortcuts : undefined}
          className="flex h-5 w-5 items-center justify-center rounded text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
        >
          <Icon size={12} />
        </button>
      ))}
    </div>
  );
}
