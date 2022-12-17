const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateToken,
  mustBeLoggedIn,
} = require("../middleware/authorization");

const SECRET_KEY = process.env.SECRET_KEY;

const goodToken = jwt.sign({ username: "test", userId: 1 }, SECRET_KEY);
const badToken = jwt.sign({ username: "test", userId: 1 }, "notavalidkey");

describe("authenticateToken", function () {
  test("authenticating valid tokens works", function () {
    const req = { headers: { token: `Bearer ${goodToken}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateToken(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        userId: 1,
      },
    });
  });
  test("no tokens in header doesn't cause an error", function () {
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateToken(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("invalid token doesn't throw error but nothing is stored in locals", function () {
    const req = { headers: { token: `Bearer ${badToken}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateToken(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe("mustBeLoggedIn", function () {
  test("should have user in locals", function () {
    const req = {};
    const res = { locals: { user: { username: "test", userId: 1 } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    mustBeLoggedIn(req, res, next);
  });

  test("not logged in user should get unauthorized error", function () {
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    mustBeLoggedIn(req, res, next);
  });
});
