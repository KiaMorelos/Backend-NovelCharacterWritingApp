"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const {
  BadReqError,
  NotFoundError,
  UnauthorizedError,
} = require("../expressError");

const characterService = require("../services/characterService");
const jsonschema = require("jsonschema");

const newCharacterSchema = require("../schemas/newCharacterSchema.json");
const updateCharacterSchema = require("../schemas/updateCharacterSchema.json");
const charactersController = {};

charactersController.getAllCharacters = async (req, res, next) => {
  try {
    let { userId } = res.locals.user;

    const characters = await characterService.getAll(userId);

    return res.status(200).json({ characters });
  } catch (error) {
    return next(error);
  }
};

charactersController.getCharacterById = async (req, res, next) => {
  try {
    let { characterId } = req.params;
    let { userId } = res.locals.user;

    const character = await characterService.findCharacterById(characterId);

    if (!character) throw new NotFoundError("This character does not exist");

    if (character.userId !== userId) {
      throw new UnauthorizedError();
    }

    return res.status(200).json({ character });
  } catch (error) {
    return next(error);
  }
};

charactersController.createNewCharacter = async (req, res, next) => {
  try {
    let { userId } = res.locals.user;

    //validator expects a name, and an optional photo url
    const validator = jsonschema.validate(req.body, newCharacterSchema);
    if (!validator.valid) {
      throw new BadReqError(
        "Invalid or missing fields present, at mininium, a character name is required"
      );
    }

    const character = await characterService.newCharacter({
      userId,
      ...req.body,
    });

    return res.status(201).json({ character });
  } catch (error) {
    return next(error);
  }
};

charactersController.patchCharacter = async (req, res, next) => {
  try {
    let { characterId } = req.params;
    let { userId } = res.locals.user;

    characterId = +characterId;

    //validator expects a name, and an optional photo url
    const validator = jsonschema.validate(req.body, updateCharacterSchema);
    if (!validator.valid) {
      throw new BadReqError(
        "Invalid or missing fields present, at mininium, a character name is required"
      );
    }

    const origCharacter = await characterService.findCharacterById(characterId);
    if (!origCharacter) throw new NotFoundError();

    if (origCharacter.userId !== userId) throw new UnauthorizedError();

    const updatedCharacter = await characterService.updateCharacter({
      characterId,
      ...req.body,
    });

    return res.status(200).json({ updatedTo: updatedCharacter });
  } catch (error) {
    return next(error);
  }
};

charactersController.deleteCharacter = async (req, res, next) => {
  try {
    let { characterId } = req.params;
    let { userId } = res.locals.user;

    characterId = +characterId;

    const origCharacter = await characterService.findCharacterById(characterId);
    if (!origCharacter) throw new NotFoundError();

    if (origCharacter.userId !== userId) throw new UnauthorizedError();

    const deleted = await characterService.destroyCharacter(
      characterId,
      userId
    );

    return res.status(200).json({ deleted });
  } catch (error) {
    return next(error);
  }
};

module.exports = charactersController;
