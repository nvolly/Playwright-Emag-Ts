import { Page, Locator } from "@playwright/test";

export default class BasePage {
  readonly page: Page;
  readonly selectSubcont: Locator;
  readonly inputUserLogareSesiuneExpirata: Locator;
  readonly inputParolaLogareSesiuneExpirata: Locator;
  readonly butonLogareSesiuneExpirata: Locator;
  readonly alerta2FASesiuneExpirata: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectSubcont = page.locator("#selectSubcont");
    this.inputUserLogareSesiuneExpirata = page.locator(
      "input.login-form-field.usernamelogin"
    );
    this.inputParolaLogareSesiuneExpirata = page.locator(
      "input.login-form-field.parolalogin"
    );
    this.butonLogareSesiuneExpirata = page.getByRole("button", {
      name: "Login",
    });
    this.alerta2FASesiuneExpirata = page.locator("div#Login2FA");
  }
}
