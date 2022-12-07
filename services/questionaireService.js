"use strict";

const db = require("../configs/postgresql");
const models = require("../database/models");

const questionaireService = {};

questionaireService.getAll = async () => {
  return models.Questionaire.findAll();
};

module.exports = questionaireService;
