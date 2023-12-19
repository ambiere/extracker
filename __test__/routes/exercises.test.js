const t = require("tap");
const request = require("supertest");
const app = require("../../src/server/server");

t.test("should add and retrieve exercise for registered user", async (t) => {
  const credentials = {
    username: "new_user",
    password: "new_password",
  };

  const exercises = {
    description: "New exercise",
    duration: 30,
    date: "2023-12-21",
  };

  const response = await request(app)
    .post("/v0/api/auth/register")
    .set("Content-Type", "application/json")
    .send(credentials);

  t.equal(response.statusCode, 200);
  t.match(response.body.userId, /\w+/);

  t.test("should add exercise", async (t) => {
    const res = await request(app)
      .post(`/v0/api/users/${response.body.userId}/exercises`)
      .set("Content-Type", "application/json")
      .send(exercises);

    t.equal(res.statusCode, 200);
    t.match(res.body.exerciseId, /\w+/);

    t.test("should get user exercise", async (t) => {
      const _res = await request(app).get(`/v0/api/users/${response.body.userId}/exercises/${res.body.exerciseId}`);
      t.equal(_res.statusCode, 200);
      t.match(_res.body, exercises);
    });
  });

  t.test("should return user exercises log", async (t) => {
    const res = await request(app).get(`/v0/api/users/${response.body.userId}/logs`);
    t.equal(res.statusCode, 200);
    t.match(res.body, {
      username: credentials.username,
      userId: response.body.userId,
      count: 1,
      log: [{ ...exercises, date: new Date(exercises.date).toDateString(), exerciseId: /\w+/ }],
    });
  });
});

t.test("should fail to add exercise if user is not registered", async (t) => {
  const exercises = {
    description: "New exercise",
    duration: 30,
    date: new Date(),
  };

  const res = await request(app)
    .post(`/v0/api/users/658353d6fd1d3fd91a39399d/exercises`)
    .set("Content-Type", "application/json")
    .send(exercises);

  t.equal(res.statusCode, 401);
  t.match(res.body, {
    code: "USR_AUTH_ERR",
    error: "User Authorization error",
    statusCode: 401,
  });
});
