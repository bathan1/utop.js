---
title: sortUniq
---

# Function: sortUniq()

> **sortUniq**\<`T`\>(`compareFn`, `iterable`): `T`[]

Defined in: [ext-iterator/sortUniq.ts:23](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/sortUniq.ts#L23)

`sortUniq(compareFn, iterable)` sorts `ITERABLE` with `COMPAREFN` and removes comparator-equal neighbors.

## Usage
```ts
const unique = sortUniq((a, b) => a - b, [3, 1, 3, 2]);
```

`sortUniq` has no async sugar; materialize async input before calling it.

```ts
const unique = sortUniq((a, b) => a - b, await Array.fromAsync(values()));
```

## Type Parameters

### T

`T`

## Parameters

### compareFn

(`a`, `b`) => `number`

### iterable

`Iterable`\<`T`\>

## Returns

`T`[]

## Example

It sorts and removes comparator-equal values
```ts
expect(sortUniq((a, b) => a - b, [3, 1, 2, 3, 1])).toEqual([1, 2, 3]);
```
