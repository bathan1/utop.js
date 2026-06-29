import type { Promisable } from "./types.js";

type Seq<T> =
  | Iterable<T>
  | AsyncIterable<T>;

/**
 * `includes(searchElement, iterable, fromIndex?)` reports whether `SEARCH_ELEMENT` occurs in `ITERABLE` at or after `FROM_INDEX`.
 *
 * ### Usage
 * ```ts
 * const hasAdmin = includes("admin", roles);
 * ```
 *
 * When `ITERABLE` is async, then this handles `await`-ing its values before comparing against `SEARCH_ELEMENT`.
 *
 * ```ts
 * async function* roles() {
 *   yield "member";
 *   yield "admin";
 * }
 * const hasAdmin = includes("admin", roles());
 * ```
 *
 * ### Examples
 *
 * @example
 * It finds values at or after `FROM_INDEX`
 * ```ts
 * expect(includes("a", ["a", "b", "a"], 1)).toBe(true);
 * expect(includes("a", ["a", "b"], 1)).toBe(false);
 * ```
 *
 * @example
 * It uses SameValueZero-style matching for `NaN`
 * ```ts
 * expect(includes(NaN, [1, NaN, 3])).toBe(true);
 * ```
 */
export function includes<T>(
  searchElement: T,
  iterable: AsyncIterable<T>,
  fromIndex?: number
): Promise<boolean>;
export function includes<T>(
  searchElement: T,
  iterable: Iterable<T>,
  fromIndex?: number
): boolean;
export function includes<T>(
  searchElement: T,
  iterable: Seq<T>,
  fromIndex: number = 0
): Promisable<boolean> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      const start = Math.max(0, fromIndex);
      for await (const value of iterable) {
        if (index >= start && (Object.is(searchElement, value) || searchElement === value)) return true;
        index++;
      }
      return false;
    })();
  }
  let index = 0;
  const start = Math.max(0, fromIndex);
  for (const value of iterable) {
    if (index >= start && (Object.is(searchElement, value) || searchElement === value)) return true;
    index++;
  }
  return false;
}
