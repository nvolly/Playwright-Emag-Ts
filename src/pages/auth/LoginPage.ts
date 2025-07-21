import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page Object for the Login page
 */
export class LoginPage extends BasePage {
  // Locators
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private errorMessage = '.error-message';
  private forgotPasswordLink = 'a[href*="forgot-password"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Perform login
   * @param username Username or email
   * @param password User password
   */
  async login(username: string, password: string): Promise<void> {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  /**
   * Click on forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }
}
