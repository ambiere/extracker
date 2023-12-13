const mongodb = require("./mongodb");

/** Class containing static method to ease read and write operation in mongodb database, using MongoClient driver
 *```js
 * 1 Collection.insertDocument(collectionName, document)
 * 2 Collection.getDocument(collectionName, filter, options)
 * 3 Collection.getDocuments(collectionName, filter, options)
 * ```
 * */
class Collection {
  constructor(collectionName) {
    this.collection = async function () {
      const db = await mongodb.getExtrackerDatabase();
      return db.collection(collectionName);
    };
  }

  /**Insert document in database collection
   * @param {string} collectionName - Collection name
   * @param {object} document - Document to insert
   * @returns {Promise<string>} `InsertedId`
   */
  static async insertDocument(collectionName, document) {
    const collection = await new Collection(collectionName).collection();
    const { acknowledged, insertedId } = await collection.insertOne(document);
    if (!acknowledged) {
      await mongodb.closeMongoClient();
      const error = new Error("Write result not aknowledged :)");
      throw error;
    }
    await mongodb.closeMongoClient();
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
    const collection = await new Collection(collectionName).collection();
    const document = await collection.findOne(filter, options);
    await mongodb.closeMongoClient();
    return document;
  }

  /**
   * Returns an array of documents from database collection
   * @param {string} collectionName - Collection name
   * @param {object} filter - Find query
   * @param {object} options - Options
   * @returns {any[]} `Documents array`
   */
  static async getDocuments(collectionName, filter = {}, options) {
    const collection = await new Collection(collectionName).collection();
    const documentsCursor = collection.find(filter, options);
    const documents = await documentsCursor.toArray();
    await mongodb.closeMongoClient();
    return documents;
  }
}

module.exports = Collection;
module.exports.Collection = Collection;
