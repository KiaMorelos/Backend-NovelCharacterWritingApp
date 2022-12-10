"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError, NotFoundError } = require("../expressError");

const answerService = require("../services/answerService");
const jsonschema = require("jsonschema");
const newAnswerSchema = require("../schemas/newAnswerSchema.json");

const answersController = {};

answersController.getAllCharacterAnswers = async (req, res, next) => {
  try {
    let { characterId } = req.params;

    if (characterId !== undefined) characterId = +characterId;

    const answers = await answerService.getAll(characterId);

    if (!answers.length)
      return res.status(200).json({
        answers,
        message:
          "You haven't added any answers to questions for this character yet",
      });

    return res.status(200).json({ answers });
  } catch (error) {
    return next(error);
  }
};

answersController.createNewAnswers = async (req, res, next) => {
  try {
    let { characterId } = req.params;

    if (characterId !== undefined) characterId = +characterId;

    //validator expects an array of answer objects [{questionId: 1, answer: "purple"}], at least one item should be in the array
    const validator = jsonschema.validate(req.body, newAnswerSchema);
    if (!validator.valid) {
      throw new BadReqError(
        "Invalid or missing fields present. At least one item should be in the answers array"
      );
    }

    const answers = await answerService.newAnswers({
      characterId,
      ...req.body,
    });

    return res.status(201).json(answers);
  } catch (error) {
    return next(error);
  }
};

module.exports = answersController;
