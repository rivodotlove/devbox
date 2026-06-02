import { type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type ToolDefinition } from "@/shared/kernel/registry";
import { cn } from "@/shared/utils";

interface TabItemProps {
  tool: ToolDefinition;
  isActive: boolean;
  onClose: (e: MouseEvent, toolId: string) => void;
}

/** One open tab in the tab bar: link to the tool plus a close affordance. */
export function TabItem({ tool, isActive, onClose }: TabItemProps) {
  const Icon = tool.icon;
  return (
    <div
      className={cn(
        "group relative flex h-full shrink-0 items-stretch border-r border-(--border)",
        isActive ? "bg-(--bg)" : "hover:bg-(--muted)/50",
      )}
    >
      {isActive && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-(--accent)" />
      )}
      <Link
        to="/tool/$toolId"
        params={{ toolId: tool.id }}
        onAuxClick={(e) => {
          if (e.button === 1) onClose(e, tool.id);
        }}
        className={cn(
          "flex h-full items-center gap-2 pl-3 pr-1 text-sm",
          isActive ? "text-(--fg)" : "text-(--sidebar-fg)",
        )}
      >
        <Icon size={13} />
        <span className="max-w-40 truncate">{tool.name}</span>
      </Link>
      <button
        type="button"
        onClick={(e) => onClose(e, tool.id)}
        aria-label={`Close ${tool.name} tab`}
        title="Close (or middle-click)"
        className={cn(
          "mx-1.5 my-auto flex h-5 w-5 items-center justify-center rounded text-(--sidebar-fg) opacity-0 hover:bg-(--muted) hover:text-(--fg) group-hover:opacity-100",
          isActive && "opacity-70",
        )}
      >
        <X size={12} />
      </button>
    </div>
  );
}
