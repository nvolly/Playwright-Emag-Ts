import { test as setup } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/ApiClient';
import { LoginCredentials } from '../../src/api/models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';
  const apiClient = await new ApiClient(apiUrl).init();
  
  const credentials: LoginCredentials = {
    email: process.env.TEST_USER_EMAIL || 'test@example.com',
    password: process.env.TEST_USER_PASSWORD || 'password123',
  };

  try {
    // Attempt to login
    const response = await apiClient.endpoints.auth.login(
      credentials.email,
      credentials.password
    );

    if (response.status() !== 200) {
      throw new Error(`Authentication failed: ${await response.text()}`);
    }

    const { accessToken, refreshToken } = await response.json();

    // Save authentication state
    await request.storageState({
      storageState: authFile,
      origins: [
        {
          origin: new URL(apiUrl).origin,
          localStorage: [
            { name: 'accessToken', value: accessToken },
            { name: 'refreshToken', value: refreshToken },
          ],
        },
      ],
    });
  } catch (error) {
    console.error('Authentication setup failed:', error);
    throw error;
  }
});
