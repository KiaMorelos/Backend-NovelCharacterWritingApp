const request = require("supertest");
const app = require("../app");
const db = require("../database/models/index");
const userService = require("../services/userService");

let user1 = {
  username: "adifferenttestuser",
  email: "diff@test.com",
  password: "testuser1",
};

let badUser2 = {
  username: "badUser2",
  email: "badUser2@test.com",
  badfield: true,
  password: "badUser2aaa",
};

let user3 = {
  username: "testuser3",
  email: "user3@test.com",
  password: "testuser3",
};

beforeAll(async function () {
  user3 = await userService.newUser(user3);
});

afterAll(async () => await db.sequelize.close());

describe("Sign Up / Authenticate Routes Tests", () => {
  it("POST /signup, should return a token", async () => {
    const res = await request(app).post("/api/signup").send(user1);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });
  it("POST /signup, should not return a token if extra fields in body", async () => {
    const res = await request(app).post("/api/signup").send(badUser2);
    expect(res.statusCode).toEqual(400);
    expect(res.body).not.toHaveProperty("token");
  });
  it("POST /authenticate, should return a token if credentials are correct", async () => {
    const res = await request(app)
      .post("/api/authenticate")
      .send({ username: "testuser3", password: "testuser3" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
  it("POST /authenticate, should not return a token if credentials are incorrect", async () => {
    const res = await request(app)
      .post("/api/authenticate")
      .send({ username: "testuser3", password: "badpassword" });
    expect(res.statusCode).toEqual(401);
    expect(res.body).not.toHaveProperty("token");
  });
});
