import { type ToolDefinition } from "@/shared/kernel";
import { Flex, Typography } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";

const BASE =
  "group flex items-center gap-3 px-4 py-1.5 text-sm text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)";
const ACTIVE = "bg-(--muted) text-(--fg) border-l-2 border-(--accent) pl-3.5";

/** A single tool entry in the sidebar, with active-route styling. */
export function SidebarToolLink({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;
  return (
    <Link
      to="/tool/$toolId"
      params={{ toolId: tool.id }}
      title={tool.description}
      className={BASE}
      activeProps={{ className: cn(BASE, ACTIVE) }}
    >
      <Flex
        align="center"
        justify="center"
        className="h-7 w-7 shrink-0 rounded-md bg-(--accent)/15 text-(--accent)"
      >
        <Icon size={14} />
      </Flex>
      <Typography variant="span" className="truncate">
        {tool.name}
      </Typography>
    </Link>
  );
}
