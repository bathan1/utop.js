import { describe, expect, it } from "vitest";
import { filter } from "./filter.js";

describe("filter(predicate, iterable)", () => {
  it("lazily yields matching values and their indexes", () => {
    expect([...filter((value, index) => value % 2 === 0 && index > 0, [1, 2, 3, 4])]).toEqual([
      2, 4,
    ]);
  });

  it("does *not* await `PREDICATE` even when `ITERABLE` is async", async () => {
    async function* values() {
      yield 1;
      yield 2;
      yield 3;
    }
    expect(await Array.fromAsync(filter((value) => value > 1, values()))).toEqual([2, 3]);
    expect(await Array.fromAsync(filter(async (value) => value > 1, values()))).toEqual([1, 2, 3]);
  });
});
