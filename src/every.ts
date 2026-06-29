type Seq<T> =
  | Iterable<T>
  | AsyncIterable<T>;

/**
 * `every(predicate, iterable)` is `true` if every `value` in `ITERABLE` satisfies
 * `PREDICATE(value)` or `false` otherwise.
 *
 * ## Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos as { completed: boolean }[]);
 *
 * const areAllCompleted = every((todo): todo is { id: number; completed: true } => todo.completed, todos);
 * console.log(areAllCompleted); // false
 * ```
 *
 * If `ITERABLE` is async then this returns the result as a Promise.
 *
 * ```ts
 * const response = await fetch('https://dummyjson.com/todos');
 * if (!response.body) {
 *   throw new Error("bad response", { cause: await response.json().catch(() => "unknown") })
 * }
 *
 * const chunksExist = await every(chunk => chunk.length > 0, response.body);
 * console.log(chunksExist); // true
 * ```
 *
 * ## Examples
 *
 * @example
 * It is `true` when every value matches `PREDICATE`
 * ```ts
 * expect(every((x) => x.length > 0, ["a", "bb", "ccc"])).toBe(true);
 * ```
 *
 * @example
 * It is `false` when any value does not match `PREDICATE`
 * ```ts
 * expect(every((x) => x.length > 0, ["a", "", "ccc"])).toBe(false);
 * ```
 *
 * @example
 * It accepts async `ITERABLE`
 * ```ts
 * async function* messageQueue() {
 *   yield "hello";
 *   yield "world";
 * }
 *
 * expect(await every((x) => x.length === 5, messageQueue()));
 * ```
 *
 * @example
 * It awaits `PREDICATE` for async `ITERABLE`
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 * }
 *
 * expect(await every(async (value) => value > 0, values())).toBe(true);
 * ```
 */
export function every<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<boolean>;
export function every<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): Promise<boolean>;
export function every<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): iterable is Iterable<S>;
export function every<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): boolean;

export function every(
  predicate: (value: unknown, index: number) => Promisable<unknown>,
  iterable: Seq<unknown>
): boolean | Promise<boolean> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      for await (const value of iterable) {
        if (!predicate(value, index++)) {
          return false;
        }
      }
      return true;
    })();
  }
  let index = 0;
  for (const value of iterable) {
    if (!predicate(value, index++)) {
      return false;
    }
  }
  return true;
}
import type { Promisable } from "./types.js";
