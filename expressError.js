class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

class NotFoundError extends ExpressError {
  constructor(message) {
    super(message || "404 Not Found", 404);
  }
}

class UnauthorizedError extends ExpressError {
  constructor(message) {
    super(message || "Unauthorized Request", 401);
  }
}

class BadReqError extends ExpressError {
  constructor(message) {
    super(message || "Bad Request", 400);
  }
}

class ForbiddenError extends ExpressError {
  constructor(message) {
    super(message || "Forbidden", 403);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadReqError,
  ForbiddenError,
};
