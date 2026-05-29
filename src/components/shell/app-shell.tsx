import { type ReactNode } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Sidebar } from "./sidebar";
import { TabBar } from "./tab-bar";
import { StatusBar } from "./status-bar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell(props: Readonly<AppShellProps>) {
  const { children } = props;

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
