import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SHORTCUTS = [
  { keys: ["⌘K", "⌘⇧P"], label: "Open command palette" },
  { keys: ["⌘B"], label: "Toggle sidebar" },
  { keys: ["⌘⌥W"], label: "Close active tab" },
  { keys: ["⌘⌥→"], label: "Next tab" },
  { keys: ["⌘⌥←"], label: "Previous tab" },
  { keys: ["?"], label: "Show keyboard shortcuts" },
  { keys: ["Esc"], label: "Close palette / dialog" },
];

interface ShortcutsCheatsheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShortcutsCheatsheet(props: Readonly<ShortcutsCheatsheetProps>) {
  const { open, onOpenChange } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <ul className="py-1">
          {SHORTCUTS.map(({ label, keys }) => (
            <li key={label} className="flex items-center justify-between py-2">
              <span className="text-sm text-(--sidebar-fg)">{label}</span>
              <span className="flex gap-1">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-(--border) bg-(--muted) px-1.5 py-0.5 font-mono text-[11px] text-(--fg)"
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
