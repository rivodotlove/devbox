import { CATEGORIES, TOOLS } from "@/shared/kernel";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogTitle,
  Flex,
  Typography,
  VisuallyHidden,
} from "@/shared/ui";
import { Search } from "lucide-react";

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
          <Flex align="center" gap={2} className="border-b border-border px-3">
            <Search size={14} className="shrink-0 text-sidebar-foreground" />
            <CommandInput autoFocus placeholder="Search tools..." />
          </Flex>
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
                        <Flex
                          align="center"
                          justify="center"
                          className="h-6 w-6 shrink-0 rounded bg-primary/15 text-primary"
                        >
                          <Icon size={12} />
                        </Flex>
                        <Typography variant="span">{tool.name}</Typography>
                        <Typography
                          variant="span"
                          className="ml-auto text-xs text-sidebar-foreground"
                        >
                          {tool.description}
                        </Typography>
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
