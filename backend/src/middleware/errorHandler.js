const { buildError } = require("../utils/apiResponse");

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    res
      .status(400)
      .json(
        buildError("Validation failed", {
          details: Object.values(err.errors).map((item) => item.message),
        })
      );
    return;
  }

  if (err.code === 11000) {
    res
      .status(409)
      .json(buildError("A record with this value already exists"));
    return;
  }

  res
    .status(statusCode)
    .json(
      buildError(err.message || "Something went wrong", {
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
      })
    );
};

module.exports = errorHandler;
