# Playwright E2E Test Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript, following the Page Object Model (POM) pattern.

## Features

- 🚀 End-to-end testing with Playwright
- 📝 TypeScript support
- 🏗️ Page Object Model (POM) pattern
- 🔄 API testing support
- 📊 Multiple reporters (HTML, List, etc.)
- 🐳 Docker support
- 🔄 CI/CD ready with GitHub Actions

## Project Structure

```
playwright-e2e-framework/
├── .github/                   # GitHub Actions workflows
├── configs/                   # Configuration files
├── docker/                    # Docker configuration
├── docs/                      # Documentation
├── reports/                   # Test reports
├── src/                       # Source code
│   ├── api/                   # API testing utilities
│   ├── fixtures/              # Test data and mocks
│   ├── pages/                 # Page objects
│   └── utils/                 # Utility functions
└── tests/                     # Test files
    ├── api/                   # API tests
    ├── bdd/                   # BDD tests
    ├── e2e/                   # End-to-end tests
    └── performance/           # Performance tests
```

## Prerequisites

- Node.js 16+
- npm or yarn
- Playwright

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd playwright-e2e-framework
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

## Running Tests

### Run all tests

```bash
npm test
```

### Run specific test suite

# Run all tests

npm test

# Run E2E tests

npm run test:e2e

# Run API tests

npm run test:api

# Run performance tests

artillery run tests/performance/scenarios/load-test.yml

## Writing Tests

### Page Objects

Page objects are located in `src/pages/`. Each page should extend the `BasePage` class.

Example:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';
  private errorMessage = '.error-message';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
```

### Writing E2E Tests

E2E tests are located in `tests/e2e/`. Each test file should focus on a specific feature or user flow.

Example (`tests/e2e/auth/login.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/auth/LoginPage';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login with valid credentials', async ({ page }) => {
    // Arrange
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpass';

    // Act
    await loginPage.login(username, password);

    // Assert
    await expect(page).toHaveURL(/.*dashboard/);
  });
});
```

### Writing API Tests

API tests are located in `tests/api/` and use the `ApiClient` class for making HTTP requests.

Example (`tests/api/auth/auth.api.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/ApiClient';

let apiClient: ApiClient;

// Initialize API client before tests
test.beforeAll(async () => {
  apiClient = await new ApiClient(process.env.API_BASE_URL || 'http://localhost:3000').init();
});

test.describe('Authentication API', () => {
  test('should authenticate with valid credentials', async () => {
    // Act
    const response = await apiClient.endpoints.auth.login(
      process.env.TEST_EMAIL || 'test@example.com',
      process.env.TEST_PASSWORD || 'testpass'
    );

    // Assert
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
  });
});
```

### Writing BDD Tests

BDD tests use Cucumber.js and are located in `tests/bdd/`.

Feature file (`tests/bdd/features/auth/login.feature`):
```gherkin
Feature: User Login
  As a user
  I want to log in to the application
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard
```

Step definitions (`tests/bdd/step-definitions/auth/login.steps.ts`):
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../../src/pages/auth/LoginPage';

let loginPage: LoginPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goto();
});

When('I enter valid credentials', async function () {
  await loginPage.login(
    process.env.TEST_USERNAME || 'testuser',
    process.env.TEST_PASSWORD || 'testpass'
  );
});

Then('I should be redirected to the dashboard', async function () {
  await expect(this.page).toHaveURL(/.*dashboard/);
});
```

## Test Data Management

Test data is managed in `src/fixtures/` and can be imported into tests as needed.

Example (`src/fixtures/test-data/users.json`):
```json
{
  "validUser": {
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test@1234"
  }
}
```

## Environment Configuration

Environment-specific configurations are stored in `.env` files. Copy `.env.example` to `.env` and update the values:

```env
# Application
BASE_URL=http://localhost:3000
API_BASE_URL=http://localhost:3000/api
NODE_ENV=test

# Test Users
TEST_USERNAME=testuser
TEST_PASSWORD=testpass
TEST_EMAIL=test@example.com
```

## Best Practices

1. **Page Objects**:
   - Keep selectors in page objects
   - Group related actions in page object methods
   - Return new page objects for navigation methods

2. **Tests**:
   - Keep tests focused and independent
   - Use descriptive test names
   - Follow the Arrange-Act-Assert pattern
   - Use test data from fixtures

3. **API Testing**:
   - Test happy paths and error cases
   - Validate response schemas
   - Test edge cases and boundary conditions

4. **Performance Testing**:
   - Start with a baseline test
   - Gradually increase load
   - Monitor server metrics
   - Set performance budgets

## Debugging Tests

### Debug Mode
Run tests in debug mode to pause execution:
```bash
# Debug E2E tests
npm run test:e2e:debug

# Debug API tests
npm run test:api:debug
```

### UI Mode
Use Playwright's UI mode for visual debugging:
```bash
npx playwright test --ui
```

### Screenshots
Screenshots are automatically taken on test failure and saved in `test-results/`.

## CI/CD Integration

The framework includes GitHub Actions workflows for:
- `e2e-tests.yml`: Runs end-to-end tests
- `api-tests.yml`: Runs API tests
- `performance-tests.yml`: Runs performance tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
  private loginButton = 'button[type="submit"]';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}
```

### API Tests

API tests use the `ApiClient` class located in `src/api/clients/ApiClient.ts`.

Example:

```typescript
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/ApiClient';

test.describe('Users API', () => {
  let apiClient: ApiClient;

  test.beforeAll(async () => {
    apiClient = await new ApiClient('https://api.example.com').init();
  });

  test('should get user by ID', async () => {
    const response = await apiClient.get('/users/1');
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
  });
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
