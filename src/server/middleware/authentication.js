const Collection = require("../services/collection");
const MongoDbClient = require("../services/mongodb");

async function authenticate(req, res, next) {
  const userId = req.params.userId;
  try {
    const { _id, err } = MongoDbClient.generateObjectId(userId);
    if (err) return next(err);
    const user = await Collection.getDocument("users", { _id });
    if (user) {
      req.user = user;
      next();
      return;
    }
    const error = new Error("User Authorization error");
    error.code = "USR_AUTH_ERR";
    throw error;
  } catch (error) {
    next(error);
  }
}

module.exports = authenticate;
module.exports.authenticate = authenticate;
