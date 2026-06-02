import { Suspense, lazy, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTabsStore } from "@/app/stores/use-tabs-store";
import { getToolById } from "@/shared/kernel/registry";
import { ToolLoading } from "@/app/tool-host/tool-loading";
import { UnknownTool } from "@/app/tool-host/unknown-tool";
import { ToolPlaceholder } from "@/app/tool-host/tool-placeholder";

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

  if (!tool) return <UnknownTool toolId={toolId} />;
  if (LazyTool) {
    return (
      <Suspense fallback={<ToolLoading />}>
        <LazyTool />
      </Suspense>
    );
  }
  return <ToolPlaceholder tool={tool} />;
}
