import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

/**
 * Page Object for the Dashboard page
 */
export class DashboardPage extends BasePage {
  // Locators
  private welcomeMessage = '.welcome-message';
  private userMenu = '.user-menu';
  private logoutButton = '.logout-button';
  private dashboardTitle = '.dashboard-title';
  private quickActions = '.quick-actions';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the dashboard
   */
  async goto(): Promise<void> {
    await this.navigate('/dashboard');
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getText(this.welcomeMessage);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    await this.click(this.userMenu);
    await this.click(this.logoutButton);
  }

  /**
   * Check if dashboard is loaded
   */
  async isDashboardLoaded(): Promise<boolean> {
    return this.isVisible(this.dashboardTitle);
  }

  /**
   * Get quick actions count
   */
  async getQuickActionsCount(): Promise<number> {
    return (await this.page.locator(`${this.quickActions} .action-item`).all()).length;
  }
}
