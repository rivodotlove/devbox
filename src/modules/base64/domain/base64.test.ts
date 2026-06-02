import { describe, expect, it } from "vite-plus/test";
import { decodeBase64, encodeBase64, runBase64 } from "./base64";

const std = { urlSafe: false };
const url = { urlSafe: true };

describe("encodeBase64", () => {
  it("encodes ASCII", () => {
    expect(encodeBase64("hello", std)).toEqual({ ok: true, value: "aGVsbG8=" });
  });

  it("encodes UTF-8 multibyte", () => {
    expect(encodeBase64("héllo★", std)).toEqual({ ok: true, value: "aMOpbGxv4piF" });
  });

  it("encodes empty string to empty", () => {
    expect(encodeBase64("", std)).toEqual({ ok: true, value: "" });
  });

  it("url-safe swaps +/ and strips padding", () => {
    const std64 = encodeBase64("<<???>>", std);
    const url64 = encodeBase64("<<???>>", url);
    expect(std64.ok && url64.ok).toBe(true);
    if (std64.ok && url64.ok) {
      expect(std64.value).toContain("=");
      expect(url64.value).not.toContain("=");
      expect(url64.value).not.toMatch(/[+/]/);
    }
  });
});

describe("decodeBase64", () => {
  it("decodes ASCII", () => {
    expect(decodeBase64("aGVsbG8=", std)).toEqual({ ok: true, value: "hello" });
  });

  it("decodes UTF-8 multibyte", () => {
    expect(decodeBase64("aMOpbGxv4piF", std)).toEqual({ ok: true, value: "héllo★" });
  });

  it("decodes empty/whitespace to empty", () => {
    expect(decodeBase64("   ", std)).toEqual({ ok: true, value: "" });
  });

  it("tolerates missing padding", () => {
    expect(decodeBase64("aGVsbG8", std)).toEqual({ ok: true, value: "hello" });
  });

  it("decodes url-safe input", () => {
    const encoded = encodeBase64("<<???>>", url);
    expect(encoded.ok).toBe(true);
    if (encoded.ok) {
      expect(decodeBase64(encoded.value, url)).toEqual({ ok: true, value: "<<???>>" });
    }
  });

  it("rejects invalid base64 with a typed error", () => {
    const result = decodeBase64("not valid!!", std);
    expect(result).toEqual({
      ok: false,
      error: { code: "invalid_base64", message: expect.any(String) },
    });
  });

  it("rejects invalid UTF-8 bytes", () => {
    // 0xFF is not valid UTF-8 on its own.
    const result = decodeBase64("/w==", std);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("invalid_base64");
  });
});

describe("runBase64", () => {
  it("round-trips through both modes", () => {
    const enc = runBase64("encode", "round trip ✓", std);
    expect(enc.ok).toBe(true);
    if (enc.ok) {
      expect(runBase64("decode", enc.value, std)).toEqual({ ok: true, value: "round trip ✓" });
    }
  });
});
