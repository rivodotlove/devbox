import { idbStorage } from "@/shared/lib/storage/idb-zustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Base64Mode } from "../domain/base64";

interface Base64State {
  input: string;
  mode: Base64Mode;
  urlSafe: boolean;
  setInput: (input: string) => void;
  setMode: (mode: Base64Mode) => void;
  toggleUrlSafe: () => void;
}

export const useBase64Store = create<Base64State>()(
  persist(
    (set) => ({
      input: "",
      mode: "encode",
      urlSafe: false,
      setInput: (input) => set({ input }),
      setMode: (mode) => set({ mode }),
      toggleUrlSafe: () => set((s) => ({ urlSafe: !s.urlSafe })),
    }),
    {
      name: "base64",
      storage: createJSONStorage(() => idbStorage),
      // Persist only the data, never the action functions.
      partialize: (s) => ({ input: s.input, mode: s.mode, urlSafe: s.urlSafe }),
    },
  ),
);
