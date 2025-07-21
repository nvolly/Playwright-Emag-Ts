import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/clients/ApiClient';
import { LoginCredentials } from '../../src/api/models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test data
const testUser: LoginCredentials = {
  email: process.env.TEST_USER_EMAIL || 'test@example.com',
  password: process.env.TEST_USER_PASSWORD || 'password123',
};

// Test suite for Authentication API
test.describe('Authentication API', () => {
  let apiClient: ApiClient;
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

  test.beforeAll(async () => {
    apiClient = await new ApiClient(apiUrl).init();
  });

  test('should successfully login with valid credentials', async () => {
    // Act
    const response = await apiClient.endpoints.auth.login(
      testUser.email,
      testUser.password
    );

    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user.email).toBe(testUser.email);
  });

  test('should fail to login with invalid credentials', async () => {
    // Arrange
    const invalidCredentials: LoginCredentials = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    };

    // Act
    const response = await apiClient.endpoints.auth.login(
      invalidCredentials.email,
      invalidCredentials.password
    );

    // Assert
    expect(response.status()).toBe(401);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('success', false);
    expect(responseBody).toHaveProperty('error');
  });

  test('should refresh access token with valid refresh token', async () => {
    // First login to get tokens
    const loginResponse = await apiClient.endpoints.auth.login(
      testUser.email,
      testUser.password
    );
    const { refreshToken } = await loginResponse.json();

    // Refresh the token
    const refreshResponse = await apiClient.endpoints.auth.refreshToken(refreshToken);
    
    // Assert
    expect(refreshResponse.status()).toBe(200);
    
    const responseBody = await refreshResponse.json();
    expect(responseBody).toHaveProperty('accessToken');
    expect(responseBody).toHaveProperty('refreshToken');
  });

  test('should get current user with valid token', async () => {
    // First login to get token
    const loginResponse = await apiClient.endpoints.auth.login(
      testUser.email,
      testUser.password
    );
    const { accessToken } = await loginResponse.json();
    
    // Set the token in the client
    await apiClient.setDefaultHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    // Get current user
    const userResponse = await apiClient.endpoints.users.getCurrentUser();
    
    // Assert
    expect(userResponse.status()).toBe(200);
    
    const userData = await userResponse.json();
    expect(userData).toHaveProperty('email', testUser.email);
  });
});
