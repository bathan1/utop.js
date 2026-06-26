/**
 * `drop(limit, iterable)` is `ITERABLE` with `LIMIT` elements dropped from the start.
 * 
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/drop.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { drop } from "@/lib/utop/drop.js";
 * ```
 * 
 * ```ts
 * const droppedFirstTwo = [...drop(2, [1, 2, 3, 4, 5])];
 * console.log(droppedFirstTwo); // logs [3, 4, 5]
 * ```
 * 
 * When `ITERABLE` is async, then this returns an {@link AsyncGenerator} instead.
 * 
 * ```ts
 * async function* count(n: number) {
 *   for (let i = 0; i < n; i++) {
 *     yield i;
 *   }
 * }
 * 
 * const droppedFirstTwoAsync = await Array.fromAsync(
 *   drop(2, count(5))
 * );
 * console.log(droppedFirstTwoAsync); // logs [3, 4, 5]
 * ```
 * 
 * ### Examples
 * 
 * @example
 * It drops the first `LIMIT` values from `ITERABLE`
 * ```ts
 * const iterable = ["a", "b", "c", "d"];
 * 
 * const dropped = drop(2, iterable);
 * expect(Array.from(dropped)).toEqual(["c", "d"]);
 * ```
 * 
 * @example
 * It returns empty when `LIMIT` consumes all of `ITERABLE`
 * ```ts
 * expect(Array.from(drop(5, ["a", "b", "c"]))).toEqual([]);
 * ```
 * 
 * @example
 * It returns an AsyncGenerator when `ITERABLE` is also async
 * ```ts
 * const asyncIterable = async function* () {
 *   yield "a";
 *   yield "b";
 *   yield "c";
 *   yield "d";
 * }
 * 
 * const droppedFirstTwo = await Array.fromAsync(drop(2, asyncIterable()));
 * expect(droppedFirstTwo).toEqual(["c", "d"]);
 * ```
 */
export function drop<T>(limit: number, iterable: AsyncIterable<T>): AsyncGenerator<T, void, unknown>
export function drop<T>(limit: number, iterable: Iterable<T>): Generator<T, void, unknown>;

export function drop<T>(limit: number, iterable: Iterable<T> | AsyncIterable<T>): Generator<T, void, unknown> | AsyncGenerator<T, void, unknown> {
  if (Symbol.asyncIterator in iterable) {
    return (async function* drop() {
      const it = iterable[Symbol.asyncIterator]();
      for (let i = 0; i < limit; i++) {
        const { done } = await it.next();
        if (done) return void 0;
      }

      while (true) {
        const { done, value } = await it.next();
        if (done) return void 0;
        yield value;
      }
    })()
  }

  return (function* drop() {
    const it = iterable[Symbol.iterator]();
    for (let i = 0; i < limit; i++) {
      const { done } = it.next();
      if (done) return void 0;
    }

    while (true) {
      const { done, value } = it.next();
      if (done) return void 0;
      yield value;
    }
  })()
}
