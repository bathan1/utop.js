import { expect, it } from "vitest";
import { not } from "./not.js";

it("returns `true` for falsy values", () => {
  expect(not(null)).toBe(true);
  expect(not(undefined)).toBe(true);
  expect(not(false)).toBe(true);
  expect(not(0)).toBe(true);
  expect(not(0n)).toBe(true);
  expect(not("")).toBe(true);
});

it("returns `false` for truthy values", () => {
  expect(not(true)).toBe(false);
  expect(not(1)).toBe(false);
  expect(not("hello")).toBe(false);
  expect(not([])).toBe(false);
  expect(not([1])).toBe(false);
  expect(not({})).toBe(false);
});

it("accepts predicate functions", () => {
  const isEven = (x: 1 | 2 | 3 | 4): x is 2 | 4 => x % 2 === 0;
  const xs = [1, 2, 3, 4] as const;

  const odds = xs.filter((x) => not(isEven, x));
  expect(odds).toEqual([1, 3]);
});
