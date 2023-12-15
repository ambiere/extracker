const { Router } = require("express");
const Collection = require("../services/collection");
const authenticate = require("../middleware/authentication");
const processFilterOperations = require("../util/processFilterOperations");
const router = Router({ strict: true });

router.post("/:userId/exercises", authenticate, async function (req, res, next) {
  try {
    const { description, duration, date } = req.body;
    if (!description || !duration) {
      const error = new Error("Invalid content. Description and duration are required ");
      error.code = "INVALID_CONTENT_ERR";
      throw error;
    }
    const exercises = {
      userId: req.user._id.toString(),
      description,
      duration,
      date: date ? new Date(date).toDateString() : new Date().toDateString(),
    };
    const insertedId = await Collection.insertDocument("exercises", exercises);
    insertedId && res.json({ exerciseId: insertedId });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/logs", authenticate, async function (req, res, next) {
  try {
    const to = [req.query.to, "$lte"];
    const from = [req.query.from, "$gte"];
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const options = { projection: { _id: 0, userId: 0 }, sort: { date: 1 }, limit };
    const filter = { userId: req.user._id.toString(), ...processFilterOperations([from, to]) };
    const { documents, totalDocuments } = await Collection.getDocuments("exercises", filter, options);
    res.json({
      username: req.user.username,
      userId: req.user._id,
      count: totalDocuments,
      log: documents,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
