import { type ToolDefinition } from "@/shared/kernel/registry";
import { Flex, Typography } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { type MouseEvent } from "react";

import { ShellIconButton } from "./shell-icon-button";

interface TabItemProps {
  tool: ToolDefinition;
  isActive: boolean;
  onClose: (e: MouseEvent, toolId: string) => void;
}

/** One open tab in the tab bar: link to the tool plus a close affordance. */
export function TabItem({ tool, isActive, onClose }: TabItemProps) {
  const Icon = tool.icon;
  return (
    <Flex
      align="stretch"
      className={cn(
        "group relative h-full shrink-0 border-r border-border",
        isActive ? "bg-background" : "hover:bg-muted/50",
      )}
    >
      {isActive && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-primary" />
      )}
      <Flex
        asChild
        align="center"
        gap={2}
        className={cn(
          "h-full pl-3 pr-1 text-sm",
          isActive ? "text-foreground" : "text-sidebar-foreground",
        )}
      >
        <Link
          to="/tool/$toolId"
          params={{ toolId: tool.id }}
          onAuxClick={(e) => {
            if (e.button === 1) onClose(e, tool.id);
          }}
        >
          <Icon size={13} />
          <Typography variant="span" className="max-w-40 truncate">
            {tool.name}
          </Typography>
        </Link>
      </Flex>
      <ShellIconButton
        type="button"
        onClick={(e) => onClose(e, tool.id)}
        aria-label={`Close ${tool.name} tab`}
        title="Close (or middle-click)"
        className={cn(
          "mx-1.5 my-auto size-5 opacity-0 group-hover:opacity-100",
          isActive && "opacity-70",
        )}
      >
        <X data-icon="inline-start" />
      </ShellIconButton>
    </Flex>
  );
}
