module.exports = function errorHandler(error, request, response, next) {
  response.status(400).json({ error: error.message, statusCode: 400 });
  next(error);
};
