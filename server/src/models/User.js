// create your User model here
const { db, DataTypes, Sequelize, Model } = require("../db/config");

class User extends Model {}

User.init(
  {
    uername: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;
