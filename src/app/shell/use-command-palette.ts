import { useNavigate } from "@tanstack/react-router";

import { useTabsStore } from "../stores/use-tabs-store";

/** Command-palette actions: open the chosen tool as a tab, route to it, then close. */
export function useCommandPalette(onClose: () => void) {
  const navigate = useNavigate();
  const openTab = useTabsStore((s) => s.open);

  const selectTool = (toolId: string) => {
    openTab(toolId);
    void navigate({ to: "/tool/$toolId", params: { toolId } });
    onClose();
  };

  return { selectTool };
}
