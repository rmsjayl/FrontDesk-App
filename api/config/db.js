const Sequelize = require("sequelize");

const db = new Sequelize({
  hostname: "localhost",
  username: "root",
  password: "password1234",
  database: "frontdeskapp",
  dialect: "mysql",
});

module.exports = db;
