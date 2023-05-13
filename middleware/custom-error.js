class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new AppError(msg, statusCode);
};

module.exports = { createCustomError, AppError };
