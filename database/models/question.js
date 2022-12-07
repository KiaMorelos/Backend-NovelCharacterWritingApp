"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.questionaire_id = this.belongsTo(models.Questionaire, {
        foreignKey: "questionaire_id",
      });
    }
  }
  Question.init(
    {
      questionaire_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Questionaire",
          key: "id",
        },
      },
      question: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "questions",
      timestamps: false,
    }
  );
  return Question;
};
