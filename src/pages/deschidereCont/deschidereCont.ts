import { expect, Page } from "@playwright/test";
import PortalTradingPage from "../genericPages/portalTrading";

class PageDeschidereCont extends PortalTradingPage {
  page: Page;
  butonDeschidereCont: ReturnType<Page["locator"]>;
  chenarCompletareDate: ReturnType<Page["locator"]>;
  checkbox: ReturnType<Page["locator"]>;
  identity: ReturnType<Page["locator"]>;
  nextButton: ReturnType<Page["locator"]>;
  emailField: ReturnType<Page["locator"]>;
  phoneField: ReturnType<Page["locator"]>;
  doNotSubscribeBtn: ReturnType<Page["locator"]>;
  chenarAbonare: ReturnType<Page["locator"]>;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.butonDeschidereCont = page.locator("li.nav-item.nav-item--register");
    this.chenarCompletareDate = page.locator(
      "div.register-step-container__col2"
    );
    this.checkbox = page.locator("input.form-check-input");
    this.identity = page.locator('input[name="identity"]');
    this.nextButton = page.getByRole("button", { name: "Inainte" });
    this.emailField = page.locator("input#email");
    this.phoneField = page.locator("input#phone");
    this.doNotSubscribeBtn = page.locator("span.fs-5.ps-4");
    this.chenarAbonare = page.locator("div.register-step-container__col2");
  }

  async fillContactInfo(email: string, phone: string): Promise<void> {
    await this.checkbox.nth(0).check();
    await this.emailField.fill(email);
    await this.phoneField.fill(phone);
    await this.identity.nth(0).check();
    await this.checkbox.nth(5).check();
    await this.checkbox.nth(6).check();
  }

  async verifyGuid(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(10000);
    await this.page.waitForLoadState("networkidle");

    const allLocalStorage = await this.page.evaluate(() =>
      Object.entries(localStorage)
    );
    console.log("All localStorage entries:", allLocalStorage);

    await this.page.waitForFunction(
      () => localStorage.getItem("@guid") !== null,
      { timeout: 10000 }
    );
    const guidValue = await this.page.evaluate(() =>
      localStorage.getItem("@guid")
    );
    console.log("GUID from localStorage:", guidValue);
    expect(guidValue).not.toBeNull();
  }
}

export default PageDeschidereCont;
