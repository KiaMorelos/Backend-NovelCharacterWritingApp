"use strict";
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { NotFoundError } = require("./expressError");

//This is for throwing a 404 Error
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

//If environment is not a test evironment show error stack
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
