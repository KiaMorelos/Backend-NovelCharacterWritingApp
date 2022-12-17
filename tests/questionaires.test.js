const request = require("supertest");
const app = require("../app");
const db = require("../database/models");
const { generateToken } = require("../helpers/tokens");

const user1Token = generateToken({ username: "testUser1", userId: 1 });

afterAll(async () => await db.sequelize.close());

describe("Questionaire Routes Tests", () => {
  it("GET /questionaires, should show all questionaires to logged in user", async () => {
    const res = await request(app)
      .get("/api/questionaires")
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questionaires");
    expect(res.body.questionaires).toContainEqual({
      id: 1,
      name: "Marcel Proust",
      questionaireType: "character analysis",
    });
  });
  it("GET /questionaires, should return unauthorized status code to non-logged in user", async () => {
    const res = await request(app).get("/api/questionaires");
    expect(res.statusCode).toEqual(401);
  });
});
