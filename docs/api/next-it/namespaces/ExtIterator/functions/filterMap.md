---
title: filterMap
---

# Function: filterMap()

> **filterMap**\<`T`, `U`\>(`callbackfn`, `iterable`): `Generator`\<`U`, `void`, `unknown`\>

Defined in: [ext-iterator/filterMap.ts:25](https://github.com/bathan1/utop.js/blob/65acd6db7d1f070fc2dfb77c183a1c31994c8529/src/ext-iterator/filterMap.ts#L25)

`filterMap(callbackfn, iterable)` lazily yields each defined `CALLBACKFN` result for `ITERABLE`.

## Usage
```ts
const numbers = [...filterMap((text) => text ? Number(text) : undefined, ["1", "", "3"])];
```

`filterMap` has no async sugar; materialize async input before calling it.

```ts
const numbers = [...filterMap(Number, await Array.fromAsync(messages()))];
```

## Type Parameters

### T

`T`

### U

`U`

## Parameters

### callbackfn

(`value`, `index`) => [`Option`](../type-aliases/Option.md)\<`U` \| `null`\>

### iterable

`Iterable`\<`T`\>

## Returns

`Generator`\<`U`, `void`, `unknown`\>

## Example

It yields only defined callback results
```ts
expect([
  ...filterMap((value) => (value % 2 ? undefined : String(value)), [1, 2, 3, 4]),
]).toEqual(["2", "4"]);
```
