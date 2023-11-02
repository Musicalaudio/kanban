export class AppError extends Error {
  errorCode: Number;
  statusCode: Number;
  constructor(errorCode: Number, message: string, statusCode: Number) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
