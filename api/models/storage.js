const db = require("../config/db");
const Sequelize = require("sequelize");

const Storage = db.define(
  "storage",
  {
    storageId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storageName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    storageCapacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Storage;
