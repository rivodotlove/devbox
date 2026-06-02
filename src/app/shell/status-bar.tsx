import { Info, Keyboard, Settings, type LucideIcon } from "lucide-react";
import { Flex } from "@/shared/ui";

import { ShellIconButton } from "./shell-icon-button";

interface StatusBarProps {
  onShortcuts: () => void;
}

const ITEMS: { id: string; label: string; Icon: LucideIcon; onClick?: "shortcuts" }[] = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard, onClick: "shortcuts" },
  { id: "info", label: "Info", Icon: Info },
  { id: "settings", label: "Settings", Icon: Settings },
];

/** Bottom status bar with quick-access actions (shortcuts, info, settings). */
export function StatusBar({ onShortcuts }: StatusBarProps) {
  return (
    <Flex
      align="center"
      justify="end"
      className="h-6 shrink-0 gap-0.5 border-t border-border bg-sidebar px-1.5"
    >
      {ITEMS.map(({ id, label, Icon, onClick }) => (
        <ShellIconButton
          key={id}
          type="button"
          title={label}
          aria-label={label}
          onClick={onClick === "shortcuts" ? onShortcuts : undefined}
          className="size-5"
        >
          <Icon data-icon="inline-start" />
        </ShellIconButton>
      ))}
    </Flex>
  );
}
