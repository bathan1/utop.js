export {};
/**
 * `flat(iterable)` lazily flattens one level of nested `ITERABLE`.
 *
 * ### Usage
 * ```ts
 * const values = [...flat([[1, 2], new Set([3, 4])])];
 * ```
 *
 * `flat` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const values = [...flat(await Array.fromAsync(groups()))];
 * ```
 *
 * ### Examples
 *
 * @example
 * It flattens one level of any nested iterables
 * ```ts
 * expect([...flat([[1, 2], new Set([3, 4])])]).toEqual([1, 2, 3, 4]);
 * ```
 */
export function* flat<T>(iterable: Iterable<Iterable<T>>): Generator<T, void, unknown> {
  for (const value of iterable) yield* value;
}
