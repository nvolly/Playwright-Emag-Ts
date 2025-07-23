import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';
import { DashboardPage } from '../../src/pages/dashboard/DashboardPage';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test data
const testUser = {
  username: process.env.TEST_USERNAME || 'testuser',
  password: process.env.TEST_PASSWORD || 'password123',
};

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Act
    await loginPage.login(testUser.username, testUser.password);

    // Assert
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(dashboardPage.isDashboardLoaded()).resolves.toBeTruthy();
  });

  test('should display error message with invalid credentials', async ({ page }) => {
    // Act
    await loginPage.login('invalid', 'credentials');

    // Assert
    await expect(loginPage.isErrorMessageVisible()).resolves.toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should navigate to forgot password page', async ({ page }) => {
    // Act
    await loginPage.clickForgotPassword();

    // Assert
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  test('should redirect to dashboard if already logged in', async ({ page }) => {
    // Arrange - login first
    await loginPage.login(testUser.username, testUser.password);
    await expect(dashboardPage.isDashboardLoaded()).resolves.toBeTruthy();

    // Act - navigate to login page again
    await loginPage.goto();

    // Assert - should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
