import { Link } from "@tanstack/react-router";
import { type ToolDefinition } from "@/shared/kernel/registry";
import { cn } from "@/shared/utils";

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
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-(--accent)/15 text-(--accent)">
        <Icon size={14} />
      </span>
      <span className="truncate">{tool.name}</span>
    </Link>
  );
}
