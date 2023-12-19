const t = require("tap");
const request = require("supertest");
const app = require("../../src/server/server");

t.test("should register new user with correct credentials", async (t) => {
  const credentials = {
    username: "newuser",
    password: "newpassword",
  };

  const response = await request(app)
    .post("/v0/api/auth/register")
    .set("Content-Type", "application/json")
    .send(credentials);
  t.ok(response.body.userId, "returned user id");
  t.equal(response.statusCode, 200);
  t.match(response.body.userId, /\w+/);

  t.test("should authenticate when provided with registered user credentials", async (t) => {
    const response = await request(app)
      .post("/v0/api/auth/authenticate")
      .set("Content-Type", "application/json")
      .send(credentials);

    t.ok(response.body.userId, "returned user id");
    t.equal(response.statusCode, 200);
    t.match(response.body.userId, /\w+/);
  });

  t.test("fails to authenticate with incorrect username or password", async (t) => {
    t.test("incorrect password", async (t) => {
      const credentials = {
        username: "newuser",
        password: "newpassword1",
      };
      const response = await request(app)
        .post("/v0/api/auth/authenticate")
        .set("Content-Type", "application/json")
        .send(credentials);

      t.ok(response.body, "returned error object");
      t.equal(response.statusCode, 401);
      t.match(response.body, {
        code: "ERR_WRNG_CRED",
        error: "Wrong credintials",
        statusCode: 401,
      });
    });

    t.test("incorrect username", async (t) => {
      const credentials = {
        username: "newuser9",
        password: "newpassword",
      };
      const response = await request(app)
        .post("/v0/api/auth/authenticate")
        .set("Content-Type", "application/json")
        .send(credentials);

      t.ok(response.body, "returned error object");
      t.equal(response.statusCode, 401);
      t.match(response.body, {
        code: "ERR_WRNG_CRED",
        error: "Wrong credintials",
        statusCode: 401,
      });
    });
  });

  t.test("fails to register when user with same username already exist", async (t) => {
    const response = await request(app)
      .post("/v0/api/auth/register")
      .set("Content-Type", "application/json")
      .send(credentials);

    t.ok(response.body, "returned error object");
    t.equal(response.statusCode, 409);
    t.match(response.body, {
      code: "USR_ALRD_EXIST",
      error: "User already registered",
      statusCode: 409,
    });
  });
});

t.test("fails to register when password or username not provided", async (t) => {
  const response = await request(app).post("/v0/api/auth/register").set("Content-Type", "application/json");
  t.ok(response.body, "returned error object");
  t.equal(response.statusCode, 400);
  t.match(response.body, {
    code: "PSD_USR_ERR",
    error: "password or username required",
    statusCode: 400,
  });
});
