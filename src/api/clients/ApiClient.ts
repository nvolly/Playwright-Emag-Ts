import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { expect } from '@playwright/test';
import { ApiEndpoints } from '../endpoints/ApiEndpoints';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: any;
  failOnStatusCode?: boolean;
};

/**
 * API Client for making HTTP requests
 */
export class ApiClient {
  private request!: APIRequestContext;
  private baseUrl: string;
  public endpoints: ApiEndpoints;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.endpoints = new ApiEndpoints(this);
  }

  /**
   * Initialize the API client
   */
  async init(): Promise<this> {
    this.request = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return this;
  }

  /**
   * Make a GET request
   */
  async get(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.get(endpoint, {
      headers: options.headers,
      params: options.params,
      failOnStatusCode: options.failOnStatusCode,
    });
  }

  /**
   * Make a POST request
   */
  async post(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.post(endpoint, {
      headers: options.headers,
      params: options.params,
      data: options.data,
      failOnStatusCode: options.failOnStatusCode,
    });
  }

  /**
   * Make a PUT request
   */
  async put(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.put(endpoint, {
      headers: options.headers,
      params: options.params,
      data: options.data,
      failOnStatusCode: options.failOnStatusCode,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.patch(endpoint, {
      headers: options.headers,
      params: options.params,
      data: options.data,
      failOnStatusCode: options.failOnStatusCode,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(endpoint, {
      headers: options.headers,
      params: options.params,
      data: options.data,
      failOnStatusCode: options.failOnStatusCode,
    });
  }

  /**
   * Set default headers for all requests
   */
  async setDefaultHeaders(headers: Record<string, string>): Promise<void> {
    await this.request.dispose();
    this.request = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });
  }

  /**
   * Clear all cookies and reset headers
   */
  async clearContext(): Promise<void> {
    await this.request.dispose();
    await this.init();
  }

  /**
   * Verify response status code
   */
  verifyStatusCode(response: APIResponse, expectedStatus: number): void {
    expect(response.status()).toBe(expectedStatus);
  }
}
