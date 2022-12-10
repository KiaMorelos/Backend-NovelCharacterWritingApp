"use strict";
require("dotenv").config();
//Springboard Jobly code reused/referenced here

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  try {
    const authInfo = req.headers && req.headers.token;
    if (authInfo) {
      const token = authInfo.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (error) {
    return next();
  }
}

function mustBeLoggedIn(req, res, next) {
  try {
    if (!res.locals.user)
      throw new UnauthorizedError("You must be logged into view that");
    return next();
  } catch (err) {
    return next(err);
  }
}

function mustBeCorrectUser(req, res, next) {
  try {
    const user = res.locals.user;
    let paramsUserId = +req.params.userId;
    if (!(user && user.userId === paramsUserId)) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { authenticateToken, mustBeLoggedIn, mustBeCorrectUser };
