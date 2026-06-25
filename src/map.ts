/**
 * `map(f, xs)` is `F(x1), F(x2), ... F(xn)` for each `xi` in `XS`
 */
export function* map<T, U>(
  f: (x: T, index: number) => U,
  xs: Iterable<T>
): Generator<U, void, unknown> {
  let index = 0;
  for (const x of xs) {
    yield f(x, index++);
  }
}
