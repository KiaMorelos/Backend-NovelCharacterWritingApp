"use strict";

require("dotenv").config();
const models = require("../database/models");

const bcrypt = require("bcrypt");
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 14;

const { UnauthorizedError, NotFoundError } = require("../expressError");

const userService = {};

userService.newUser = async ({ username, email, password }) => {
  password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  const user = models.User.create({ username, email, password });
  return user;
};

userService.checkCredentials = async ({ username, password }) => {
  const user = await models.User.findOne({ where: { username } });
  const isCorrectPass = await bcrypt.compare(password, user.password);

  if (isCorrectPass) {
    return user;
  }

  return UnauthorizedError("Invalid username or password");
};

userService.findUserById = async (userId) => {
  const user = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  return { username: user.username, email: user.email };
};

module.exports = userService;
