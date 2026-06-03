import { describe, expect, it } from "vite-plus/test";

import { detectLanguage } from "./detect-language";

describe("detectLanguage", () => {
  it("detects JSON objects and arrays", () => {
    expect(detectLanguage('{"a":1}')).toBe("json");
    expect(detectLanguage("[1, 2, 3]")).toBe("json");
    expect(detectLanguage('  \n {"a": {"b": [true, null]}} ')).toBe("json");
  });

  it("falls back to text for malformed JSON", () => {
    expect(detectLanguage('{"a": 1')).toBe("text");
    expect(detectLanguage("{not json}")).toBe("text");
  });

  it("detects XML/HTML by leading angle bracket", () => {
    expect(detectLanguage("<root/>")).toBe("xml");
    expect(detectLanguage('  <?xml version="1.0"?><a>1</a>')).toBe("xml");
  });

  it("returns text for empty or plain input", () => {
    expect(detectLanguage("")).toBe("text");
    expect(detectLanguage("   ")).toBe("text");
    expect(detectLanguage("hello world")).toBe("text");
  });
});
