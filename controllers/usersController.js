"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError } = require("../expressError");
const jsonschema = require("jsonschema");
const { generateToken } = require("../helpers/tokens");

const userService = require("../services/userService");
const signupSchema = require("../schemas/signupSchema.json");
const authenticateSchema = require("../schemas/authenticateSchema.json");

const usersController = {};

usersController.signup = async (req, res) => {
  try {
    //validator expects username, valid email, and password in the request body
    const validator = jsonschema.validate(req.body, signupSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields present");
    }
    const user = await userService.newUser(req.body);
    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

usersController.authenticate = async (req, res) => {
  try {
    //validator expects username, and password in the request body
    const validator = jsonschema.validate(req.body, authenticateSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields");
    }

    const user = await userService.checkCredentials(req.body);

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

module.exports = usersController;
