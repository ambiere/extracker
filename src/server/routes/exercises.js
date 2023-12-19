const { Router } = require("express");
const Collection = require("../services/collection");
const authenticate = require("../middleware/authentication");
const processFilterOperations = require("../util/processFilterOperations");
const MongoDbClient = require("../services/mongodb");
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
      duration: parseInt(duration),
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
    };
    const insertedId = await Collection.insertDocument("exercises", exercises);
    insertedId && res.json({ exerciseId: insertedId });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/exercises/:exerciseId", authenticate, async function (req, res, next) {
  try {
    const { exerciseId } = req.params;
    if (exerciseId) {
      const { _id, err } = MongoDbClient.generateObjectId(exerciseId);
      if (err) return next(err);
      const options = { projection: { _id: 0 } };
      const exercie = await Collection.getDocument("exercises", { _id }, options);
      if (exercie) {
        return res.json(exercie);
      }
      const error = new Error("Exercise not found");
      error.code = "EX_NOT_FOUND";
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/logs", authenticate, async function (req, res, next) {
  try {
    const to = [req.query.to, "$lte"];
    const from = [req.query.from, "$gte"];
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const options = { projection: { userId: 0 }, sort: { date: 1 }, limit };
    const filter = { userId: req.user._id.toString(), ...processFilterOperations([from, to]) };
    let { documents, totalDocuments } = await Collection.getDocuments("exercises", filter, options);

    documents = documents
      ? documents.map((document) => {
          document.exerciseId = document._id.toString();
          delete document._id;
          return {
            ...document,
            date: new Date(document.date).toDateString(),
          };
        })
      : [];

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
