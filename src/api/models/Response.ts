/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Paginated response data
 */
export interface PaginatedData<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Error response
 */
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  code?: string;
  details?: Record<string, any>;
}

/**
 * Validation error response
 */
export interface ValidationErrorResponse extends ErrorResponse {
  errors: Array<{
    field: string;
    message: string;
    type: string;
  }>;
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, meta?: any): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Error response helper
 */
export function errorResponse(
  message: string,
  code: string = 'INTERNAL_ERROR',
  details?: Record<string, any>
): ApiResponse<null> {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
  };
}

/**
 * Pagination response helper
 */
export function paginatedResponse<T>(
  items: T[], 
  total: number, 
  page: number = 1, 
  limit: number = 10
): ApiResponse<PaginatedData<T>> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    data: {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    },
  };
}
