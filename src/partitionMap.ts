import type { Promisable, Either } from "./types";

/**
 * `partitionMap(callbackfn, iterable)` separates `CALLBACKFN` results for `ITERABLE` into left and right values.
 *
 * ### Usage
 * ```ts
 * const [errors, values] = partitionMap((value) => value < 0
 *   ? { kind: "left", value: "negative" }
 *   : { kind: "right", value }, [1, -1, 2]);
 * ```
 *
 * `partitionMap` provides async sugar over async `ITERABLE`, in which case,
 * `CALLBACKFN` will also be awaited.
 *
 * ```ts
 * async function* count() {
 *   for (let i = 0; i < 3; i++) {
 *     yield i + 1;
 *   }
 * }
 * const [odds, evens] = await partitionMap(
 * async (value): Promise<Either<number, number>> =>
 *   value % 2 === 1
 *   ? { kind: "left", value }
 *   : { kind: "right", value },
 *   count()
 * );
 * console.log({ odds, evens });
 * ```
 *
 * ### Examples
 *
 * @example
 * It separates left and right result values
 * ```ts
 * const result = partitionMap(
 *   (value): Either<string, number> =>
 *     value < 0
 *       ? ({ kind: "left", value: `invalid:${value}` } as const)
 *       : ({ kind: "right", value: value * 2 } as const),
 *   [1, -1, 2]
 * );
 * expect(result).toEqual([["invalid:-1"], [2, 4]]);
 * ```
 */
export function partitionMap<T, L, R>(
  callbackfn: (value: T, index: number) => Promisable<Either<L, R>>,
  iterable: AsyncIterable<T>
): Promise<[lefts: L[], rights: R[]]>;
export function partitionMap<T, L, R>(
  callbackfn: (value: T, index: number) => Either<L, R>,
  iterable: Iterable<T>
): [lefts: L[], rights: R[]];

export function partitionMap<T, L, R>(
  callbackfn: (value: T, index: number) => Promisable<Either<L, R>>,
  iterable: Iterable<T> | AsyncIterable<T>
): Promisable<[lefts: L[], rights: R[]]> {
  if (Symbol.asyncIterator in iterable) {
    return (async () => {
      let index = 0;
      const lefts: L[] = [];
      const rights: R[] = [];
      for await (const value of iterable) {
        const result = await callbackfn(value, index++);
        if (result.kind === "left") lefts.push(result.value);
        else rights.push(result.value);
      }
      return [lefts, rights];
    })();
  }
  let index = 0;
  const lefts: L[] = [];
  const rights: R[] = [];
  for (const value of iterable) {
    const result = callbackfn(value, index++) as Either<L, R>;
    if (result.kind === "left") lefts.push(result.value);
    else rights.push(result.value);
  }
  return [lefts, rights];
}
