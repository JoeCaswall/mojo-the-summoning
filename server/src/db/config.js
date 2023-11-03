// add your database connection here
const { Sequelize, DataTypes, Model } = require("sequelize");
const path = require("path");

const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "db.sqlite"),
});

module.exports = { db, Sequelize, DataTypes, Model };
