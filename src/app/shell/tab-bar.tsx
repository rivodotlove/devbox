import { PanelLeft } from "lucide-react";
import { getToolById } from "@/shared/kernel/registry";
import { useTabBar } from "./use-tab-bar";
import { TabItem } from "./tab-item";

interface TabBarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

/** Row of open tool tabs, with a sidebar-reveal button when the sidebar is collapsed. */
export function TabBar({ sidebarCollapsed, onToggleSidebar }: TabBarProps) {
  const { tabs, activeToolId, closeTab } = useTabBar();
  return (
    <div className="flex h-11 shrink-0 items-stretch border-b border-(--border) bg-(--sidebar-bg)">
      {sidebarCollapsed && (
        <button
          type="button"
          title="Show sidebar (⌘B)"
          aria-label="Show sidebar"
          onClick={onToggleSidebar}
          className="flex w-10 shrink-0 items-center justify-center border-r border-(--border) text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
        >
          <PanelLeft size={14} />
        </button>
      )}
      {tabs.length > 0 && (
        <div className="flex flex-1 items-stretch overflow-x-auto">
          {tabs.map((toolId) => {
            const tool = getToolById(toolId);
            if (!tool) return null;
            return (
              <TabItem
                key={toolId}
                tool={tool}
                isActive={toolId === activeToolId}
                onClose={closeTab}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
