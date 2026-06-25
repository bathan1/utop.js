/**
 * `ZipValue<T>` is the element type of `T` for {@link Iterable} `T`
 */
type ZipValue<T> = T extends Iterable<infer V> ? V : never;

/**
 * Options for
 * - `"shortest"` means stop as soon as the first iterable is fully consumed
 * - `"longest"` means go until the longest iterable is consumed
 * - `"strict"` means throw when iterables don't have equal lengths
 */
type ZipMode = "shortest" | "longest" | "strict";

type ZipOptions = {
  mode?: ZipMode;
  padding?: Iterable<unknown>;
};

type IsTuple<T extends readonly unknown[]> = number extends T["length"] ? false : true;

type TupleKeys<T extends readonly unknown[]> = Exclude<keyof T, keyof (readonly unknown[])>;

type ZipValues<T extends readonly Iterable<unknown>[]> = {
  -readonly [K in keyof T]: ZipValue<T[K]>;
};

type ZipIndexed<T extends readonly Iterable<unknown>[]> = T[0] extends readonly unknown[]
  ? IsTuple<T[0]> extends true
    ? {
        [K in TupleKeys<T[0]>]: {
          -readonly [I in keyof T]: T[I] extends readonly unknown[]
            ? K extends keyof T[I]
              ? T[I][K]
              : never
            : never;
        };
      }[TupleKeys<T[0]>]
    : ZipValues<T>
  : ZipValues<T>;

type TupleKeysOfAny<T extends readonly Iterable<unknown>[]> = {
  [I in keyof T]: T[I] extends readonly unknown[] ? TupleKeys<T[I]> : never;
}[number];

type ZipPadding<O extends ZipOptions | undefined> = O extends {
  padding: infer P extends Iterable<unknown>;
}
  ? [ZipValue<P>] extends [never]
    ? undefined
    : ZipValue<P>
  : undefined;

type ZipValuesLongest<T extends readonly Iterable<unknown>[], P> = {
  -readonly [K in keyof T]: ZipValue<T[K]> | P;
};

type ZipIndexedLongest<T extends readonly Iterable<unknown>[], P> = T[0] extends readonly unknown[]
  ? IsTuple<T[0]> extends true
    ? {
        [K in TupleKeysOfAny<T>]: {
          -readonly [I in keyof T]: T[I] extends readonly unknown[]
            ? K extends keyof T[I]
              ? T[I][K]
              : P
            : ZipValue<T[I]> | P;
        };
      }[TupleKeysOfAny<T>]
    : ZipValuesLongest<T, P>
  : ZipValuesLongest<T, P>;

type ZipOutput<
  T extends readonly Iterable<unknown>[],
  O extends ZipOptions | undefined,
> = O extends { mode: "longest" } ? ZipIndexedLongest<T, ZipPadding<O>> : ZipIndexed<T>;

/**
 * `zip(iterables, { mode?; padding? }?)` yields zip-aggregated elements from `ITERABLES`
 * with excess element behavior determined based on `MODE`, if provided, where:
 *
 * - `shortest`: stops when any iterable ends and is also the default
 * - `longest`: continues until all iterables end
 * - `strict`: throws if iterables have different lengths
 *
 * When `MODE = "longest"`, the elements from `PADDING` are used to fill in the gaps.
 */
export function* zip<
  T extends readonly Iterable<unknown>[],
  O extends ZipOptions | undefined = undefined,
>(iterables: readonly [...T], options?: O): Generator<ZipOutput<T, O>> {
  const mode = options?.mode ?? "shortest";
  const padding = options?.padding;
  const iterators = iterables.map((xs) => xs[Symbol.iterator]());
  const paddingIterator = padding?.[Symbol.iterator]();

  while (true) {
    const results = iterators.map((it) => it.next());
    const doneCount = results.filter((r) => r.done).length;

    if (doneCount === iterators.length) {
      return;
    }

    if (doneCount > 0) {
      if (mode === "shortest") {
        return;
      }

      if (mode === "strict") {
        throw new TypeError("Cannot zip iterables with different lengths");
      }
    }

    yield results.map((result) => {
      if (!result.done) {
        return result.value;
      }

      return paddingIterator?.next().value;
    }) as any as ZipOutput<T, O>;
  }
}
