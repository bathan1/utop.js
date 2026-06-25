/**
 * A `falsy` value is any of the 6 value js considers 'false'
 * i.e. `!FALSY` evaluates to `true`
 */
type Falsy = false | 0 | 0n | null | undefined | "";

/**
 */
type Predicate<T, S extends T = T> = ((value: T) => boolean) | ((value: T) => value is S);

/**
 * `not(f, value?)` is the negation of `F`s truthiness when `F` is the only value passed in. Otherwise, it is the negation of the boolean `F(VALUE)`.
 */
export function not<T>(f: T): f is Extract<T, Falsy>;
export function not<T, S extends T>(f: (value: T) => value is S, value: T): value is Exclude<T, S>;
export function not<T>(f: (value: T) => boolean, value: T): boolean;

export function not<T, S extends T>(fOrValue: T | Predicate<T, S>, value?: T): boolean {
  if (arguments.length === 1) {
    return !fOrValue;
  }

  return !(fOrValue as Predicate<T, S>)(value as T);
}
