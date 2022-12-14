"use strict";
const express = require("express");
const questionsController = require("../controllers/questionsController");
const questionairesController = require("../controllers/questionairesController");
const usersController = require("../controllers/usersController");
const charactersController = require("../controllers/charactersController");

const {
  mustBeLoggedIn,
  mustBeCorrectUser,
} = require("../middleware/authorization");
const answersController = require("../controllers/answersController");

const router = express.Router();

/** GET Routes
 *  /questions, requires auth, retrieves list of available questions, can be filtered by questionaire id, or questionaire type
 *
 * /questionaires, requires auth, retrieves list of available questionaires
 *
 * /characters, requires auth, should retrieve the current user's characters
 *
 * /characters/:characterId, requires auth, should retrieve character/answers by their id which belongs to the current user
 *
 * /users/:userId, requires auth, should retrieve current user's profile details
 */

router.get("/questions", mustBeLoggedIn, questionsController.getQuestions);
router.get(
  "/questionaires",
  mustBeLoggedIn,
  questionairesController.getAllQuestionaires
);
router.get(
  "/characters",
  mustBeLoggedIn,
  charactersController.getAllCharacters
);
router.get(
  "/characters/:characterId",
  mustBeLoggedIn,
  charactersController.getCharacterById
);

router.get(
  "/characters/:characterId/answers",
  mustBeLoggedIn,
  answersController.getAllAnswers
);

router.get("/users/:userId", mustBeCorrectUser, usersController.getUserById);

/** POST Routes
 *  /signup, creates a new user profile if one does not already exist with req.body which should contain {username, email, password}, returns a token
 *
 * /authenticate, req.body should contain a valid {username, password}, returns a token
 *
 * /characters, this route is used to CREATE a new character for the current user, req.body should contain a name, adding characterPhotoUrl is optional, returns the newly created character.
 *
 * /characters/:characterId/answers, this route is used to create new answers for a character, req.body should inlcude questionId, and answer.
 *
 */

router.post("/signup", usersController.signup);
router.post("/authenticate", usersController.authenticate);
router.post(
  "/characters",
  mustBeLoggedIn,
  charactersController.createNewCharacter
);
router.post(
  "/characters/:characterId/answers",
  mustBeLoggedIn,
  answersController.createNewAnswers
);

/** PATCH Routes
 *  /characters/:characterId, user's id must match the the userId on the character, req.body should contain a name at mininimum
 *
 * /users/:userId, user's id must be the same as the one the in parameter, req.body should contain a username, an email, and correct password, and optionally a new password
 *
 * /characters/:characterId/answers/:answerId, this route is used to patch an answer for a character, req.body should include an answer object.
 *
 */

router.patch(
  "/characters/:characterId",
  mustBeLoggedIn,
  charactersController.patchCharacter
);
router.patch(
  "/characters/:characterId/answers/:answerId",
  mustBeLoggedIn,
  answersController.patchAnswer
);
router.patch("/users/:userId", mustBeCorrectUser, usersController.patchUser);

/** DELETE Routes
 *  /characters/:characterId, user's id must be the same as the one the in parameter otherwise unauthorized, deletes 1 character by id
 *
 * /characters/:characterId/answers/:answerId, this route is used to delete an answer. User's id must be the same as the one the in parameter otherwise unauthorized, deletes 1 character by id
 */

router.delete(
  "/characters/:characterId",
  mustBeLoggedIn,
  charactersController.deleteCharacter
);
router.delete(
  "/characters/:characterId/answers/:answerId",
  mustBeLoggedIn,
  answersController.deleteAnswer
);
module.exports = router;
