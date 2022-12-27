"use strict";

const models = require("../database/models");
const { NotFoundError, UnauthorizedError } = require("../expressError");

const characterService = {};

characterService.getAll = async (userId) => {
  return models.Character.findAll({
    where: {
      userId,
    },
    order: [["name", "ASC"]],
  });
};

characterService.findCharacterById = async (characterId) => {
  if (isNaN(characterId)) throw new NotFoundError();
  return models.Character.findOne({
    where: {
      id: characterId,
    },
  });
};

characterService.newCharacter = async ({
  userId,
  name,
  characterPhotoUrl = "",
}) => {
  const character = models.Character.create({
    userId,
    name,
    characterPhotoUrl,
  });
  return character;
};

characterService.updateCharacter = async ({
  characterId,
  name,
  characterPhotoUrl = "",
}) => {
  if (isNaN(characterId)) throw new NotFoundError();

  const updatedCharacter = models.Character.update(
    { name, characterPhotoUrl },
    {
      where: {
        id: characterId,
      },
    }
  );

  return { name, characterPhotoUrl };
};

characterService.destroyCharacter = async (characterId, userId) => {
  if (isNaN(characterId)) throw new NotFoundError();
  const destroyed = models.Character.destroy({
    where: {
      id: characterId,
      userId,
    },
  });

  return destroyed;
};

module.exports = characterService;
