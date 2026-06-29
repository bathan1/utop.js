export {};

/**
 * `sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors.
 *
 * ### Usage
 * ```ts
 * const unique = sortUniq((a, b) => a - b, [3, 1, 3, 2]);
 * ```
 *
 * `sortUniq` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const unique = sortUniq((a, b) => a - b, await Array.fromAsync(values()));
 * ```
 *
 * ### Examples
 *
 * @example
 * It sorts and removes comparator-equal values
 * ```ts
 * expect(sortUniq((a, b) => a - b, [3, 1, 2, 3, 1])).toEqual([1, 2, 3]);
 * ```
 */
export function sortUniq<T>(compareFn: (a: T, b: T) => number, iterable: Iterable<T>): T[] {
  const sorted = Array.from(iterable).sort(compareFn);
  if (sorted.length === 0) return [];
  const unique = [sorted[0]!];
  for (let index = 1; index < sorted.length; index++) {
    const value = sorted[index]!;
    if (compareFn(unique[unique.length - 1]!, value) !== 0) unique.push(value);
  }
  return unique;
}
