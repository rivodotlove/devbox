import type { ToolCategory, ToolDefinition } from "@/shared/kernel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Typography } from "@/shared/ui";
import { ChevronDown, ChevronRight } from "lucide-react";

import { SidebarToolLink } from "./sidebar-tool-link";
import { useCategorySection } from "./use-category-section";

interface CategorySectionProps {
  category: ToolCategory;
  tools: ToolDefinition[];
}

/**
 * Collapsible group of tool links for one category. When collapsed, the active
 * tool (if in this category) stays visible so the current route is reachable.
 */
export function CategorySection({ category, tools }: CategorySectionProps) {
  const { isOpen, toggle, peekedTool } = useCategorySection(tools);
  const Chevron = isOpen ? ChevronDown : ChevronRight;
  return (
    <Collapsible open={isOpen} onOpenChange={toggle} className="mt-1">
      <CollapsibleTrigger className="flex w-full items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/70 hover:text-foreground">
        <Chevron size={12} />
        <Typography variant="span">{category.label}</Typography>
      </CollapsibleTrigger>
      <CollapsibleContent asChild>
        <ul className="py-0.5">
          {tools.map((tool) => (
            <li key={tool.id}>
              <SidebarToolLink tool={tool} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
      {peekedTool && (
        <ul className="py-0.5">
          <li>
            <SidebarToolLink tool={peekedTool} />
          </li>
        </ul>
      )}
    </Collapsible>
  );
}
