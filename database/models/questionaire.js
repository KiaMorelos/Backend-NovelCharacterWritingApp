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
      // define association here
    }
  }
  Questionaire.init(
    {
      name: DataTypes.STRING,
      questionaire_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "questionaire",
    }
  );
  return Questionaire;
};
