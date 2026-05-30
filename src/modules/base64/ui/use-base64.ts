import type { DomainError } from "@/shared/kernel/result";
// Intra-module imports stay relative — the @/modules/*/domain alias is lint-banned.
import { type Base64Mode, runBase64 } from "../domain/base64";
import { useBase64Store } from "./store";

export interface Base64ViewModel {
  input: string;
  mode: Base64Mode;
  urlSafe: boolean;
  output: string;
  error: DomainError | null;
  setInput: (input: string) => void;
  setMode: (mode: Base64Mode) => void;
  toggleUrlSafe: () => void;
}

/**
 * View-model seam: reads tool state from the zustand store and derives the
 * output/error by running the pure domain. The component stays presentational.
 */
export function useBase64(): Base64ViewModel {
  const input = useBase64Store((s) => s.input);
  const mode = useBase64Store((s) => s.mode);
  const urlSafe = useBase64Store((s) => s.urlSafe);
  const setInput = useBase64Store((s) => s.setInput);
  const setMode = useBase64Store((s) => s.setMode);
  const toggleUrlSafe = useBase64Store((s) => s.toggleUrlSafe);

  const result = runBase64(mode, input, { urlSafe });

  return {
    input,
    mode,
    urlSafe,
    output: result.ok ? result.value : "",
    error: result.ok ? null : result.error,
    setInput,
    setMode,
    toggleUrlSafe,
  };
}
