"use strict";
const express = require("express");
const questionsController = require("../controllers/questionsController");
const getAllQuestionaires = require("../controllers/questionairesController");
const usersController = require("../controllers/usersController");
const { mustBeLoggedIn } = require("../middleware/authorization");

const router = express.Router();

// GET ROUTES
router.get("/questions", mustBeLoggedIn, questionsController.getQuestions);
router.get("/questionaires", mustBeLoggedIn, getAllQuestionaires);
router.get("/characters");
router.get("/characters/:id");
router.get("/users/:id");

// POST ROUTES
router.post("/signup", usersController.signup);
router.post("/authenticate", usersController.authenticate);
router.post("/characters");
router.post("/characters/:id");
router.post("/users/:id");

// PATCH ROUTES

// DELETE ROUTES

module.exports = router;
