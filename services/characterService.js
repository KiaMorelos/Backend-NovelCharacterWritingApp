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
  return models.Character.findOne({
    where: {
      id: characterId,
    },
    include: [
      {
        model: models.Answer,
        attributes: ["id", "answer"],
        include: [
          {
            model: models.Question,
            attributes: ["question", "questionCategory"],
            include: [{ model: models.Questionaire, attributes: ["name"] }],
          },
        ],
      },
    ],
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
  const destroyed = models.Character.destroy({
    where: {
      id: characterId,
      userId,
    },
  });

  return destroyed;
};

module.exports = characterService;
