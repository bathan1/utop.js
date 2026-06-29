import type { Promisable } from "./types.js";

type Seq<T> =
  | Iterable<T>
  | AsyncIterable<T>;

/**
 * `partition(predicate, iterable)` splits `ITERABLE` by `PREDICATE` into matching and non-matching values.
 *
 * ### Usage
 * ```ts
 * const [even, odd] = partition((value) => value % 2 === 0, [1, 2, 3, 4]);
 * ```
 *
 * `partition` allows for async `ITERABLE`, but does *not* handling awaiting the `PREDICATE` function like the other predicate functions from this lib.
 *
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 *   yield 4;
 * }
 * const [even, odd] = partition((value) => value % 2 === 0, values());
 * ```
 *
 * ### Examples
 *
 * @example
 * It separates matching and non-matching values
 * ```ts
 * expect(partition((value) => value % 2 === 0, [1, 2, 3, 4])).toEqual([
 *   [2, 4],
 *   [1, 3],
 * ]);
 * ```
 */
export function partition<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<[matches: S[], rest: Exclude<T, S>[]]>;
export function partition<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): [matches: T[], rest: T[]];
export function partition<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): [matches: S[], rest: Exclude<T, S>[]];
export function partition<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): [matches: T[], rest: T[]];

export function partition(
  predicate: (value: unknown, index: number) => unknown,
  iterable: Seq<unknown>,
): Promisable<[matches: unknown[], rest: unknown[]]> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      const matches: unknown[] = [];
      const rest: unknown[] = [];
      for await (const value of iterable) {
        (predicate(value, index++) ? matches : rest).push(value);
      }
      return [matches, rest];
    })();
  }

  let index = 0;
  const matches: unknown[] = [];
  const rest: unknown[] = [];
  for (const value of iterable) {
    (predicate(value, index++) ? matches : rest).push(value);
  }
  return [matches, rest];
}
