import { getFont, loadFont, type FontId } from "@/shared/lib/fonts";
import type { ThemeId } from "@/shared/lib/themes";

import { useSettingsStore } from "./use-settings-store";

function applyTheme(theme: ThemeId): void {
  document.documentElement.dataset.theme = theme;
}

function applyFont(font: FontId): void {
  loadFont(font).catch(() => {
    /* fallback fonts in cssFamily apply; ignore chunk load failure */
  });
  document.documentElement.style.setProperty("--font-mono", getFont(font).cssFamily);
}

/**
 * Connects the settings store to the DOM: keeps `data-theme` and the
 * `--font-mono` CSS var in sync, lazy-loading non-bundled fonts on demand.
 * Applies the persisted (hydrated) state immediately, then on every change.
 * Idempotent — safe under React StrictMode double-invocation.
 */
export function initSettingsEffects(): void {
  const { theme, font } = useSettingsStore.getState();
  applyTheme(theme);
  applyFont(font);

  useSettingsStore.subscribe((state, prev) => {
    if (state.theme !== prev.theme) applyTheme(state.theme);
    if (state.font !== prev.font) applyFont(state.font);
  });
}
