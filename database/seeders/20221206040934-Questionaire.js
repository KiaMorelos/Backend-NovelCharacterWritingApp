"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("questionaires", [
      {
        id: 1,
        name: "Marcel Proust",
        questionaireType: "character analysis",
      },
      {
        id: 2,
        name: "Bernard Pivot",
        questionaireType: "character analysis",
      },
      {
        id: 3,
        name: "James Lipton",
        questionaireType: "character analysis",
      },
      {
        id: 4,
        name: "Mouse Paw Media",
        questionaireType: "character analysis",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("questionaires", null, {});
  },
};
