import { Link } from "@tanstack/react-router";

/** Shown when the route's tool id matches no registered tool. */
export function UnknownTool({ toolId }: { toolId: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-(--fg)">Unknown tool</p>
        <p className="mt-1 text-sm text-(--sidebar-fg)">
          No tool registered with id <code>{toolId}</code>.
        </p>
        <Link to="/" className="mt-4 inline-block text-sm text-(--accent) hover:underline">
          Back to welcome
        </Link>
      </div>
    </div>
  );
}
