import { type Locator, type Page, expect, test } from "@playwright/test";

/**
 * E2E for the Base64 tool. Drives the real route and asserts the wired-up
 * behavior (encode/decode, URL-safe, error state) plus the CodeMirror editor
 * integration (line numbers, syntax highlighting). The pure codec is unit-tested
 * in src/modules/base64/domain/base64.test.ts and the language heuristic in
 * src/shared/lib/editor/detect-language.test.ts.
 *
 * The editors are CodeMirror instances, not <textarea>: they expose a `textbox`
 * role named via aria-label. `fill()` sets content directly, which sidesteps
 * CodeMirror's bracket/quote auto-closing.
 */
const inputEditor = (page: Page) => page.getByRole("textbox", { name: "Base64 input" });
const outputEditor = (page: Page) => page.getByRole("textbox", { name: "Base64 output" });

async function editorText(editor: Locator) {
  return (await editor.locator(".cm-line").allInnerTexts()).join("\n");
}

test.describe("Base64 tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tool/base64");
    await expect(inputEditor(page)).toBeVisible();
  });

  test("encodes text to base64", async ({ page }) => {
    await inputEditor(page).fill("hello");
    await expect.poll(() => editorText(outputEditor(page))).toBe("aGVsbG8=");
  });

  test("decodes base64 to text", async ({ page }) => {
    await page.getByRole("button", { name: "Decode" }).click();
    await inputEditor(page).fill("aGVsbG8=");
    await expect.poll(() => editorText(outputEditor(page))).toBe("hello");
  });

  test("URL-safe encoding strips padding", async ({ page }) => {
    await inputEditor(page).fill("hello");
    await page.getByRole("checkbox", { name: "URL-safe" }).check();
    await expect.poll(() => editorText(outputEditor(page))).toBe("aGVsbG8");
  });

  test("shows an error for invalid base64 on decode", async ({ page }) => {
    await page.getByRole("button", { name: "Decode" }).click();
    await inputEditor(page).fill("!!!not-base64!!!");
    await expect(page.getByRole("alert")).toContainText("not valid Base64");
    // Empty editor shows its placeholder rather than a result.
    await expect(outputEditor(page).locator(".cm-placeholder")).toBeVisible();
  });

  test("persists input across reload", async ({ page }) => {
    await inputEditor(page).fill("persist me");
    await expect.poll(() => editorText(outputEditor(page))).not.toBe("");
    await page.reload();
    await expect.poll(() => editorText(inputEditor(page))).toBe("persist me");
  });

  test("renders a code editor with a line-number gutter", async ({ page }) => {
    await expect(page.locator(".cm-editor").first()).toBeVisible();
    await expect(page.locator(".cm-lineNumbers").first()).toBeVisible();
  });

  test("syntax-highlights JSON input into tokens", async ({ page }) => {
    await inputEditor(page).fill('{"a":1,"b":true}');
    // Highlighted JSON is split into multiple token <span>s; plain text would not be.
    await expect
      .poll(() => inputEditor(page).locator(".cm-line > span").count())
      .toBeGreaterThan(1);
  });
});
