import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useActiveToolId } from "@/hooks/use-active-tool-id";
import { type ToolCategory, type ToolDefinition } from "@/tools/registry";

const TOOL_LINK_BASE =
  "group flex items-center gap-3 px-4 py-1.5 text-[length:13px] text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)";
const TOOL_LINK_ACTIVE = "bg-(--muted) text-(--fg) border-l-2 border-(--accent) pl-[14px]";

interface CategorySectionProps {
  category: ToolCategory;
  tools: ToolDefinition[];
}

export function CategorySection(props: Readonly<CategorySectionProps>) {
  const { category, tools } = props;
  const [isOpen, setIsOpen] = useState(true);
  const activeToolId = useActiveToolId();
  const Chevron = isOpen ? ChevronDown : ChevronRight;
  const visibleTools = isOpen ? tools : tools.filter((t) => t.id === activeToolId);

  return (
    <div className="mt-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen((v) => !v)}
        className="h-auto w-full justify-start gap-1 px-3 py-1.5 text-[length:10px] font-medium uppercase tracking-wider text-(--sidebar-fg)/70 hover:bg-transparent hover:text-(--fg)"
      >
        <Chevron size={12} />
        <span>{category.label}</span>
      </Button>
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
