import { chromium, BrowserContext, Page, FullConfig } from "@playwright/test";
import LoginPage from "./pages/loginPage";
import dotenv from "dotenv";

async function globalSetup(config: FullConfig): Promise<void> {
  // Load environment variables from .env file
  dotenv.config({ path: "./env/.env.prod" });

  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });

    // Validate PORTAL_URL
    const portalUrl = process.env.PORTAL_URL || "https://portal.tradeville.ro";
    console.log("URL where tests are running ->", portalUrl);

    await page.goto(portalUrl);

    const loginPage = new LoginPage(page);

    // Validate and fill username and password
    const username = process.env.PORTAL_USERNAME || "";
    const password = process.env.PORTAL_PASSWORD || "";

    if (!username || !password) {
      throw new Error("PORTAL_USERNAME or PORTAL_PASSWORD is not defined.");
    }

    console.log("Filling username...");
    await loginPage.usernameField.fill(username);

    console.log("Filling password...");
    await loginPage.passwordField.fill(password);

    console.log("Accepting cookies...");
    await loginPage.cookiesAccept.click();
    await page.waitForTimeout(3000);

    console.log("Clicking login button...");
    await loginPage.loginButton.click();
    await page.waitForTimeout(3000);

    // Save storage state
    const storageStatePath =
      typeof storageState === "string" && storageState.length
        ? storageState
        : "storageState.json";
    await context.storageState({ path: storageStatePath });

    await browser.close();
  } catch (error) {
    console.error("Error during global setup:", error);
    await browser.close();
    throw error;
  }
}

export default globalSetup;
