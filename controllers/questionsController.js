"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const questionService = require("../services/questionService");

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAll();
    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAllQuestions;
