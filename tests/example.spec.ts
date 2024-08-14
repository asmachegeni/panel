import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/graph");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("نمایش گراف");
});

test("check tab and back to home", async ({ page }) => {
  await page.goto("http://localhost:5173/graph");
  await page.getByLabel("انتخاب ارتباط").click();
  await page.getByRole("tab", { name: "ویرایش گراف" }).click();
  await page.getByRole("tab", { name: "Rotary" }).click();
  await page.getByRole("tab", { name: "ویرایش گراف" }).click();
  await page.getByRole("tab", { name: "گراف کلی" }).click();
  await page.getByRole("button", { name: "برگشت به خانه" }).click();
  await expect(page).toHaveTitle(" فایل ها ");
});

