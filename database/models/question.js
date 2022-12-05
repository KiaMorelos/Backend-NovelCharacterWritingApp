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
      this.questionaireId = this.belongsTo(models.Questionaire, {
        foreignKey: "questionarie_id",
      });
    }
  }
  Question.init(
    {
      questionaireId: {
        type: DataTypes.INTEGER,
        references: {
          model: "questionaire",
          key: "id",
        },
      },
      question: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "question",
    }
  );
  return Question;
};
