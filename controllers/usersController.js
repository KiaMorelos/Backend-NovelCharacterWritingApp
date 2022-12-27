"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError, UnauthorizedError } = require("../expressError");
const jsonschema = require("jsonschema");
const { generateToken } = require("../helpers/tokens");

const userService = require("../services/userService");
const signupSchema = require("../schemas/signupSchema.json");
const authenticateSchema = require("../schemas/authenticateSchema.json");
const updateUserProfileSchema = require("../schemas/updateUserProfileSchema.json");

const usersController = {};

usersController.signup = async (req, res, next) => {
  try {
    //validator expects username, valid email, and password in the request body
    const validator = jsonschema.validate(req.body, signupSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields present");
    }
    const user = await userService.newUser(req.body);
    const token = generateToken(user);
    return res.status(201).json({ token });
  } catch (error) {
    if (error.message === "Validation error") {
      error.message = "This username or email seems to already exist";
      error.status = 400;
    }
    return next(error);
  }
};

usersController.authenticate = async (req, res, next) => {
  try {
    //validator expects username, and password in the request body
    const validator = jsonschema.validate(req.body, authenticateSchema);
    if (!validator.valid) {
      throw new BadReqError(
        "Invalid fields(password less than 8 characters) or missing fields"
      );
    }

    const user = await userService.checkCredentials(req.body);
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

usersController.getUserById = async (req, res, next) => {
  try {
    let { userId } = req.params;

    if (userId !== undefined) userId = +userId;

    const user = await userService.findUserById(userId);

    if (!user) throw new NotFoundError("This user profile does not exist");

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

usersController.patchUser = async (req, res, next) => {
  try {
    let { userId } = req.params;

    if (userId !== undefined) userId = +userId;

    //validator expects username, valid email, current password, and an optional new password in the request body
    //if no new password it will remain set to the original if the user typed the original in correctly
    const validator = jsonschema.validate(req.body, updateUserProfileSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields present");
    }

    const user = await userService.updateUser({ userId, ...req.body });

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

module.exports = usersController;
