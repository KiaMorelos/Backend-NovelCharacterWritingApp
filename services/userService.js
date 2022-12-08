"use strict";
const models = require("../database/models");
const bcrypt = require("bcrypt");
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 14;

const userService = {};

userService.newUser = async ({ username, email, password }) => {
  password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  const user = models.User.create({ username, email, password });
  return user;
};

module.exports = userService;
