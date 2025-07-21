import { ApiClient } from '../clients/ApiClient';

/**
 * Collection of API endpoints for the application
 */
export class ApiEndpoints {
  constructor(private api: ApiClient) {}

  // Auth endpoints
  login(email: string, password: string) {
    return this.api.post('/auth/login', {
      data: { email, password },
      failOnStatusCode: false,
    });
  }

  logout() {
    return this.api.post('/auth/logout');
  }

  refreshToken(refreshToken: string) {
    return this.api.post('/auth/refresh-token', {
      data: { refreshToken },
    });
  }

  // User endpoints
  getCurrentUser() {
    return this.api.get('/users/me');
  }

  updateUserProfile(userData: any) {
    return this.api.put('/users/me', {
      data: userData,
    });
  }

  // Example resource endpoints
  getResources() {
    return this.api.get('/resources');
  }

  getResourceById(id: string) {
    return this.api.get(`/resources/${id}`);
  }

  createResource(resourceData: any) {
    return this.api.post('/resources', {
      data: resourceData,
    });
  }

  updateResource(id: string, resourceData: any) {
    return this.api.put(`/resources/${id}`, {
      data: resourceData,
    });
  }

  deleteResource(id: string) {
    return this.api.delete(`/resources/${id}`);
  }
}
