const t = require("tap");
const request = require("supertest");
const app = require("../src/server/server");

t.test("server should start", async (t) => {
  t.plan(3);
  const response = await request(app).get("/");
  t.ok(response.body, "Response has body");
  t.match(response.body, { root: true });
  t.pass("Server is listening");
});
