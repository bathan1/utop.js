/**
 * `chunk(limit, iterable)` is a new generator that yields elements of `ITERABLE` materialized as arrays of max size `LIMIT`.
 *
 * ### Installation
 * ```bash
 * pnpm dlx shadcn@latest add bathan1/utop/chunk.js
 * ```
 * 
 * ### Usage
 * ```ts
 * import { chunk } from "@/lib/utop/chunk.js";
 * ```
 *
 * ```ts
 * const lotsOfRows = createLotsOfData();
 * const insertableChunks = chunk(500, lotsOfRows);
 * for (const chunk of insertableChunks) {
 *   await tx
 *     .insertInto("some-table")
 *     .values(chunk)
 *     .execute();
 * }
 * ```
 * 
 * `chunk` returns an {@link AsyncGenerator} when `ITERABLE` is an async iterable.
 * 
 * ```ts
 * async function* fetchTodos(ids: number[]) {
 *   for (const id of ids) {
 *     yield await fetch(`https://dummyjson.com/todos/${id}`)
 *       .then(async res => await res.json() as { todo: string; });
 *   }
 * }
 * 
 * const todos = fetchTodos([1, 2, 3]);
 * const todosGrouped = chunk(2, todos);
 * ```
 * 
 * ### Examples
 * @example
 * It yields arrays of max size `LIMIT`
 * ```ts
 * function* infinite() {
 *   let i = 0;
 *   while (true) {
 *     yield i++;
 *   }
 * }
 * const limit = Math.ceil(Math.random() * 100);
 * const randomLength = Math.ceil(Math.random() * limit);
 * const iterable = randomIterableFromArray(take(randomLength, infinite()).toArray());
 * 
 * const chunked = Array.from(chunk(limit, iterable));
 * chunked.forEach((array) => expect(array.length).toBeLessThanOrEqual(limit));
 * ```
 * 
 * @example
 * It throws RangeError when `LIMIT` is non-positive
 * ```ts
 * const limit = Math.random() < 0.5 ? -1 : -1.123;
 * const iterable = randomIterableFromArray([1, 2]);
 * 
 * const chunked = () => Array.from(chunk(limit, iterable));
 * expect(chunked).toThrow(RangeError);
 * ```
 * 
 * @example
 * It chunks async iterables
 * ```ts
 * async function* count(n: number) {
 *   for (let i = 0; i < n; i++) {
 *     yield i + 1;
 *   }
 * }
 * 
 * const limit = 2;
 * const asyncIterable = count(10);
 * 
 * const chunked = await Array.fromAsync(chunk(limit, asyncIterable));
 * expect(chunked).toEqual([
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 *   [7, 8],
 *   [9, 10]
 * ]);
 * ```
 */
export function chunk<T>(
  limit: number,
  iterable: Iterable<T, unknown, unknown>,
): Generator<T[], void, unknown>;
export function chunk<T>(
  limit: number,
  iterable: AsyncIterable<T, unknown, unknown>,
): AsyncGenerator<T[], void, unknown>;
export function chunk<T>(
  limit: number,
  iterable: Iterable<T> | AsyncIterable<T>,
): Generator<T[]> | AsyncGenerator<T[]> {
  if (Symbol.asyncIterator in iterable) {
    return (async function* () {
      if (limit <= 0) {
        throw new RangeError("chunk LIMIT must be greater than 0", {
          cause: limit,
        });
      }

      let chunk: T[] = [];

      for await (const x of iterable) {
        chunk.push(x);

        if (chunk.length >= limit) {
          yield chunk;
          chunk = [];
        }
      }

      if (chunk.length) {
        yield chunk;
      }
    })();
  }

  return (function* () {
    if (limit <= 0) {
      throw new RangeError("chunk LIMIT must be greater than 0", {
        cause: limit,
      });
    }

    let chunk: T[] = [];

    for (const x of iterable) {
      chunk.push(x);

      if (chunk.length >= limit) {
        yield chunk;
        chunk = [];
      }
    }

    if (chunk.length) {
      yield chunk;
    }
  })();
}

