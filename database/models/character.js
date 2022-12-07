"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.userId = this.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Character.init(
    {
      name: DataTypes.STRING,
      character_photo_url: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Character",
      tableName: "characters",
    }
  );
  return Character;
};
