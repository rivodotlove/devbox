import { ChevronDown, ChevronRight } from "lucide-react";
import { type ToolCategory, type ToolDefinition } from "@/shared/kernel/registry";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible";
import { useCategorySection } from "./use-category-section";
import { SidebarToolLink } from "./sidebar-tool-link";

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
      <CollapsibleTrigger className="flex w-full items-center gap-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-(--sidebar-fg)/70 hover:text-(--fg)">
        <Chevron size={12} />
        <span>{category.label}</span>
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
