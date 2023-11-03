const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card } = require("./index");
const { db } = require("../db/config");

let card;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: "Arcturus Spellweaver",
    mojo: 100,
    stamina: 10,
    imgUrl: "http://localhost:5000/img/arcturus-spellweaver.jpg",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Card", () => {
  it("has an id", async () => {
    expect(card).toHaveProperty("id");
  });
  it("has correct name", async () => {
    expect(card.name).toBe("Arcturus Spellweaver");
  });
  it("has correct mojo", async () => {
    expect(card.mojo).toBe(100);
  });
  it("has correct stamina", async () => {
    expect(card.stamina).toBe(10);
  });
  it("has correct image", async () => {
    expect(card.imgUrl).toBe(
      "http://localhost:5000/img/arcturus-spellweaver.jpg"
    );
  });
  it("is an instance of Card", async () => {
    expect(card instanceof Card).toBe(true);
  });
});
