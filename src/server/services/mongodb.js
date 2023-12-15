require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

/**
 * Class exposing a method to access a Db & MongoClient
 * and a static method to generate ObjectId
 *
 * @example
 *```js
 * const MongoDbClientInstane = new MongoDbClient(false)
 * const {Db, client} = await MongoDbClientInstance.getDatabase("extracter") //access Db and MongoClient
 * const _id = MongoDbClient.generateObjectId(inputId) // Generate ObjectId
 * ```
 */
class MongoDbClient {
  #serverApiOptions = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  };
  #mongoClientOptions;
  #client;

  constructor(isProduction) {
    this.#mongoClientOptions = isProduction ? { serverApi: this.#serverApiOptions } : {};
    this.#client = new MongoClient(process.env.MONGO_URL, this.#mongoClientOptions);
  }
  async getDatabase(databaseNme = "extracter") {
    await this.#client.connect();
    return {
      db: this.#client.db(databaseNme),
      client: this.#client,
    };
  }
  static generateObjectId(inputId) {
    try {
      return { _id: new ObjectId(inputId) };
    } catch (error) {
      const err = new Error(error);
      err.statusCode = 500;
      return { err };
    }
  }
}

module.exports = MongoDbClient;
module.exports.MongoDbclient = MongoDbClient;
