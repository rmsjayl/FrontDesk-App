const Sequelize = require("sequelize");
const db = require("../config/db");

const PackageMovement = db.define("packagemovement", {
  packageMovementId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  packageId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "packages",
      key: "packageId",
    },
  },
  type: {
    type: Sequelize.ENUM("store", "retrieve"),
    allowNull: false,
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = PackageMovement;
