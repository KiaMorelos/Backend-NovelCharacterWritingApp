"use strict";

const models = require("../database/models");

const questionService = {};

questionService.getAll = async () => {
  return models.Question.findAll();
};

module.exports = questionService;
