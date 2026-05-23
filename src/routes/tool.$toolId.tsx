import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tool/$toolId")({
  component: ToolRoute,
});

function ToolRoute() {
  const { toolId } = Route.useParams();
  return (
    <div className="flex h-full w-full items-center justify-center text-[var(--sidebar-fg)]">
      <div className="text-center">
        <p className="text-sm">Tool placeholder</p>
        <p className="mt-1 text-lg text-[var(--fg)]">{toolId}</p>
      </div>
    </div>
  );
}
