"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, { through: "User_Roles", as: "Roles" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +ServerConfig.SALT_ROUNDS
    );
    user.password = encryptedPassword;
  });

  return User;
};
