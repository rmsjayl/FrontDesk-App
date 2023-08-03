const db = require("../config/db");
const Storage = require("./storage");
const Package = require("./package");
const PackageMovement = require("./packagemovement");

Storage.sync();
Package.sync();
PackageMovement.sync();

Package.belongsTo(Package, { foreignKey: "packageId" });

module.exports = db;
