export type EditorLanguage = "json" | "xml" | "text";

/**
 * Cheap, total heuristic to pick a syntax-highlight language for editor input.
 * Pure: no DOM, no CodeMirror imports — trivially testable.
 */
export function detectLanguage(text: string): EditorLanguage {
  const t = text.trim();
  if (t === "") return "text";
  if (t.startsWith("{") || t.startsWith("[")) {
    try {
      JSON.parse(t);
      return "json";
    } catch {
      /* not valid JSON — fall through */
    }
  }
  if (t.startsWith("<")) return "xml";
  return "text";
}
