import { describe, expect, it } from "vitest";
import { drop } from "./drop.js";

describe("drop(limit, iterable)", () => {
  it("drops the first `LIMIT` values from `ITERABLE`", () => {
    const iterable = ["a", "b", "c", "d"];

    const dropped = drop(2, iterable);
    expect(Array.from(dropped)).toEqual(["c", "d"]);
  });

  it("returns empty when `LIMIT` consumes all of `ITERABLE`", () => {
    expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
  });

  it("returns an AsyncGenerator when `ITERABLE` is also async", async () => {
    const asyncIterable = async function* () {
      yield "a";
      yield "b";
      yield "c";
      yield "d";
    }

    const droppedFirstTwo = await Array.fromAsync(drop(2, asyncIterable()));
    expect(droppedFirstTwo).toEqual(["c", "d"]);
  })
});
