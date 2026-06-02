import { Search } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/shared/kernel/registry";
import { Dialog, DialogContent, DialogTitle, VisuallyHidden } from "@/shared/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/command";
import { useCommandPalette } from "./use-command-palette";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

/** Fuzzy tool launcher. Radix Dialog supplies focus-trap, Escape and click-outside. */
export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { selectTool } = useCommandPalette(onClose);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="top-[15vh] w-full max-w-xl translate-y-0">
        <VisuallyHidden.Root>
          <DialogTitle>Command palette</DialogTitle>
        </VisuallyHidden.Root>
        <Command>
          <div className="flex items-center gap-2 border-b border-(--border) px-3">
            <Search size={14} className="shrink-0 text-(--sidebar-fg)" />
            <CommandInput autoFocus placeholder="Search tools..." />
          </div>
          <CommandList>
            <CommandEmpty>No tools found.</CommandEmpty>
            {CATEGORIES.map((category) => {
              const tools = TOOLS.filter((t) => t.category === category.id);
              if (tools.length === 0) return null;
              return (
                <CommandGroup key={category.id} heading={category.label}>
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <CommandItem
                        key={tool.id}
                        value={`${tool.name} ${tool.description}`}
                        onSelect={() => selectTool(tool.id)}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-(--accent)/15 text-(--accent)">
                          <Icon size={12} />
                        </span>
                        <span>{tool.name}</span>
                        <span className="ml-auto text-xs text-(--sidebar-fg)">
                          {tool.description}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
