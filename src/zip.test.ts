import { expect, it, vi } from "vitest";
import { zip } from "./zip.js";

it("stops immediately at the shortest iterable", () => {
  const logSome = vi.fn((..._: any[]) => void 0);
  const logNever = vi.fn((..._: any[]) => void 0);

  const zipped = zip([
    ["foo", "bar", "baz"],
    new Set([1, 2]),
    (function* () {
      yield "hello";
      logSome(1);
      yield "world";
      logSome(2);

      yield "NEVER";
      logNever("nope");
    })(),
  ]);

  expect(zipped.toArray()).toEqual([
    ["foo", 1, "hello"],
    ["bar", 2, "world"],
  ]);
  expect(logSome).toHaveBeenCalledTimes(2);
  expect(logNever).not.toHaveBeenCalledOnce();
});

it('pads with `undefined` when MODE = "longest"` and `PADDING` is omitted', () => {
  const zipped = zip(
    [
      ["Nov", "Dec", "Jan", "Feb"],
      [1, 2, 3],
    ] as const,
    { mode: "longest" }
  );

  expect(zipped.toArray()).toEqual([
    ["Nov", 1],
    ["Dec", 2],
    ["Jan", 3],
    ["Feb", undefined],
  ]);
});

it('maintains `PADDING`\'s order when `MODE = "longest"`', () => {
  const zipped = zip(
    [
      ["Alice", "Bob", "please", "pad", "me"],
      [100, 101],
    ],
    {
      mode: "longest",
      padding: ["ok", "ok", "ok"],
    }
  );

  expect(zipped.toArray()).toEqual([
    ["Alice", 100],
    ["Bob", 101],
    ["please", "ok"],
    ["pad", "ok"],
    ["me", "ok"],
  ]);
});

it('pads with `undefined` when `PADDING` is fully consumed prior to finish when `MODE = "longest"`', () => {
  const zipped = zip(
    [
      ["Alice", "Bob", "please", "pad", "me"],
      [100, 101],
    ],
    {
      mode: "longest",
      padding: ["ok", "ok"],
    }
  );

  expect(zipped.toArray()).toEqual([
    ["Alice", 100],
    ["Bob", 101],
    ["please", "ok"],
    ["pad", "ok"],
    ["me", undefined],
  ]);
});

it('throws `TypeError` on unequal lengths when `MODE = "strict"`', () => {
  const thisIsGoingTo = zip(
    [
      ["foo", "bar", "baz"],
      [1, 2],
    ],
    { mode: "strict" }
  );

  expect(thisIsGoingTo).toThrow(TypeError);
});
