import { type MouseEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTabsStore } from "@/stores/use-tabs-store";
import { useActiveToolId } from "@/hooks/use-active-tool-id";
import { getToolById } from "@/tools/registry";

export function TabBar() {
  const tabs = useTabsStore((s) => s.tabs);
  const close = useTabsStore((s) => s.close);
  const activeToolId = useActiveToolId();
  const navigate = useNavigate();

  const handleClose = (e: MouseEvent, toolId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const next = close(toolId);
    if (toolId !== activeToolId) return;
    if (next) {
      void navigate({ to: "/tool/$toolId", params: { toolId: next } });
    } else {
      void navigate({ to: "/" });
    }
  };

  if (tabs.length === 0) {
    return <div className="h-11 border-b border-(--border) bg-(--sidebar-bg)" />;
  }

  return (
    <div className="flex h-12 items-stretch overflow-x-auto border-b border-(--border) bg-(--sidebar-bg)">
      {tabs.map((toolId) => {
        const tool = getToolById(toolId);
        if (!tool) return null;
        const Icon = tool.icon;
        const isActive = toolId === activeToolId;
        return (
          <div
            key={toolId}
            className={cn(
              "group relative flex h-full shrink-0 items-stretch border-r border-(--border)",
              isActive ? "bg-(--bg)" : "hover:bg-(--muted)/50",
            )}
          >
            {isActive && (
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-(--accent)" />
            )}
            <Link
              to="/tool/$toolId"
              params={{ toolId }}
              onAuxClick={(e) => {
                if (e.button === 1) handleClose(e, toolId);
              }}
              className={cn(
                "flex h-full items-center gap-2 pl-3 pr-1 text-[13px]",
                isActive ? "text-(--fg)" : "text-(--sidebar-fg)",
              )}
            >
              <Icon size={13} />
              <span className="max-w-40 truncate">{tool.name}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={(e) => handleClose(e, toolId)}
              aria-label={`Close ${tool.name} tab`}
              title="Close (or middle-click)"
              className={cn(
                "mx-1.5 my-auto size-5 text-(--sidebar-fg) opacity-0 group-hover:opacity-100",
                isActive && "opacity-70",
              )}
            >
              <X size={12} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
