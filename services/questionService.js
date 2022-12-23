"use strict";

const models = require("../database/models");
const { Op } = require("sequelize");

const questionService = {};

questionService.getAll = async (filters = {}) => {
  let { questionCategory, questionaireId } = filters;

  if (questionCategory && questionaireId) {
    return models.Question.findAll({
      where: {
        questionCategory,
        questionaireId,
      },
    });
  }

  if (questionCategory) {
    return models.Question.findAll({
      where: {
        questionCategory,
      },
    });
  }

  if (questionaireId) {
    return models.Question.findAll({
      where: {
        questionaireId,
      },
    });
  }

  return models.Question.findAll();
};

module.exports = questionService;
