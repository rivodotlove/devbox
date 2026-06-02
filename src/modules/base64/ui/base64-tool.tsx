import type { Base64Mode } from "../domain/base64";
import { useBase64 } from "./use-base64";

const MODES: { id: Base64Mode; label: string }[] = [
  { id: "encode", label: "Encode" },
  { id: "decode", label: "Decode" },
];

export default function Base64Tool() {
  const vm = useBase64();

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4">
      <header className="flex shrink-0 flex-wrap items-center gap-3">
        <div className="flex overflow-hidden rounded-md border border-(--border)">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => vm.setMode(m.id)}
              className={
                m.id === vm.mode
                  ? "px-3 py-1 text-xs font-medium bg-(--accent)/15 text-(--accent)"
                  : "px-3 py-1 text-xs font-medium text-(--sidebar-fg) hover:bg-(--muted) hover:text-(--fg)"
              }
            >
              {m.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-1.5 text-xs text-(--sidebar-fg)">
          <input
            type="checkbox"
            checked={vm.urlSafe}
            onChange={vm.toggleUrlSafe}
            className="accent-(--accent)"
          />
          URL-safe
        </label>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        <div className="flex min-h-0 flex-1 flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)">
            Input
          </span>
          <textarea
            value={vm.input}
            onChange={(e) => vm.setInput(e.target.value)}
            spellCheck={false}
            placeholder={vm.mode === "encode" ? "Text to encode…" : "Base64 to decode…"}
            className="min-h-0 flex-1 resize-none rounded-md border border-(--border) bg-(--bg) p-3 font-mono text-sm text-(--fg) outline-hidden focus:border-(--accent)"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)">
            Output
          </span>
          <textarea
            value={vm.error ? "" : vm.output}
            readOnly
            spellCheck={false}
            placeholder="Result…"
            className="min-h-0 flex-1 resize-none rounded-md border border-(--border) bg-(--sidebar-bg) p-3 font-mono text-sm text-(--fg) outline-hidden"
          />
          {vm.error && (
            <p className="mt-1 text-xs text-red-400" role="alert">
              {vm.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
