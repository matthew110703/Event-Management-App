/** @description Error Handler Middlware */
const errorHandler = (err, req, res, next) => {
  // Status code and details
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log
  console.log(`Error: ${err.message}`, err);

  // Response
  res.status(statusCode).json({ errorCode: statusCode, error: message });
};

export default errorHandler;
