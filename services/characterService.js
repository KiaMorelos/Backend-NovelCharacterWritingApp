"use strict";

const models = require("../database/models");
const { NotFoundError } = require("../expressError");

const characterService = {};

characterService.getAll = async (userId) => {
  return models.Character.findAll({
    where: {
      userId,
    },
  });
};

characterService.findCharacterById = async (characterId) => {
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
  const character = models.Character.update(
    { name, characterPhotoUrl },
    {
      where: {
        id: characterId,
      },
    }
  );
  const updatedCharacter = models.Character.findOne({
    where: {
      id: characterId,
    },
  });
  return updatedCharacter;
};

characterService.destroyCharacter = async (characterId) => {
  const character = await models.Character.findOne({
    where: {
      id: characterId,
    },
  });

  if (!character)
    throw new NotFoundError(
      "This character doesn't exist or was already deleted"
    );

  const characterToDestroy = models.Character.destroy({
    where: {
      id: characterId,
    },
  });

  return character.name;
};

module.exports = characterService;
