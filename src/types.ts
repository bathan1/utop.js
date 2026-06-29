/**
 * `Option<T>` is `T` unioned with `undefined`
 */
export type Option<T> =
  | T
  | undefined;

/**
 * @example
 * It coerces null VALUE to undefined
 * ```ts
 * expect(Option(null)).not.toEqual(null);
 * expect(Option(null)).toEqual(undefined);
 * ```
 */
export function Option<T>(value: T | null | undefined): Option<NonNullable<T>> {
  return value ?? None;
}
type OptionAllKeys<T extends object> = {
  [K in keyof T]: null extends T[K]
    ? Option<NonNullable<T[K]>>
    : undefined extends T[K]
      ? Option<NonNullable<T[K]>>
      : T[K];
};

/**
 * @example
 * It coerces all null keyed values in OBJ to undefined
 * ```ts
 * const obj = {
 *   s: "",
 *   n: 0,
 *   bn: 0n,
 *   b: true,
 *   u: undefined,
 *   null: null,
 * };
 * const result = Option.allKeys(obj);
 * expect(result).toEqual({
 *   s: "",
 *   n: 0,
 *   bn: 0n,
 *   b: true,
 *   u: undefined,
 *   null: undefined,
 * });
 * ```
 */
Option.allKeys = function allKeys<T extends object>(obj: T): OptionAllKeys<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, Option(value)])
  ) as OptionAllKeys<T>;
};

/**
 * `Some<T>` is just `NonNullable<T>`. Even though `null` is not the
 * same as our userland {@link None} since that is just an alias for
 * `undefined`, in general, when we want to assert `Some<T>`, that means
 * we want to work with some *meaningful* value, which is why we exclude
 * `null` here.
 */
export type Some<T> = NonNullable<T>;
export type None = undefined;
export const None: undefined = undefined;

/**
 * `Promisable<T>` is either `T` itself or a {@link Promise} of `T`
 */
export type Promisable<T> =
  | T
  | Promise<T>;

/**
 * `Either<L, R>` is values of types `L` boxed in a `"left"` disciminateable
 * object and `R` boxed in `"right"` kinds.
 */
export type Either<L, R> =
  | { kind: "left"; value: L }
  | { kind: "right"; value: R };

export type Prettify<A> = {
  [Key in keyof A]: A[Key];
} & {};
export type Merge<A, B> = Prettify<Omit<A, keyof B> & B>;
