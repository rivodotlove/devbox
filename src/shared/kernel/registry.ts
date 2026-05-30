import {
  Binary,
  Braces,
  Clock,
  FileText,
  Fingerprint,
  Hash,
  KeyRound,
  Link as LinkIcon,
  Palette,
  Type,
  type LucideIcon,
} from "lucide-react";

export type ToolCategoryId =
  | "encoding"
  | "security"
  | "generation"
  | "formatting"
  | "design"
  | "text";

export interface ToolCategory {
  id: ToolCategoryId;
  label: string;
}

export const CATEGORIES: ToolCategory[] = [
  { id: "encoding", label: "Encoding" },
  { id: "security", label: "Security" },
  { id: "generation", label: "Generation" },
  { id: "formatting", label: "Formatting" },
  { id: "design", label: "Design" },
  { id: "text", label: "Text" },
];

export interface ToolDefinition {
  id: string;
  name: string;
  category: ToolCategoryId;
  icon: LucideIcon;
  description: string;
}

export const TOOLS: ToolDefinition[] = [
  {
    id: "base64",
    name: "Base64",
    category: "encoding",
    icon: Binary,
    description: "Encode and decode Base64 strings.",
  },
  {
    id: "url",
    name: "URL Encoder",
    category: "encoding",
    icon: LinkIcon,
    description: "Encode and decode URL components.",
  },
  {
    id: "jwt",
    name: "JWT Decoder",
    category: "security",
    icon: KeyRound,
    description: "Decode JSON Web Tokens (header + payload).",
  },
  {
    id: "hash",
    name: "Hash Generator",
    category: "security",
    icon: Hash,
    description: "MD5, SHA-1, SHA-256, SHA-384, SHA-512.",
  },
  {
    id: "uuid",
    name: "UUID Generator",
    category: "generation",
    icon: Fingerprint,
    description: "Generate UUID v4 and v7.",
  },
  {
    id: "json",
    name: "JSON Formatter",
    category: "formatting",
    icon: Braces,
    description: "Format, minify, and validate JSON.",
  },
  {
    id: "markdown",
    name: "Markdown Previewer",
    category: "formatting",
    icon: FileText,
    description: "Live preview of Markdown.",
  },
  {
    id: "timestamp",
    name: "Timestamp Converter",
    category: "formatting",
    icon: Clock,
    description: "Convert between Unix, ISO 8601, UTC and local.",
  },
  {
    id: "color",
    name: "Color Converter",
    category: "design",
    icon: Palette,
    description: "Pick and convert between HEX, RGB, HSL, HSB.",
  },
  {
    id: "lorem",
    name: "Lorem Ipsum",
    category: "text",
    icon: Type,
    description: "Generate placeholder text.",
  },
];

const TOOLS_BY_ID = new Map(TOOLS.map((t) => [t.id, t]));

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS_BY_ID.get(id);
}

export function getToolsByCategory(category: ToolCategoryId): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}
