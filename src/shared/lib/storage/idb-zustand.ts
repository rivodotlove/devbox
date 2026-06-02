import type { StateStorage } from "zustand/middleware";
import { clearToolState, getToolState, setToolState } from "./idb";

/**
 * Zustand persist adapter backed by IndexedDB (per CLAUDE.md: tool IO lives in
 * IndexedDB, not localStorage). Use via:
 *
 *   persist(initializer, { name: "<toolId>", storage: createJSONStorage(() => idbStorage) })
 *
 * The persist `name` is the IndexedDB key, so it must be the tool id.
 */
export const idbStorage: StateStorage = {
  getItem: async (name) => (await getToolState<string>(name)) ?? null,
  setItem: async (name, value) => {
    await setToolState(name, value);
  },
  removeItem: async (name) => {
    await clearToolState(name);
  },
};
