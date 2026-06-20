export class ApiError extends Error {
  constructor(statusCode, message,success) {
    super(message);
    this.statusCode = statusCode;
    this.success = false
    Error.captureStackTrace(this, this.constructor);
  }
}
