import { Keyboard, Info, Settings, type LucideIcon } from "lucide-react";

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
    <div className="flex h-6 shrink-0 items-center justify-end gap-0.5 border-t border-(--border) bg-(--sidebar-bg) px-1.5">
      {ITEMS.map(({ id, label, Icon, onClick }) => (
        <button
          key={id}
          type="button"
          title={label}
          aria-label={label}
          onClick={onClick === "shortcuts" ? onShortcuts : undefined}
          className="flex h-5 w-5 items-center justify-center rounded text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
        >
          <Icon size={12} />
        </button>
      ))}
    </div>
  );
}
