"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const questionService = require("../services/questionService");
const questionsController = {};

questionsController.getQuestions = async (req, res) => {
  const filters = req.query;
  try {
    const questions = await questionService.getAll(filters);

    if (!questions.length)
      return res.status(200).json({ message: "Sorry, no results found!" });

    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = questionsController;

// return res.status(error.status).json(error);
