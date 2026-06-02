import { CATEGORIES, type ToolDefinition } from "@/shared/kernel/registry";

/** Placeholder for a registered-but-unimplemented tool (no loader yet). */
export function ToolPlaceholder({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;
  const category = CATEGORIES.find((c) => c.id === tool.category);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-(--sidebar-fg)">
      <div className="text-center">
        <Icon size={48} className="mx-auto text-(--accent)" />
        <h1 className="mt-4 text-2xl text-(--fg)">{tool.name}</h1>
        {category && <p className="mt-1 text-xs uppercase tracking-wider">{category.label}</p>}
        <p className="mt-4 max-w-sm text-sm">{tool.description}</p>
        <p className="mt-6 text-xs italic">Not implemented yet.</p>
      </div>
    </div>
  );
}
