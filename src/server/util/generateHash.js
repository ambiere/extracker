const crypto = require("node:crypto");
const util = require("node:util");

const pbkdf2 = util.promisify(crypto.pbkdf2);

async function generateHash(password, salt) {
  if (!salt) {
    salt = crypto.randomBytes(16).toString("hex");
  }
  const h = await pbkdf2(password, salt, 1000, 64, "sha256");
  const hash = h.toString("hex");
  return { salt, hash };
}

module.exports = generateHash;
module.exports.generateHash = generateHash;
