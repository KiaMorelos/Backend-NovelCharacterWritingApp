"use strict";

const models = require("../database/models");
const answerService = {};

answerService.newAnswers = async ({ characterId, answers }) => {
  answers = answers.map((obj) => ({ ...obj, characterId }));

  const newAnswers = models.Answer.bulkCreate(answers, { validate: true });
  return newAnswers;
};

module.exports = answerService;
