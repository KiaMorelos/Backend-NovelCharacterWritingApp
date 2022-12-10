"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.questionId = this.belongsTo(models.Question, {
        foreignKey: "questionId",
      });
      this.characterId = this.belongsTo(models.Character, {
        foreignKey: "characterId",
      });
    }
  }
  Answer.init(
    {
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Question",
          key: "id",
        },
      },
      characterId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Character",
          key: "id",
        },
      },
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answers",
    }
  );
  return Answer;
};
