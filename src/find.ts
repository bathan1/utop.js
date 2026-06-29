import { type Option, None } from "./types.js";

/**
 * `find(predicate, iterable)` returns the first `value` in `ITERABLE` that
 * satisfies `PREDICATE(x)` or returns `undefined` otherwise.
 *
 * ### Installation
 * ```ts
 * pnpm dlx shadcn@latest add bathan1/utop/find.js
 * ```
 *
 * ### Usage
 * ```ts
 * import { find } from "@/lib/utop/find.js";
 * ```
 *
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 *
 * const firstCompleted = find((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(firstCompleted.completed); // true
 * ```
 *
 * If `ITERABLE` has an {@link Symbol.asyncIterator} property,
 * then `find` searches it using the `for await` expression,
 * and returns a {@link Promise}, regardless of whether or not it
 * also has the sync symbol.
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
 * `find` does not await `PREDICATE`; async behavior is only provided for async iterables.
 *
 * ### Examples
 *
 * @example
 * It returns the first matching value
 * ```ts
 * expect(find((value) => value > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 *
 * @example
 * It returns `undefined` when no value matches
 * ```ts
 * expect(find((value) => value > 4, [1, 2, 3])).toBeUndefined();
 * ```
 *
 * @example
 * It returns asynchronously for async ITERABLE even when it also has a sync iterator symbol
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
 *   },
 * };
 *
 * const promise = find((value) => value > 2, iterable);
 * expect(promise).toBeInstanceOf(Promise);
 * expect(await promise).toBe(3);
 * ```
 *
 * @example
 * It returns `undefined` asynchronously when no async value matches
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 * }
 *
 * await expect(find((value) => value > 2, values())).resolves.toBeUndefined();
 * ```
 */
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<Option<S>>;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): Promise<Option<T>>;
export function find<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): Option<S>;
export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): Option<T>;

export function find<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T> | AsyncIterable<T>
): Option<T> | Promise<Option<T>> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;

      for await (const value of iterable) {
        if (predicate(value, index++)) {
          return value;
        }
      }

      return None;
    })();
  }

  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return value;
    }
  }

  return None;
}
