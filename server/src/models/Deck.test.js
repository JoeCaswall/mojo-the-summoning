const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require("./index");
const { db } = require("../db/config");

let deck;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: "testDeck", xp: 100 });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Deck", () => {
  it("has an id", async () => {
    expect(deck).toHaveProperty("id");
  });
  it("has correct name", async () => {
    expect(deck.name).toBe("testDeck");
  });
  it("has correct xp", async () => {
    expect(deck.xp).toBe(100);
  });
  it("is an instance of Deck", async () => {
    expect(deck instanceof Deck).toBe(true);
  });
});
