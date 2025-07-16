import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import type { Browser, Page } from "playwright";

let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("User navigates to the Browserstack Homepage", async () => {
  await page.goto("https://www.browserstack.com/");
});

When("User clicks on Product Menu", async () => {
  await page.locator('button[aria-label="Products"]').waitFor();
  await page.locator('button[aria-label="Products"]').click();
});

Then("It should show Web Testing Product", async () => {
  await page
    .locator('div[aria-label="Products"] button[title="Web Testing"]')
    .waitFor();
  const isVisible = await page
    .locator('div[aria-label="Products"] button[title="Web Testing"] span')
    .isVisible();
  expect(isVisible).toBeTruthy();
});

When("User clicks on Pricing Menu", async () => {
  await page.locator('a[title="Pricing"]').click();
});

Then("It should Display correct Product lists in left Nav", async () => {
  const leftNavProducts = await page
    .locator('div[id="sidenav__list"]')
    .textContent();
  const productArray =
    leftNavProducts?.split("\n").map((item) => item.trim()) || [];
  expect(productArray).toEqual(expect.arrayContaining(["Live", "App Live"]));
});

After(async () => {
  await browser.close();
});
