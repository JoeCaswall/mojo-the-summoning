const { User, Deck, Card, Attack } = require("./index");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { db } = require("../db/config.js");

let user;
let user2;
let deck;
let deck2;
let card;
let card2;
let attack;
let attack2;

beforeAll(async () => {
  // the 'sync' method will create tables based on the model class
  // by setting 'force:true' the tables are recreated each time the test suite is run
  await db.sync({ force: true });
  user = await User.create({ username: "iAmAUser" });
  user2 = await User.create({ username: "iAmAlsoAUser" });
  deck = await Deck.create({
    name: "testDeck",
    xp: 400,
  });
  deck2 = await Deck.create({
    name: "testDeck2",
    xp: 200,
  });
  card = await Card.create({
    name: "Arcturus Spellweaver",
    mojo: 100,
    stamina: 10,
    imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
  });
  card2 = await Card.create({
    name: "Nimue Mistral",
    mojo: 100,
    stamina: 10,
    imgUrl: "http://localhost:5000/img/nimue-mistral.jpg",
  });
  attack = await Attack.create({
    title: "swing",
    mojoCost: 10,
    staminaCost: 3,
  });
  attack2 = await Attack.create({
    title: "blast",
    mojoCost: 40,
    staminaCost: 1,
  });
});

afterAll(async () => await db.sync({ force: true }));

describe("User/Deck association", () => {
  it("user can set a deck", async () => {
    await user.setDeck(deck);
    const associatedDeck = await user.getDeck();
    expect(associatedDeck).toBeInstanceOf(Deck);
  });
  it("deck can set a user", async () => {
    await deck.setUser(user);
    const associatedUser = await deck.getUser();
    expect(associatedUser).toBeInstanceOf(User);
  });
});

describe("Card/Deck association", () => {
  it("a Deck can Have many cards", async () => {
    await deck.addCard(card);
    await deck.addCard(card2);

    const associatedCards = await deck.getCards();
    expect(associatedCards.length).toBe(2);
    expect(associatedCards[0]).toBeInstanceOf(Card);
    expect(associatedCards[1]).toBeInstanceOf(Card);
  });
  it("a Card can have one Deck", async () => {
    await card.setDeck(deck);

    const associatedDeck = await card.getDeck();
    expect(associatedDeck).toBeInstanceOf(Deck);
  });
});

describe("Card/Attack association", () => {
  it("a card can have many attacks", async () => {
    await card.addAttack(attack);
    await card.addAttack(attack2);

    const associatedAttacks = await card.getAttacks();
    expect(associatedAttacks.length).toBe(2);
    expect(associatedAttacks[0]).toBeInstanceOf(Attack);
    expect(associatedAttacks[1]).toBeInstanceOf(Attack);
  });
  it("an attack can have many cards", async () => {
    await attack.addCard(card);
    await attack.addCard(card2);

    const associatedCards = await attack.getCards();
    expect(associatedCards.length).toBe(2);
    expect(associatedCards[0]).toBeInstanceOf(Card);
    expect(associatedCards[1]).toBeInstanceOf(Card);
  });
});
