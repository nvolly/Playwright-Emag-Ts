import { Page, Locator } from '@playwright/test';
import BasePage from '../genericPages/basePage';

export default class LoginPage extends BasePage {
  pageTitle: Locator;
  usernameField: Locator;
  passwordField: Locator;
  logoutClasic: Locator;
  loginButton: Locator;
  loginButtonTest: Locator;
  loginMesajEroareParolaGresita: Locator;
  loginButtonClasic: Locator;
  usernameFieldClasic: Locator;
  passwordFieldClasic: Locator;
  loginButtonTV: Locator;
  cookiesAccept: Locator;
  showPass: Locator;
  mytvButton: Locator;
  loginSetup: Locator;
  portalButton: Locator;
  clasicButton: Locator;
  settingsButton: Locator;
  logoutPortal: Locator;
  settingsButtonClasic: Locator;
  inputUserLogareSesiuneExpirata: Locator;
  inputParolaLogareSesiuneExpirata: Locator;
  butonLogareSesiuneExpirata: Locator;

  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('title');
    this.usernameField = page.getByPlaceholder('Username', { exact: true });
    this.passwordField = page.getByPlaceholder('Parola', { exact: true });
    this.logoutClasic = page.locator('#butSingOut');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginButtonTest = page.getByRole('link', { name: 'Log in' });
    this.loginMesajEroareParolaGresita = page.getByText('user/parola gresite');
    this.loginButtonClasic = page.locator('input[id="butonlogin"]');
    this.usernameFieldClasic = page.locator('input[id="cod"]');
    this.passwordFieldClasic = page.locator('input[id="parola"]');
    this.loginButtonTV = page.locator('button[id="butonLoginTV"]');
    this.cookiesAccept = page.locator('input#ac--two');
    this.showPass = page.locator('img#showpwd');
    this.mytvButton = page.getByRole('link', { name: 'MyTradeVille' });
    this.loginSetup = page.locator('div.btn-group[role="group"]').nth(2);
    this.portalButton = page.getByRole('link', { name: 'Portal - din' });
    this.clasicButton = page.getByRole('link', { name: 'Varianta Clasica' });
    this.settingsButton = page.locator('a.settings.butonOptiuni.nuinchide').first();
    this.logoutPortal = page.getByText('Logout');
    this.settingsButtonClasic = page.locator('.icon').first();
    this.inputUserLogareSesiuneExpirata = page.locator('#inputUser');
    this.inputParolaLogareSesiuneExpirata = page.locator('#inputParola');
    this.butonLogareSesiuneExpirata = page.locator('#butonLogare');
  }

  async goto(): Promise<void> {
    await this.page.route('https://api.omappapi.com/v2/embed/239051?d=tradeville.ro', (route) =>
      route.abort()
    );

    await this.page.route(/(json)$/, (route) => route.abort());

    await this.page.goto(`${process.env.URL_LOGIN}`);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.cookiesAccept.click();

    if (await this.page.locator('form.login_form').isVisible()) {
      await this.inputUserLogareSesiuneExpirata.fill(process.env.PORTAL_USERNAME || '');
      await this.inputParolaLogareSesiuneExpirata.type(process.env.PORTAL_PASSWORD || '', {
        noWaitAfter: true,
      });
      await this.butonLogareSesiuneExpirata.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
      await this.cookiesAccept.click();
    }

    await this.page.waitForSelector('input[id="search"]', { state: 'visible' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    console.log('parola in validare logare parola noua', password);
    await this.loginButton.click();
  }

  async loginOption(option: string): Promise<void> {
    const dropdownItem = await this.page
      .locator(`.dropdown-menu .dropdown-item:has-text("${option}")`)
      .first();
    await dropdownItem.click();
  }
}
