"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User_Roles extends Model {
    static associate(models) {
      // define association here
    }
  }
  User_Roles.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User_Roles",
    }
  );
  return User_Roles;
};
