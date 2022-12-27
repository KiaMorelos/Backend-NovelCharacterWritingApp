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
  if (!user)
    throw new NotFoundError(
      "It doesn't look like there's an account with the username you entered"
    );
  const isCorrectPass = await bcrypt.compare(password, user.password);

  if (isCorrectPass) {
    return user;
  }

  throw new UnauthorizedError("Invalid username or password");
};

userService.findUserById = async (userId) => {
  const user = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  return { username: user.username, email: user.email };
};

userService.updateUser = async ({
  userId,
  username,
  email,
  password,
  newPassword = undefined,
}) => {
  const user = await models.User.findOne({
    where: {
      id: userId,
    },
  });

  const isCorrectPass = await bcrypt.compare(password, user.password);
  if (!isCorrectPass) throw new UnauthorizedError("Invalid password");
  if (newPassword === undefined) {
    newPassword = password;
  }

  password = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);

  const updatedUser = models.User.update(
    { username, email, password },
    {
      where: {
        id: userId,
      },
    }
  );

  return {
    message: "Successfully updated profile",
    username,
    email,
  };
};

module.exports = userService;
