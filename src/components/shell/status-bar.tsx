import { Keyboard, Info, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const STATUS_BAR_ITEMS = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard },
  { id: "info", label: "Info", Icon: Info },
  { id: "settings", label: "Settings", Icon: Settings },
];

export function StatusBar() {
  return (
    <div className="flex h-6 shrink-0 items-center justify-end gap-0.5 border-t border-(--border) bg-(--sidebar-bg) px-1.5">
      {STATUS_BAR_ITEMS.map(({ id, label, Icon }) => (
        <Tooltip key={id}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={label}
              className="size-5 text-(--sidebar-fg)"
            >
              <Icon size={12} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
