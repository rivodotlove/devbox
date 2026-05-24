import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import {
  Wrench,
  Search,
  Star,
  Layers,
  Keyboard,
  Info,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORIES,
  getToolsByCategory,
  type ToolCategory,
  type ToolDefinition,
} from "@/tools/registry";

interface AppShellProps {
  children: ReactNode;
}

const ICON_RAIL_TOP = [
  { id: "tools", label: "Tools", Icon: Wrench },
  { id: "search", label: "Search", Icon: Search },
  { id: "favourites", label: "Favourites", Icon: Star },
  { id: "open-tabs", label: "Open Tabs", Icon: Layers },
];

const ICON_RAIL_BOTTOM = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard },
  { id: "info", label: "Info", Icon: Info },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <IconRail />
      <PanelGroup direction="horizontal" autoSaveId="devbox:shell-h">
        <Panel
          defaultSize={20}
          minSize={12}
          maxSize={40}
          className="border-r border-[var(--border)] bg-[var(--sidebar-bg)]"
        >
          <Sidebar />
        </Panel>
        <PanelResizeHandle className="w-px bg-[var(--border)] data-[resize-handle-state=hover]:bg-[var(--accent)]" />
        <Panel defaultSize={80}>
          <div className="flex h-full flex-col">
            <TabBar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

function IconRail() {
  return (
    <div className="flex w-14 flex-col items-center justify-between border-r border-[var(--border)] bg-[var(--sidebar-bg)] py-2">
      <div className="flex flex-col gap-1">
        {ICON_RAIL_TOP.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded text-[var(--sidebar-fg)] hover:bg-[var(--muted)] hover:text-[var(--fg)]"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {ICON_RAIL_BOTTOM.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded text-[var(--sidebar-fg)] hover:bg-[var(--muted)] hover:text-[var(--fg)]"
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}

const TOOL_LINK_BASE =
  "group flex items-center gap-3 px-4 py-1.5 text-[13px] text-[var(--sidebar-fg)] hover:bg-[var(--muted)] hover:text-[var(--fg)]";
const TOOL_LINK_ACTIVE =
  "bg-[var(--muted)] text-[var(--fg)] border-l-2 border-[var(--accent)] pl-[14px]";

function Sidebar() {
  return (
    <div className="flex h-full flex-col overflow-y-auto py-3">
      <div className="px-4 pb-3 text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-fg)]">
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
        className="flex w-full items-center gap-1 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--sidebar-fg)]/70 hover:text-[var(--fg)]"
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/15 text-[var(--accent)]">
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

function TabBar() {
  return (
    <div className="flex h-9 items-center border-b border-[var(--border)] bg-[var(--sidebar-bg)] px-2 text-xs text-[var(--sidebar-fg)]">
      No tabs open
    </div>
  );
}
