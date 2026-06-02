import { getToolById } from "@/shared/kernel/registry";
import { Flex } from "@/shared/ui";
import { PanelLeft } from "lucide-react";

import { ShellIconButton } from "./shell-icon-button";
import { TabItem } from "./tab-item";
import { useTabBar } from "./use-tab-bar";

interface TabBarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

/** Row of open tool tabs, with a sidebar-reveal button when the sidebar is collapsed. */
export function TabBar({ sidebarCollapsed, onToggleSidebar }: TabBarProps) {
  const { tabs, activeToolId, closeTab } = useTabBar();
  return (
    <Flex align="stretch" className="h-11 shrink-0 border-b border-(--border) bg-(--sidebar-bg)">
      {sidebarCollapsed && (
        <ShellIconButton
          type="button"
          title="Show sidebar (⌘B)"
          aria-label="Show sidebar"
          onClick={onToggleSidebar}
          className="h-full w-10 shrink-0 rounded-none border-r border-(--border)"
        >
          <PanelLeft data-icon="inline-start" />
        </ShellIconButton>
      )}
      {tabs.length > 0 && (
        <Flex align="stretch" className="flex-1 overflow-x-auto">
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
        </Flex>
      )}
    </Flex>
  );
}
