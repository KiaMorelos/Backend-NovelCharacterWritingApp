"use strict";

let db = require("../configs/postgresql"),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

const questionaireService = require("../services/questionaireService");

const getAllQuestionaires = async (req, res) => {
  try {
    const questionaires = await questionaireService.getAll();
    return res.status(200).json({ questionaires });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = getAllQuestionaires;
