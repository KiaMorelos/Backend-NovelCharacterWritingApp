"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const { BadReqError, NotFoundError } = require("../expressError");

const characterService = require("../services/characterService");
const jsonschema = require("jsonschema");

const newCharacterSchema = require("../schemas/newCharacterSchema.json");
const charactersController = {};

charactersController.getAllUsersCharacters = async (req, res, next) => {
  try {
    let { userId } = req.params;

    if (userId !== undefined) userId = +userId;

    const characters = await characterService.getAll(userId);

    if (!characters.length)
      return res
        .status(200)
        .json({ message: "You haven't created any new characters yet" });

    return res.status(200).json({ characters });
  } catch (error) {
    return next(error);
  }
};

charactersController.getCharacterById = async (req, res, next) => {
  try {
    let { userId, characterId } = req.params;

    if (userId !== undefined && characterId !== undefined) {
      userId = +userId;
      characterId = +characterId;
    }

    const character = await characterService.findCharacterById(characterId);

    if (!character) throw new NotFoundError("This character does not exist");

    return res.status(200).json({ character });
  } catch (error) {
    return next(error);
  }
};

charactersController.createNewCharacter = async (req, res, next) => {
  try {
    let { userId } = req.params;

    if (userId !== undefined) userId = +userId;

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

    return res.status(200).json({ character });
  } catch (error) {
    return next(error);
  }
};

module.exports = charactersController;
