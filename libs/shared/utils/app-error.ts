// libs/shared/src/app-error.ts

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * AppError is a generic error class for application errors.
 * Use the statusCode parameter to indicate the appropriate HTTP status code.
 * Example usage:
 *   throw new AppError('User not found', 404);
 *   throw new AppError('Invalid input', 400, { field: 'email' });
 */

export class InternalServerAppError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 500, details);
  }
}
