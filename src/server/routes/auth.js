const { Router } = require("express");
const generateHash = require("../util/generateHash");
const Collection = require("../services/collection");
const router = Router({ strict: true });

router.post("/register", async function (req, res, next) {
  const password = req.body.password;
  const username = req.body.username;

  try {
    if (password && username) {
      const filter = { username };
      const options = { projection: { _id: 0, salt: 0, hash: 0 } };
      const user = await Collection.getDocument("users", filter, options);
      if (user) {
        const error = new Error("User already registered");
        error.code = "USR_ALRD_EXIST";
        throw error;
      }
      const { salt, hash } = await generateHash(password);
      const insertedId = await Collection.insertDocument("users", { username, salt, hash });
      insertedId && res.json({ userId: insertedId });
    } else {
      const error = new Error("password or username required");
      error.code = "PSD_USR_ERR";
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.post("/authenticate", async function (req, res, next) {
  const password = req.body.password;
  const username = req.body.username;

  try {
    if (password && username) {
      const filter = { username };
      const options = { projection: { username: 0 } };
      const user = await Collection.getDocument("users", filter, options);
      if (!user) {
        const error = new Error("Wrong credintials");
        error.code = "ERR_WRNG_CRED";
        throw error;
      }
      const { hash } = await generateHash(password, user.salt);
      if (hash != user.hash) {
        const error = new Error("Wrong credintials");
        error.code = "ERR_WRNG_CRED";
        throw error;
      }
      res.json({ userId: user._id.toString() });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
