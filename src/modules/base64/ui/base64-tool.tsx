import { Box, Checkbox, Flex, Label, Textarea, Typography } from "@/shared/ui";

import type { Base64Mode } from "../domain/base64";

import { Base64ModeButton } from "./base64-mode-button";
import { useBase64 } from "./use-base64";

const MODES: { id: Base64Mode; label: string }[] = [
  { id: "encode", label: "Encode" },
  { id: "decode", label: "Decode" },
];

export default function Base64Tool() {
  const { mode, setMode, urlSafe, toggleUrlSafe, input, setInput, output, error } = useBase64();

  return (
    <Flex direction="col" gap={3} className="h-full w-full p-4">
      <Flex asChild align="center" wrap="wrap" gap={3} className="shrink-0">
        <Box>
          <Flex className="border border-(--border) rounded-md">
            {MODES.map((m) => (
              <Base64ModeButton key={m.id} isActive={m.id === mode} onClick={() => setMode(m.id)}>
                {m.label}
              </Base64ModeButton>
            ))}
          </Flex>

          <Flex align="center" className="gap-1.5 text-xs text-(--sidebar-fg)">
            <Checkbox id="urlSafe" checked={urlSafe} onCheckedChange={toggleUrlSafe} />
            <Label htmlFor="urlSafe">URL-safe</Label>
          </Flex>
        </Box>
      </Flex>

      <Flex direction="col" gap={3} className="min-h-0 flex-1 md:flex-row">
        <Flex direction="col" className="min-h-0 flex-1">
          <Typography
            variant="span"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)"
          >
            Input
          </Typography>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"}
            className="flex-1 resize-none border-(--border)"
          />
        </Flex>

        <Flex direction="col" className="min-h-0 flex-1">
          <Typography
            variant="span"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-(--sidebar-fg)"
          >
            Output
          </Typography>
          <Textarea
            value={output}
            readOnly
            spellCheck={false}
            placeholder="Result…"
            className="flex-1 resize-none border-(--border) focus-visible:ring-0"
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
