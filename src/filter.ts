import type { Promisable } from "./types.js";

/**
 * `filter(predicate, iterable)` lazily yields the values in `ITERABLE` that satisfy `PREDICATE`.
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/filter.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { filter } from "@/lib/utop/filter.js";
 * ```
 *
 * ```ts
 * const even = [...filter((value) => value % 2 === 0, [1, 2, 3, 4])];
 * ```
 *
 * For an async `ITERABLE`, `filter` returns an {@link AsyncGenerator} and awaits `PREDICATE`.
 *
 * ```ts
 * const available = await Array.fromAsync(filter(async (id) => (await fetch(`/items/${id}`)).ok, ids()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It lazily yields matching values and their indexes
 * ```ts
 * expect([...filter((value, index) => value % 2 === 0 && index > 0, [1, 2, 3, 4])]).toEqual([
 *   2, 4,
 * ]);
 * ```
 *
 * @example
 * It awaits `PREDICATE` when `ITERABLE` is async
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }
 * expect(await Array.fromAsync(filter(async (value) => value > 1, values()))).toEqual([2, 3]);
 * ```
 */
export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): AsyncGenerator<S, void, unknown>;

export function filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): AsyncGenerator<T, void, unknown>;

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): Generator<S, void, unknown>;

export function filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): Generator<T, void, unknown>;

export function filter<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T> | AsyncIterable<T>
): Generator<T, void, unknown> | AsyncGenerator<T, void, unknown> {
  if (Symbol.asyncIterator in iterable) {
    return (async function* filter() {
      let index = 0;
      for await (const value of iterable) {
        if (predicate(value, index++)) yield value;
      }
    })();
  }

  return (function* filter() {
    let index = 0;
    for (const value of iterable) {
      if (predicate(value, index++)) yield value;
    }
  })();
}
