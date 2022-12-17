const request = require("supertest");
const app = require("../app");
const db = require("../database/models");
const { generateToken } = require("../helpers/tokens");

const user1Token = generateToken({ username: "testUser1", userId: 1 });

afterAll(async () => await db.sequelize.close());

describe("Questions Route Tests", () => {
  it("GET /questions, should show all questions to logged in user", async () => {
    const res = await request(app)
      .get("/api/questions")
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questions");
  });

  it("GET /questions, should return unauthorized status code to non-logged in user", async () => {
    const res = await request(app).get("/api/questions");
    expect(res.statusCode).toEqual(401);
  });
});
