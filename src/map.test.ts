import { randomIterableFromArray } from "./-test.helpers.js";
import { describe, expect, it, vi } from "vitest";
import { map } from "./map.js";

describe("map(f, xs)", () => {
  it("calls `F` on demand", () => {
    const f = vi.fn((x: number) => String(x * 2));
    const xs = randomIterableFromArray(
      Array.from({ length: Math.ceil(Math.random() * 100) }, (_, i) => i)
    );
    const mapped = map(f, xs);
    expect(f).not.toHaveBeenCalled();
    mapped.next();
    expect(f).toHaveBeenCalled();
    f.mockClear();
  });
});
