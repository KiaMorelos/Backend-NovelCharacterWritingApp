"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError, NotFoundError } = require("../expressError");

const answerService = require("../services/answerService");
const characterService = require("../services/characterService");
const jsonschema = require("jsonschema");
const newAnswerSchema = require("../schemas/newAnswerSchema.json");

const answersController = {};

answersController.createNewAnswers = async (req, res, next) => {
  try {
    let { userId } = res.locals.user;
    let { characterId } = req.params;

    characterId = +characterId;

    const character = await characterService.findCharacterById(characterId);

    if (!character) throw new NotFoundError("This character does not exist");

    if (character.userId !== userId) {
      throw new UnauthorizedError();
    }

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
