import { useMemo } from "react";
import CodeMirror, { EditorView, type Extension } from "@uiw/react-codemirror";
import { indentWithTab } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { HighlightStyle, indentUnit, syntaxHighlighting } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

import type { EditorLanguage } from "@/shared/lib/editor/detect-language";
import { cn } from "@/shared/utils";

const LANG_EXT: Record<EditorLanguage, Extension[]> = {
  json: [json()],
  xml: [xml()],
  text: [],
};

// Token colours come from CSS vars defined per [data-theme] in index.css, so the
// highlight follows the app theme without reconfiguring the editor.
const cmHighlight = HighlightStyle.define([
  { tag: t.keyword, color: "var(--cm-keyword)" },
  { tag: [t.string, t.special(t.string)], color: "var(--cm-string)" },
  { tag: t.number, color: "var(--cm-number)" },
  { tag: [t.bool, t.null], color: "var(--cm-atom)" },
  { tag: t.propertyName, color: "var(--cm-property)" },
  { tag: [t.lineComment, t.blockComment], color: "var(--cm-comment)", fontStyle: "italic" },
  { tag: [t.tagName, t.angleBracket], color: "var(--cm-tag)" },
  { tag: t.attributeName, color: "var(--cm-property)" },
  { tag: [t.punctuation, t.separator, t.brace, t.squareBracket], color: "var(--cm-punctuation)" },
]);

// Editor chrome (bg/gutter/selection/cursor) tracks the app theme via CSS vars.
const appTheme = EditorView.theme({
  "&": { backgroundColor: "transparent", color: "var(--color-foreground)", height: "100%" },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": { fontFamily: "var(--font-mono)", overflow: "auto" },
  ".cm-content": { caretColor: "var(--color-foreground)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--color-foreground)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "color-mix(in oklch, var(--color-primary) 30%, transparent)",
  },
  ".cm-gutters": {
    backgroundColor: "transparent",
    color: "var(--color-muted-foreground)",
    border: "none",
  },
  ".cm-activeLine, .cm-activeLineGutter": {
    backgroundColor: "color-mix(in oklch, var(--color-foreground) 6%, transparent)",
  },
});

// Stable references so CodeMirror doesn't reconfigure its built-ins each render.
const EDITABLE_SETUP = {
  lineNumbers: true,
  foldGutter: false,
  highlightActiveLine: true,
  highlightActiveLineGutter: true,
};
const READONLY_SETUP = {
  ...EDITABLE_SETUP,
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
};

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: EditorLanguage;
  placeholder?: string;
  className?: string;
  /** Accessible name set on the editor's textbox (`aria-label`). */
  ariaLabel: string;
  /** From the settings store, passed in by the caller — shared/ui must not read app state. */
  fontSize: number;
  tabSize: number;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language = "text",
  placeholder,
  className,
  ariaLabel,
  fontSize,
  tabSize,
}: CodeEditorProps) {
  const extensions = useMemo<Extension[]>(
    () => [
      appTheme,
      syntaxHighlighting(cmHighlight),
      EditorView.lineWrapping,
      indentUnit.of(" ".repeat(tabSize)),
      keymap.of([indentWithTab]),
      EditorView.contentAttributes.of({ "aria-label": ariaLabel }),
      ...LANG_EXT[language],
    ],
    [language, tabSize, ariaLabel],
  );
  const style = useMemo(() => ({ fontSize: `${fontSize}px` }), [fontSize]);

  return (
    <CodeMirror
      className={cn("h-full overflow-hidden rounded-lg border border-border", className)}
      style={style}
      height="100%"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      basicSetup={readOnly ? READONLY_SETUP : EDITABLE_SETUP}
      extensions={extensions}
      theme="none"
    />
  );
}
