import { Suspense, lazy, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTabsStore } from "@/app/stores/use-tabs-store";
import { CATEGORIES, getToolById } from "@/shared/kernel/registry";

export const Route = createFileRoute("/tool/$toolId")({
  component: ToolRoute,
});

function ToolRoute() {
  const { toolId } = Route.useParams();
  const tool = getToolById(toolId);
  const open = useTabsStore((s) => s.open);

  useEffect(() => {
    if (tool) open(toolId);
  }, [toolId, tool, open]);

  const loader = tool?.loader;
  const LazyTool = useMemo(() => (loader ? lazy(loader) : null), [loader]);

  if (!tool) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-(--fg)">Unknown tool</p>
          <p className="mt-1 text-sm text-(--sidebar-fg)">
            No tool registered with id <code>{toolId}</code>.
          </p>
          <Link to="/" className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline">
            Back to welcome
          </Link>
        </div>
      </div>
    );
  }

  if (LazyTool) {
    return (
      <Suspense fallback={<ToolLoading />}>
        <LazyTool />
      </Suspense>
    );
  }

  const Icon = tool.icon;
  const category = CATEGORIES.find((c) => c.id === tool.category);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-(--sidebar-fg)">
      <div className="text-center">
        <Icon size={48} className="mx-auto  text-(--accent)" />
        <h1 className="mt-4 text-2xl text-(--fg)">{tool.name}</h1>
        {category && <p className="mt-1 text-xs uppercase tracking-wider">{category.label}</p>}
        <p className="mt-4 max-w-sm text-sm">{tool.description}</p>
        <p className="mt-6 text-xs italic">Not implemented yet.</p>
      </div>
    </div>
  );
}

function ToolLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-(--sidebar-fg)">
      <p className="text-sm">Loading…</p>
    </div>
  );
}
