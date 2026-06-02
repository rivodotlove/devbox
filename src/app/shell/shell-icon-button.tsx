import { Button } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { type ComponentProps } from "react";

type ShellIconButtonProps = ComponentProps<typeof Button>;

export function ShellIconButton({ className, ...props }: ShellIconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className={cn("rounded text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)", className)}
      {...props}
    />
  );
}
