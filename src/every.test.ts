import { describe, it, expect } from "vitest";
import { every } from "./every.js";

describe("every(predicate, iterable)", () => {
  it("is `true` when every value matches `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
  });

  it("is `false` when any value does not match `PREDICATE`", () => {
    expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
  });

  it("accepts async `ITERABLE`", async () => {
    async function* messageQueue() {
      yield "hello";
      yield "world";
    }

    expect(await every((x) => x.length === 5, messageQueue())).toEqual(true);
  });

  it("does NOT await `PREDICATE` on async `ITERABLE`", async () => {
    async function* messageQueue() {
      yield "hello";
      yield "world";
    }

    expect(await every(async (x) => x.length === 1, messageQueue())).toEqual(true);
  })
});
