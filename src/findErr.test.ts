import { describe, it, expect } from "vitest";
import { findErr } from "./findErr.js";

describe("findErr(predicate, iterable)", () => {
  it("returns the first value that satisfies `CALLBACKFN`", () => {
    expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
  });

  it("throws when no value satisfies `CALLBACKFN`", () => {
    expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
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

    const syncOverridenPromise = findErr((x) => x > 2, iterable);
    expect(syncOverridenPromise).toBeInstanceOf(Promise);
    expect(await syncOverridenPromise).toEqual(3);
  });

  it("returns asynchronously for async ITERABLE", async () => {
    const iterable = {
      async *[Symbol.asyncIterator]() {
        yield 1;
        yield 2;
        yield 3;
      },
    };

    const promise = findErr((x) => x > 2, iterable);
    expect(promise).toBeInstanceOf(Promise);
    expect(await promise).toEqual(3);
  });

  it("throws asynchronously when no async value satisfies `CALLBACKFN`", async () => {
    async function* values() {
      yield 1;
      yield 2;
    }

    await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
  });
});
