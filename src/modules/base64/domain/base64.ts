import { type Result, domainError, ok } from "@/shared/kernel/result";

export type Base64Mode = "encode" | "decode";

export interface Base64Options {
  urlSafe: boolean;
}

const BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/;

/** UTF-8 text -> Base64. Total: never throws, returns Result. */
export function encodeBase64(input: string, options: Base64Options): Result<string> {
  try {
    const bytes = new TextEncoder().encode(input);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    let out = btoa(binary);
    if (options.urlSafe) {
      out = out.replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
    }
    return ok(out);
  } catch (e) {
    return domainError("encode_failed", e instanceof Error ? e.message : "Failed to encode.");
  }
}

/** Base64 -> UTF-8 text. Total: never throws, returns Result. */
export function decodeBase64(input: string, options: Base64Options): Result<string> {
  const trimmed = input.trim();
  if (trimmed === "") return ok("");

  let normalized = options.urlSafe ? trimmed.replaceAll("-", "+").replaceAll("_", "/") : trimmed;
  const remainder = normalized.length % 4;
  if (remainder > 0) normalized += "=".repeat(4 - remainder);

  if (!BASE64_PATTERN.test(normalized)) {
    return domainError("invalid_base64", "Input is not valid Base64.");
  }
  try {
    const binary = atob(normalized);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return ok(text);
  } catch {
    return domainError("invalid_base64", "Input is not valid UTF-8 Base64.");
  }
}

export function runBase64(mode: Base64Mode, input: string, options: Base64Options): Result<string> {
  return mode === "encode" ? encodeBase64(input, options) : decodeBase64(input, options);
}
