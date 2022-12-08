"use strict";
const express = require("express");
const questionsController = require("../controllers/questionsController");
const getAllQuestionaires = require("../controllers/questionairesController");

const router = express.Router();

router.get("/questions", questionsController.getQuestions);
router.get("/questionaires", getAllQuestionaires);

module.exports = router;
