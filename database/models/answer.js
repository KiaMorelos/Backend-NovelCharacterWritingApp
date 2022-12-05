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
        foreignKey: "question_id",
      });
      this.characterId = this.belongsTo(models.Character, {
        foreignKey: "question_id",
      });
    }
  }
  Answer.init(
    {
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "question",
          key: "id",
        },
      },
      characterId: {
        type: DataTypes.INTEGER,
        references: {
          model: "character",
          key: "id",
        },
      },
      answer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "answer",
    }
  );
  return Answer;
};
