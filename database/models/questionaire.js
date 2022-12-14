"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questionaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Question, {
        foreignKey: "questionaireId",
      });
    }
  }
  Questionaire.init(
    {
      name: DataTypes.STRING,
      questionaireType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Questionaire",
      tableName: "questionaires",
      timestamps: false,
    }
  );
  return Questionaire;
};
