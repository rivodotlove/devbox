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
          ? "bg-(--accent)/15 text-(--accent) hover:bg-(--accent)/15 hover:text-(--accent)"
          : "text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)",
      )}
    >
      {children}
    </Button>
  );
}
