const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Attack } = require("./index");
const { db } = require("../db/config");

let attack;

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: "swing",
    mojoCost: 10,
    staminaCost: 1,
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Attack", () => {
  it("has an id", async () => {
    expect(attack).toHaveProperty("id");
  });
  it("has correct title", async () => {
    expect(attack.title).toBe("swing");
  });
  it("has correct mojoCost", async () => {
    expect(attack.mojoCost).toBe(10);
  });
  it("has correct staminaCost", async () => {
    expect(attack.staminaCost).toBe(1);
  });
  it("is an instance of Attack", async () => {
    expect(attack instanceof Attack).toBe(true);
  });
});
