const { db, DataTypes, Sequelize, Model } = require("../db/config");

class Card extends Model {}

Card.init(
  {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "Card",
  }
);

module.exports = { Card };
