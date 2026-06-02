import { Button } from "@/shared/ui";
import { cn } from "@/shared/utils";

interface Base64ModeButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: string;
}

export function Base64ModeButton({ isActive, onClick, children }: Base64ModeButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      aria-pressed={isActive}
      onClick={onClick}
      className={cn(
        "rounded-none px-3 text-xs font-medium",
        isActive
          ? "bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary"
          : "text-sidebar-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </Button>
  );
}
