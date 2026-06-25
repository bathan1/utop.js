export function randomIterableFromArray<T>(xs: T[]) {
  const n = Math.floor(Math.random() * 8);

  switch (n) {
    case 0:
      return xs;
    case 1:
      return xs.values();
    case 2:
      return new Set(xs);
    case 3:
      return new Set(xs).values();
    case 4:
      return new Map(xs.map((x) => [x, x])).keys();
    case 5:
      return new Map(xs.map((x) => [x, x])).values();
    case 6:
      return (function* () {
        yield* xs;
      })();
    default:
      return {
        [Symbol.iterator](): Iterator<T> {
          let i = 0;

          return {
            next(): IteratorResult<T> {
              if (i >= xs.length) {
                return { done: true, value: undefined };
              }

              return { done: false, value: xs[i++]! };
            },
          };
        },
      };
  }
}
