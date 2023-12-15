const { MongoServerError } = require("mongodb");

module.exports = function errorHandler(error, req, res, next) {
  const isServerInternalError = error.statusCode >= 500;
  const isUsernameConflictError = error.code === "USR_ALRD_EXIST";
  const isInvalidTimeError = error.message === "Invalid time value";
  const isAuthError = error.code === "USR_AUTH_ERR" || error.code === "ERR_WRNG_CRED";
  const isPasswordUsernameError = error.code === "PSD_USR_ERR" || error.code === "INVALID_CONTENT_ERR";

  if (isAuthError) ErrorUtil.handleAuthError(error, res);
  if (isServerInternalError) ErrorUtil.handleInternalError(error, req, res);
  if (isInvalidTimeError) ErrorUtil.handleInvalidTimeError(error, res);
  if (isUsernameConflictError) ErrorUtil.handleExistingUserError(error, res);
  if (isPasswordUsernameError) ErrorUtil.handlePasswordUsernameError(error, res);
  next(error);
};

const ErrorUtil = {
  handlePasswordUsernameError: (error, res) => {
    return res.status(400).json({
      code: error.code,
      error: error.message,
      statusCode: 400,
    });
  },
  handleInvalidTimeError: (error, res) => {
    return res.status(400).json({
      code: "DATE_RANGE_ERR",
      error: error.message,
      info: "Required date format mm-dd-yyyy",
      statusCode: 400,
    });
  },
  handleAuthError: (error, res) => {
    return res.status(401).json({
      code: error.code,
      error: error.message,
      statusCode: 401,
    });
  },
  handleExistingUserError: (error, res) => {
    return res.status(409).json({
      code: error.code,
      error: error.message,
      statusCode: 409,
    });
  },
  handleInternalError: (error, req, res) => {
    console.log();
    req.log.error({ req, res: res, error }, error.message);
    return res.status(500).json({
      info: `Fatal error: contact the support team. Id: ${req.id}.`,
      statusCode: error.statusCode,
    });
  },
};
