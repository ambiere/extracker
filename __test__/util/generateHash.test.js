const t = require("tap");
const generateHash = require("../../src/server/util/generateHash");

t.test("should hash password", async (t) => {
  const password = "userpassword";
  const { salt, hash } = await generateHash(password);
  t.ok(salt, "returned salt");
  t.ok(hash, "returned hash");

  t.test("hashed correct password should equal to correct user password hash", async (t) => {
    const { hash: correctHash } = await generateHash(password, salt);
    t.ok(correctHash, "returned hash");
    t.equal(hash, correctHash);
  });

  t.test("hashed incorrect password should not equal to correct user password hash", async (t) => {
    const _password = "wrongpassword";
    const { hash: incorrectHash } = await generateHash(_password, salt);
    t.ok(incorrectHash, "returned hash");
    t.not(hash, incorrectHash);
  });
});
