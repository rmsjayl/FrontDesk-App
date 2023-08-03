const Sequelize = require("sequelize");
const db = require("../config/db");

const Package = db.define(
  "package",
  {
    packageId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    packageSize: {
      type: Sequelize.ENUM("small", "medium", "large"),
      allowNull: false,
    },
    ownerFirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerLastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ownerContactNum: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Package;
