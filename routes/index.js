const express = require("express");
const getAllQuestions = require("../controllers/questionsController");
const getAllQuestionaires = require("../controllers/questionairesController");

const router = express.Router();

router.get("/questions", getAllQuestions);
router.get("/questionaires", getAllQuestionaires);

module.exports = router;
