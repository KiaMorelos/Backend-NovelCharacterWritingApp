const request = require("supertest");
const app = require("../app");
const db = require("../database/models/index");
const userService = require("../services/userService");
const characterService = require("../services/characterService");
const answerService = require("../services/answerService");

const { generateToken } = require("../helpers/tokens");

let user1 = {
  username: "testuser1",
  email: "user1@test.com",
  password: "testuser1",
};
let user2 = {
  username: "testuser2",
  email: "user2@test.com",
  password: "testuser2",
};

let testAnswer = {
  answers: [
    {
      questionId: 3,
      answer: "Red",
    },
  ],
};

let user1Token;
let user2Token;
let userOneCharacter;

beforeAll(async function () {
  user1 = await userService.newUser(user1);
  user2 = await userService.newUser(user2);
  userOneCharacter = await characterService.newCharacter({
    userId: user1.id,
    name: "TestCharacter",
    characterPhotoUrl: "",
  });
  testAnswer = await answerService.newAnswers({
    characterId: userOneCharacter.id,
    ...testAnswer,
  });
  user1Token = generateToken(user1);
  user2Token = generateToken(user2);
});

afterAll(async () => await db.sequelize.close());

describe("Character Route Tests", () => {
  it("GET /characters, should show all characters to logged in user", async () => {
    const res = await request(app)
      .get("/api/characters")
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("characters");
    expect(res.body.characters[0].name).toContain("TestCharacter");
  });

  it("GET /characters, should return unauthorized status code to non-logged in user", async () => {
    const res = await request(app).get("/api/characters");
    expect(res.statusCode).toEqual(401);
  });

  it("GET /characters/character:id should not allow users to access characters other than their own", async () => {
    const res1 = await request(app)
      .get(`/api/characters/${userOneCharacter.id}`)
      .set("token", `Bearer ${user2Token}`);
    expect(res1.statusCode).toEqual(401);
    const res2 = await request(app)
      .get(`/api/characters/${userOneCharacter.id}`)
      .set("token", `Bearer ${user1Token}`);
    expect(res2.statusCode).toEqual(200);
  });

  it("POST /characters, should allow post requests with correct info for logged in users", async () => {
    const anotherCharacter = {
      name: "new character",
      characterPhotoUrl: "www.cool.com/img",
    };
    const res = await request(app)
      .post("/api/characters")
      .send(anotherCharacter)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(201);
  });

  it("POST /characters, should NOT allow post requests from non logged in users", async () => {
    const anotherCharacter = {
      name: "new character",
      characterPhotoUrl: "www.cool.com/img",
    };
    const res = await request(app)
      .post("/api/characters")
      .send(anotherCharacter);
    expect(res.statusCode).toEqual(401);
  });

  it("POST /characters, should NOT allow post requests from logged in users with incorrect fields", async () => {
    const anotherCharacter = {
      name: "new character",
      characterPhotoUrl: "www.cool.com/img",
      thisFieldIsNotAllowed: true,
    };
    const res = await request(app)
      .post("/api/characters")
      .send(anotherCharacter)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(400);
  });

  it("POST /characters/:characterId/answers, should allow post requests from logged in user", async () => {
    const answerArrObj = {
      answers: [
        {
          questionId: 1,
          answer: "Purple",
        },
        {
          questionId: 2,
          answer: "greyhound",
        },
      ],
    };
    const res = await request(app)
      .post(`/api/characters/${userOneCharacter.id}/answers`)
      .send(answerArrObj)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(201);
  });

  it("POST /characters/:characterId/answers, should not allow post requests from logged in user with incorrect fields", async () => {
    const answerArrObj = {
      answers: [
        {
          questionId: 1,
          answer: "Purple",
          notAllowed: true,
        },
      ],
    };
    const res = await request(app)
      .post(`/api/characters/${userOneCharacter.id}/answers`)
      .send(answerArrObj)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(400);
  });

  it("POST /characters/:characterId/answers, should not allow answer post requests on character from incorrect user", async () => {
    const answerArrObj = {
      answers: [
        {
          questionId: 1,
          answer: "Purple",
        },
      ],
    };
    const res = await request(app)
      .post(`/api/characters/${userOneCharacter.id}/answers`)
      .send(answerArrObj)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  it("PATCH /characters/:characterId, should NOT allow patch requests on characters that don't belong to user", async () => {
    const updatedCharacter = {
      name: "Notmy Test Character ",
      characterPhotoUrl: "www.cool.com/img",
    };
    const res = await request(app)
      .patch(`/api/characters/${userOneCharacter.id}`)
      .send(updatedCharacter)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  it("PATCH /characters/:characterId, should allow patch requests on characters that belong to logged in user", async () => {
    const updatedCharacter = {
      name: "My Test Character",
      characterPhotoUrl: "www.cool.com/img",
    };
    const res = await request(app)
      .patch(`/api/characters/${userOneCharacter.id}`)
      .send(updatedCharacter)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);

    const res2 = await request(app)
      .get("/api/characters")
      .set("token", `Bearer ${user1Token}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body).toHaveProperty("characters");
    expect(res2.body.characters[0].name).toContain("My Test Character");
  });

  it("PATCH /characters/:characterId, should not allow patch requests on characters that belong to logged in user with invalid fields", async () => {
    const updatedCharacter = {
      name: "My Test Character",
      characterPhotoUrl: "www.cool.com/img",
      notAllowed: true,
    };
    const res = await request(app)
      .patch(`/api/characters/${userOneCharacter.id}`)
      .send(updatedCharacter)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(400);
  });

  it("PATCH /characters/:characterId, should NOT allow patch requests on characters for non logged in users", async () => {
    const updatedCharacter = {
      name: "Not logged in Test Character ",
      characterPhotoUrl: "www.cool.com/img",
    };
    const res = await request(app)
      .patch(`/api/characters/${userOneCharacter.id}`)
      .send(updatedCharacter);
    expect(res.statusCode).toEqual(401);
  });

  it("PATCH /characters/:characterId/answers/:answerId, should allow patch requests from correct logged in user", async () => {
    const answerArrObj = { answer: "Likes dogs" };

    const res = await request(app)
      .patch(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .send(answerArrObj)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      updated: {
        id: testAnswer[0].id,
        answer: "Likes dogs",
      },
    });
  });

  it("PATCH /characters/:characterId/answers/:answerId, should not allow patch requests from correct logged in user with invalid fields", async () => {
    const answerArrObj = { answer: "Likes dogs", questionId: 3 };

    const res = await request(app)
      .patch(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .send(answerArrObj)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(400);
  });

  it("PATCH /characters/:characterId/answers/:answerId, should NOT allow patch requests from incorrect user", async () => {
    const answerArrObj = { answer: "Likes dogs" };

    const res = await request(app)
      .patch(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .send(answerArrObj)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  it("PATCH /characters/:characterId/answers/:answerId, should NOT allow patch requests from not logged in user", async () => {
    const answerArrObj = { answer: "Likes dogs" };

    const res = await request(app)
      .patch(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .send(answerArrObj);
    expect(res.statusCode).toEqual(401);
  });

  it("DELETE /characters/:characterId/answers/:answerId, should allow delete requests from correct logged in user", async () => {
    const res = await request(app)
      .delete(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ deleted: 1 });
  });

  it("DELETE /characters/:characterId/answers/:answerId, should not allow delete requests from incorrect user", async () => {
    const res = await request(app)
      .delete(
        `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
      )
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  it("DELETE /characters/:characterId/answers/:answerId, should not allow delete requests from not logged in user", async () => {
    const res = await request(app).delete(
      `/api/characters/${userOneCharacter.id}/answers/${testAnswer[0].id}`
    );
    expect(res.statusCode).toEqual(401);
  });

  it("DELETE /characters/:characterId, should NOT allow DELETE requests on characters that don't belong to user", async () => {
    const res = await request(app)
      .delete(`/api/characters/${userOneCharacter.id}`)
      .set("token", `Bearer ${user2Token}`);
    expect(res.statusCode).toEqual(401);
  });

  it("DELETE /characters/:characterId, should allow DELETE requests on characters that belong to user", async () => {
    const res = await request(app)
      .delete(`/api/characters/${userOneCharacter.id}`)
      .set("token", `Bearer ${user1Token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ deleted: 1 });
  });

  it("DELETE /characters/:characterId, should NOT allow DELETE requests on characters when not logged in", async () => {
    const res = await request(app).delete(
      `/api/characters/${userOneCharacter.id}`
    );
    expect(res.statusCode).toEqual(401);
  });
});
