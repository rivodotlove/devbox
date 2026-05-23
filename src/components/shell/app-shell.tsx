import { type ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Wrench, Search, Star, Layers, Keyboard, Info, Settings } from "lucide-react";

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

function Sidebar() {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="text-xs uppercase tracking-wider text-[var(--sidebar-fg)]">Tools</div>
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
