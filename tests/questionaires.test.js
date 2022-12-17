const request = require("supertest");
const app = require("../app");
const db = require("../database/models/index");
const { generateToken } = require("../helpers/tokens");

const user1Token = generateToken({ username: "testUser1", userId: 1 });
const user2Token = generateToken({ username: "testUser2", userId: 2 });

afterAll(async () => await db.sequelize.close());

describe("Questionaire List", () => {
  it("should show all questionaires to logged in user", async () => {
    const res = await request(app)
      .get("/api/questionaires")
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questionaires");
  });
  it("should return unauthorized status code to non-logged in user", async () => {
    const res = await request(app).get("/api/questionaires");
    expect(res.statusCode).toEqual(401);
  });
});
