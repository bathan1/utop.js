---
title: findMap
---

# Function: findMap()

> **findMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `U` \| `undefined`

Defined in: [ext-iterator/findMap.ts:27](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/findMap.ts#L27)

`findMap(callbackfn, iterable)` returns the first defined `CALLBACKFN` result from `ITERABLE`.

## Usage
```ts
const parsed = findMap((text) => text ? Number(text) : undefined, ["", "2"]);
```

`findMap` has no async sugar; materialize async input before calling it.

```ts
const parsed = findMap(Number, await Array.fromAsync(messages()));
```

## Type Parameters

### T

`T`

### U

`U`

## Parameters

### callbackfn

(`value`, `index`) => `U` \| `undefined`

### iterable

`Iterable`\<`T`\>

## Returns

`U` \| `undefined`

## Examples

It returns the first defined callback result
```ts
expect(findMap((value) => (value > 2 ? value * 10 : undefined), [1, 2, 3, 4])).toBe(30);
```

It returns `undefined` when no callback result is defined
```ts
expect(findMap(() => undefined, [1, 2, 3])).toBeUndefined();
```
