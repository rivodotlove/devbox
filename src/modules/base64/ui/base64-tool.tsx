import { useSettingsStore } from "@/app/stores/use-settings-store";
import { detectLanguage } from "@/shared/lib/editor/detect-language";
import { Box, Checkbox, CodeEditor, Flex, Label, Typography } from "@/shared/ui";

import type { Base64Mode } from "../domain/base64";

import { Base64ModeButton } from "./base64-mode-button";
import { useBase64 } from "./use-base64";

const MODES: { id: Base64Mode; label: string }[] = [
  { id: "encode", label: "Encode" },
  { id: "decode", label: "Decode" },
];

export default function Base64Tool() {
  const { mode, setMode, urlSafe, toggleUrlSafe, input, setInput, output, error } = useBase64();
  const fontSize = useSettingsStore((s) => s.fontSize);
  const tabSize = useSettingsStore((s) => s.tabSize);
  const inputLang = detectLanguage(input);
  const outputLang = mode === "decode" ? detectLanguage(output) : "text";

  return (
    <Flex direction="col" gap={3} className="h-full w-full p-4">
      <Flex asChild align="center" wrap="wrap" gap={3} className="shrink-0">
        <Box>
          <Flex className="border border-border rounded-md">
            {MODES.map((m) => (
              <Base64ModeButton key={m.id} isActive={m.id === mode} onClick={() => setMode(m.id)}>
                {m.label}
              </Base64ModeButton>
            ))}
          </Flex>

          <Flex align="center" className="gap-1.5 text-xs text-sidebar-foreground">
            <Checkbox id="urlSafe" checked={urlSafe} onCheckedChange={toggleUrlSafe} />
            <Label htmlFor="urlSafe">URL-safe</Label>
          </Flex>
        </Box>
      </Flex>

      <Flex direction="col" gap={3} className="min-h-0 flex-1 md:flex-row">
        <Flex direction="col" className="min-h-0 flex-1">
          <Typography
            variant="span"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground"
          >
            Input
          </Typography>
          <CodeEditor
            value={input}
            onChange={setInput}
            language={inputLang}
            ariaLabel="Base64 input"
            placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"}
            fontSize={fontSize}
            tabSize={tabSize}
            className="min-h-0 flex-1"
          />
        </Flex>

        <Flex direction="col" className="min-h-0 flex-1">
          <Typography
            variant="span"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground"
          >
            Output
          </Typography>
          <CodeEditor
            value={output}
            readOnly
            language={outputLang}
            ariaLabel="Base64 output"
            placeholder="Result…"
            fontSize={fontSize}
            tabSize={tabSize}
            className="min-h-0 flex-1"
          />
          {error && (
            <Typography variant="span" as="p" className="mt-1 text-xs text-red-400" role="alert">
              {error.message}
            </Typography>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
