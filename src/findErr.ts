type Seq<T> =
  | Iterable<T>
  | AsyncIterable<T>;

/**
 * `findErr(predicate, iterable)` returns the first value in `ITERABLE` matching `PREDICATE` or throws
 * {@link RangeError} if no such value is found.
 *
 * ### Usage
 * ```ts
 * const firstOpen = findErr((todo) => !todo.done, todos);
 * ```
 *
 * `findErr` does not await `PREDICATE`; async behavior is only provided for async iterables.
 *
 * ### Examples
 *
 * @example
 * It returns the first value that satisfies `CALLBACKFN`
 * ```ts
 * expect(findErr((x) => x > 2, [1, 2, 3, 4])).toBe(3);
 * ```
 *
 * @example
 * It throws when no value satisfies `CALLBACKFN`
 * ```ts
 * expect(() => findErr((x) => x > 4, [1, 2, 3])).toThrow(RangeError);
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
 * const syncOverridenPromise = findErr((x) => x > 2, iterable);
 * expect(syncOverridenPromise).toBeInstanceOf(Promise);
 * expect(await syncOverridenPromise).toEqual(3);
 * ```
 *
 * @example
 * It returns asynchronously for async ITERABLE
 * ```ts
 * const iterable = {
 *   async *[Symbol.asyncIterator]() {
 *     yield 1;
 *     yield 2;
 *     yield 3;
 *   },
 * };
 *
 * const promise = findErr((x) => x > 2, iterable);
 * expect(promise).toBeInstanceOf(Promise);
 * expect(await promise).toEqual(3);
 * ```
 *
 * @example
 * It throws asynchronously when no async value satisfies `CALLBACKFN`
 * ```ts
 * async function* values() {
 *   yield 1;
 *   yield 2;
 * }
 *
 * await expect(findErr((value) => value > 2, values())).rejects.toThrow(RangeError);
 * ```
 */
export function findErr<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: AsyncIterable<T>
): Promise<S>;
export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: AsyncIterable<T>
): Promise<T>;
export function findErr<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  iterable: Iterable<T>
): S;
export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Iterable<T>
): T;

export function findErr<T>(
  predicate: (value: T, index: number) => unknown,
  iterable: Seq<T>
): T | Promise<T> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;

      for await (const value of iterable) {
        if (predicate(value, index++)) {
          return value;
        }
      }

      throw new RangeError("No value satisfies predicate");
    })();
  }

  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) return value;
  }

  throw new RangeError("No value satisfies predicate");
}
