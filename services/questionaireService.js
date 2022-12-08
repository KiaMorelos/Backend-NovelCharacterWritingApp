"use strict";

const models = require("../database/models");

const questionaireService = {};

questionaireService.getAll = async () => {
  return models.Questionaire.findAll();
};

module.exports = questionaireService;
