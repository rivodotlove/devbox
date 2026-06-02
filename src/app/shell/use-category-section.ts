import { useState } from "react";
import { type ToolDefinition } from "@/shared/kernel/registry";
import { useActiveToolId } from "./use-active-tool-id";

/**
 * View-model for a sidebar category: open/closed state plus, when collapsed, the
 * active tool to keep visible ("peek") so the current route stays reachable.
 */
export function useCategorySection(tools: ToolDefinition[]) {
  const [isOpen, setIsOpen] = useState(true);
  const activeToolId = useActiveToolId();
  const toggle = () => setIsOpen((v) => !v);
  const peekedTool = isOpen ? undefined : tools.find((t) => t.id === activeToolId);
  return { isOpen, toggle, peekedTool };
}
