type Seq<T> =
  | Iterable<T>
  | AsyncIterable<T>;

/**
 * `take(limit, iterable)` is the new sequence that takes `LIMIT` elements from `ITERABLE` when `LIMIT` is non-negative
 * or throws {@link RangeError} otherwise when `LIMIT` is negative or `NaN`.
 *
 * ### Usage
 * ```ts
 * const todos = await fetch('https://dummyjson.com/todos')
 *   .then(async res => (await res.json()).todos));
 *
 * const first5 = take(5, todos);
 * for (const todo of first5) {
 *   console.log(todo);
 * }
 * ```
 *
 * `take` has the same simple async sugar semantics as `drop`
 * where `ITERABLE` can also be async, in which case, `take`
 * returns an {@link AsyncGenerator}.
 *
 * ```
 * const response = await fetch('https://dummyjson.com/todos');
 * if (!response.body) {
 *   throw new Error("bad response", { cause: response.status })
 * }
 *
 * const first5 = take(5, response.body);
 * for await (const chunk of first5) {
 *   console.log(chunk);
 * }
 * ```
 *
 * ### Examples
 *
 * @example
 * It takes at most `LIMIT` values from `ITERABLE`
 * ```ts
 * expect(Array.from(take(2, ["a", "b", "c"]))).toEqual(["a", "b"]);
 * ```
 *
 * @example
 * It stops when `ITERABLE` ends before `LIMIT`
 * ```ts
 * expect(Array.from(take(5, ["a", "b"]))).toEqual(["a", "b"]);
 * ```
 *
 * @example
 * It throws when `LIMIT` is negative and `NaN`
 * ```ts
 * expect(() => Array.from(take(-1, ["a", "b"]))).toThrow(RangeError);
 * expect(() => Array.from(take(NaN, ["a", "b"]))).toThrow(RangeError);
 * ```
 *
 * @example
 * It accepts async `ITERABLE`
 * ```ts
 * async function* count() {
 *   for (let i = 0; i < 5; i++) {
 *     yield i + 1;
 *   }
 * }
 *
 * expect(await Array.fromAsync(take(2, count()))).toEqual([1, 2])
 * ```
 */
export function take<T>(
  limit: number,
  iterable: AsyncIterable<T>
): AsyncGenerator<T, void, unknown>;
export function take<T>(limit: number, iterable: Iterable<T>): Generator<T, void, unknown>;

export function take<T>(
  limit: number,
  iterable: Seq<T>
): Generator<T, void, unknown> | AsyncGenerator<T, void, unknown> {
  if (Symbol.asyncIterator in iterable) {
    return (async function* take() {
      if (Number.isNaN(limit) || limit < 0) {
        throw new RangeError("LIMIT must be nonnegative", { cause: limit });
      }

      const it = iterable[Symbol.asyncIterator]();
      for (let i = 0; i < limit; i++) {
        const { done, value } = await it.next();
        if (done) {
          return void 0;
        }
        yield value;
      }
    })();
  }

  return (function* take() {
    if (Number.isNaN(limit) || limit < 0) {
      throw new RangeError("LIMIT must be nonnegative", { cause: limit });
    }

    const it = iterable[Symbol.iterator]();
    for (let i = 0; i < limit; i++) {
      const { done, value } = it.next();
      if (done) {
        return void 0;
      }
      yield value;
    }
  })();
}
