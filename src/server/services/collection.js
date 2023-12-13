const mongodb = require("./mongodb");

const getExtrackerCollection = async (collection) => {
  const db = await mongodb.getExtrackerDatabase();
  return db.collection(collection);
};

async function insertExercise(exercise) {
  const exercisesCollection = await getExtrackerCollection("exercises");
  const { acknowledged, insertedId } = await exercisesCollection.insertOne(exercise);
  if (!acknowledged) {
    await mongodb.closeMongoClient();
    const error = new Error("Write result not aknowledged :)");
    throw error;
  }
  await mongodb.closeMongoClient();
  return insertedId.toString();
}

async function getExercise(exerciseId) {
  const exercisesCollection = await getExtrackerCollection("exercises");
  const exerciseDoc = await exercisesCollection.findOne({ exerciseId }, { projection: { _id: 0 } });
  await mongodb.closeMongoClient();
  return exerciseDoc;
}

async function getExercises(from, to, limit) {
  const exercisesCollection = await getExtrackerCollection("exercises");
  const option = {
    limit: limit,
    min: from,
    max: to,
  };
  const exercisesCursor = exercisesCollection.find({}, option);
  const exercises = await exercisesCursor.toArray();
  await mongodb.closeMongoClient();
  return exercises;
}

async function insertUser({ username, password }) {
  const usersCollection = await getExtrackerCollection("users");
  const { acknowledged, insertedId } = await usersCollection.insertOne({ username, password });
  if (!acknowledged) {
    await mongodb.closeMongoClient();
    const error = new Error("Write result not aknowledged :)");
    throw error;
  }
  await mongodb.closeMongoClient();
  return insertedId.toString();
}

async function getUser(userId) {
  const usersCollection = await getExtrackerCollection("exercises");
  const userDoc = await usersCollection.findOne({ userId }, { projection: { _id: 0 } });
  await mongodb.closeMongoClient();
  return userDoc;
}

module.exports = { insertExercise, getExercise, getExercises, insertUser, getUser };
