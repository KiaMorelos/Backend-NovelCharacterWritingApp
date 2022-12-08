"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError } = require("../expressError");
const jsonschema = require("jsonschema");
const userService = require("../services/userService");
const signupSchema = require("../schemas/signupSchema.json");

const usersController = {};

usersController.signup = async (req, res) => {
  try {
    const validator = jsonschema.validate(req.body, signupSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields");
    }
    const user = await userService.newUser(req.body);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};
module.exports = usersController;
