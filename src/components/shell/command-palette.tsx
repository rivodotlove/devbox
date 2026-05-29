import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/tools/registry";
import { useTabsStore } from "@/stores/use-tabs-store";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const openTab = useTabsStore((s) => s.open);

  useHotkeys("escape", onClose, { enabled: open });

  if (!open) return null;

  const handleSelect = (toolId: string) => {
    openTab(toolId);
    void navigate({ to: "/tool/$toolId", params: { toolId } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-(--border) bg-(--bg) shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="flex flex-col">
          <div className="flex items-center gap-2 border-b border-(--border) px-3">
            <Search size={14} className="shrink-0 text-(--sidebar-fg)" />
            <Command.Input
              autoFocus
              placeholder="Search tools..."
              className="flex-1 bg-transparent py-3 text-sm text-(--fg) placeholder:text-(--sidebar-fg) outline-none"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto py-1.5">
            <Command.Empty className="py-6 text-center text-sm text-(--sidebar-fg)">
              No tools found.
            </Command.Empty>
            {CATEGORIES.map((category) => {
              const tools = TOOLS.filter((t) => t.category === category.id);
              if (tools.length === 0) return null;
              return (
                <Command.Group
                  key={category.id}
                  heading={category.label}
                  className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-(--sidebar-fg)/70"
                >
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Command.Item
                        key={tool.id}
                        value={`${tool.name} ${tool.description}`}
                        onSelect={() => handleSelect(tool.id)}
                        className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-(--fg) data-[selected]:bg-(--muted)"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-(--accent)/15 text-(--accent)">
                          <Icon size={12} />
                        </span>
                        <span>{tool.name}</span>
                        <span className="ml-auto text-xs text-(--sidebar-fg)">
                          {tool.description}
                        </span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              );
            })}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
