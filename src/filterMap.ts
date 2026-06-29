import { type Option } from "./types.js";

/**
 * `filterMap(callbackfn, iterable)` lazily yields each defined `CALLBACKFN` result for `ITERABLE`.
 *
 * ### Usage
 * ```ts
 * const numbers = [...filterMap((text) => text ? Number(text) : undefined, ["1", "", "3"])];
 * ```
 *
 * `filterMap` has no async sugar; materialize async input before calling it.
 *
 * ```ts
 * const numbers = [...filterMap(Number, await Array.fromAsync(messages()))];
 * ```
 *
 * ### Examples
 *
 * @example
 * It yields only defined callback results
 * ```ts
 * expect([
 *   ...filterMap((value) => (value % 2 ? undefined : String(value)), [1, 2, 3, 4]),
 * ]).toEqual(["2", "4"]);
 * ```
 */
export function* filterMap<T, U>(
  callbackfn: (value: T, index: number) => Option<U | null>,
  iterable: Iterable<T>
): Generator<U, void, unknown> {
  let index = 0;
  for (const value of iterable) {
    const result = callbackfn(value, index++);
    if (result != null) yield result;
  }
}
