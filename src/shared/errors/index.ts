// Base application error class
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string = "GENERIC_ERROR",
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: unknown
  ) {
    super(message);
    
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Specific error types
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 400, true, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(message, "UNAUTHORIZED", 401, true);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden access") {
    super(message, "FORBIDDEN", 403, true);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "CONFLICT", 409, true, details);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, "RATE_LIMIT", 429, true);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "DATABASE_ERROR", 500, true, details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message: string, details?: unknown) {
    super(`${service} service error: ${message}`, "EXTERNAL_SERVICE_ERROR", 502, true, details);
  }
}

export class CacheError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "CACHE_ERROR", 500, true, details);
  }
}

// Error factory for creating standardized errors
export class ErrorFactory {
  static validation(message: string, details?: unknown): ValidationError {
    return new ValidationError(message, details);
  }

  static notFound(resource?: string): NotFoundError {
    return new NotFoundError(resource);
  }

  static unauthorized(message?: string): UnauthorizedError {
    return new UnauthorizedError(message);
  }

  static forbidden(message?: string): ForbiddenError {
    return new ForbiddenError(message);
  }

  static conflict(message: string, details?: unknown): ConflictError {
    return new ConflictError(message, details);
  }

  static rateLimit(message?: string): RateLimitError {
    return new RateLimitError(message);
  }

  static database(message: string, details?: unknown): DatabaseError {
    return new DatabaseError(message, details);
  }

  static externalService(service: string, message: string, details?: unknown): ExternalServiceError {
    return new ExternalServiceError(service, message, details);
  }

  static cache(message: string, details?: unknown): CacheError {
    return new CacheError(message, details);
  }

  static generic(
    message: string,
    code?: string,
    statusCode?: number,
    details?: unknown
  ): AppError {
    return new AppError(message, code, statusCode, true, details);
  }
}

// Error utilities
export const errorUtils = {
  isAppError: (error: unknown): error is AppError => {
    return error instanceof AppError;
  },

  isOperationalError: (error: unknown): boolean => {
    return errorUtils.isAppError(error) && error.isOperational;
  },

  getErrorMessage: (error: unknown): string => {
    if (errorUtils.isAppError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred";
  },

  getErrorCode: (error: unknown): string => {
    if (errorUtils.isAppError(error)) {
      return error.code;
    }
    return "UNKNOWN_ERROR";
  },

  getStatusCode: (error: unknown): number => {
    if (errorUtils.isAppError(error)) {
      return error.statusCode;
    }
    return 500;
  },

  formatErrorForClient: (error: unknown): {
    message: string;
    code: string;
    statusCode: number;
    details?: unknown;
  } => {
    if (errorUtils.isAppError(error)) {
      return {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        details: error.details,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: "UNKNOWN_ERROR",
        statusCode: 500,
      };
    }

    return {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
      statusCode: 500,
    };
  },

  formatErrorForLog: (error: unknown): {
    message: string;
    code: string;
    statusCode: number;
    stack?: string;
    details?: unknown;
    timestamp: string;
  } => {
    const clientError = errorUtils.formatErrorForClient(error);
    
    return {
      ...clientError,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    };
  },

  logError: (error: unknown, context?: string): void => {
    const errorLog = errorUtils.formatErrorForLog(error);
    const logMessage = context 
      ? `[${context}] ${errorLog.message}` 
      : errorLog.message;

    if (errorLog.statusCode >= 500) {
      console.error(logMessage, errorLog);
    } else {
      console.warn(logMessage, errorLog);
    }
  },
};

// Result type for better error handling
export type Result<T, E = AppError> = 
  | { success: true; data: T }
  | { success: false; error: E };

export const Result = {
  success: <T>(data: T): Result<T> => ({ success: true, data }),
  
  failure: <E = AppError>(error: E): Result<never, E> => ({ success: false, error }),
  
  from: async <T>(promise: Promise<T>): Promise<Result<T>> => {
    try {
      const data = await promise;
      return Result.success(data);
    } catch (error) {
      return Result.failure(
        errorUtils.isAppError(error) 
          ? error 
          : new AppError(errorUtils.getErrorMessage(error))
      );
    }
  },
  
  fromSync: <T>(fn: () => T): Result<T> => {
    try {
      const data = fn();
      return Result.success(data);
    } catch (error) {
      return Result.failure(
        errorUtils.isAppError(error) 
          ? error 
          : new AppError(errorUtils.getErrorMessage(error))
      );
    }
  },
};