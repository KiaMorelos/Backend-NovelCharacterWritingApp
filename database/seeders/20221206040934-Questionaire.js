"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("questionaires", [
      {
        id: 1,
        name: "Marcel Proust",
        questionaire_type: "character analysis",
      },
      {
        id: 2,
        name: "Bernard Pivot",
        questionaire_type: "character analysis",
      },
      {
        id: 3,
        name: "James Lipton",
        questionaire_type: "character analysis",
      },
      {
        id: 4,
        name: "Mouse Paw Media",
        questionaire_type: "character analysis",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("questionaires", null, {});
  },
};
