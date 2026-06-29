import { describe, expect, it } from "vitest";
import { find } from "./find.js";

describe("find(predicate, iterable)", () => {
  it("returns the first matching value", () => {
    expect(find((value) => value > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("returns `undefined` when no value matches", () => {
    expect(find((value) => value > 4, [1, 2, 3])).toBeUndefined();
  });

  it("returns asynchronously for async ITERABLE even when it also has a sync iterator symbol", async () => {
    const iterable = {
      async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };

    const promise = find((value) => value > 2, iterable);
    expect(promise).toBeInstanceOf(Promise);
    expect(await promise).toBe(3);
  });

  it("returns `undefined` asynchronously when no async value matches", async () => {
    async function* values() {
      yield 1;
      yield 2;
    }

    await expect(find((value) => value > 2, values())).resolves.toBeUndefined();
  });
});
