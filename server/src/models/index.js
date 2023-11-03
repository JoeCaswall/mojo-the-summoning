const { User } = require("./User");
const { Deck } = require("./Deck");
const { Card } = require("./Card");
const { Attack } = require("./Attack");

//set up the associations here
User.hasOne(Deck);
Deck.belongsTo(User);

Card.belongsTo(Deck);
Deck.hasMany(Card);

Card.belongsToMany(Attack, { through: "card-attack" });
Attack.belongsToMany(Card, { through: "card-attack" });

// and then export them all below
module.exports = { User, Deck, Card, Attack };
