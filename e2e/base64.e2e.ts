import { expect, test } from "@playwright/test";

/**
 * E2E for the Base64 tool. Drives the real route and asserts the wired-up
 * behavior (encode/decode, URL-safe, error state) — the pure codec is unit-tested
 * separately in src/modules/base64/domain/base64.test.ts.
 */
test.describe("Base64 tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tool/base64");
  });

  const input = (page: import("@playwright/test").Page) =>
    page.getByRole("textbox", { name: /Text to encode|Base64 to decode/ });
  const output = (page: import("@playwright/test").Page) =>
    page.getByRole("textbox", { name: "Result…" });

  test("encodes text to base64", async ({ page }) => {
    await input(page).fill("hello");
    await expect(output(page)).toHaveValue("aGVsbG8=");
  });

  test("decodes base64 to text", async ({ page }) => {
    await page.getByRole("button", { name: "Decode" }).click();
    await input(page).fill("aGVsbG8=");
    await expect(output(page)).toHaveValue("hello");
  });

  test("URL-safe encoding strips padding", async ({ page }) => {
    await input(page).fill("hello");
    await page.getByRole("checkbox", { name: "URL-safe" }).check();
    const value = await output(page).inputValue();
    expect(value).toBe("aGVsbG8");
    expect(value).not.toContain("=");
  });

  test("shows an error for invalid base64 on decode", async ({ page }) => {
    await page.getByRole("button", { name: "Decode" }).click();
    await input(page).fill("!!!not-base64!!!");
    await expect(page.getByRole("alert")).toContainText("not valid Base64");
    await expect(output(page)).toHaveValue("");
  });

  test("persists input across reload", async ({ page }) => {
    await input(page).fill("persist me");
    await expect(output(page)).not.toHaveValue("");
    await page.reload();
    await expect(input(page)).toHaveValue("persist me");
  });
});
