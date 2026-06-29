/**
 * A `falsy` value is any of the 6 value js considers 'false'
 * i.e. `!FALSY` evaluates to `true`.
 */
type Falsy = false | 0 | 0n | null | undefined | "";

type Predicate<T, S extends T = T> = ((value: T) => boolean) | ((value: T) => value is S);

/**
 * `not(value)` negates `VALUE`; `not(predicate, value)` negates `PREDICATE(VALUE)`.
 *
 * This is a rare case of a function where the number of arguments determines how
 * the function evaluates them, as opposed to the usual case where omitting arguments
 * simply indicates the absence of that value in Utop.js.
 *
 * ### Usage
 * ```ts
 * const response = await fetch("http://localhost:3000");
 * if (not(response.ok)) {
 *   throw new Error("")
 * }
 * ```
 *
 * Although you can use `not` as a "readable" `!` operator like the above does against a single `VALUE`,
 * the main benefit of `not` is its ability to infer the excluded type that `PREDICATE` asserts.
 *
 * ```ts
 * const isString = (val: string | number) => typeof val === "string";
 * const x = Math.random() < 0.5 ? "1" : 1;
 *
 * if (not(isString, x)) {
 *   console.log("number!", x);
 * } else {
 *   console.log("string!", x);
 * }
 * ```
 *
 * There is no async sugar for the `not` function.
 *
 * ### Examples
 *
 * @example
 * It returns `true` for falsy values
 * ```ts
 * expect(not(null)).toBe(true);
 * expect(not(undefined)).toBe(true);
 * expect(not(false)).toBe(true);
 * expect(not(0)).toBe(true);
 * expect(not(0n)).toBe(true);
 * expect(not("")).toBe(true);
 * ```
 *
 * @example
 * It returns `false` for truthy values
 * ```ts
 * expect(not(true)).toBe(false);
 * expect(not(1)).toBe(false);
 * expect(not("hello")).toBe(false);
 * expect(not([])).toBe(false);
 * expect(not([1])).toBe(false);
 * expect(not({})).toBe(false);
 * ```
 *
 * @example
 * It accepts predicate functions
 * ```ts
 * const isEven = (x: 1 | 2 | 3 | 4): x is 2 | 4 => x % 2 === 0;
 * const xs = [1, 2, 3, 4] as const;
 *
 * const odds = xs.filter((x) => not(isEven, x));
 * expect(odds).toEqual([1, 3]);
 * ```
 */
export function not<T>(value: T): value is Extract<T, Falsy>;
export function not<T, S extends T>(
  predicate: (value: T) => value is S,
  value: T
): value is Exclude<T, S>;
export function not<T>(predicate: (value: T) => unknown, value: T): boolean;

export function not<T, S extends T>(fOrValue: T | Predicate<T, S>, value?: T): boolean {
  if (arguments.length === 1) {
    return !fOrValue;
  }

  return !(fOrValue as Predicate<T, S>)(value as T);
}
