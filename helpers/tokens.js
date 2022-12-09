"use strict";
require("dotenv").config();

//Springboard Jobly code reused/referenced here

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = {
    username: user.username,
    username: user.email,
  };

  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { generateToken };
