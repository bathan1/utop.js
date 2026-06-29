export {};

/**
 * `sort(compareFn, iterable)` returns `ITERABLE` as a new array sorted by `COMPAREFN`.
 *
 * ### Usage
 * ```ts
 * const ascending = sort((a, b) => a - b, [3, 1, 2]);
 * ```
 *
 * `sort` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const ascending = sort((a, b) => a - b, await Array.fromAsync(values()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It returns a new sorted array without changing the source
 * ```ts
 * const source = [3, 1, 2];
 * expect(sort((a, b) => a - b, source)).toEqual([1, 2, 3]);
 * expect(source).toEqual([3, 1, 2]);
 * ```
 */
export function sort<T>(compareFn: (a: T, b: T) => number, iterable: Iterable<T>): T[] {
  return Array.from(iterable).sort(compareFn);
}
