"use strict";
require("dotenv").config();

//Springboard Jobly code reused/referenced here

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = {
    username: user.username,
    userId: user.id,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { generateToken };
