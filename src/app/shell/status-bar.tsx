import { Flex } from "@/shared/ui";
import { Keyboard, Settings, type LucideIcon } from "lucide-react";
import type { MouseEventHandler } from "react";

import { ShellIconButton } from "./shell-icon-button";

type ItemOnClick = "shortcuts" | "settings";

interface StatusBarProps {
  onShortcuts: () => void;
  onSettings: () => void;
}

const ITEMS: { id: string; label: string; Icon: LucideIcon; onClick: ItemOnClick }[] = [
  { id: "shortcuts", label: "Shortcuts", Icon: Keyboard, onClick: "shortcuts" },
  { id: "settings", label: "Settings", Icon: Settings, onClick: "settings" },
];

/** Bottom status bar with quick-access actions (shortcuts, settings). */
export function StatusBar({ onShortcuts, onSettings }: StatusBarProps) {
  const onClickMapper: Record<ItemOnClick, MouseEventHandler<HTMLButtonElement>> = {
    shortcuts: onShortcuts,
    settings: onSettings,
  };

  return (
    <Flex
      align="center"
      justify="end"
      className="h-8 shrink-0 gap-0.5 border-t border-border bg-sidebar px-1.5"
    >
      {ITEMS.map(({ id, label, Icon, onClick }) => (
        <ShellIconButton
          key={id}
          type="button"
          title={label}
          aria-label={label}
          onClick={onClickMapper[onClick]}
          className="size-7 [&_svg]:size-5"
        >
          <Icon data-icon="inline-start" />
        </ShellIconButton>
      ))}
    </Flex>
  );
}
