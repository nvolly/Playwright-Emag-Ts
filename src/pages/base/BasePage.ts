import { Page, Locator } from '@playwright/test';

/**
 * BasePage class that all page objects will extend.
 * Contains common functionality and utilities.
 */
export abstract class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param path URL path to navigate to
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Get the current page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current URL
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for a specific URL
   * @param url URL to wait for
   * @param timeout Timeout in milliseconds
   */
  async waitForUrl(url: string | RegExp, timeout = 10000): Promise<void> {
    await this.page.waitForURL(url, { timeout });
  }

  /**
   * Wait for an element to be visible
   * @param locator Element locator
   * @param timeout Timeout in milliseconds
   */
  async waitForElement(locator: string | Locator, timeout = 10000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click on an element
   * @param locator Element locator
   */
  async click(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click();
  }

  /**
   * Type text into an input field
   * @param locator Input field locator
   * @param text Text to type
   */
  async type(locator: string | Locator, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(text);
  }

  /**
   * Get text content of an element
   * @param locator Element locator
   */
  async getText(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.textContent() ?? '';
  }

  /**
   * Check if an element is visible
   * @param locator Element locator
   */
  async isVisible(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible().catch(() => false);
  }
}
