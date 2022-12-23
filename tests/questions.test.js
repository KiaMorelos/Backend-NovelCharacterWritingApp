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

  it("GET /questions, should show allow filtering based on questionaireId", async () => {
    const res = await request(app)
      .get("/api/questions")
      .query({ questionaireId: "3" })
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questions");
    expect(res.body.questions).not.toContainEqual({
      id: 56,
      questionaireId: 4,
      question: "Full name and aliases?",
      questionCategory: "brief history",
    });
    expect(res.body.questions).toContainEqual({
      id: 46,
      questionaireId: 3,
      question: "What is your favorite word?",
      questionCategory: "psychological information",
    });
  });

  it("GET /questions, should show allow filtering based on questionaireCategory", async () => {
    const res = await request(app)
      .get("/api/questions")
      .query({ questionCategory: "brief history" })
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questions");
    expect(res.body.questions).not.toContainEqual({
      id: 46,
      questionaireId: 3,
      question: "What is your favorite word?",
      questionCategory: "psychological information",
    });
    expect(res.body.questions).toContainEqual({
      id: 56,
      questionaireId: 4,
      question: "Full name and aliases?",
      questionCategory: "brief history",
    });
  });

  it("GET /questions, should show allow filtering based on both questionCategory AND questionaireId", async () => {
    const res = await request(app)
      .get("/api/questions")
      .query({
        questionCategory: "psychological information",
        questionaireId: 4,
      })
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("questions");
    expect(res.body.questions).toContainEqual({
      id: 112,
      questionaireId: 4,
      question: "favorite food:",
      questionCategory: "psychological information",
    });
    expect(res.body.questions).not.toContainEqual({
      id: 56,
      questionaireId: 4,
      question: "Full name and aliases?",
      questionCategory: "brief history",
    });
  });

  it("GET /questions, should return unauthorized status code to non-logged in user", async () => {
    const res = await request(app).get("/api/questions");
    expect(res.statusCode).toEqual(401);
  });
});
