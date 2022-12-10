"use strict";

const models = require("../database/models");

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

module.exports = characterService;
