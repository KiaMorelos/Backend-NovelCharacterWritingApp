const request = require("supertest");
const app = require("../app");
const db = require("../database/models/index");
const userService = require("../services/userService");
const characterService = require("../services/characterService");

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
