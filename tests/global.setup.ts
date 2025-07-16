import { chromium, BrowserContext, Page, FullConfig } from "@playwright/test";
import LoginPage from "./pages/loginPage";

async function globalSetup(config: FullConfig): Promise<void> {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  try {
    await page.goto(process.env.PORTAL_URL || "");

    const loginPage = new LoginPage(page);
    await loginPage.usernameField.fill(process.env.PORTAL_USERNAME || "");
    await loginPage.passwordField.fill(process.env.PORTAL_PASSWORD || "");

    await loginPage.cookiesAccept.click();
    await page.waitForTimeout(3000);
    await loginPage.loginButton.click();
    await page.waitForTimeout(3000);

    if (typeof storageState === "string" && storageState.length) {
      await context.storageState({ path: storageState });
    } else {
      await context.storageState({ path: "storageState.json" });
    }

    await browser.close();
  } catch (error) {
    await browser.close();
    throw error;
  }
}

export default globalSetup;
