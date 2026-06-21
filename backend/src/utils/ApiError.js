export class ApiError extends Error {
  constructor(statusCode, message,status) {
    super(message);
    this.statusCode = statusCode;
    this.status = status
    Error.captureStackTrace(this, this.constructor);
  }
}
