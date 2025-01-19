/** @description Error Handler Middlware */
const errorHandler = (err, req, res, next) => {
  // Status code
  const statusCode = err.StatusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log
  console.log(`Error: ${err.message}`, err);

  // Response
  res.status(statusCode).json({ error: message });
};

export default errorHandler;
