"use strict";

const models = require("../database/models");
const answerService = {};

answerService.newAnswers = async ({ characterId, answers }) => {
  answers = answers.map((obj) => ({ ...obj, characterId }));

  const newAnswers = models.Answer.bulkCreate(answers, { validate: true });
  return newAnswers;
};

answerService.updateAnswer = async ({ id, answer }) => {
  const updateAnswer = models.Answer.update(
    { answer },
    {
      where: {
        id,
      },
    }
  );
  return { id, answer };
};

answerService.destroyAnswer = async (id) => {
  const destroyed = models.Answer.destroy({
    where: {
      id,
    },
  });
  return destroyed;
};

module.exports = answerService;
