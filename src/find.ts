import type { Promisable } from "./types.js";

/**
 * `find(predicate, iterable)` returns the first `value` in `ITERABLE` that 
 * satisfies `PREDICATE(x)` or **throws** if that `value` can't be found.
 * 
 * @throws a {@link RangeError} when `PREDICATE` fails to find a value 
 * 
 * ### Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 * 
 * const firstCompleted = find((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(firstCompleted.completed); // true
 * ```
 * 
 * If `ITERABLE` has an {@link Symbol.asyncIterator} property,
 * then `find` searches for it using the `for await` expression,
 * and returns a {@lihnk Promise}, regardless of whether or not it 
 * also has the sync symbol (though in practice this will *never* happen).
 * 
 * ```
 * async function* count(n: number) {
 *   for (let i = 0; i < n; i++) {
 *     yield i + 1;
 *   }
 * }
 * 
 * const firstOdd = await find(x => x % 2 === 1, count);
 * console.log(firstOdd) // 1
 * ```
 * 
 * There is no overload to handle async `PREDICATE`. If you return
 * a Promise in `PREDICATE`, then the very iterable element will
 * evaluate out to `true` (since a Promise is an object which is truthy),
 * so don't do that and take out the async work from the loop.
 * 
 * ### Examples
 * 
 * @example
 * It returns the first value that satisfies `CALLBACKFN`
 * ```ts
 * expect(find((x) => x > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 * 
 * @example
 * It throws when no value satisfies `CALLBACKFN`
 * ```ts
 * expect(() => find((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
 * ```
 * 
 * @example
 * It returns asynchronously when for async ITERABLE even when they also have a sync iterator symbol
 * ```ts
 * const iterable = {
 *   async *[Symbol.asyncIterator]() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   },
 *   *[Symbol.iterator]() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   }
 * }
 * 
 * const syncOverridenPromise = find(x => x > 2, iterable);
 * expect(syncOverridenPromise).toBeInstanceOf(Promise);
 * expect(await syncOverridenPromise).toEqual(3);
 * ```
 * 
 * @example
 * It only returns a Promise when ITERABLE is an async iterable
 * ```ts
 * const iterable = {
 *   async *[Symbol.asyncIterator]() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   }
 * }
 * 
 * const promise = find(x => x > 2, iterable);
 * expect(promise).toBeInstanceOf(Promise);
 * expect(await promise).toEqual(3);
 * 
 * // no await on async functions it just checks for truthiness immediately
 * const notPromise = find(async x => x > 2, [1, 2, 3]);
 * expect(notPromise).toEqual(1);
 * ```
 */
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<S>;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): Promise<T>;
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): S;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T;

export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T> | AsyncIterable<T>,
): Promisable<T> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;

      for await (const value of iterable) {
        if (predicate(value, index++)) {
          return value;
        }
      }

      throw new RangeError("No matching value found");
    })();
  }

  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return value;
    }
  }

  throw new RangeError("No matching value found");
}
