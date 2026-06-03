import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: { port: 15036 },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    // Generated plan HTML and skill templates aren't source — Oxfmt mis-parses the
    // JSX embedded in their <pre><code> blocks.
    ignorePatterns: [".claude/plans/**"],
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    // DDD-lite boundary rules. Modules are reachable only via their barrel.
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/modules/*/domain",
                "@/modules/*/domain/*",
                "@/modules/*/ui",
                "@/modules/*/ui/*",
              ],
              message: "Import a tool only through its barrel: @/modules/<tool>.",
            },
          ],
        },
      ],
    },
    // domain/ must stay framework- and IO-free.
    overrides: [
      {
        files: ["**/domain/**"],
        rules: {
          "no-restricted-imports": [
            "error",
            {
              patterns: [
                {
                  group: [
                    "react",
                    "react-dom",
                    "@/app",
                    "@/app/*",
                    "@/shared/lib/storage",
                    "@/shared/lib/storage/*",
                    "@/modules/*",
                  ],
                  message:
                    "domain/ must stay pure: no React, app state, storage, or other modules.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  plugins: [tanstackRouter({ target: "react", autoCodeSplitting: true }), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
