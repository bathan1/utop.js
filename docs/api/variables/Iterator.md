---
title: Iterator
---

# Variable: Iterator

> `const` **Iterator**: `Readonly`\<\{ `concat`: \<`T`\>(...`iterables`) => `Generator`\<`ConcatValue`\<`T`\[`number`\]\>, `void`, `unknown`\>; `drop`: \<`T`\>(`limit`, `iterable`) => `Generator`\<`T`, `void`, `unknown`\>; `every`: \{\<`T`, `S`\>(`predicate`, `iterable`): `iterable is Iterable<S, any, any>`; \<`T`\>(`predicate`, `iterable`): `boolean`; \}; `filter`: \{\<`T`, `S`\>(`predicate`, `iterable`): `Generator`\<`S`, `void`, `unknown`\>; \<`T`\>(`predicate`, `iterable`): `Generator`\<`T`, `void`, `unknown`\>; \}; `find`: \{\<`T`, `S`\>(`predicate`, `iterable`): `S` \| `undefined`; \<`T`\>(`predicate`, `iterable`): `T` \| `undefined`; \}; `flatMap`: \<`T`, `U`\>(`callbackfn`, `iterable`) => `Generator`\<`U`, `void`, `unknown`\>; `forEach`: \<`T`\>(`callbackfn`, `iterable`) => `void`; `from`: \<`T`\>(`iterable`) => `Iterator`\<`T`, `undefined`, `unknown`\>; `includes`: \<`T`\>(`searchElement`, `iterable`, `fromIndex?`) => `boolean`; `map`: `Map`; `reduce`: \<`T`, `U`\>(`callbackfn`, `initialValue`, `iterable`) => `U`; `some`: \<`T`\>(`predicate`, `iterable`) => `boolean`; `take`: \<`T`\>(`limit`, `iterable`) => `Generator`\<`T`, `void`, `unknown`\>; `toArray`: \<`T`\>(`iterable`) => `T`[]; `zip`: \<`T`, `O`\>(`iterables`, `options?`) => `Generator`\<`ZipOutput`\<`T`, `O`\>\>; `zipKeyed`: \<`T`, `O`\>(`iterables`, `options?`) => `Generator`\<`O` *extends* \{ `mode`: `"longest"`; \} ? `ZipKeyedOutputLongest`\<`T`, `O`\> : `ZipKeyedOutput`\<`T`\>, `void`, `unknown`\>; \}\>

Defined in: [iterator.ts:18](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/iterator.ts#L18)
