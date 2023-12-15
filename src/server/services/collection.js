require("dotenv").config();
const MongoDbclient = require("./mongodb");

/** Class containing static method to ease read and write operation in mongodb database, using MongoClient driver
 *```js
 * 1 Collection.insertDocument(collectionName, document)
 * 2 Collection.getDocument(collectionName, filter, options)
 * 3 Collection.getDocuments(collectionName, filter, options)
 * ```
 * */
class Collection {
  constructor(isProduction = process.env.NODE_ENV === "production") {
    this.mongodbClient = async function () {
      const MongoDbClientInstance = new MongoDbclient(isProduction);
      return await MongoDbClientInstance.getDatabase();
    };
  }

  /**Insert document in database collection
   * @param {string} collectionName - Collection name
   * @param {object} document - Document to insert
   * @returns {Promise<string>} `InsertedId`
   */
  static async insertDocument(collectionName, document) {
    const { db, client } = await new Collection().mongodbClient();
    const collection = db.collection(collectionName);
    const { acknowledged, insertedId } = await collection.insertOne(document);
    if (!acknowledged) {
      await client.close();
      const error = new Error("Write result not aknowledged :)");
      error.code = "WR_RESULT_NOT_ACK";
      throw error;
    }
    await client.close();
    return insertedId.toString();
  }

  /**
   * Find document from database collection
   * @param {string} collectionName - Collection name
   * @param {object} filter - Find query
   * @param {object} options - Options
   * @returns {Promise<any|null>} `Document` | `null`
   */
  static async getDocument(collectionName, filter, options) {
    const { db, client } = await new Collection().mongodbClient();
    const collection = db.collection(collectionName);
    const document = await collection.findOne(filter, options);
    await client.close();
    return document;
  }

  /**
   * Returns an array of documents from database collection
   * @param {string} collectionName - Collection name
   * @param {object} filter - Find query
   * @param {object} options - Options
   * @returns {{documents: any[], totalDocuments: number}} Documents array and total documents in array
   */
  static async getDocuments(collectionName, filter = {}, options) {
    const { db, client } = await new Collection().mongodbClient();
    const collection = db.collection(collectionName);
    const documentsCursor = collection.find(filter, options);
    const documents = await documentsCursor.toArray();
    await documentsCursor.close();

    await client.close();
    return { documents, totalDocuments: documents.length };
  }
}

module.exports = Collection;
module.exports.Collection = Collection;
