"use strict";
const express = require("express");
const questionsController = require("../controllers/questionsController");
const getAllQuestionaires = require("../controllers/questionairesController");
const usersController = require("../controllers/usersController");
const charactersController = require("../controllers/charactersController");

const {
  mustBeLoggedIn,
  mustBeCorrectUser,
} = require("../middleware/authorization");

const router = express.Router();

/** GET Routes
 *  /questions, requires auth, retrieves list of available questions, can be filtered by questionaire id, or questionaire type
 *
 * /questionaires, requires auth, retrieves list of available questionaires
 *
 * /:userId/characters, requires auth, should retrieve the current user's characters
 *
 * /:userId/characters/:characterId, requires auth, should retrieve character by their id which belongs to the current user
 *
 * /users/:userId, requires auth, should retrieve current user's profile details
 */

router.get("/questions", mustBeLoggedIn, questionsController.getQuestions);
router.get("/questionaires", mustBeLoggedIn, getAllQuestionaires);
router.get(
  "/characters/:userId",
  mustBeCorrectUser,
  charactersController.getAllUsersCharacters
);
router.get(
  "/characters/:userId/:characterId",
  mustBeCorrectUser,
  charactersController.getCharacterById
);
router.get("/users/:userId", mustBeCorrectUser, usersController.getUserById);

/** POST Routes
 *  /signup, creates a new user profile if one does not already exist with req.body which should contain {username, email, password}, returns a token
 *
 * /authenticate, req.body should contain a valid {username, password}, returns a token
 *
 * /:userId/characters, this route is used to CREATE a new character for the current user, req.body should contain a name, adding characterPhotoUrl is optional, returns the newly created character.
 *
 *
 */

router.post("/signup", usersController.signup);
router.post("/authenticate", usersController.authenticate);
router.post(
  "/characters/:userId",
  mustBeCorrectUser,
  charactersController.createNewCharacter
);

// PATCH ROUTES
router.patch(
  "/characters/:userId/:characterId",
  mustBeCorrectUser,
  charactersController.patchCharacter
);
router.patch("/users/:userId", mustBeCorrectUser, usersController.patchUser);

// DELETE ROUTES

module.exports = router;
