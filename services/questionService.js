"use strict";

const models = require("../database/models");

const questionService = {};

questionService.getAll = async (filters = {}) => {
  let { question_category, questionaire_id } = filters;

  //turn id string into integer otherwise it won't work for filtering
  if (questionaire_id !== undefined) questionaire_id = +questionaire_id;

  if (question_category && questionaire_id) {
    return models.Question.findAll({
      where: {
        question_category,
        questionaire_id,
      },
    });
  }

  if (question_category) {
    return models.Question.findAll({
      where: {
        question_category,
      },
    });
  }

  if (questionaire_id) {
    questionaire_id = +questionaire_id;
    return models.Question.findAll({
      where: {
        questionaire_id,
      },
    });
  }

  return models.Question.findAll();
};

module.exports = questionService;
