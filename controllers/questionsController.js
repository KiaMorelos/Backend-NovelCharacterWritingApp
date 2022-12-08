"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError } = require("../expressError");
const jsonschema = require("jsonschema");
const getQuestionsSchema = require("../schemas/getQuestionsSchema.json");
const questionService = require("../services/questionService");
const questionsController = {};

questionsController.getQuestions = async (req, res) => {
  try {
    let filters = req.query;

    if (filters.questionaireId !== undefined)
      filters.questionaireId = +filters.questionaireId;

    const validator = jsonschema.validate(filters, getQuestionsSchema);
    if (!validator.valid) {
      throw new BadReqError(
        "Bad request: Query should not include any fields other than questionaireId, or questionCategory"
      );
    }

    const questions = await questionService.getAll(filters);

    if (!questions.length)
      return res.status(200).json({ message: "Sorry, no results found!" });

    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(error.status).json(error);
  }
};

module.exports = questionsController;
