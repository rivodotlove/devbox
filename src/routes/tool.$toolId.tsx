import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, getToolById } from "@/tools/registry";

export const Route = createFileRoute("/tool/$toolId")({
  component: ToolRoute,
});

function ToolRoute() {
  const { toolId } = Route.useParams();
  const tool = getToolById(toolId);

  if (!tool) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[var(--fg)]">Unknown tool</p>
          <p className="mt-1 text-sm text-[var(--sidebar-fg)]">
            No tool registered with id <code>{toolId}</code>.
          </p>
          <Link to="/" className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline">
            Back to welcome
          </Link>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;
  const category = CATEGORIES.find((c) => c.id === tool.category);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-[var(--sidebar-fg)]">
      <div className="text-center">
        <Icon size={48} className="mx-auto text-[var(--accent)]" />
        <h1 className="mt-4 text-2xl text-[var(--fg)]">{tool.name}</h1>
        {category && <p className="mt-1 text-xs uppercase tracking-wider">{category.label}</p>}
        <p className="mt-4 max-w-sm text-sm">{tool.description}</p>
        <p className="mt-6 text-xs italic">Not implemented yet.</p>
      </div>
    </div>
  );
}
