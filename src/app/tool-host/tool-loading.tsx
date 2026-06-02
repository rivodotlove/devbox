/** Suspense fallback shown while a tool module lazy-loads. */
export function ToolLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-(--sidebar-fg)">
      <p className="text-sm">Loading…</p>
    </div>
  );
}
