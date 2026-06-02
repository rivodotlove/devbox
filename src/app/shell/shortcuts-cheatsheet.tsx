import { useHotkeys } from "react-hotkeys-hook";
import { HOTKEYS } from "@/shared/lib/hotkeys";

interface ShortcutsCheatsheetProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = Object.values(HOTKEYS);

export function ShortcutsCheatsheet({ open, onClose }: ShortcutsCheatsheetProps) {
  useHotkeys("escape", onClose, { enabled: open });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="w-full max-w-md overflow-hidden rounded-lg border border-(--border) bg-(--bg) shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
          <span className="text-sm font-medium text-(--fg)">Keyboard Shortcuts</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-(--sidebar-fg) hover:text-(--fg)"
          >
            Esc
          </button>
        </div>
        <ul className="py-2">
          {SHORTCUTS.map(({ label, keys }) => (
            <li key={label} className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-(--sidebar-fg)">{label}</span>
              <span className="flex gap-1">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-(--border) bg-(--muted) px-1.5 py-0.5 font-mono text-xs text-(--fg)"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
