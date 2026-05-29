import { useState, type MouseEvent, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Keyboard, Info, Settings, ChevronDown, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTabsStore } from "@/stores/use-tabs-store";
import {
  CATEGORIES,
  getToolById,
  getToolsByCategory,
  type ToolCategory,
  type ToolDefinition,
} from "@/tools/registry";

interface AppShellProps {
  children: ReactNode;
}

const STATUS_BAR_ITEMS = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard },
  { id: "info", label: "Info", Icon: Info },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <PanelGroup direction="horizontal" autoSaveId="devbox:shell-h">
          <Panel
            defaultSize={20}
            minSize={12}
            maxSize={40}
            className="border-r border-(--border) bg-(--sidebar-bg)"
          >
            <Sidebar />
          </Panel>
          <PanelResizeHandle className="w-px bg-(--border) data-[resize-handle-state=hover]:bg-(--accent)" />
          <Panel defaultSize={80}>
            <div className="flex h-full flex-col">
              <TabBar />
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
      <StatusBar />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-0.5 border-t border-(--border) bg-(--sidebar-bg) px-1.5">
      {STATUS_BAR_ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          title={label}
          aria-label={label}
          className="flex h-5 w-5 items-center justify-center rounded text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
        >
          <Icon size={12} />
        </button>
      ))}
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

function TabBar() {
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

  if (tabs.length === 0) {
    return <div className="h-11 border-b border-(--border) bg-(--sidebar-bg)" />;
  }

  return (
    <div className="flex h-12 items-stretch overflow-x-auto border-b border-(--border) bg-(--sidebar-bg)">
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
  );
}
