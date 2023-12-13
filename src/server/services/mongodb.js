require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

/**
 * Class exposing MongoClient instance and a method to access a Db
 *
 * ```js
 * const MongoDbClientInstane = new MongoDbClient(false)
 * const client = MongoDbClientInstance.client // MongoClient
 * const Db = MongoDbClientInstance.getDatabase("extracter") //access Db
 * ```
 */
class MongoDbClient {
  #serverApiOptions = {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  };
  #mongoClientOptions;

  constructor(isProduction) {
    this.#mongoClientOptions = isProduction ? { serverApi: this.#serverApiOptions } : {};
    this.client = new MongoClient(process.env.MONGO_URL, this.#mongoClientOptions);
  }

  /**
   * Return Db instance
   * @param {string?} databaseNme
   */
  async getDatabase(databaseNme = "extracter") {
    await this.client.connect();
    return this.client.db(databaseNme);
  }
}

module.exports = MongoDbClient;
module.exports.MongoDbclient = MongoDbClient;
