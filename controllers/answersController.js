"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const {
  BadReqError,
  NotFoundError,
  UnauthorizedError,
} = require("../expressError");

const answerService = require("../services/answerService");
const characterService = require("../services/characterService");
const jsonschema = require("jsonschema");
const newAnswerSchema = require("../schemas/newAnswerSchema.json");
const updateAnswerSchema = require("../schemas/updateAnswerSchema.json");

const answersController = {};

answersController.getAllAnswers = async (req, res, next) => {
  try {
    let { characterId } = req.params;

    const answers = await answerService.getAll(characterId);

    return res.status(200).json({ answers });
  } catch (error) {
    return next(error);
  }
};

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

answersController.patchAnswer = async (req, res, next) => {
  try {
    let { userId } = res.locals.user;
    let { characterId, answerId } = req.params;

    characterId = +characterId;
    answerId = +answerId;

    const character = await characterService.findCharacterById(characterId);

    if (!character) throw new NotFoundError("This character does not exist");

    if (character.userId !== userId) {
      throw new UnauthorizedError();
    }

    //validator expects an array of an answer objects {characterId: 1, answer: "purple"}, and not other fields
    const validator = jsonschema.validate(req.body, updateAnswerSchema);
    if (!validator.valid) {
      throw new BadReqError("Invalid or missing fields present.");
    }

    const answer = await answerService.updateAnswer({
      id: answerId,
      ...req.body,
    });

    return res.status(200).json({ updated: answer });
  } catch (error) {
    return next(error);
  }
};

answersController.deleteAnswer = async (req, res, next) => {
  try {
    let { userId } = res.locals.user;
    let { characterId, answerId } = req.params;

    characterId = +characterId;
    answerId = +answerId;

    const character = await characterService.findCharacterById(characterId);

    if (!character) throw new NotFoundError("This character does not exist");

    if (character.userId !== userId) {
      throw new UnauthorizedError();
    }

    const deleted = await answerService.destroyAnswer(answerId);

    return res.status(200).json({ deleted });
  } catch (error) {
    return next(error);
  }
};

module.exports = answersController;
