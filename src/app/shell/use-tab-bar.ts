import { type MouseEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTabsStore } from "@/app/stores/use-tabs-store";
import { useActiveToolId } from "./use-active-tool-id";

/** View-model for the tab bar: tab list, active tab, and close-with-navigation. */
export function useTabBar() {
  const tabs = useTabsStore((s) => s.tabs);
  const close = useTabsStore((s) => s.close);
  const activeToolId = useActiveToolId();
  const navigate = useNavigate();

  const closeTab = (e: MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const next = close(toolId);
    if (toolId !== activeToolId) return;
    void (next
      ? navigate({ to: "/tool/$toolId", params: { toolId: next } })
      : navigate({ to: "/" }));
  };

  return { tabs, activeToolId, closeTab };
}
