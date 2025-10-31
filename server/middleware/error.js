export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: 400,
      message: err.message,
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: 401,
      message: "Invalid token",
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: 401,
      message: "User not authorized",
    });
  }

  res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
};
