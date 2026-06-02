import { HOTKEYS } from "@/shared/lib/hotkeys";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/shared/ui/dialog";

interface ShortcutsCheatsheetProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = Object.values(HOTKEYS);

/** Modal list of global keyboard shortcuts. */
export function ShortcutsCheatsheet({ open, onClose }: ShortcutsCheatsheetProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="w-full max-w-md">
        <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
          <DialogTitle className="text-sm font-medium text-(--fg)">Keyboard Shortcuts</DialogTitle>
          <DialogClose className="text-xs text-(--sidebar-fg) hover:text-(--fg)">Esc</DialogClose>
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
      </DialogContent>
    </Dialog>
  );
}
